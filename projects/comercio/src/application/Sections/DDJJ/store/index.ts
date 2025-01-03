import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { DDJJResponse } from "../interfaces";

interface FormatterOptions {
  label: string | number;
  value: string | number;
}

interface State {
  year: number;
  declarations: DDJJResponse[];
  selectorEmployees: FormatterOptions[];
  selectorSurface: FormatterOptions[];
  toDeclare: DDJJResponse;
  isEditing: boolean;
  modalToDeclareIsOpen: boolean;
}

interface Actions {
  setSelectorEmployees: (options: FormatterOptions[]) => void;
  setSelectorSurface: (options: FormatterOptions[]) => void;
  setDeclarations: (declarations: DDJJResponse[]) => void;
  setYear: (year: number) => void;
  setToDeclare: (declaration: DDJJResponse) => void;
  toggleEditing: () => void;
  toggleModal: () => void;
  resetDeclare: () => void;
}

const initialState: State = {
  year: 0,
  declarations: [] as Array<DDJJResponse>,
  selectorEmployees: [],
  selectorSurface: [],
  toDeclare: {} as DDJJResponse,
  isEditing: true,
  modalToDeclareIsOpen: false,
};

const storeApi: StateCreator<State & Actions> = (set, get) => ({
  ...initialState,

  setSelectorEmployees: (options) =>
    set(() => ({ selectorEmployees: options })),

  setSelectorSurface: (options) => set(() => ({ selectorSurface: options })),

  setDeclarations: (declarations) => set(() => ({ declarations })),

  setYear: (year) => set(() => ({ year })),

  setToDeclare: (declaration) =>
    set(() => ({
      toDeclare: declaration,
      isEditing: false,
      modalToDeclareIsOpen: true,
    })),

  toggleEditing: () => set(() => ({ isEditing: !get().isEditing })),

  reset: () => set(() => ({ ...initialState })),

  toggleModal: () =>
    set(() => ({ modalToDeclareIsOpen: !get().modalToDeclareIsOpen })),

  resetDeclare: () =>
    set(() => ({
      toDeclare: initialState.toDeclare,
      isEditing: true,
      modalToDeclareIsOpen: false,
    })),
});

export const useDDJJStore = create<State & Actions>()(
  devtools(
    persist(storeApi, {
      name: "state-ddjj-table",
    })
  )
);
