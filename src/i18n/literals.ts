import { FormMode, SearchType } from "../utils/constants";

export const UI_LITERALS = {
  common: {
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    close: "Close",
    help: "Help",
    settings: "Settings",
  },
  sidebar: {
    appNamePrimary: "Browser",
    appNameSecondary: "Hub",
    newCategory: "New category",
  },
  category: {
    title: "Categories",
    dialogTitle: (mode: FormMode) => `${mode} category`,
    placeholder: "My Category",
  },
  website: {
    dialogTitle: (mode: FormMode) => `${mode} Website`,
    placeholderName: "My Website",
    placeholderUrl: "https://my-website.url.com/",
    selectCategoryPlaceholder: "Select a Category",
    emptyState: "No websites found.",
    createButton: "Website",
  },
  search: {
    placeholder: (searchType: SearchType) => `${searchType} search ...`,
    ariaLabel: (searchType: SearchType) => `search google ${searchType}`,
  },
  firstTime: {
    title: "Welcome to BrowserHub",
    versionPrefix: "Version",
    patchNotesTitle: "New in this patch",
    patchSummary:
      "This release improves category consistency, UI coherence, and stability in core interactions.",
    patchChanges: [
      "Improved category filtering behavior and duplicate handling.",
      "Centralized UI literals for easier text maintenance.",
      "Improved external link opening reliability in production.",
    ],
    description:
      "BrowserHub is a web application that allows you to save your favorite websites and access them easily. You can create, edit and delete categories and websites. To edit or delete just right click on the category or website.",
    themeHint:
      "You can customize the theme and the main color of the application in the settings tab.",
    authorPrefix: "This application was created and developed by",
  },
  settings: {
    title: "Settings",
    themeSectionTitle: "Theme",
    toggleDarkMode: "Toggle dark mode:",
    selectTheme: "Select your theme:",
    manageDataSectionTitle: "Manage data",
    import: "Import",
    export: "Export",
    dangerZone: "Danger zone",
    resetData: "Reset data to default",
  },
  help: {
    title: "Help",
    sections: {
      searchbarTitle: "Searchbar",
      searchbarText:
        "On the top of the screen there is a searchbar where you can search on google using a selected option. There are 5 options: normal search, images, videos, news and maps.",
      categoriesTitle: "Categories",
      categoriesText:
        'On the left sidebar there is a list of categories. You can create, edit and delete categories by right clicking on them. The only category that cannot be deleted is the "All categories" category.',
      websitesTitle: "Websites",
      websitesText:
        "On the bottom right corner of the screen there is a button to add a new website. You can also edit and delete websites by right clicking on them.",
      themeTitle: "Theme and customization",
      themeText:
        "On the settings tab you can change the main color theme and the theme mode (light or dark).",
      persistenceTitle: "Data persistence",
      persistenceText:
        "BrowserHub uses localStorage for data persistence. This means that your data will be saved on your browser and will be available even if you close the tab or the browser. If you need to manage your data you can go to the settings tab and export, import or restore the data.",
    },
  },
} as const;
