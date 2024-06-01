import { SearchShow} from "@/types/types"
import { create } from "zustand"

interface SearchState {
  query: string
  setQuery: (query: string) => void
  shows:SearchShow[]
  setShows:(shows: SearchShow[]) => void
}

export const useSearchStore = create<SearchState>()((set) => ({
  query: "",
  setQuery: (query: string) => set(() => ({ query })),
  shows: [],
  setShows:(shows: SearchShow[]) => set(() => ({ shows:shows }))
}))