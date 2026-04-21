import { describe, expect, it } from "vitest";
import { Category } from "../domain/interfaces/Category.interface";
import { Website } from "../domain/interfaces/Website.interface";
import { ALL_CATEGORY_ID } from "../utils/constants";
import { filterWebsitesByCategory, sanitizeWebsites } from "./websiteState";

const categories: Category[] = [
  { id: ALL_CATEGORY_ID, name: "All websites" },
  { id: "1", name: "Social" },
  { id: "2", name: "Tools" },
];

describe("websiteState", () => {
  it("filtra solo webs de la categoria seleccionada", () => {
    const websites: Website[] = [
      { id: "1", name: "A", url: "https://a.com", categoryId: "1" },
      { id: "2", name: "B", url: "https://b.com", categoryId: "2" },
      { id: "3", name: "C", url: "https://c.com", categoryId: "1" },
    ];

    const filtered = filterWebsitesByCategory(websites, "1");

    expect(filtered).toHaveLength(2);
    expect(filtered.every((website) => website.categoryId === "1")).toBe(true);
  });

  it("devuelve todas las webs cuando se selecciona la categoria ALL", () => {
    const websites: Website[] = [
      { id: "1", name: "A", url: "https://a.com", categoryId: "1" },
      { id: "2", name: "B", url: "https://b.com", categoryId: "2" },
    ];

    const filtered = filterWebsitesByCategory(websites, ALL_CATEGORY_ID);

    expect(filtered).toEqual(websites);
  });

  it("normaliza webs duplicadas y reasigna categorias invalidas", () => {
    const websites: Website[] = [
      { id: "1", name: " Alpha ", url: " https://a.com ", categoryId: "1" },
      { id: "1", name: "Beta", url: "https://b.com", categoryId: "999" },
      { id: "", name: "Gamma", url: "https://c.com", categoryId: "2" },
    ];

    const normalized = sanitizeWebsites(websites, categories);

    expect(new Set(normalized.map((website) => website.id)).size).toBe(
      normalized.length,
    );
    expect(normalized[0].name).toBe("Alpha");
    expect(normalized[0].url).toBe("https://a.com");
    expect(normalized[1].categoryId).toBe("1");
    expect(normalized[2].categoryId).toBe("2");
  });
});
