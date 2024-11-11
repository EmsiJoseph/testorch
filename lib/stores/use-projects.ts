import { create } from "zustand"
import { persist } from "zustand/middleware"

import { IProject } from "../interfaces/project.interfaces"
import { formatFriendlyDate } from "../utils/date-utils"

interface ProjectsState {
  projects: IProject[]
  addProject: (project: IProject) => void
  removeProject: (id: string) => void
  findProjectByName: (name: string) => IProject | undefined
  findProjectById: (id: string) => IProject | undefined
  addProjects: (projects: IProject[]) => void // New method to add multiple projects
  getAllProjects: () => IProject[] // New method to get all projects
  selectProject: (project: IProject) => void
  selectedProject: IProject | undefined
}

export const useProjectsStore = create<ProjectsState>()(
  persist(
    (set, get) => ({
      projects: [],
      addProject: (project) =>
        set((state) => {
          if (state.projects.some((p) => p.id === project.id)) {
            return state
          }
          return {
            projects: [
              ...state.projects,
              {
                ...project,
                recentTestPlan: project.recentTestPlan.map((plan) => ({
                  ...plan,
                  created_at: formatFriendlyDate(plan.created_at),
                })),
              },
            ],
          }
        }),
      removeProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((project) => project.id !== id),
        })),
      findProjectByName: (name) =>
        get().projects.find((project) => project.name === name),
      findProjectById: (id) =>
        get().projects.find((project) => project.id === id),
      addProjects: (projects) =>
        set((state) => {
          const newProjects = projects.filter(
            (proj) => !state.projects.some((p) => p.id === proj.id)
          )
          return {
            projects: [
              ...state.projects,
              ...newProjects.map((proj) => ({
                ...proj,
                recentTestPlan: proj.recentTestPlan.map((plan) => ({
                  ...plan,
                  created_at: formatFriendlyDate(plan.created_at),
                })),
              })),
            ],
          }
        }),
      getAllProjects: () => get().projects,
      selectProject: (project) => set(() => ({ selectedProject: project })),
      selectedProject: undefined,
    }),
    {
      name: "projects-storage", // name of the item in the storage (must be unique)
    }
  )
)
