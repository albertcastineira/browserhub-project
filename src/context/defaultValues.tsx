import { Category } from "../domain/interfaces/Category.interface";
import { Website } from "../domain/interfaces/Website.interface";

export const DEFAULT_CATEGORIES = [
    { id: "0", name: "All websites" },
    { id: "1", name: "Social Media" },
    { id: "2", name: "Entertainment" },
    { id: "3", name: "Tools" },
    { id: "4", name: "Education" },
    { id: "5", name: "News" },
    { id: "6", name: "Shopping" },
    { id: "7", name: "Technology" },
];

export const DEFAULT_WEBSITES = [
    // Social Media
    { id: "1", categoryId: "1", name: "Facebook", url: "https://www.facebook.com/" },
    { id: "2", categoryId: "1", name: "Instagram", url: "https://www.instagram.com/" },
    { id: "3", categoryId: "1", name: "LinkedIn", url: "https://www.linkedin.com/" },
    { id: "4", categoryId: "1", name: "TikTok", url: "https://www.tiktok.com/" },

    // Entertainment
    { id: "5", categoryId: "2", name: "YouTube", url: "https://www.youtube.com/" },
    { id: "6", categoryId: "2", name: "Netflix", url: "https://www.netflix.com/" },
    { id: "7", categoryId: "2", name: "Spotify", url: "https://www.spotify.com/" },
    { id: "8", categoryId: "2", name: "Twitch", url: "https://www.twitch.tv/" },

    // Tools
    { id: "9", categoryId: "3", name: "GitHub", url: "https://github.com/" },
    { id: "10", categoryId: "3", name: "Google Drive", url: "https://drive.google.com/" },
    { id: "11", categoryId: "3", name: "Trello", url: "https://trello.com/" },
    { id: "12", categoryId: "3", name: "Notion", url: "https://www.notion.so/" },

    // Education
    { id: "13", categoryId: "4", name: "Khan Academy", url: "https://www.khanacademy.org/" },
    { id: "14", categoryId: "4", name: "Coursera", url: "https://www.coursera.org/" },
    { id: "15", categoryId: "4", name: "edX", url: "https://www.edx.org/" },
    { id: "16", categoryId: "4", name: "Duolingo", url: "https://www.duolingo.com/" },

    // News
    { id: "17", categoryId: "5", name: "BBC", url: "https://www.bbc.com/" },
    { id: "18", categoryId: "5", name: "CNN", url: "https://www.cnn.com/" },
    { id: "19", categoryId: "5", name: "The Guardian", url: "https://www.theguardian.com/" },
    { id: "20", categoryId: "5", name: "Reuters", url: "https://www.reuters.com/" },

    // Shopping
    { id: "21", categoryId: "6", name: "Amazon", url: "https://www.amazon.com/" },
    { id: "22", categoryId: "6", name: "eBay", url: "https://www.ebay.com/" },
    { id: "23", categoryId: "6", name: "Etsy", url: "https://www.etsy.com/" },
    { id: "24", categoryId: "6", name: "AliExpress", url: "https://www.aliexpress.com/" },

    // Technology
    { id: "25", categoryId: "7", name: "TechCrunch", url: "https://techcrunch.com/" },
    { id: "26", categoryId: "7", name: "Wired", url: "https://www.wired.com/" },
    { id: "27", categoryId: "7", name: "Ars Technica", url: "https://arstechnica.com/" },
    { id: "28", categoryId: "7", name: "The Verge", url: "https://www.theverge.com/" },
];

export const DEFAULT_WEBSITE_FORM_MODE = "Create";
export const DEFAULT_CATEGORY_FORM_MODE = "Create";

export const EMPTY_WEBSITE: Website = {
    id: "",
    name: "",
    url: "",
    categoryId: "",
};

export const EMPTY_CATEGORY: Category = {
    id: "",
    name: "",
};
