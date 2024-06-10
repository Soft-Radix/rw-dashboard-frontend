import React from "react";
import { SVGProps } from "react";

interface IProps extends React.FC<SVGProps<SVGSVGElement>> {}

export const FilterIcon: IProps = (props) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18 0V2H17L12 9.5V18H6V9.5L1 2H0V0H18ZM3.404 2L8 8.894V16H10V8.894L14.596 2H3.404Z"
      fill="currentColor"
    />
  </svg>
);
