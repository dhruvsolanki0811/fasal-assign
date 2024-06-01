import { Show } from "@/types/types"
import { create } from "zustand"

interface ModalState {
  open: boolean
  setOpen: (open: boolean) => void
  showId:string|null
  setShowId:(showId: string) => void
}

export const useModalStore = create<ModalState>()((set) => ({
  open: false,
  setOpen: (open: boolean) => set(() => ({ open:open })),
  showId: null,
  setShowId:(show: string) => set(() => ({ showId:show }))
 
}))