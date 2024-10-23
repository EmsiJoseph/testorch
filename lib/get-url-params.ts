import { useSearchParams } from "next/navigation";

export const getUrlParams = () => {
    const searchParams = useSearchParams();

    const sortBy = searchParams.get("sort") || "name";
    const view = searchParams.get("view") || "grid";
    const search = searchParams.get("q") || "";

    return { sortBy, view, search };
};
