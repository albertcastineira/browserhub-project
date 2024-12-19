import { LOCAL_STORAGE_KEYS } from "./constants";

export const getBrandFromUrl = (url: string): string => {
    try {
        const parsedUrl = new URL(url);
        const hostname = parsedUrl.hostname;
        const parts = hostname.split('.');
        let brand: string;

        if (parts.length >= 2) {
            if (parts[0] === 'www') {
                brand = parts[1];
            } else {
                brand = parts[0];
            }
        } else {
            brand = hostname;
        }

        return `simple-icons:${brand}`;
    } catch (error) {
        console.error('Invalid URL:', error);
        return 'material-symbols:language';
    }
};

export const downloadStoredBrowserData = (): void => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEYS.STORED_DATA);

    const filename = 'BrowserHub-StoredData.json';

    if (!data) {
        console.error(`No data found for key: ${LOCAL_STORAGE_KEYS.STORED_DATA}`);
        return;
    }

    try {
        const jsonData = JSON.parse(data);
        const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = filename;

        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        console.log(`File ${filename} downloaded successfully.`);
    } catch (error) {
        console.error('Error parsing JSON data:', error);
    }
}

export const loadStoredBrowserData = (file: File): void => {
    const reader = new FileReader();

    reader.onload = (event) => {
        const data = event.target?.result as string;

        try {
            const jsonData = JSON.parse(data);
            localStorage.setItem(LOCAL_STORAGE_KEYS.STORED_DATA, JSON.stringify(jsonData));
            console.log('Data loaded successfully.');
        } catch (error) {
            console.error('Error parsing JSON data:', error);
        }
    }

    reader.readAsText(file);
}