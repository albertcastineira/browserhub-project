import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Category } from "../domain/interfaces/Category.interface";
import { Website } from "../domain/interfaces/Website.interface";
import {
  DEFAULT_CATEGORIES,
  DEFAULT_CATEGORY_FORM_MODE,
  DEFAULT_WEBSITE_FORM_MODE,
  DEFAULT_WEBSITES,
} from "./defaultValues";
import {
  ALL_CATEGORY_ID,
  DEFAULT_SELECTED_CATEGORY_ID,
  LOCAL_STORAGE_KEYS,
  NEW_WEBSITE_ID,
} from "../utils/constants";
import { GlobalContext } from "./GlobalContext";
import { getNextSequentialId } from "../utils/helpers";

const getStoredBrowserData = (): {
  categories: Category[];
  websites: Website[];
} => {
  try {
    const rawData = localStorage.getItem(LOCAL_STORAGE_KEYS.STORED_DATA);

    if (!rawData) {
      return {
        categories: DEFAULT_CATEGORIES,
        websites: DEFAULT_WEBSITES,
      };
    }

    const parsedData = JSON.parse(rawData) as {
      categories?: Category[];
      websites?: Website[];
    };

    return {
      categories: Array.isArray(parsedData.categories)
        ? parsedData.categories
        : DEFAULT_CATEGORIES,
      websites: Array.isArray(parsedData.websites)
        ? parsedData.websites
        : DEFAULT_WEBSITES,
    };
  } catch (error) {
    console.error("Error parsing JSON from localStorage", error);
    return {
      categories: DEFAULT_CATEGORIES,
      websites: DEFAULT_WEBSITES,
    };
  }
};

export const GlobalContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialStoredData = useMemo(() => getStoredBrowserData(), []);

  const [categories, setCategories] = useState<Category[]>(
    initialStoredData.categories,
  );
  const [currentCategoryId, setCurrentCategoryId] = useState<string>("");
  const [websites, setWebsites] = useState<Website[]>(
    initialStoredData.websites,
  );
  const [currentWebsiteId, setCurrentWebsiteId] =
    useState<string>(NEW_WEBSITE_ID);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialStoredData.categories[0]?.id ?? DEFAULT_SELECTED_CATEGORY_ID,
  );
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [firstTimeDialogOpen, setFirstTimeDialogOpen] = useState(false);
  const [websiteFormOpen, setWebsiteFormOpen] = useState(false);
  const [websiteFormMode, setWebsiteFormMode] = useState(
    DEFAULT_WEBSITE_FORM_MODE,
  );
  const [categoryFormOpen, setCategoryFormOpen] = useState(false);
  const [categoryFormMode, setCategoryFormMode] = useState(
    DEFAULT_CATEGORY_FORM_MODE,
  );

  const filteredWebsites = useMemo(
    () =>
      selectedCategory !== ALL_CATEGORY_ID
        ? websites.filter((website) => website.categoryId === selectedCategory)
        : websites,
    [selectedCategory, websites],
  );

  useEffect(() => {
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.STORED_DATA,
      JSON.stringify({ categories, websites }),
    );
  }, [categories, websites]);

  const findWebsite = useCallback(
    (id: string): Website | undefined => {
      return websites.find((website) => website.id === id);
    },
    [websites],
  );

  const createWebsite = useCallback((website: Website) => {
    setWebsites((prevWebsites) => [
      ...prevWebsites,
      {
        ...website,
        id: website.id || getNextSequentialId(prevWebsites),
      },
    ]);
  }, []);

  const updateWebsite = useCallback(
    (id: string, updatedWebsite: Partial<Website>) => {
      setWebsites((prevWebsites) =>
        prevWebsites.map((website) =>
          website.id === id ? { ...website, ...updatedWebsite } : website,
        ),
      );
    },
    [],
  );

  const deleteWebsite = useCallback((id: string) => {
    setWebsites((prevWebsites) =>
      prevWebsites.filter((website) => website.id !== id),
    );
  }, []);

  const findCategory = useCallback(
    (id: string): Category | undefined => {
      return categories.find((category) => category.id === id);
    },
    [categories],
  );

  const createCategory = useCallback((category: Category) => {
    setCategories((prevCategories) => [...prevCategories, category]);
  }, []);

  const updateCategory = useCallback(
    (id: string, updatedCategory: Partial<Category>) => {
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === id ? { ...category, ...updatedCategory } : category,
        ),
      );
    },
    [],
  );

  const deleteCategory = useCallback((id: string) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category.id !== id),
    );
  }, []);

  const contextValue = useMemo(
    () => ({
      categories,
      currentCategoryId,
      setCurrentCategoryId,
      websites,
      currentWebsiteId,
      setCurrentWebsiteId,
      selectedCategory,
      setCategories,
      setWebsites,
      setSelectedCategory,
      filteredWebsites,
      settingsOpen,
      setSettingsOpen,
      firstTimeDialogOpen,
      setFirstTimeDialogOpen,
      helpDialogOpen,
      setHelpDialogOpen,
      websiteFormOpen,
      setWebsiteFormOpen,
      websiteFormMode,
      setWebsiteFormMode,
      categoryFormOpen,
      setCategoryFormOpen,
      categoryFormMode,
      setCategoryFormMode,
      findWebsite,
      createWebsite,
      updateWebsite,
      deleteWebsite,
      findCategory,
      createCategory,
      updateCategory,
      deleteCategory,
    }),
    [
      categories,
      currentCategoryId,
      websites,
      currentWebsiteId,
      selectedCategory,
      filteredWebsites,
      settingsOpen,
      firstTimeDialogOpen,
      helpDialogOpen,
      websiteFormOpen,
      websiteFormMode,
      categoryFormOpen,
      categoryFormMode,
      findWebsite,
      createWebsite,
      updateWebsite,
      deleteWebsite,
      findCategory,
      createCategory,
      updateCategory,
      deleteCategory,
    ],
  );

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
