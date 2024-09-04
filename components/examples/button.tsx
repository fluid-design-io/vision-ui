import { Button, ButtonGroup } from "@/components/core/button";
import { Window } from "@/components/core/window";
import { Share, Ellipsis, PenBox } from "lucide-react";

export const ButtonExample = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <ButtonGroup>
        <Button>Action</Button>
        <Button disabled>Action</Button>
        <Button variant="secondary">Action</Button>
      </ButtonGroup>

      <Window thickness="thinner">
        <ButtonGroup>
          <Button variant="selected" className="rounded-full" size="icon">
            <Share data-slot="icon" />
          </Button>
          <Button className="rounded-full" size="icon">
            <Ellipsis data-slot="icon" />
          </Button>
          <Button className="rounded-full" size="icon" disabled>
            <PenBox data-slot="icon" />
          </Button>
        </ButtonGroup>
      </Window>
    </div>
  );
};
