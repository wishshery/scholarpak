import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import {
  DEFAULT_FILTERS,
  filtersFromParams,
  filterScholarships,
} from "../src/lib/filters.mjs";
const data = JSON.parse(
  readFileSync(new URL("../src/data/scholarships.json", import.meta.url)),
);
test("homepage degree and country query narrow actual data", () => {
  const filters = filtersFromParams(
    new URLSearchParams("degree=Masters&country=Germany&funding=fully-funded"),
  );
  const matches = filterScholarships(data, filters);
  assert.ok(matches.length > 0);
  assert.ok(
    matches.every(
      (s) =>
        s.country === "Germany" &&
        s.degree.includes("Masters") &&
        s.funding_type.toLowerCase().includes("fully"),
    ),
  );
});
test("legacy lowercase degree and funding links work", () => {
  const matches = filterScholarships(
    data,
    filtersFromParams(
      new URLSearchParams("degree=phd&funding=fully-funded&ielts=no"),
    ),
  );
  assert.ok(matches.length > 0);
  assert.ok(
    matches.every(
      (s) =>
        s.degree.some((d) => d.toLowerCase() === "phd") &&
        s.ielts_required === false,
    ),
  );
});
test("search is trimmed and case insensitive; clearing returns all entries", () => {
  assert.ok(
    filterScholarships(data, {
      ...DEFAULT_FILTERS,
      query: " CHEVENING ",
    }).every((s) => s.name.includes("Chevening")),
  );
  assert.equal(
    filterScholarships(data, {
      ...DEFAULT_FILTERS,
      query: "zz-no-scholarship-zz",
    }).length,
    0,
  );
  assert.equal(filterScholarships(data, DEFAULT_FILTERS).length, data.length);
});
