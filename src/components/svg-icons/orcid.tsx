import { FC, SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
}

export const Orcid: FC<Props> = ({ width = 40, height = 40 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 41 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="1.1001" y="0.5" width="39" height="39" rx="7.5" stroke="#565656" />
    <path
      d="M11.9151 31.9812H9.04688V12.0342H11.9151V21.0485V31.9812Z"
      fill="#565656"
    />
    <path
      d="M16.1245 12.0342H23.8724C31.2477 12.0342 34.4884 17.305 34.4884 22.017C34.4884 27.1388 30.4841 31.9998 23.9096 31.9998H16.1245V12.0342ZM18.9927 29.411H23.5557C30.0557 29.411 31.5457 24.4754 31.5457 22.017C31.5457 18.0127 28.9941 14.623 23.4067 14.623H18.9927V29.411Z"
      fill="#565656"
    />
    <path
      d="M12.3623 7.88109C12.3623 8.90544 11.5242 9.76218 10.4812 9.76218C9.43821 9.76218 8.6001 8.90544 8.6001 7.88109C8.6001 6.83811 9.43821 6 10.4812 6C11.5242 6 12.3623 6.85673 12.3623 7.88109Z"
      fill="#565656"
    />
  </svg>
);
