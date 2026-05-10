import type { SVGProps } from 'react'

const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" {...props}>
    <g clipPath="url(#a)">
      <path
        fill="currentColor"
        d="M2 9.793c0 4.297 3.496 7.793 7.793 7.793 1.7 0 3.252-.547 4.531-1.465l4.805 4.815c.224.224.517.332.83.332.664 0 1.123-.498 1.123-1.153a1.12 1.12 0 0 0-.322-.8l-4.776-4.805a7.703 7.703 0 0 0 1.602-4.717C17.586 5.496 14.09 2 9.793 2 5.496 2 2 5.496 2 9.793Zm1.67 0A6.127 6.127 0 0 1 9.793 3.67a6.127 6.127 0 0 1 6.123 6.123 6.127 6.127 0 0 1-6.123 6.123A6.127 6.127 0 0 1 3.67 9.793Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M2 2h19.443v19.268H2z" />
      </clipPath>
    </defs>
  </svg>
)
export default SearchIcon
