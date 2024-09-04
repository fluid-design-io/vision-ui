import { cn } from "@/lib/utils";

interface ComponentWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: boolean;
}

export const ComponentWrapper = ({
  children,
  className,
  gradient,
  ...props
}: ComponentWrapperProps) => {
  return (
    <div
      className={cn(
        {
          "bg-gradient-to-tr from-rose-700/40 via-indigo-700/40 to-cyan-700/40":
            gradient,
        },
        "flex w-full items-center justify-center rounded-[8px] p-8",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
