import {
  NavigationBar,
  NavigationBarTitle,
} from "@/components/core/navigation-bar";

import { Sidebar, SidebarHeader } from "../core/sidebar";
import { Input } from "../core/input";
import ListScreen from "../examples/list";
import View from "../core/view";
import { Text } from "../ui/typography";
import {
  List,
  ListDataItem,
  ListItem,
  ListRenderItemProps,
  ListSectionHeader,
} from "../core/list";

function SettingsView() {
  return (
    <>
      <div className="flex h-full w-full flex-1">
        <Sidebar
          rootClassName="sticky top-0 h-min max-h-[32vw] w-[max(260px,28%)]"
          header={
            <SidebarHeader>
              <Input placeholder="Search" />
            </SidebarHeader>
          }
        >
          <div className="mb-8">
            <ListScreen />
          </div>
        </Sidebar>
        <div className="relative flex-1">
          <NavigationBar>
            <NavigationBarTitle variant="center">Account</NavigationBarTitle>
          </NavigationBar>
          <div className="mt-24 flex flex-col items-center gap-2">
            <View className="size-24 rounded-full md:size-32" />
            <Text size="title1">John Doe</Text>
            <Text variant="tertiary" size="caption1">
              john.doe@example.com
            </Text>
          </div>
          <div className="mx-auto my-8 w-full max-w-xl">
            <List
              data={[
                {
                  id: "1",
                  title: "Personal Information",
                },
                {
                  id: "2",
                  title: "Sign-in & Security",
                },
                {
                  id: "3",
                  title: "Payment & Shipping",
                },
                {
                  id: "4",
                  title: "Subscriptions",
                },
                "",
                {
                  id: "5",
                  title: "iCloud",
                  rightView: "50 GB",
                  detail: true,
                },
                {
                  id: "6",
                  title: "Family",
                  rightView: "Set Up",
                  detail: true,
                },
              ]}
              renderItem={renderItem}
              variant="insets"
            />
          </div>
        </div>
      </div>
    </>
  );
}

function renderItem<T extends ListDataItem>(info: ListRenderItemProps<T>) {
  if (typeof info.item === "string") {
    return <ListSectionHeader {...info} />;
  }
  return (
    <ListItem
      leftView={
        <div className="flex justify-center px-4">
          <View className="aspect-square h-8 rounded-full" />
        </div>
      }
      rightView={info.item.rightView}
      {...info}
    />
  );
}

export default SettingsView;
