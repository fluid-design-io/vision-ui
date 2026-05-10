import type { SVGProps } from 'react'

const PanoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <g clipPath="url(#a)">
      <g clipPath="url(#b)">
        <path
          fill="currentColor"
          d="M1.591 20.374c1.752 0 4.423-2.055 10.409-2.055 5.976 0 8.666 2.046 10.409 2.046 1.042 0 1.591-.626 1.591-1.663V6.046c0-1.046-.55-1.672-1.591-1.672-1.743 0-4.433 2.055-10.409 2.055-5.967 0-8.657-2.055-10.409-2.055C.55 4.374 0 5 0 6.037v12.675c0 1.036.55 1.662 1.591 1.662Z"
        />
      </g>
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
      <clipPath id="b">
        <path fill="#fff" d="M0 4.334h24.107v16.08H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default PanoIcon
