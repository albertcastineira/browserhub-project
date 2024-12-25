import { Category } from "../domain/interfaces/Category.interface";
import { Website } from "../domain/interfaces/Website.interface";

export const DEFAULT_CATEGORIES = [
    { id: "0", name: "All websites" },
    { id: "1", name: "Social Media" },
    { id: "2", name: "Entertainment" },
    { id: "3", name: "Tools" },
    { id: "6", name: "Shopping" },
];

export const DEFAULT_WEBSITES = [
    // Social Media
    { id: "1", categoryId: "1", name: "Instagram", url: "https://www.instagram.com/" },
    { id: "2", categoryId: "1", name: "X", url: "https://x.com/home" },
    { id: "3", categoryId: "1", name: "TikTok", url: "https://www.tiktok.com/" },
    { id: "4", categoryId: "1", name: "Threads", url: "https://www.threads.net/" },
    { id: "5", categoryId: "1", name: "Pinterest", url: "https://es.pinterest.com/" },
    { id: "6", categoryId: "1", name: "Reddit", url: "https://www.reddit.com/" },

    // Entertainment
    { id: "7", categoryId: "2", name: "Netflix", url: "https://www.netflix.com/" },
    { id: "8", categoryId: "2", name: "Spotify", url: "https://www.spotify.com/" },
    { id: "9", categoryId: "2", name: "YouTube", url: "https://www.youtube.com/" },
    { id: "10", categoryId: "2", name: "Twitch", url: "https://www.twitch.tv/" },
    { id: "11", categoryId: "2", name: "Prime Video", url: "https://www.primevideo.com/" },
    { id: "12", categoryId: "2", name: "HBO", url: "https://www.hbo.com/" },
    { id: "13", categoryId: "2", name: "Disney+", url: "https://www.disneyplus.com/" },

    // Tools
    { id: "14", categoryId: "3", name: "ChatGPT", url: "https://chatgpt.com/" },
    { id: "15", categoryId: "3", name: "ClaudeAI", url: "https://claude.ai/new" },
    { id: "16", categoryId: "3", name: "Gmail", url: "https://mail.google.com/" },
    { id: "17", categoryId: "3", name: "Drive", url: "https://drive.google.com/" },
    { id: "18", categoryId: "3", name: "Calendar", url: "https://calendar.google.com/" },
    { id: "19", categoryId: "3", name: "Docs", url: "https://docs.google.com/" },
    { id: "20", categoryId: "3", name: "Sheets", url: "https://sheets.google.com/" },
    { id: "21", categoryId: "3", name: "Figma", url: "https://www.figma.com/" },

    // Shopping
    { id: "22", categoryId: "6", name: "Amazon", url: "https://www.amazon.com/" },
    { id: "23", categoryId: "6", name: "eBay", url: "https://www.ebay.com/" },
    { id: "24", categoryId: "6", name: "AliExpress", url: "https://www.aliexpress.com/" },
    { id: "25", categoryId: "6", name: "Wish", url: "https://www.wish.com/" },
    { id: "26", categoryId: "6", name: "MercadoLibre", url: "https://www.mercadolibre.com/" },
    { id: "27", categoryId: "6", name: "Wallapop", url: "https://es.wallapop.com/" },
    { id: "28", categoryId: "6", name: "Etsy", url: "https://www.etsy.com/" },
    { id: "29", categoryId: "6", name: "Zara", url: "https://www.zara.com/" },
    { id: "30", categoryId: "6", name: "H&M", url: "https://www2.hm.com/" },
    { id: "31", categoryId: "6", name: "Bershka", url: "https://www.bershka.com/" },
    { id: "32", categoryId: "6", name: "Pull&Bear", url: "https://www.pullandbear.com/" },
    { id: "33", categoryId: "6", name: "PCComponentes", url: "https://www.pccomponentes.com/" },

    
    


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
