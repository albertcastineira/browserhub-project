import { LOCAL_STORAGE_KEYS } from "./constants";

export const getBrandFromUrl = (url: string): string => {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;
    const parts = hostname.split(".");
    let brand: string;

    if (parts.length >= 2) {
      if (parts[0] === "www") {
        brand = parts[1];
      } else {
        brand = parts[0];
      }
    } else {
      brand = hostname;
    }

    return `simple-icons:${brand}`;
  } catch (error) {
    console.error("Invalid URL:", error);
    return "material-symbols:language";
  }
};

export const normalizeExternalUrl = (rawUrl: string): string | null => {
  const value = rawUrl.trim();

  if (!value) {
    return null;
  }

  // If no protocol is provided, default to https for external navigation.
  const withProtocol = /^[a-zA-Z][a-zA-Z\d+.-]*:/.test(value)
    ? value
    : `https://${value}`;

  try {
    const parsed = new URL(withProtocol);

    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.toString();
    }

    return null;
  } catch {
    return null;
  }
};

export const getNextSequentialId = (items: Array<{ id: string }>): string => {
  const maxId = items.reduce((currentMax, item) => {
    const numericId = Number.parseInt(item.id, 10);
    return Number.isNaN(numericId)
      ? currentMax
      : Math.max(currentMax, numericId);
  }, 0);

  return String(maxId + 1);
};

export const openExternalUrlInNewTab = (rawUrl: string): boolean => {
  const url = normalizeExternalUrl(rawUrl);

  if (!url) {
    console.warn("Invalid external URL:", rawUrl);
    return false;
  }

  const popup = window.open(url, "_blank", "noopener,noreferrer");

  if (popup) {
    popup.opener = null;
    return true;
  }

  // Fallback when popup blockers prevent window.open.
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  anchor.click();
  return true;
};

export const downloadStoredBrowserData = (): void => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEYS.STORED_DATA);

  const filename = "BrowserHub-StoredData.json";

  if (!data) {
    console.error(`No data found for key: ${LOCAL_STORAGE_KEYS.STORED_DATA}`);
    return;
  }

  try {
    const jsonData = JSON.parse(data);
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
      type: "application/json",
    });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    console.log(`File ${filename} downloaded successfully.`);
  } catch (error) {
    console.error("Error parsing JSON data:", error);
  }
};

export const loadStoredBrowserData = (file: File): void => {
  const reader = new FileReader();

  reader.onload = (event) => {
    const data = event.target?.result as string;

    try {
      const jsonData = JSON.parse(data);
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.STORED_DATA,
        JSON.stringify(jsonData),
      );
      console.log("Data loaded successfully.");
    } catch (error) {
      console.error("Error parsing JSON data:", error);
    }
  };

  reader.readAsText(file);
};
