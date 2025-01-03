import { Icon } from "@material-ui/core";

interface Props {
  iconName: string;
  iconFontSize?: number;
  iconColor?: string;
}

export const CustomIcon = ({
  iconName,
  iconFontSize = 32,
  iconColor,
}: Props) => {
  return (
    <Icon
      style={{
        fontSize: iconFontSize,
        color: iconColor === null ? "black" : iconColor,
      }}
      className={`material-icons`}
    >
      {iconName}
    </Icon>
  );
};
