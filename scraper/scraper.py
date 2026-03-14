"""
ScholarPak — Scholarship Scraper Service
==========================================
Scrapes official scholarship sources, normalizes data, removes expired entries,
and updates scholarships.json for the Next.js frontend.

Technologies: Playwright (dynamic pages) + BeautifulSoup (static HTML)
Run: python scraper.py
Scheduled: GitHub Actions (daily at 06:00 UTC)
"""

import asyncio
import json
import logging
import re
import os
from datetime import datetime, date
from pathlib import Path
from typing import Optional

import aiohttp
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright

# ──────────────────────────────────────────────
# Config
# ──────────────────────────────────────────────
DATA_FILE = Path(__file__).parent.parent / "src" / "data" / "scholarships.json"
LOG_LEVEL = logging.INFO

logging.basicConfig(
    level=LOG_LEVEL,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler()],
)
log = logging.getLogger("scholarpak-scraper")

HEADERS = {
    "User-Agent": "Mozilla/5.0 (compatible; ScholarPakBot/1.0; +https://scholarpak.com/bot)",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}


# ──────────────────────────────────────────────
# Data model
# ──────────────────────────────────────────────
def make_slug(name: str, country: str) -> str:
    combined = f"{name}-{country}".lower()
    slug = re.sub(r"[^a-z0-9\s-]", "", combined)
    slug = re.sub(r"[\s]+", "-", slug.strip())
    return slug[:80]


def normalize_scholarship(raw: dict) -> dict:
    """Normalize raw scraped data to our standard schema."""
    return {
        "id": raw.get("id") or make_slug(raw.get("name", ""), raw.get("country", "")),
        "name": raw.get("name", "").strip(),
        "country": raw.get("country", "").strip(),
        "university": raw.get("university", "Various Universities").strip(),
        "degree": raw.get("degree", ["Masters"]),
        "fields": raw.get("fields", ["All Fields"]),
        "funding_type": raw.get("funding_type", "Partially Funded"),
        "tuition_covered": raw.get("tuition_covered", False),
        "monthly_stipend": raw.get("monthly_stipend", "See official source"),
        "travel_allowance": raw.get("travel_allowance", "Check official source"),
        "ielts_required": raw.get("ielts_required", True),
        "tests_accepted": raw.get("tests_accepted", ["IELTS 6.0"]),
        "deadline": raw.get("deadline", "Check official source"),
        "benefits": raw.get("benefits", []),
        "link": raw.get("link", ""),
        "source": raw.get("source", raw.get("link", "")),
        "description": raw.get("description", "").strip(),
        "open_to_pakistan": raw.get("open_to_pakistan", True),
        "slug": raw.get("slug") or make_slug(raw.get("name", ""), raw.get("country", "")),
        "intake_year": raw.get("intake_year", datetime.now().year + 1),
        "tags": raw.get("tags", []),
        "last_verified": datetime.now().strftime("%Y-%m-%d"),
    }


def is_expired(scholarship: dict) -> bool:
    """Check if a scholarship deadline has passed."""
    deadline_str = scholarship.get("deadline", "")
    current_year = datetime.now().year
    current_month = datetime.now().month

    # Keywords indicating ongoing / rolling deadlines
    ongoing_keywords = ["rolling", "varies", "check", "open", "ongoing", "anytime"]
    if any(kw in deadline_str.lower() for kw in ongoing_keywords):
        return False

    # Check for explicit year — if year < current year, it's expired
    year_match = re.search(r"\b(202[0-9])\b", deadline_str)
    if year_match:
        year = int(year_match.group(1))
        if year < current_year:
            return True
        if year > current_year:
            return False

    # Month-based check for current year
    month_map = {
        "january": 1, "february": 2, "march": 3, "april": 4, "may": 5,
        "june": 6, "july": 7, "august": 8, "september": 9, "october": 10,
        "november": 11, "december": 12,
    }
    for month_name, month_num in month_map.items():
        if month_name in deadline_str.lower():
            if month_num < current_month - 1:  # 1-month grace period
                return True
            return False

    return False  # If we can't determine, keep it


# ──────────────────────────────────────────────
# Scrapers
# ──────────────────────────────────────────────

async def fetch_html(session: aiohttp.ClientSession, url: str) -> Optional[str]:
    """Fetch static HTML page."""
    try:
        async with session.get(url, headers=HEADERS, timeout=aiohttp.ClientTimeout(total=20)) as resp:
            if resp.status == 200:
                return await resp.text()
            log.warning(f"HTTP {resp.status} for {url}")
    except Exception as e:
        log.error(f"Failed to fetch {url}: {e}")
    return None


async def scrape_daad(session: aiohttp.ClientSession) -> list[dict]:
    """Scrape DAAD Germany scholarships."""
    scholarships = []
    url = "https://www.daad.de/en/study-and-research-in-germany/scholarships/"
    html = await fetch_html(session, url)
    if not html:
        return scholarships

    soup = BeautifulSoup(html, "html.parser")
    # DAAD scholarship listings
    for item in soup.select(".c-teaser, .scholarship-item, article")[:10]:
        name_el = item.select_one("h2, h3, .c-teaser__headline")
        link_el = item.select_one("a[href]")
        desc_el = item.select_one("p, .c-teaser__text")

        if name_el and link_el:
            name = name_el.get_text(strip=True)
            if len(name) > 10:  # Filter noise
                scholarships.append(normalize_scholarship({
                    "name": name,
                    "country": "Germany",
                    "university": "Various German Universities",
                    "degree": ["Masters", "PhD"],
                    "funding_type": "Fully Funded",
                    "tuition_covered": True,
                    "ielts_required": False,
                    "link": "https://www.daad.de" + link_el["href"] if link_el["href"].startswith("/") else link_el["href"],
                    "source": url,
                    "description": desc_el.get_text(strip=True)[:300] if desc_el else "",
                    "deadline": "October (check official site)",
                    "open_to_pakistan": True,
                    "tags": ["germany", "daad", "fully-funded"],
                }))

    log.info(f"DAAD: found {len(scholarships)} scholarships")
    return scholarships


async def scrape_chevening(session: aiohttp.ClientSession) -> list[dict]:
    """Scrape Chevening scholarship info."""
    scholarships = []
    url = "https://www.chevening.org/scholarships/"
    html = await fetch_html(session, url)
    if not html:
        return scholarships

    soup = BeautifulSoup(html, "html.parser")
    # Look for deadline info
    deadline_text = "November (annually)"
    deadline_el = soup.find(string=re.compile(r"deadline|apply by|closes", re.I))
    if deadline_el:
        deadline_text = deadline_el[:100]

    scholarships.append(normalize_scholarship({
        "name": "Chevening UK Government Scholarship",
        "country": "United Kingdom",
        "university": "Any UK University",
        "degree": ["Masters"],
        "funding_type": "Fully Funded",
        "tuition_covered": True,
        "monthly_stipend": "~£1,100/month",
        "travel_allowance": "Yes — return flights covered",
        "ielts_required": True,
        "tests_accepted": ["IELTS 6.5", "TOEFL iBT 79"],
        "deadline": deadline_text,
        "benefits": ["Full tuition fees", "Monthly living allowance", "Return flights"],
        "link": url,
        "source": url,
        "description": "Chevening is the UK government's flagship international scholarship programme for outstanding emerging leaders from Pakistan.",
        "open_to_pakistan": True,
        "tags": ["uk", "chevening", "fully-funded", "masters"],
    }))

    log.info(f"Chevening: found {len(scholarships)} scholarships")
    return scholarships


async def scrape_turkiye_burslari(playwright_page) -> list[dict]:
    """Scrape Türkiye Burslari using Playwright for JavaScript-rendered content."""
    scholarships = []
    try:
        await playwright_page.goto("https://www.turkiyeburslari.gov.tr/en", timeout=30000)
        await playwright_page.wait_for_timeout(2000)

        content = await playwright_page.content()
        soup = BeautifulSoup(content, "html.parser")

        # Extract deadline info if available
        deadline = "February (annually)"
        deadline_els = soup.find_all(string=re.compile(r"deadline|application|apply", re.I))
        for el in deadline_els[:3]:
            if any(month in el.lower() for month in ["january", "february", "march"]):
                deadline = el[:100]
                break

        scholarships.append(normalize_scholarship({
            "name": "Türkiye Burslari (Turkey Government Scholarship)",
            "country": "Turkey",
            "university": "Turkish Universities",
            "degree": ["Bachelors", "Masters", "PhD"],
            "funding_type": "Fully Funded",
            "tuition_covered": True,
            "monthly_stipend": "800–1,400 TRY/month",
            "travel_allowance": "Yes — roundtrip flights",
            "ielts_required": False,
            "tests_accepted": ["No IELTS for Turkish programs"],
            "deadline": deadline,
            "benefits": ["Full tuition", "Monthly stipend", "Accommodation", "Health insurance", "Turkish language course", "Roundtrip flights"],
            "link": "https://www.turkiyeburslari.gov.tr/",
            "source": "https://www.turkiyeburslari.gov.tr/",
            "description": "Turkey's government scholarship offers fully funded Bachelor, Masters, and PhD scholarships for Pakistani students at top Turkish universities.",
            "open_to_pakistan": True,
            "tags": ["turkey", "fully-funded", "no-ielts", "bachelors", "masters", "phd"],
        }))
    except Exception as e:
        log.error(f"Turkiye Burslari scrape failed: {e}")

    log.info(f"Türkiye Burslari: found {len(scholarships)} scholarships")
    return scholarships


async def scrape_erasmus(session: aiohttp.ClientSession) -> list[dict]:
    """Scrape Erasmus Mundus catalogue."""
    scholarships = []
    url = "https://www.eacea.ec.europa.eu/scholarships/erasmus-mundus-catalogue_en"
    html = await fetch_html(session, url)
    if not html:
        # Fallback to known data
        scholarships.append(normalize_scholarship({
            "name": "Erasmus Mundus Joint Masters",
            "country": "Europe (Multiple Countries)",
            "university": "European University Consortiums",
            "degree": ["Masters"],
            "funding_type": "Fully Funded",
            "tuition_covered": True,
            "monthly_stipend": "~€1,000/month",
            "travel_allowance": "Yes",
            "ielts_required": True,
            "tests_accepted": ["IELTS 6.5", "TOEFL iBT 90"],
            "deadline": "January–March (varies by programme)",
            "benefits": ["Full tuition", "Monthly allowance", "Travel costs", "Study in 2-3 European countries"],
            "link": url,
            "source": "https://erasmus-plus.ec.europa.eu",
            "description": "Erasmus Mundus scholarships fund top Pakistani students to study integrated Masters programmes across multiple European countries.",
            "open_to_pakistan": True,
            "tags": ["europe", "erasmus", "fully-funded", "masters"],
        }))
        return scholarships

    soup = BeautifulSoup(html, "html.parser")
    programmes = soup.select(".views-row, .programme-item, article")[:15]

    for prog in programmes:
        name_el = prog.select_one("h2, h3, .field-title a")
        link_el = prog.select_one("a[href]")
        if name_el:
            name = name_el.get_text(strip=True)
            if "Erasmus" in name or len(name) > 15:
                scholarships.append(normalize_scholarship({
                    "name": f"Erasmus Mundus — {name}",
                    "country": "Europe (Multiple Countries)",
                    "university": "European University Consortium",
                    "degree": ["Masters"],
                    "funding_type": "Fully Funded",
                    "tuition_covered": True,
                    "ielts_required": True,
                    "link": link_el["href"] if link_el else url,
                    "source": url,
                    "deadline": "January–March",
                    "open_to_pakistan": True,
                    "tags": ["europe", "erasmus", "fully-funded"],
                }))

    if not scholarships:
        # Fallback
        scholarships.append(normalize_scholarship({
            "name": "Erasmus Mundus Joint Masters",
            "country": "Europe (Multiple Countries)",
            "university": "European University Consortiums",
            "degree": ["Masters"],
            "funding_type": "Fully Funded",
            "tuition_covered": True,
            "link": url,
            "deadline": "January–March",
            "open_to_pakistan": True,
        }))

    log.info(f"Erasmus: found {len(scholarships)} scholarships")
    return scholarships


# ──────────────────────────────────────────────
# Deduplication
# ──────────────────────────────────────────────

def deduplicate(existing: list[dict], new_items: list[dict]) -> list[dict]:
    """Merge new scholarships, preserving existing data if slug matches."""
    existing_slugs = {s["slug"]: i for i, s in enumerate(existing)}
    merged = list(existing)

    for new_s in new_items:
        slug = new_s["slug"]
        if slug in existing_slugs:
            # Update last_verified timestamp only
            merged[existing_slugs[slug]]["last_verified"] = new_s.get("last_verified")
            log.debug(f"Updated existing: {slug}")
        else:
            merged.append(new_s)
            log.info(f"Added new scholarship: {new_s['name']}")

    return merged


# ──────────────────────────────────────────────
# Main runner
# ──────────────────────────────────────────────

async def main():
    log.info("=" * 60)
    log.info("ScholarPak Scraper — Starting daily run")
    log.info(f"Timestamp: {datetime.now().isoformat()}")
    log.info("=" * 60)

    # Load existing data
    existing_data = []
    if DATA_FILE.exists():
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            existing_data = json.load(f)
        log.info(f"Loaded {len(existing_data)} existing scholarships")

    # Remove expired
    before_count = len(existing_data)
    existing_data = [s for s in existing_data if not is_expired(s)]
    removed = before_count - len(existing_data)
    if removed:
        log.info(f"Removed {removed} expired scholarships")

    # Scrape new data
    new_scholarships = []

    async with aiohttp.ClientSession() as session:
        # Static scrapers
        tasks = [
            scrape_daad(session),
            scrape_chevening(session),
            scrape_erasmus(session),
        ]
        results = await asyncio.gather(*tasks, return_exceptions=True)
        for result in results:
            if isinstance(result, Exception):
                log.error(f"Scraper error: {result}")
            elif result:
                new_scholarships.extend(result)

    # Dynamic scrapers (Playwright)
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            page.set_default_timeout(30000)

            tb_results = await scrape_turkiye_burslari(page)
            new_scholarships.extend(tb_results)

            await browser.close()
    except Exception as e:
        log.error(f"Playwright scraper error: {e}")

    log.info(f"Scraped {len(new_scholarships)} scholarships from sources")

    # Merge & deduplicate
    final_data = deduplicate(existing_data, new_scholarships)

    # Sort by country name
    final_data.sort(key=lambda s: (s.get("country", ""), s.get("name", "")))

    # Save to JSON
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(final_data, f, indent=2, ensure_ascii=False)

    log.info(f"✅ Saved {len(final_data)} scholarships to {DATA_FILE}")
    log.info(f"   New: {len(final_data) - before_count + removed} | Removed: {removed} | Total: {len(final_data)}")
    log.info("=" * 60)

    # Write run summary for GitHub Actions artifact
    summary_path = Path(__file__).parent / "last_run.json"
    with open(summary_path, "w") as f:
        json.dump({
            "run_at": datetime.now().isoformat(),
            "total": len(final_data),
            "removed_expired": removed,
            "added_new": max(0, len(final_data) - (before_count - removed)),
        }, f, indent=2)


if __name__ == "__main__":
    asyncio.run(main())
