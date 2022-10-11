import React from "react";
import { IconProps } from "../../types/IconProps";

export const IconTick = ({ size, fill, color, strokeWidth = 2 }: IconProps) => {
  return (
    <svg
      className={fill}
      width={size}
      height={size}
      viewBox="0 0 17 15"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.7953 0.85322L5.24867 10.0666L2.71534 7.35989C2.24867 6.91989 1.51534 6.89322 0.982005 7.26655C0.462005 7.65322 0.315338 8.33322 0.635338 8.87989L3.63534 13.7599C3.92867 14.2132 4.43534 14.4932 5.00867 14.4932C5.55534 14.4932 6.07534 14.2132 6.36867 13.7599C6.84867 13.1332 16.0087 2.21322 16.0087 2.21322C17.2087 0.986553 15.7553 -0.0934461 14.7953 0.839887V0.85322Z"
        fill={fill}
      />
    </svg>
  );
};
