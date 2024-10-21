"use client";
import {
  List,
  ListDataItem,
  ListItem,
  ListRenderItemProps,
  ListSectionHeader,
} from "../core/list";
import View from "../core/view";
import { Switch } from "../ui/switch";

type Item =
  | string
  | (ListDataItem & {
      rightView?: React.ReactNode;
    });

export default function ListScreen() {
  const DATA = [
    "Header",
    {
      id: "1",
      title: "Airplane Mode",
      rightView: <Switch className="mr-4" />,
    },
    {
      id: "2",
      title: "Wi-Fi",
      rightView: "Home",
    },
    {
      id: "3",
      title: "Bluetooth",
      rightView: "On",
    },
    {
      id: "4",
      title: "VPN",
      rightView: <Switch className="mr-4" />,
    },
    "",
    {
      id: "5",
      title: "General",
    },
    {
      id: "6",
      title: "Apps",
    },
    {
      id: "7",
      title: "Accessibility",
      subTitle: "VoiceOver, Zoom, High Contrast",
    },
    {
      id: "8",
      title: "People",
    },
    {
      id: "9",
      title: "Environments",
    },
    "",
    {
      id: "10",
      title: "Notifications",
    },
    {
      id: "11",
      title: "Focus",
    },
    {
      id: "12",
      title: "Screen Time",
    },
  ] satisfies Item[];

  return <List data={DATA} renderItem={renderItem} />;
}

function renderItem<T extends Item>(info: ListRenderItemProps<T>) {
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
      onClick={() => console.log("Item clicked")}
    />
  );
}
