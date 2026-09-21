export const DEFAULT_FILTERS = {
  query: "",
  country: "",
  degree: "",
  funding: "",
  ielts: "any",
};
export function filtersFromParams(params) {
  const funding = (params.get("funding") || "")
    .toLowerCase()
    .replaceAll(" ", "-");
  return {
    query: params.get("q") || "",
    country: params.get("country") || "",
    degree: params.get("degree") || "",
    funding: ["fully-funded", "partial"].includes(funding) ? funding : "",
    ielts: ["yes", "no"].includes(params.get("ielts"))
      ? params.get("ielts")
      : "any",
  };
}
export function filterScholarships(data, filters) {
  const q = filters.query.trim().toLowerCase();
  return data.filter((s) => {
    if (
      q &&
      ![s.name, s.country, s.university, s.description].some((v) =>
        v?.toLowerCase().includes(q),
      )
    )
      return false;
    if (
      filters.country &&
      s.country.toLowerCase() !== filters.country.toLowerCase()
    )
      return false;
    if (
      filters.degree &&
      !s.degree?.some((d) => d.toLowerCase() === filters.degree.toLowerCase())
    )
      return false;
    const full = s.funding_type?.toLowerCase().includes("fully");
    if (filters.funding === "fully-funded" && !full) return false;
    if (filters.funding === "partial" && full) return false;
    if (filters.ielts === "no" && s.ielts_required !== false) return false;
    if (filters.ielts === "yes" && s.ielts_required !== true) return false;
    return true;
  });
}
