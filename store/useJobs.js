import { create } from "zustand";

export const useJobs = create((set) => ({
  jobs: [],
  setJobs: (jobs) => set({ jobs })
}));