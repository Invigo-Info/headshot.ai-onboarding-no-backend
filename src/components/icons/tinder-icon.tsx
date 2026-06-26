import * as React from "react";
const TinderIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={144}
    height={144}
    viewBox="0 0 48 48"
    {...props}
  >
    <radialGradient
      id="a"
      cx={24.39}
      cy={40.173}
      r={38.605}
      gradientUnits="userSpaceOnUse"
    >
      <stop offset={0} stopColor="#fe7356" />
      <stop offset={1} stopColor="#fd297c" />
    </radialGradient>
    <path
      fill="url(#a)"
      d="M17.2 20.187c7.65-2.429 8.864-9.471 7.893-15.786 0 0 0-.364.243-.243C32.743 7.802 41 15.452 41 27.23c0 8.743-6.921 16.636-17 16.636-10.929 0-17-7.65-17-16.757 0-5.464 3.643-10.929 7.893-13.357 0 0 .364 0 .364.243 0 1.214.486 4.25 1.821 6.071l.122.121z"
    />
  </svg>
);
export default TinderIcon;
