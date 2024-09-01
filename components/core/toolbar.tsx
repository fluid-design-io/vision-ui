import { Window, WindowProps } from "./window";
import { cn } from "@/lib/utils";
import { ButtonGroup } from "../ui/button";

export interface ToolbarProps extends WindowProps {}

const Toolbar = ({ className, children, ...props }: ToolbarProps) => {
  return (
    <Window className={cn("-mt-[34px]")} thickness="thin" {...props}>
      <ButtonGroup>{children}</ButtonGroup>
    </Window>
  );
};
export { Toolbar };
