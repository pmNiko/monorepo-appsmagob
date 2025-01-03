import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { SessionActions, SessionState, SessionUser } from "../interface";
import AuthService from "../services/auth.service";

const initialSessionState: SessionState = {
  isLogged: false,
  token: null,
  user: null,
  isBlockModal: false,
  modalIsOpen: false,
  searchParams: null,
  targetPath: null,
};

export const authItemStore = "session";

const storeApi: StateCreator<SessionState & SessionActions> = (set, get) => ({
  ...initialSessionState,

  loginUser: async (data: SessionUser) => {
    try {
      const token = await AuthService.login(data);
      set({
        isLogged: true,
        token,
        user: data,
        modalIsOpen: false,
        isBlockModal: false,
      });
    } catch (error) {
      console.error(error);
      set({ ...initialSessionState });
    }
  },

  logoutUser() {
    localStorage.clear();
    set({ ...initialSessionState });
  },

  checkAuth: async () => {
    try {
      if (!get().token) {
        set({ ...initialSessionState });
        return false;
      }

      const { renewToken, user } = await AuthService.checkAuth(get().token!);

      set({ token: renewToken, user, isLogged: true });
      return true;
    } catch (error) {
      set({ ...initialSessionState });
      throw new Error(`${error}`);
    }
  },

  openModal() {
    set(() => ({ modalIsOpen: true }));
  },
  closeModal() {
    set(() => ({ modalIsOpen: false }));
  },

  openBlockedModal() {
    localStorage.clear();
    set(() => ({
      ...initialSessionState,
      isBlockModal: true,
      modalIsOpen: true,
    }));
  },
  closeBlockedModal() {
    set(() => ({ isBlockModal: false, modalIsOpen: false }));
  },

  setSearchParams(params) {
    set({ searchParams: params });
  },

  setTargetPath: (value) =>
    set({
      targetPath: {
        isNavigate: value.isNavigate,
        path: value.path,
      },
    }),

  cleanTargetPath: () => set({ targetPath: null }),

  clearAllExceptAuthStore() {
    const draftSession = get();

    localStorage.clear();

    set({ ...draftSession });
  },
});

export const useAuthStore = create<SessionState & SessionActions>()(
  devtools(persist(storeApi, { name: authItemStore }))
);
