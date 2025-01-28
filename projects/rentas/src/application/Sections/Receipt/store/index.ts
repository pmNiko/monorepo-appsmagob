import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { RecibosListarParams, RecibosListarResp, T_Cuot } from "../interfaces";
import { processSelectionDetails, processValidData } from "./helpers";

type State = {
  //?? finder
  searchParams: RecibosListarParams;
  searchByDefault: string;
  target: string | number;

  //* Datos para cargar la tabla
  receiptsTable: RecibosListarResp[];
  hasLegalReceipts: boolean;

  // resumen de recibos selecciondos
  selectedItems: Array<string>;
  selectionExists: boolean;
  receiptsSelected: RecibosListarResp[];
  quantitySelectedItems: number;
  totalAmountPay: string;
};

type Actions = {
  // Acciones para el finder
  setSearchParams: (searchParams: RecibosListarParams) => void;
  setSearchByDefault: (searchByDefault: string) => void;
  setTarget: (target: string | number) => void;

  // Toggle mensual/semestral/anual
  setTCout: (value: T_Cuot) => void;

  // Carga de datos en la tabal
  setReceiptsTable: (receiptsTable: RecibosListarResp[]) => void;

  // Selección y payload para Macro Click
  setSelection: (items: Array<string>) => void;

  // Resets
  resetSelection: () => void;
  resetReceiptsTable: () => void;
  resetStore: () => void;
};

const initialStoreState: State = {
  searchParams: { n_serie: 0, tribu: "", t_cuot: "1" },
  searchByDefault: "",
  target: "",

  receiptsTable: [],
  hasLegalReceipts: false,

  selectedItems: [],
  receiptsSelected: [],
  quantitySelectedItems: 0,
  totalAmountPay: "",
  selectionExists: false,
};

const storeApi: StateCreator<State & Actions> = (set, get) => ({
  ...initialStoreState,

  setSearchParams: (searchParams) => set(() => ({ searchParams })),

  setSearchByDefault: (searchByDefault) => set(() => ({ searchByDefault })),

  setTarget: (target) => set(() => ({ target })),

  setTCout: (value) => {
    set(() => ({
      searchParams: { ...get().searchParams, t_cuot: value },
    }));
  },

  setReceiptsTable: (receiptsTable) => {
    const processedData = processValidData(receiptsTable);

    set(() => ({ ...processedData }));
  },

  setSelection: (selectedItems) => {
    // console.log({ selectedItems });

    const summary = processSelectionDetails(selectedItems, get().receiptsTable);

    set(() => ({ selectedItems, ...summary }));
  },

  resetSelection: () => {
    set(() => ({
      selectedItems: [],
      receiptsSelected: [],
      quantitySelectedItems: 0,
      totalAmountPay: "",
      selectionExists: false,
    }));
  },

  resetReceiptsTable: () => set(() => ({ receiptsTable: [] })),

  resetStore: () => set(() => ({ ...initialStoreState })),
});

export const useReceiptStore = create<State & Actions>()(devtools(storeApi));
