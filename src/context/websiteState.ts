import { Category } from "../domain/interfaces/Category.interface";
import { Website } from "../domain/interfaces/Website.interface";
import { ALL_CATEGORY_ID } from "../utils/constants";
import { getNextSequentialId } from "../utils/helpers";

export const getFallbackCategoryId = (categories: Category[]): string => {
  return (
    categories.find((category) => category.id !== ALL_CATEGORY_ID)?.id ??
    ALL_CATEGORY_ID
  );
};

export const filterWebsitesByCategory = (
  websites: Website[],
  selectedCategory: string,
): Website[] => {
  return selectedCategory !== ALL_CATEGORY_ID
    ? websites.filter((website) => website.categoryId === selectedCategory)
    : websites;
};

export const sanitizeWebsites = (
  websites: Website[],
  categories: Category[],
): Website[] => {
  const fallbackCategoryId = getFallbackCategoryId(categories);
  const validCategoryIds = new Set(
    categories
      .map((category) => category.id)
      .filter((categoryId) => categoryId !== ALL_CATEGORY_ID),
  );

  const normalizedWebsites: Website[] = [];

  websites.forEach((website) => {
    const desiredId = website.id?.trim();
    const idAlreadyUsed = normalizedWebsites.some(
      (item) => item.id === desiredId,
    );

    const safeId =
      desiredId && !idAlreadyUsed
        ? desiredId
        : getNextSequentialId(normalizedWebsites);

    const safeCategoryId = validCategoryIds.has(website.categoryId)
      ? website.categoryId
      : fallbackCategoryId;

    normalizedWebsites.push({
      ...website,
      id: safeId,
      name: website.name.trim(),
      url: website.url.trim(),
      categoryId: safeCategoryId,
    });
  });

  return normalizedWebsites;
};

export const areWebsitesEqual = (
  left: Website[],
  right: Website[],
): boolean => {
  return (
    left.length === right.length &&
    left.every((website, index) => {
      const rightWebsite = right[index];

      return (
        website.id === rightWebsite.id &&
        website.name === rightWebsite.name &&
        website.url === rightWebsite.url &&
        website.categoryId === rightWebsite.categoryId
      );
    })
  );
};
