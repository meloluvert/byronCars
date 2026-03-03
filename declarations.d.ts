
declare module "*.svg" {
  import { SvgProps } from "react-native-svg";
  import { ReactElement } from "react";

  const SVGComponent: (props: SvgProps) => ReactElement;
  export default SVGComponent;
}
