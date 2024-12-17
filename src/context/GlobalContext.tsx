import React, { createContext, useState, useMemo } from 'react';
import { Category } from '../domain/interfaces/Category.interface';
import { Website } from '../domain/interfaces/Website.interface';
import { DEFAULT_CATEGORIES, DEFAULT_CATEGORY_FORM_MODE, DEFAULT_WEBSITE_FORM_MODE, DEFAULT_WEBSITES } from './defaultValues';

interface GlobalContextValue {
    categories: Category[]
    websites: Website[]
    currentWebsiteId: string,
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
}

export const GlobalContext = createContext<GlobalContextValue>({
    categories: [],
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
});

export const GlobalContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
    const [websites, setWebsites] = useState<Website[]>(DEFAULT_WEBSITES);
    const [currentWebsiteId, setCurrentWebsiteId] = useState<string>("0");
    const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]?.id ?? "1");
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [firstTimeDialogOpen, setFirstTimeDialogOpen] = useState(false);
    const [websiteFormOpen, setWebsiteFormOpen] = useState(false);
    const [websiteFormMode, setWebsiteFormMode] = useState(DEFAULT_WEBSITE_FORM_MODE);
    const [categoryFormOpen, setCategoryFormOpen] = useState(false);
    const [categoryFormMode, setCategoryFormMode] = useState(DEFAULT_CATEGORY_FORM_MODE);

    // Memoize the filtered websites computation
    const filteredWebsites = useMemo(() => 
        selectedCategory !== "0"
            ? websites.filter(website => website.categoryId === selectedCategory)
            : websites,
        [selectedCategory, websites]
    );

    const findWebsite = (id: string): Website | undefined => {
        return websites.find((website) => website.id === id);
    };
    
    

    const createWebsite = (website: Website) => {
        setWebsites((prevWebsites) => [...prevWebsites, website]);
    };

    const updateWebsite = (id: string, updatedWebsite: Partial<Website>) => {
        setWebsites((prevWebsites) =>
            prevWebsites.map((website) =>
                website.id === id ? { ...website, ...updatedWebsite } : website
            )
        );
    };

    const deleteWebsite = (id: string) => {
        setWebsites((prevWebsites) => prevWebsites.filter((website) => website.id !== id));
    };



    // Memoize the context value
    const contextValue = useMemo(
        () => ({
            categories,
            websites,
            currentWebsiteId,
            setCategories,
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
        }),
        [
            categories,
            websites,
            currentWebsiteId,
            selectedCategory,
            filteredWebsites,
            settingsOpen,
            firstTimeDialogOpen,
            websiteFormOpen,
            websiteFormMode,
            categoryFormOpen,
            categoryFormMode,
            currentWebsiteId,
        ]
    );

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );
};