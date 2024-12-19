import React, { createContext, useState, useMemo } from 'react';
import { Category } from '../domain/interfaces/Category.interface';
import { Website } from '../domain/interfaces/Website.interface';
import { DEFAULT_CATEGORIES, DEFAULT_CATEGORY_FORM_MODE, DEFAULT_WEBSITE_FORM_MODE, DEFAULT_WEBSITES } from './defaultValues';
import { LOCAL_STORAGE_KEYS } from '../utils/constants';

interface GlobalContextValue {
    categories: Category[]
    currentCategoryId: string
    setCurrentCategoryId: (id: string) => void,
    websites: Website[]
    currentWebsiteId: string
    setCurrentWebsiteId: (id: string) => void,
    selectedCategory: string
    setCategories: (categories: Category[]) => void
    setWebsites: (websites: Website[]) => void
    setSelectedCategory: (categoryId: string) => void
    filteredWebsites: Website[]
    settingsOpen: boolean
    setSettingsOpen: (status: boolean) => void
    firstTimeDialogOpen: boolean
    setFirstTimeDialogOpen: (status: boolean) => void
    websiteFormOpen: boolean
    setWebsiteFormOpen: (status: boolean) => void
    websiteFormMode: string
    setWebsiteFormMode: (mode: string) => void
    categoryFormOpen: boolean
    setCategoryFormOpen: (status: boolean) => void
    categoryFormMode: string
    setCategoryFormMode: (mode: string) => void
    findWebsite: (id: string) => Website | undefined;
    createWebsite: (website: Website) => void
    updateWebsite: (id: string, updatedWebsite: Partial<Website>) => void
    deleteWebsite: (id: string) => void
    findCategory: (id: string) => Category | undefined;
    createCategory: (category: Category) => void
    updateCategory: (id: string, updatedCategory: Partial<Category>) => void
    deleteCategory: (id: string) => void
}

export const GlobalContext = createContext<GlobalContextValue>({
    categories: [],
    currentCategoryId: "0",
    setCurrentCategoryId: () => {},
    websites: [],
    selectedCategory: "0",
    setCategories: () => {},
    setWebsites: () => {},
    currentWebsiteId: "0",
    setCurrentWebsiteId: () => {},
    setSelectedCategory: () => {},
    filteredWebsites: [],
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


export const GlobalContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    let defaultCategoriesValue = DEFAULT_CATEGORIES;
    let defaultWebsitesValue = DEFAULT_WEBSITES;

    try {
        if(LOCAL_STORAGE_KEYS.STORED_DATA in localStorage) {
            defaultCategoriesValue = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.STORED_DATA) || "{}").categories;
            defaultWebsitesValue = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.STORED_DATA) || "{}").websites;
        }
    } catch (error) {
        console.error("Error parsing JSON from localStorage", error);
    }


    const [categories, setCategories] = useState<Category[]>(defaultCategoriesValue);
    const [currentCategoryId, setCurrentCategoryId] = useState<string>("");
    const [websites, setWebsites] = useState<Website[]>(defaultWebsitesValue);
    const [currentWebsiteId, setCurrentWebsiteId] = useState<string>("0");
    const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]?.id ?? "1");
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [firstTimeDialogOpen, setFirstTimeDialogOpen] = useState(false);
    const [websiteFormOpen, setWebsiteFormOpen] = useState(false);
    const [websiteFormMode, setWebsiteFormMode] = useState(DEFAULT_WEBSITE_FORM_MODE);
    const [categoryFormOpen, setCategoryFormOpen] = useState(false);
    const [categoryFormMode, setCategoryFormMode] = useState(DEFAULT_CATEGORY_FORM_MODE);

    const filteredWebsites = useMemo(() => 
        selectedCategory !== "0"
            ? websites.filter(website => website.categoryId === selectedCategory)
            : websites,
        [selectedCategory, websites]
    );

    
    // Websites
    const findWebsite = (id: string): Website | undefined => {
        return websites.find((website) => website.id === id);
    };

    const createWebsite = (website: Website) => {
        setWebsites((prevWebsites) => [...prevWebsites, website]);
        storeOnLocalStorageAsJSON();
    };

    const updateWebsite = (id: string, updatedWebsite: Partial<Website>) => {
        setWebsites((prevWebsites) =>
            prevWebsites.map((website) =>
                website.id === id ? { ...website, ...updatedWebsite } : website
            )
        );
        storeOnLocalStorageAsJSON();
    };

    const deleteWebsite = (id: string) => {
        setWebsites((prevWebsites) => prevWebsites.filter((website) => website.id !== id));
        storeOnLocalStorageAsJSON();
    };

    // Categories
    const findCategory = (id: string): Category | undefined => {
        return categories.find((category) => category.id === id);
    }

    const createCategory = (category: Category) => {
        setCategories((prevCategories) => [...prevCategories, category]);
        storeOnLocalStorageAsJSON();
    }

    const updateCategory = (id: string, updatedCategory: Partial<Category>) => {
        setCategories((prevCategories) =>
            prevCategories.map((category) =>
                category.id === id ? { ...category, ...updatedCategory } : category
            )
        );
        storeOnLocalStorageAsJSON();
    }

    const deleteCategory = (id: string) =>  {
        setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
        storeOnLocalStorageAsJSON();
    }

    const storeOnLocalStorageAsJSON = () => {
        localStorage.setItem(LOCAL_STORAGE_KEYS.STORED_DATA, JSON.stringify({ categories, websites }));
    }



    // Memoize the context value
    const contextValue = useMemo(
        () => ({
            categories,
            currentCategoryId,
            websites,
            currentWebsiteId,
            setCategories,
            setCurrentCategoryId,
            setWebsites,
            setCurrentWebsiteId,
            selectedCategory,
            setSelectedCategory,
            filteredWebsites,
            settingsOpen,
            setSettingsOpen,
            firstTimeDialogOpen,
            setFirstTimeDialogOpen,
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
            selectedCategory,
            filteredWebsites,
            settingsOpen,
            firstTimeDialogOpen,
            websiteFormOpen,
            websiteFormMode,
            categoryFormOpen,
            categoryFormMode,
        ]
    );

    localStorage.setItem(LOCAL_STORAGE_KEYS.STORED_DATA, JSON.stringify({ categories, websites }));

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );
};
