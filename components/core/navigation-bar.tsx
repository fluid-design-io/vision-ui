import { cn } from "@/lib/utils";
import { Text } from "../ui/typography";

const NavigationBar = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "relative inline-flex h-[92px] w-full items-center justify-between px-6",
        className,
      )}
    >
      {children}
    </div>
  );
};

const NavigationBarTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 flex h-full items-center justify-center text-[29px] font-bold",
        className,
      )}
    >
      <Text size="largeTitle" asChild>
        <h1>{children}</h1>
      </Text>
    </div>
  );
};

export { NavigationBar, NavigationBarTitle };
