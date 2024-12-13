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