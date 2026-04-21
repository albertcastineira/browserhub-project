const APP_NAME: string = "BROWSER_HUB";
export const CURRENT_VERSION_APP = "2.0";
export const CURRENT_VERSION_DATE_RELEASE = "21/04/2026";

export const ALL_CATEGORY_ID = "0";
export const NEW_WEBSITE_ID = "0";
export const DEFAULT_SELECTED_CATEGORY_ID = "1";

export const FORM_MODES = {
  CREATE: "Create",
  EDIT: "Edit",
} as const;

export type FormMode = (typeof FORM_MODES)[keyof typeof FORM_MODES];

export const SEARCH_TYPES = {
  DEFAULT: "Default",
  IMAGES: "Images",
  VIDEOS: "Videos",
  MAPS: "Maps",
  NEWS: "News",
} as const;

export type SearchType = (typeof SEARCH_TYPES)[keyof typeof SEARCH_TYPES];

export const LOCAL_STORAGE_KEYS: {
  APP: typeof APP_NAME;
  THEME_COLOR: `${typeof APP_NAME}.THEME_COLOR`;
  THEME_MODE: `${typeof APP_NAME}.THEME_MODE`;
  SHOW_ICONS_THEME_SETTING: `${typeof APP_NAME}.SHOW_ICONS_THEME_SETTING`;
  RELEASE_VERSION: `${typeof APP_NAME}.RELEASE_VERSION`;
  STORED_DATA: `${typeof APP_NAME}.STORED_DATA`;
} = {
  APP: APP_NAME,
  THEME_COLOR: `${APP_NAME}.THEME_COLOR`,
  THEME_MODE: `${APP_NAME}.THEME_MODE`,
  SHOW_ICONS_THEME_SETTING: `${APP_NAME}.SHOW_ICONS_THEME_SETTING`,
  RELEASE_VERSION: `${APP_NAME}.RELEASE_VERSION`,
  STORED_DATA: `${APP_NAME}.STORED_DATA`,
};
