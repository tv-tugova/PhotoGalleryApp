import { useState } from "react";

export const useHttp = () => {
    const [loading, setLoading] = useState(false);

    const request = async (url) => {
        const apiToken = '-bigYuGfJdYDoBmgBO7RLC5ikc8A1-wB';

        setLoading(true);

        let response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${apiToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        const data = await response.json();

        setLoading(false);
        return data;
    }
    
    return {loading, request};
}