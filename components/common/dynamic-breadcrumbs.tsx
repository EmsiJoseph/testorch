"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { useRouter } from "nextjs-toploader/app"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb"

export default function DynamicBreadcrumbsComponent() {
    const router = useRouter()
    const pathName = usePathname()
    const pathSegments = pathName.split("/").filter((segment) => segment)

    const handleBreadcrumbClick = (url: string) => {
        router.push(url)
    }

    const formatSegment = (segment: string) => {
        const decodedSegment = decodeURIComponent(segment)
        if (decodedSegment.includes("-")) {
            return decodedSegment
                .split("-")
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
        } else {
            return decodedSegment.charAt(0).toUpperCase() + decodedSegment.slice(1)
        }
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {pathSegments.map((segment, index) => {
                    const url = "/" + pathSegments.slice(0, index + 1).join("/")
                    const isLast = index === pathSegments.length - 1
                    return (
                        <React.Fragment key={url}>
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage>
                                        {formatSegment(segment)}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink
                                        className="cursor-pointer"
                                        onClick={() => handleBreadcrumbClick(url)}
                                    >
                                        {formatSegment(segment)}
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                            {!isLast && <BreadcrumbSeparator />}
                        </React.Fragment>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
