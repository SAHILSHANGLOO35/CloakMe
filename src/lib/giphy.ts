import axios from "axios";

export interface GiphyImage {
    id: string;
    title: string;
    url: string;
    preview: string;
}

export async function searchGifs(
    query: string = "",
    limit: number = 20
): Promise<GiphyImage[]> {
    const apiKey = process.env.NEXT_PUBLIC_GIPHY_API_KEY;

    if (!apiKey) {
        console.error("Giphy API key is missing!");
        return [];
    }

    const endpoint = query
        ? `https://api.giphy.com/v1/gifs/search`
        : `https://api.giphy.com/v1/gifs/trending`;

    try {
        const response = await axios.get(endpoint, {
            params: {
                api_key: apiKey,
                q: query || undefined,
                limit: limit,
            },
        });

        return response.data.data.map((gif: { id: string; title: string; images: any }) => ({
            id: gif.id,
            title: gif.title || "Untitled GIF",
            url: gif.images.original.url,
            preview: gif.images.fixed_height_small.url,
        }));
    } catch (error) {
        console.error("Error fetching GIFs:", error);
        return [];
    }
}
