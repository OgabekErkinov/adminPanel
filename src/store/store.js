import { create } from "zustand";

const useStore = create((set) => ({
     menuOpen : false,
     toggleMenu : () => set((state) => ({menuOpen : !state.menuOpen}))
}))

export default useStore