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
export const LogOutIcon: IProps = (props) => (
  <svg
    width="36"
    height="36"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M18 33C9.7155 33 3 26.2845 3 18C3 9.7155 9.7155 3 18 3C20.329 2.99825 22.6263 3.53966 24.7094 4.58122C26.7925 5.62277 28.604 7.13577 30 9H25.935C24.2028 7.47264 22.0668 6.47754 19.7831 6.1341C17.4994 5.79067 15.1651 6.11349 13.0603 7.06382C10.9556 8.01416 9.16972 9.55165 7.9171 11.4918C6.66449 13.4319 5.9983 15.6923 5.9985 18.0017C5.99869 20.311 6.66525 22.5713 7.91819 24.5112C9.17113 26.4512 10.9572 27.9883 13.0622 28.9383C15.1671 29.8883 17.5014 30.2107 19.785 29.8669C22.0687 29.5231 24.2046 28.5277 25.9365 27H30.0015C28.6054 28.8644 26.7936 30.3776 24.7102 31.4191C22.6268 32.4607 20.3292 33.002 18 33ZM28.5 24V19.5H16.5V16.5H28.5V12L36 18L28.5 24Z"
      fill="#F44336"
    />
  </svg>
);
