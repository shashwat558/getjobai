import { create } from "zustand";

export const useJobs = create((set) => ({
  jobs: [],
  setJobs: (jobs) => set({ jobs })
}));

export const useFeedBack = create((set) => ({
  feedback: null,
  setFeedback: (feedback) => set({feedback})
}))

export const useLoading = create((set) => ({
  loading: false,
  setLoading: (loading) => set({ loading }) 
}))
