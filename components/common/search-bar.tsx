import {useSearch} from "@/lib/stores/use-search";
import {useCallback} from "react";
import {SearchIcon} from "lucide-react";
import {Input} from "@/components/ui/input";

"use-client";

interface SearchBarProps {
    onSearchChange?: (query: string) => void;
    searchQuery?: string;
    placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({onSearchChange, placeholder}) => {
    const {searchQuery, setSearchQuery} = useSearch();

    const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
        onSearchChange?.(query);
    }, [onSearchChange, setSearchQuery]);

    const handleSearchKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && onSearchChange) {
            onSearchChange(searchQuery);
        }
    }, [searchQuery, onSearchChange]);


    return (
        <div className="relative w-full">
            {/* Icon inside input */}
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon className="h-4 w-4 text-muted-foreground"/>
            </span>
            {/* Input field */}
            <Input
                type="search"
                placeholder={placeholder || "Search"}
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleSearchKeyDown}
                className="pl-10"
            />
        </div>
    );
};
