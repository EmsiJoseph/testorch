import {SearchBar} from "@/components/common/search-bar";
import SortSelectBtn from "@/components/common/sort-select-btn";
import ViewToggle from "@/components/common/view-toggle";
import AddNewDropdownBtn from "@/components/common/add-new-dropdown-btn";

export default function SearchAndControls({handleSearch, placeholder}: { handleSearch: (query: string) => void, placeholder: string }) {
    return (
        <div className="flex justify-between items-center mb-6 space-x-2">
            <SearchBar onSearchChange={handleSearch}
                       placeholder={placeholder || "Search..."}/>
            <SortSelectBtn/>
            <ViewToggle/>
        </div>
    )
}