import { DDJJToDeclareFormProps, ValuesOnSubmit } from "../../../interfaces";
import { keyInitialStateForm, keyValues } from "../interfaces";

export const deepEqual = (
  initialState: DDJJToDeclareFormProps,
  values: ValuesOnSubmit,
  ignoreProp: keyInitialStateForm
) => {
  const originalValues = { ...initialState };
  delete originalValues[ignoreProp];

  for (const prop in originalValues) {
    const originalValue = originalValues[prop as keyInitialStateForm];
    const newValue = values[prop as keyValues];

    if (originalValue !== newValue) return false;
  }

  return true;
};
