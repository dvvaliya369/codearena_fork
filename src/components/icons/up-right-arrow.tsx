import { ComponentProps } from "react";

export default function UpRightArrow(props: ComponentProps<"svg">) {
  return (
    <svg
      viewBox="0 0 10 10"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.65 1A.65.65 0 009 .35H3.15a.65.65 0 000 1.3h5.2v5.2a.65.65 0 001.3 0V1zM1.46 9.46l8-8-.92-.92-8 8 .92.92z"
        fill="#fff"
      />
    </svg>
  );
}
