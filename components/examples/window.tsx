import { Window } from "../core/window";

export const WindowExample = () => {
  return (
    <>
      <Window
        className="flex h-[100px] w-[150px] items-center justify-center"
        thickness="none"
      >
        <p className="text-white/80">None</p>
      </Window>
      <Window
        className="flex h-[100px] w-[150px] items-center justify-center"
        thickness="thinnest"
      >
        <p className="text-white/80">Thinnest</p>
      </Window>
      <Window
        className="flex h-[100px] w-[150px] items-center justify-center"
        thickness="thinner"
      >
        <p className="text-white/80">Thinner</p>
      </Window>
      <Window
        className="flex h-[100px] w-[150px] items-center justify-center"
        thickness="thin"
      >
        <p className="text-white/80">Thin</p>
      </Window>
      <Window
        className="flex h-[100px] w-[150px] items-center justify-center"
        thickness="normal"
      >
        <p className="text-white/80">Normal</p>
      </Window>
      <Window
        className="flex h-[100px] w-[150px] items-center justify-center"
        thickness="thick"
      >
        <p className="text-white/80">Thick</p>
      </Window>
      <Window
        className="flex h-[100px] w-[150px] items-center justify-center"
        thickness="thicker"
      >
        <p className="text-white/80">Thicker</p>
      </Window>
      <Window
        className="flex h-[100px] w-[150px] items-center justify-center"
        thickness="thickest"
      >
        <p className="text-white/80">Thickest</p>
      </Window>
    </>
  );
};
