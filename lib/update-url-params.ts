export const updateURLParams = (params: { [key: string]: any }) => {
    const searchParams = new URLSearchParams(window.location.search);

    // Loop through each param and update or add it to the URL
    for (const [key, value] of Object.entries(params)) {
        if (value) {
            searchParams.set(key, value);
        } else {
            searchParams.delete(key); // Remove the param if value is null or undefined
        }
    }

    return `${window.location.pathname}?${searchParams.toString()}`;

};
