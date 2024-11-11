import { create } from "zustand"
import { persist } from "zustand/middleware"

import { ITestPlan } from "../interfaces/test-plan.interfaces"
import { formatFriendlyDate } from "../utils/date-utils"

interface TestPlanState {
  testPlans: ITestPlan[]
  addTestPlan: (testPlan: ITestPlan) => void
  removeTestPlan: (id: string) => void
  findProjectByName: (name: string) => ITestPlan | undefined
  findProjectById: (id: string) => ITestPlan | undefined
  addTestPlans: (testPlans: ITestPlan[]) => void // New method to add multiple projects
  getAllTestPlans: () => ITestPlan[] // New method to get all projects
  selectTestPlan: (testPlan: ITestPlan) => void
  selectedTestPlan: ITestPlan | undefined
}

export const useTestPlansStore = create<TestPlanState>()(
  persist(
    (set, get) => ({
      testPlans: [],
      addTestPlan: (testPlan) => set(() => ({
        testPlans: [{ ...testPlan, created_at: formatFriendlyDate(testPlan.created_at) }]
      })),
      removeTestPlan: (id) =>
        set((state) => ({
          testPlans: state.testPlans.filter((plan) => plan.id !== id),
        })),
      findProjectByName: (name: string) =>
        get().testPlans.find((plan) => plan.name === name),
      findProjectById: (id: string) =>
        get().testPlans.find((plan: ITestPlan) => plan.id === id),
      addTestPlans: (testPlans) => set(() => ({
        testPlans: testPlans.map(plan => ({ ...plan, created_at: formatFriendlyDate(plan.created_at) }))
      })),
      getAllTestPlans: () => get().testPlans,
      selectTestPlan: (testPlan) => set(() => ({ selectedTestPlan: testPlan })),
      selectedTestPlan: undefined,
    }),
    {
      name: "test-plans-storage", // unique name for the storage
    }
  )
)
