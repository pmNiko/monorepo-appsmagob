import { forwardRef } from 'react';
import { InputMask, type InputMaskProps } from '@react-input/mask';

// Component with InputMask
export const CuitCuilMask = forwardRef<HTMLInputElement, InputMaskProps>((props, forwardedRef) => {
  return <InputMask ref={forwardedRef} mask="__-________-_" replacement={{ _: /\d/ }} {...props} />;
});