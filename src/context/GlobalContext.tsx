import { createContext } from "react";
import { Category } from "../domain/interfaces/Category.interface";
import { Website } from "../domain/interfaces/Website.interface";
import {
  DEFAULT_CATEGORY_FORM_MODE,
  DEFAULT_WEBSITE_FORM_MODE,
} from "./defaultValues";
import { ALL_CATEGORY_ID, FormMode, NEW_WEBSITE_ID } from "../utils/constants";

export interface GlobalContextValue {
  categories: Category[];
  currentCategoryId: string;
  setCurrentCategoryId: (id: string) => void;
  websites: Website[];
  currentWebsiteId: string;
  setCurrentWebsiteId: (id: string) => void;
  selectedCategory: string;
  setCategories: (categories: Category[]) => void;
  setWebsites: (websites: Website[]) => void;
  setSelectedCategory: (categoryId: string) => void;
  filteredWebsites: Website[];
  settingsOpen: boolean;
  setSettingsOpen: (status: boolean) => void;
  firstTimeDialogOpen: boolean;
  setFirstTimeDialogOpen: (status: boolean) => void;
  helpDialogOpen: boolean;
  setHelpDialogOpen: (status: boolean) => void;
  websiteFormOpen: boolean;
  setWebsiteFormOpen: (status: boolean) => void;
  websiteFormMode: FormMode;
  setWebsiteFormMode: (mode: FormMode) => void;
  categoryFormOpen: boolean;
  setCategoryFormOpen: (status: boolean) => void;
  categoryFormMode: FormMode;
  setCategoryFormMode: (mode: FormMode) => void;
  findWebsite: (id: string) => Website | undefined;
  createWebsite: (website: Website) => void;
  updateWebsite: (id: string, updatedWebsite: Partial<Website>) => void;
  deleteWebsite: (id: string) => void;
  findCategory: (id: string) => Category | undefined;
  createCategory: (category: Category) => void;
  updateCategory: (id: string, updatedCategory: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
}

export const GlobalContext = createContext<GlobalContextValue>({
  categories: [],
  currentCategoryId: ALL_CATEGORY_ID,
  setCurrentCategoryId: () => {},
  websites: [],
  selectedCategory: ALL_CATEGORY_ID,
  setCategories: () => {},
  setWebsites: () => {},
  currentWebsiteId: NEW_WEBSITE_ID,
  setCurrentWebsiteId: () => {},
  setSelectedCategory: () => {},
  filteredWebsites: [],
  helpDialogOpen: false,
  setHelpDialogOpen: () => {},
  settingsOpen: false,
  setSettingsOpen: () => {},
  firstTimeDialogOpen: false,
  setFirstTimeDialogOpen: () => {},
  websiteFormOpen: false,
  setWebsiteFormOpen: () => {},
  websiteFormMode: DEFAULT_WEBSITE_FORM_MODE,
  setWebsiteFormMode: () => {},
  categoryFormOpen: false,
  setCategoryFormOpen: () => {},
  categoryFormMode: DEFAULT_CATEGORY_FORM_MODE,
  setCategoryFormMode: () => {},
  findWebsite: () => undefined,
  createWebsite: () => {},
  updateWebsite: () => {},
  deleteWebsite: () => {},
  findCategory: () => undefined,
  createCategory: () => {},
  updateCategory: () => {},
  deleteCategory: () => {},
});
