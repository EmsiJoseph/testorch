import { computed, signal } from "@preact/signals-react"
import { ITestPlan } from "./interfaces/test-plan.interfaces"

export const addTestPlanFormIsSubmitting = signal(false)

export const createProjectFormSubmitting = signal(false)

export const projectId = signal<string | null>(null)

export const projectName = signal<string | null>(null)

export const step = signal(1)

export const gettingTests = signal(false)

export const tests = signal<ITestPlan[] | null>(null)