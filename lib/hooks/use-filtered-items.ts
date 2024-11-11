import { useState } from "react"

export default function useFilteredItems<T>(
  items: T[] | undefined,
  filterFn: (item: T, query: string) => boolean
) {
  const [filteredItems, setFilteredItems] = useState(items)
  const [query, setQuery] = useState("")
  
  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    const lowerCaseQuery = searchQuery.toLowerCase()
    const filtered = items?.filter((item) => filterFn(item, lowerCaseQuery))
    setFilteredItems(filtered)
  }

  return { filteredItems, handleSearch, query }
}
