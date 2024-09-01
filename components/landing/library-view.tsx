import { NavigationBar, NavigationBarTitle } from "../core/navigation-bar";
import View from "../core/view";
import { ButtonGroup } from "../ui/button";
import { HeroDropdownMenu } from "./hero-dropdown-menu";

export const LibraryView = () => {
  return (
    <>
      <NavigationBar>
        <div />
        <NavigationBarTitle>Library</NavigationBarTitle>
        <ButtonGroup>
          <HeroDropdownMenu />
        </ButtonGroup>
      </NavigationBar>
      <View
        variant="thick"
        className="flex h-[25vw] w-[200px] flex-col justify-center"
      >
        HI
      </View>
    </>
  );
};
