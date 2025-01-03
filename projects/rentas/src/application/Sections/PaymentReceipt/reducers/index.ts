interface PaymentReceiptReducerState {
  year: string;
  tax: string;
  selectedItems: Array<string>;
  selectionExists: boolean;
}

export const initialPaymentReceiptReducerState: PaymentReceiptReducerState = {
  year: "",
  tax: "",
  selectedItems: [],
  selectionExists: false,
};

export type PaymentReceiptActionType =
  | { type: "setTax"; payload: string }
  | { type: "setYear"; payload: string }
  | { type: "setSelection"; payload: Array<string> }
  | { type: "resetSelection" };

export const paymentReceiptReducer = (
  state: PaymentReceiptReducerState,
  action: PaymentReceiptActionType
): PaymentReceiptReducerState => {
  switch (action.type) {
    case "setTax":
      return {
        ...state,
        tax: action.payload,
      };
    case "setYear":
      return {
        ...state,
        year: action.payload,
      };

    case "setSelection":
      const items = action.payload;

      return {
        ...state,
        selectionExists: items.length > 0,
        selectedItems: items,
      };
    case "resetSelection":
      return {
        ...state,
        selectionExists: false,
        selectedItems: [],
      };

    default:
      return state;
  }
};
