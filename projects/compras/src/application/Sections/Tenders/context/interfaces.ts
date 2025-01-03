import {
  TenderDetailsEnum,
  TenderFileProps,
  TenderTitlesForSelect,
} from "../interfaces";

export interface TendersStateProps {
  years: Array<number>;
  titles: Array<TenderTitlesForSelect>;
  details: TenderDetailsEnum;
  docs: Array<TenderFileProps>;
  tenderByQS: string;
  year: string;
  tenderID: string;
}

export interface TenderStateContext extends TendersStateProps {
  selectsAreReady: boolean;
  isLoading: boolean;
  year: string;
  tenderID: string;
  disabled: boolean;
  renderLink: boolean;

  ctxReset: () => void;
  setYear: (value: string) => void;
  setTenderID: (value: string) => void;
  setTenderByQS: (value: string) => void;
}
