"use client"

import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {GridIcon, ListIcon} from "lucide-react";
import {useCallback} from "react";
import {useRouter} from "nextjs-toploader/app";
import {updateURLParams} from "@/lib/update-url-params";

export default function ViewToggle() {
    const router = useRouter();

    const handleViewToggle = useCallback((view: string) => {
        const newUrl = updateURLParams({view: view});
        router.push(newUrl);
    }, [router]);

    return (
        <Tabs defaultValue="grid">
            <TabsList className="bg-field dark:bg-neutral-950 h-10 border border-muted/100">
                <TabsTrigger value="grid" onClick={() => handleViewToggle("grid")}><GridIcon
                    className="h-4 w-4"/></TabsTrigger>
                <TabsTrigger value="list" onClick={() => handleViewToggle("list")}><ListIcon
                    className="h-4 w-4"/></TabsTrigger>
            </TabsList>
        </Tabs>
    )
}




