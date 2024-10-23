import { useState } from "react";

export default function useFilteredItems<T>(items: T[], filterFn: (item: T, query: string) => boolean) {
    const [filteredItems, setFilteredItems] = useState(items);

    const handleSearch = (query: string) => {
        const lowerCaseQuery = query.toLowerCase();
        const filtered = items.filter(item => filterFn(item, lowerCaseQuery));
        setFilteredItems(filtered);
    };

    return { filteredItems, handleSearch };
}
