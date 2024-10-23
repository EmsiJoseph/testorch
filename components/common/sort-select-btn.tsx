"use client"

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useState} from "react";

export default function SortSelectBtn() {
    const [value, setValue] = useState("name");

    return (
        <Select value={value} onValueChange={(val) => setValue(val)}>
            <SelectTrigger className="w-[180px] dark:bg-neutral-950">
                <SelectValue placeholder="Sort by"/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="name">Sort by name</SelectItem>
                <SelectItem value="activity">Sort by activity</SelectItem>
                <SelectItem value="status">Sort by status</SelectItem>
            </SelectContent>
        </Select>
    );
}
