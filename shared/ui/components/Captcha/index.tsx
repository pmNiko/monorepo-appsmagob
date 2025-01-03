import { Dispatch, SetStateAction } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Box } from "@mui/material";

interface Props {
  setValidCaptcha: Dispatch<SetStateAction<boolean>>;
}

export const Captcha = ({ setValidCaptcha }: Props) => {
  return (
    <Box>
      <ReCAPTCHA
        style={{
          marginLeft: 4,
          transform: "scale(0.84)",
          width: "100%",
        }}
        sitekey="6Ldse3IiAAAAANMhjw6HTuzhh7VHv0teHf0I7on6"
        onChange={() => setValidCaptcha((prev) => !prev)}
      />
    </Box>
  );
};
