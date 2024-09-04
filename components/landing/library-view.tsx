import { NavigationBar, NavigationBarTitle } from "../core/navigation-bar";
import { Sidebar, SidebarHeader, SidebarHeaderTitle } from "../core/sidebar";
import { ButtonGroup } from "../core/button";
import { HeroDropdownMenu } from "./hero-dropdown-menu";

export const LibraryView = () => {
  return (
    <>
      <div className="flex w-full">
        <Sidebar className="h-[2000px] max-h-[32vw] w-[max(240px,25%)]">
          <SidebarHeader>
            <SidebarHeaderTitle>Library</SidebarHeaderTitle>
          </SidebarHeader>
        </Sidebar>
        <div className="relative flex-1">
          <NavigationBar>
            <NavigationBarTitle variant="leading">Library</NavigationBarTitle>
            <ButtonGroup>
              <HeroDropdownMenu />
            </ButtonGroup>
          </NavigationBar>
        </div>
      </div>
    </>
  );
};
