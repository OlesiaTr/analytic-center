import { FC, SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
}

export const Googlescholar: FC<Props> = ({ width = 40, height = 40 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 41 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0.700195"
      y="0.5"
      width="39"
      height="39"
      rx="7.5"
      stroke="#565656"
    />
    <g clipPath="url(#clip0_206_24571)">
      <path
        d="M20.2002 29.0891L5.2002 16.875L20.2002 5V29.0891Z"
        fill="#A0A3A9"
      />
      <path
        d="M20.2002 29.0891L35.2002 16.875L20.2002 5V29.0891Z"
        fill="#5A6371"
      />
      <path
        d="M20.2002 35C25.0327 35 28.9502 31.0825 28.9502 26.25C28.9502 21.4175 25.0327 17.5 20.2002 17.5C15.3677 17.5 11.4502 21.4175 11.4502 26.25C11.4502 31.0825 15.3677 35 20.2002 35Z"
        fill="#CED2D8"
      />
      <path
        d="M12.292 22.5C13.6964 19.5438 16.7095 17.5 20.2 17.5C23.6905 17.5 26.7036 19.5438 28.108 22.5H12.292Z"
        fill="#7F8A9C"
      />
    </g>
    <defs>
      <clipPath id="clip0_206_24571">
        <rect
          width="30"
          height="30"
          fill="white"
          transform="translate(5.2002 5)"
        />
      </clipPath>
    </defs>
  </svg>
);
