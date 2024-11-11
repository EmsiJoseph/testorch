"use client"

import { Check } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils/utils"
import React from "react"

const stepVariants = cva(
  "flex h-10 w-10 items-center justify-center rounded-full text-md font-medium transition-colors",
  {
    variants: {
      state: {
        inactive: "border-2 border-muted bg-background text-muted-foreground",
        active: "border-2 border-primary bg-primary text-primary-foreground",
        complete: "bg-primary text-primary-foreground",
      },
    },
    defaultVariants: {
      state: "inactive",
    },
  }
)

const connectorVariants = cva("h-1 w-16 transition-colors", {
  variants: {
    state: {
      inactive: "bg-muted",
      active: "bg-primary",
    },
  },
  defaultVariants: {
    state: "inactive",
  },
})

interface ProgressIndicatorProps extends VariantProps<typeof stepVariants> {
  currentStep: number
  steps: string[]
  className?: string
}

export default function ProgressIndicator({
  currentStep,
  steps,
  className,
}: ProgressIndicatorProps) {
  return (
    <div className={cn("flex items-center justify-center space-x-2 mb-16 ", className)}>
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center">
            <div
              className={stepVariants({
                state:
                  index + 1 < currentStep
                    ? "complete"
                    : index + 1 === currentStep
                    ? "active"
                    : "inactive",
              })}
            >
              {index + 1 < currentStep ? (
                <Check className="h-5 w-5" />
              ) : (
                index + 1
              )}
            </div>
            <span className="mt-2 text-md">{step}</span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={connectorVariants({
                state: index + 1 < currentStep ? "active" : "inactive",
              })}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}