import React from "react";
import { SVGProps } from "react";

export const EmailIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="#fff" {...props}>
    <path
      d="M1.96525 5.64443L9.58043 1.07879C9.70842 1.00199 9.85487 0.961426 10.0041 0.961426C10.1534 0.961426 10.2999 1.00199 10.4278 1.07879L18.0356 5.64526C18.0966 5.68183 18.1472 5.7336 18.1822 5.79552C18.2173 5.85744 18.2357 5.92739 18.2357 5.99855V16.4705C18.2357 16.689 18.149 16.8984 17.9945 17.0529C17.8401 17.2073 17.6306 17.2941 17.4122 17.2941H2.58867C2.37025 17.2941 2.16078 17.2073 2.00634 17.0529C1.8519 16.8984 1.76514 16.689 1.76514 16.4705V5.99773C1.76512 5.92657 1.78355 5.85662 1.81862 5.7947C1.85369 5.73278 1.90421 5.68101 1.96525 5.64443ZM3.4122 6.69773V15.647H16.5887V6.6969L10.0037 2.74396L3.4122 6.6969V6.69773ZM10.0498 11.2807L14.4113 7.60526L15.472 8.86526L10.0614 13.4251L4.53549 8.87102L5.58302 7.59949L10.0498 11.2807Z"
      fill="currentColor"
    />
  </svg>
);

export const CrossIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.7157 1.65582C14.8057 1.56587 14.8772 1.45905 14.926 1.34147C14.9748 1.22389 14.9999 1.09785 15 0.970555C15.0001 0.843257 14.9751 0.717189 14.9264 0.599551C14.8778 0.481912 14.8065 0.375006 14.7165 0.284937C14.6265 0.194868 14.5197 0.1234 14.4022 0.0746123C14.2846 0.0258249 14.1585 0.000674075 14.0312 0.000595834C13.904 0.000517593 13.7779 0.0255134 13.6602 0.0741562C13.5426 0.122799 13.4357 0.194136 13.3456 0.284094L7.49988 6.12995L1.6558 0.284094C1.4739 0.102192 1.22719 -1.91666e-09 0.969943 0C0.712698 1.91666e-09 0.465989 0.102192 0.28409 0.284094C0.10219 0.465997 1.91663e-09 0.71271 0 0.969959C-1.91662e-09 1.22721 0.10219 1.47392 0.28409 1.65582L6.12985 7.5L0.28409 13.3442C0.194022 13.4342 0.122577 13.5412 0.0738324 13.6589C0.0250882 13.7765 0 13.9027 0 14.03C0 14.1574 0.0250882 14.2835 0.0738324 14.4012C0.122577 14.5189 0.194022 14.6258 0.28409 14.7159C0.465989 14.8978 0.712698 15 0.969943 15C1.09732 15 1.22345 14.9749 1.34112 14.9262C1.4588 14.8774 1.56573 14.806 1.6558 14.7159L7.49988 8.87004L13.3456 14.7159C13.5275 14.8976 13.7742 14.9996 14.0312 14.9994C14.2883 14.9992 14.5348 14.897 14.7165 14.7151C14.8982 14.5332 15.0002 14.2865 15 14.0294C14.9998 13.7724 14.8976 13.5259 14.7157 13.3442L8.8699 7.5L14.7157 1.65582Z"
      fill={props.color ?? "currentColor"}
    />
  </svg>
);

export const CircularDeleteIcon: React.FC<SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg width="72" height="72" viewBox="0 0 72 72" fill="none" {...props}>
    <circle cx="36" cy="36" r="35.5" stroke="#F44336" />
    <g clipPath="url(#clip0_125_5066)">
      <path
        d="M28.5 24V21H43.5V24H51V27H48V49.5C48 49.8978 47.842 50.2794 47.5607 50.5607C47.2794 50.842 46.8978 51 46.5 51H25.5C25.1022 51 24.7206 50.842 24.4393 50.5607C24.158 50.2794 24 49.8978 24 49.5V27H21V24H28.5ZM27 27V48H45V27H27ZM31.5 31.5H34.5V43.5H31.5V31.5ZM37.5 31.5H40.5V43.5H37.5V31.5Z"
        fill="#F44336"
      />
    </g>
    <defs>
      <clipPath id="clip0_125_5066">
        <rect
          width="36"
          height="36"
          fill="white"
          transform="translate(18 18)"
        />
      </clipPath>
    </defs>
  </svg>
);
export const DeleteIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
    <path
      d="M15 4H20V6H18V19C18 19.2652 17.8946 19.5196 17.7071 19.7071C17.5196 19.8946 17.2652 20 17 20H3C2.73478 20 2.48043 19.8946 2.29289 19.7071C2.10536 19.5196 2 19.2652 2 19V6H0V4H5V1C5 0.734784 5.10536 0.48043 5.29289 0.292893C5.48043 0.105357 5.73478 0 6 0H14C14.2652 0 14.5196 0.105357 14.7071 0.292893C14.8946 0.48043 15 0.734784 15 1V4ZM16 6H4V18H16V6ZM7 9H9V15H7V9ZM11 9H13V15H11V9ZM7 2V4H13V2H7Z"
      fill="#F44336"
    />
  </svg>
);
export const EditIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="18" height="20" viewBox="0 0 18 20" fill="red" {...props}>
    <path
      d="M3.414 14.0001L13.556 3.85808L12.142 2.44408L2 12.5861V14.0001H3.414ZM4.243 16.0001H0V11.7571L11.435 0.322083C11.6225 0.134612 11.8768 0.0292969 12.142 0.0292969C12.4072 0.0292969 12.6615 0.134612 12.849 0.322083L15.678 3.15108C15.8655 3.33861 15.9708 3.59292 15.9708 3.85808C15.9708 4.12325 15.8655 4.37756 15.678 4.56508L4.243 16.0001ZM0 18.0001H18V20.0001H0V18.0001Z"
      fill={props?.fill ?? "#4CAF50"}

    />
  </svg>
);
export const ArrowRightCircleIcon: React.FC<SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
    <path
      d="M10 9V6L14 10L10 14V11H6V9H10ZM10 0C15.52 0 20 4.48 20 10C20 15.52 15.52 20 10 20C4.48 20 0 15.52 0 10C0 4.48 4.48 0 10 0ZM10 18C14.42 18 18 14.42 18 10C18 5.58 14.42 2 10 2C5.58 2 2 5.58 2 10C2 14.42 5.58 18 10 18Z"
      fill="#4F46E5"
    />
  </svg>
);
export const LastPayment: React.FC<SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg width={50} height={50} {...props} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 8C0 3.58172 3.58172 0 8 0H42C46.4183 0 50 3.58172 50 8V42C50 46.4183 46.4183 50 42 50H8C3.58172 50 0 46.4183 0 42V8Z" fill="white" />
    <path d="M24 15L31.298 17.28C31.5015 17.3435 31.6794 17.4705 31.8057 17.6423C31.932 17.8141 32.0001 18.0218 32 18.235V20H34C34.2652 20 34.5196 20.1054 34.7071 20.2929C34.8946 20.4804 35 20.7348 35 21V29C35 29.2652 34.8946 29.5196 34.7071 29.7071C34.5196 29.8946 34.2652 30 34 30L30.78 30.001C30.393 30.511 29.923 30.961 29.38 31.331L24 35L18.62 31.332C17.8125 30.7815 17.1518 30.042 16.6951 29.1779C16.2385 28.3138 15.9999 27.3513 16 26.374V18.235C16.0001 18.0219 16.0683 17.8145 16.1946 17.6429C16.3208 17.4713 16.4986 17.3445 16.702 17.281L24 15ZM24 17.094L18 18.97V26.374C17.9999 26.9862 18.1402 27.5903 18.4104 28.1397C18.6805 28.6892 19.0731 29.1692 19.558 29.543L19.747 29.679L24 32.58L27.782 30H23C22.7348 30 22.4804 29.8946 22.2929 29.7071C22.1054 29.5196 22 29.2652 22 29V21C22 20.7348 22.1054 20.4804 22.2929 20.2929C22.4804 20.1054 22.7348 20 23 20H30V18.97L24 17.094ZM24 25V28H33V25H24ZM24 23H33V22H24V23Z" fill="#4F46E5" />
  </svg>
);