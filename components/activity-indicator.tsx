import { SVGProps } from "react";

export const ActivityIndicator = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      fill="none"
      {...props}
    >
      <rect
        width={3.733}
        height={9.333}
        x={12.021}
        y={9.38}
        fill="currentColor"
        fillOpacity={0.7}
        rx={1.867}
        transform="rotate(135 12.02 9.38)"
      />
      <rect
        width={3.733}
        height={9.333}
        x={9.333}
        y={12.133}
        fill="currentColor"
        fillOpacity={0.6}
        rx={1.867}
        transform="rotate(90 9.333 12.133)"
      />
      <rect
        width={3.733}
        height={9.333}
        x={9.381}
        y={15.98}
        fill="currentColor"
        fillOpacity={0.5}
        rx={1.867}
        transform="rotate(45 9.38 15.98)"
      />
      <rect
        width={3.733}
        height={9.333}
        x={12.134}
        y={18.667}
        fill="currentColor"
        fillOpacity={0.4}
        rx={1.867}
      />
      <rect
        width={3.733}
        height={9.333}
        x={25.222}
        y={22.58}
        fill="currentColor"
        fillOpacity={0.3}
        rx={1.867}
        transform="rotate(135 25.222 22.58)"
      />
      <rect
        width={3.733}
        height={9.333}
        x={28}
        y={12.133}
        fill="currentColor"
        fillOpacity={0.2}
        rx={1.867}
        transform="rotate(90 28 12.133)"
      />
      <rect
        width={3.733}
        height={9.333}
        x={22.582}
        y={2.781}
        fill="currentColor"
        fillOpacity={0.1}
        rx={1.867}
        transform="rotate(45 22.582 2.78)"
      />
      <rect
        width={3.733}
        height={9.333}
        x={12.133}
        fill="currentColor"
        fillOpacity={0.8}
        rx={1.867}
      />
    </svg>
  );
};
