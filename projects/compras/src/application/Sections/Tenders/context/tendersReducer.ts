import {
  TenderDetailsEnum,
  TenderFileProps,
  TenderTitlesForSelect,
} from "../interfaces";
import { TendersStateProps } from "./interfaces";

export const initialState: TendersStateProps = {
  years: [],
  titles: [],
  details: {} as TenderDetailsEnum,
  docs: [],
  tenderByQS: "",
  year: "",
  tenderID: "",
};

export type TenderAction =
  | { type: "setYears"; payload: Array<number> }
  | { type: "setTitles"; payload: Array<TenderTitlesForSelect> }
  | { type: "setDetails"; payload: TenderDetailsEnum }
  | { type: "setDocs"; payload: Array<TenderFileProps> }
  | { type: "setTenderByQS"; payload: string }
  | { type: "setYear"; payload: string }
  | { type: "setTenderID"; payload: string }
  | { type: "reset" };

export const tendersReducer = (
  tenderState: TendersStateProps,
  action: TenderAction
) => {
  switch (action.type) {
    case "setYears":
      return {
        ...tenderState,
        years: action.payload,
      };
    case "setTitles":
      return {
        ...tenderState,
        titles: action.payload,
      };
    case "setDetails":
      return {
        ...tenderState,
        details: action.payload,
      };
    case "setDocs":
      return {
        ...tenderState,
        docs: action.payload,
      };
    case "setTenderByQS":
      return {
        ...tenderState,
        tenderByQS: action.payload,
      };
    case "setYear":
      return {
        ...tenderState,
        year: action.payload,
      };
    case "setTenderID":
      return {
        ...tenderState,
        tenderID: action.payload,
      };
    case "reset":
      return {
        ...initialState,
      };

    default:
      return tenderState;
  }
};
