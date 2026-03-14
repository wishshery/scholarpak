# 🎓 ScholarPak — Global Scholarships for Pakistani Students

A fully automated, SEO-optimized scholarship discovery platform for Pakistani students. Built with **Next.js 14**, **Tailwind CSS**, **Python scraper**, and **GitHub Actions**.

---

## ✨ Features

| Feature | Details |
|---|---|
| 📋 Scholarship Database | 25+ verified scholarships (2026 intakes), growing daily |
| 🔍 Smart Search & Filters | Filter by country, degree, funding type, IELTS requirement |
| 🤖 AI Recommender | 4-step quiz → personalized scholarship matches |
| 🌍 Country Guides | Detailed study guides for 20+ countries |
| 💸 Free Tuition Page | Germany, Norway, Austria, Finland, France, Czech Republic |
| 🔔 Alert System | Email + Telegram scholarship alerts |
| 🕷️ Daily Scraper | Playwright + BeautifulSoup auto-scraper |
| ⚙️ GitHub Actions | Daily automation pipeline (scrape → update → deploy) |
| 🗺️ SEO Sitemap | Auto-generated sitemap.xml + robots.txt |
| 📱 Fully Responsive | Optimized for mobile, tablet, and desktop |

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+
- Python 3.11+
- Git

### 1. Clone & install
```bash
git clone https://github.com/YOUR_USERNAME/scholarpak.git
cd scholarpak
npm install
```

### 2. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 3. Build for production
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
scholarpak/
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── page.jsx             # Homepage
│   │   ├── layout.jsx           # Root layout + SEO metadata
│   │   ├── globals.css          # Tailwind + custom styles
│   │   ├── sitemap.js           # Auto sitemap.xml
│   │   ├── robots.js            # robots.txt
│   │   ├── scholarships/
│   │   │   ├── page.jsx         # All scholarships + filters
│   │   │   └── [slug]/page.jsx  # Individual scholarship detail
│   │   ├── countries/
│   │   │   ├── page.jsx         # All countries grid
│   │   │   └── [country]/page.jsx # Country guide (SEO)
│   │   ├── free-tuition/
│   │   │   └── page.jsx         # Free tuition countries
│   │   ├── recommend/
│   │   │   └── page.jsx         # AI scholarship recommender
│   │   └── alerts/
│   │       └── page.jsx         # Email + Telegram alerts
│   ├── components/
│   │   ├── Navbar.jsx           # Sticky navigation with dropdowns
│   │   ├── Footer.jsx           # Footer with newsletter signup
│   │   ├── ScholarshipCard.jsx  # Scholarship listing card
│   │   └── SearchFilter.jsx     # Search + filter panel
│   ├── data/
│   │   └── scholarships.json    # ← MAIN DATABASE (updated by scraper)
│   └── lib/
│       └── scholarships.js      # Utility functions
├── scraper/
│   ├── scraper.py               # Main scraper (Playwright + BeautifulSoup)
│   └── requirements.txt         # Python dependencies
└── .github/
    └── workflows/
        └── daily-update.yml     # GitHub Actions automation
```

---

## 🌐 Deployment (Vercel — Recommended)

### One-click deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Manual steps
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repository
4. Framework: **Next.js** (auto-detected)
5. Click **Deploy**

### Set up deploy hook (for automation)
1. In Vercel: Settings → Git → Deploy Hooks → Create hook
2. Copy the hook URL
3. In GitHub repo: Settings → Secrets → Add `DEPLOY_HOOK_URL` = your Vercel hook URL

---

## ⚙️ Automation Setup (GitHub Actions)

The scraper runs **automatically every day at 6:00 AM UTC** (11:00 AM Pakistan time).

### What it does
1. ✅ Runs `scraper.py` to check scholarship sources
2. ✅ Removes expired scholarships automatically
3. ✅ Adds newly discovered scholarships
4. ✅ Commits updated `scholarships.json` to GitHub
5. ✅ Triggers Vercel rebuild via deploy hook

### To run scraper manually
```bash
# In GitHub: Actions tab → "Daily Scholarship Update" → Run workflow
```

Or locally:
```bash
cd scraper
pip install -r requirements.txt
playwright install chromium
python scraper.py
```

---

## 📊 Adding Scholarships Manually

Edit `src/data/scholarships.json` and add a new entry following this schema:

```json
{
  "id": "unique-id",
  "name": "Scholarship Full Name",
  "country": "Country Name",
  "university": "University or Provider",
  "degree": ["Masters"],
  "fields": ["Engineering", "Sciences"],
  "funding_type": "Fully Funded",
  "tuition_covered": true,
  "monthly_stipend": "€934/month",
  "travel_allowance": "Yes",
  "ielts_required": false,
  "tests_accepted": ["IELTS 6.0", "TOEFL 550"],
  "deadline": "October (annually)",
  "benefits": ["Full tuition", "Monthly stipend"],
  "link": "https://official-application-link.com",
  "source": "https://official-source.com",
  "description": "Brief description of the scholarship...",
  "open_to_pakistan": true,
  "slug": "scholarship-name-country",
  "intake_year": 2026,
  "tags": ["fully-funded", "europe", "masters"]
}
```

---

## 🔔 Email Alerts Integration

Connect a real email service for production alerts:

### Option A — Resend (recommended)
```bash
npm install resend
```
Add `RESEND_API_KEY` to environment variables.

### Option B — Mailchimp
Use their subscribe API endpoint in `/src/app/alerts/page.jsx`.

### Option C — ConvertKit
Replace the form action in `/src/app/alerts/page.jsx` with ConvertKit's form embed.

---

## 📱 Telegram Bot Setup

1. Create a bot via [@BotFather](https://t.me/BotFather) on Telegram
2. Add the token to GitHub Secrets as `TELEGRAM_BOT_TOKEN`
3. Add your channel ID as `TELEGRAM_CHANNEL_ID`
4. Add to `daily-update.yml`:
```yaml
- name: Post to Telegram
  run: |
    curl -X POST "https://api.telegram.org/bot${{ secrets.TELEGRAM_BOT_TOKEN }}/sendMessage" \
      -d "chat_id=${{ secrets.TELEGRAM_CHANNEL_ID }}" \
      -d "text=🎓 Scholarships updated! Check scholarpak.com for latest opportunities"
```

---

## 🎨 Canva Design Assets

The platform uses Canva-generated designs for branding:

- **Logo designs**: See Canva links in your conversation
- **Homepage banner**: Hero section poster design

To use Canva designs:
1. Pick your preferred design from the Canva candidates shown
2. Click **Create from candidate** in Canva
3. Export as PNG/SVG
4. Place in `/public/` directory
5. Reference as `<Image src="/logo.png" />` in Navbar

---

## 🔧 Environment Variables

Create `.env.local` in root:
```env
# Site
NEXT_PUBLIC_SITE_URL=https://scholarpak.com

# Email service (optional)
RESEND_API_KEY=your_resend_api_key

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 📈 SEO Strategy

The platform auto-generates SEO pages for target keywords:

| URL Pattern | Target Keyword |
|---|---|
| `/scholarships` | scholarships for pakistani students |
| `/countries/germany` | study in germany for pakistani students |
| `/scholarships/daad-development-postgraduate-germany` | daad scholarship for pakistani students |
| `/free-tuition` | free tuition countries for pakistani students |
| `/countries/united-kingdom` | uk scholarships for pakistani students |

### Add Google Analytics
```jsx
// src/app/layout.jsx — add inside <head>:
<Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXX" />
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) |
| Styling | Tailwind CSS 3 |
| Icons | Lucide React |
| Data | Static JSON (updated by scraper) |
| Scraping | Python + Playwright + BeautifulSoup |
| Automation | GitHub Actions |
| Hosting | Vercel (recommended) |
| SEO | next-seo + auto sitemap |

---

## 📞 Support

- 📧 Email: support@scholarpak.com
- 💬 Telegram: t.me/scholarpak
- 🐛 Issues: GitHub Issues tab

---

Built with ❤️ for Pakistani students worldwide.
