import React, { createContext, useState } from 'react';
import { Category } from '../domain/interfaces/Category.interface';
import { Website } from '../domain/interfaces/Website.interface';
import { DEFAULT_CATEGORIES, DEFAULT_WEBSITES } from './defaultValues';

// Define the shape of the context value
interface GlobalContextValue {
    categories: Category[];
    websites: Website[];
    selectedCategory: string;
    setSelectedCategory: (categoryId: string) => void;
    filteredWebsites: Website[];
}

export const GlobalContext = createContext<GlobalContextValue>({
    categories: [],
    websites: [],
    selectedCategory: "0",
    setSelectedCategory: () => {},
    filteredWebsites: []
});

export const GlobalContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);

    const [websites, setWebsites] = useState<Website[]>(DEFAULT_WEBSITES);

    // Initialize selectedCategory with the ID from the first category
    const [selectedCategory, setSelectedCategory] = useState<string>(categories[0].id ?? "1"); // Use nullish coalescing operator to handle undefined case

    // Filter websites based on the selected category's id, only if selectedCategory is greater than 0
    const filteredWebsites =
        selectedCategory !== "0"
            ? websites.filter(website => website.categoryId === selectedCategory)
            : websites;

    // Context value to be passed to the provider
    const contextValue: GlobalContextValue = {
        categories,
        websites,
        selectedCategory,
        setSelectedCategory,
        filteredWebsites,
    };

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );
};
