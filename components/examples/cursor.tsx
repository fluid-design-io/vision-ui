import { Button, ButtonGroup } from "@/components/core/button";
import { Undo2, Redo2, ALargeSmall, ListOrdered } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Window } from "@/components/core/window";

export const WithButtonGroup = () => {
  return (
    <Window>
      <ButtonGroup>
        <Button variant="secondary" className="rounded-full" size="icon">
          <Undo2 data-slot="icon" />
        </Button>
        <Button variant="secondary" className="rounded-full" size="icon">
          <Redo2 data-slot="icon" />
        </Button>
        <Separator orientation="vertical" className="h-8" />
        <Button variant="secondary" className="rounded-full" size="icon">
          <ALargeSmall data-slot="icon" />
        </Button>
        <Button variant="secondary" className="rounded-full" size="icon">
          <ListOrdered data-slot="icon" />
        </Button>
      </ButtonGroup>
    </Window>
  );
};
