import { create } from "zustand";
import { AdhesionReceiptsParams, TributosResponse } from "../interfaces";

type State = {
  searchParams: AdhesionReceiptsParams;
  cuitcuil: string;

  taxesTable: TributosResponse[];
  selectedItems: Array<string>;
  selectionExists: boolean;
};

type Actions = {
  setSearchParams: (searchParams: AdhesionReceiptsParams) => void;
  setCuitcuil: (cuitcuil: string) => void;

  setTaxesTable: (taxes: TributosResponse[]) => void;
  setSelection: (items: Array<string>) => void;
  resetSelection: () => void;

  resetTaxesTable: () => void;
  resetStore: () => void;
};

const initialState: State = {
  searchParams: {
    n_cont: 0,
    tribu: "01",
  },
  cuitcuil: "",

  taxesTable: [],

  selectedItems: [],
  selectionExists: false,
};

export const useAdhesionTaxStore = create<State & Actions>((set) => ({
  ...initialState,

  setSearchParams: (searchParams) => set(() => ({ searchParams })),
  setCuitcuil: (cuitcuil) => set(() => ({ cuitcuil })),

  setTaxesTable: (taxes) => set(() => ({ taxesTable: taxes })),

  setSelection: (items) =>
    set(() => ({ selectedItems: items, selectionExists: items.length > 0 })),

  resetSelection: () => {
    set(() => ({ selectedItems: [], selectionExists: false }));
  },

  resetTaxesTable: () => set(() => ({ taxesTable: [] })),

  resetStore: () => set(() => ({ ...initialState })),
}));
