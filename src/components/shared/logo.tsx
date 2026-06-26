import React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  theme?: "light" | "dark";
}

const Logo = ({ theme = "light", ...props }: LogoProps) => {
  const cornerColor = theme === "dark" ? "#ffffff" : "#141413";

  return (
    <div className="flex items-center rounded-md bg-transparent">
      <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="188.7 188.7 302.6 302.6"
    className={`size-8  ${props.className}`}
  >
    <title>{"User profile icon with scanner frame"}</title>
    <g transform="matrix(8.8 0 0 8.8 190 190)">
      <path
        fill="none"
        stroke={cornerColor}
        strokeLinecap="round"
        strokeWidth={2.6}
        d="M2 10V3.5C2 2.67 2.67 2 3.5 2H10M24 2h6.5c.83 0 1.5.67 1.5 1.5V10M32 24v6.5c0 .83-.67 1.5-1.5 1.5H24M10 32H3.5c-.83 0-1.5-.67-1.5-1.5V24"
      />
      <circle cx={17} cy={12.5} r={4.5} fill="#2b7fff" />
      <path fill="#2b7fff" d="M9 28c0-6.5 3.5-9.5 8-9.5s8 3 8 9.5" />
    </g>
  </svg>
    {/* <path fill="#EDEDED" d="M0 0h1080v1080H0V0Z" /> */}
    
{/* <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`size-6 text-white ${props.className}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5m0 9V18A2.25 2.25 0 0 1 18 20.25h-1.5m-9 0H6A2.25 2.25 0 0 1 3.75 18v-1.5M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg> */}
    </div>
  );
};

export default Logo;
