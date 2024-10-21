import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Text } from "../ui/typography";
import { Hoverable } from "./hoverable";
import View from "./view";
import { ChevronRightIcon } from "lucide-react";

type ListDataItem =
  | string
  | {
      id: string;
      title: string;
      subTitle?: string;
      /**
       * Whether to show a chevron icon on the right side of the item
       */
      detail?: boolean;
      /**
       * A custom left view to render on the left side of the item
       */
      leftView?: string | React.ReactNode;
      /**
       * A custom right view to render on the right side of the item
       */
      rightView?: string | React.ReactNode;
    };
type ListVariant = "insets" | "full-width";

type ListProps<T extends ListDataItem> = {
  data: T[];
  renderItem?: ListRenderItem<T>;
  variant?: ListVariant;
  sectionHeaderAsGap?: boolean;
  rootClassName?: string;
  rootStyle?: React.CSSProperties;
};

type ListRenderItemProps<T extends ListDataItem> = {
  item: T;
  index: number;
  variant?: ListVariant;
  isFirstInSection?: boolean;
  isLastInSection?: boolean;
  sectionHeaderAsGap?: boolean;
};

type ListRenderItem<T extends ListDataItem> = (
  props: ListRenderItemProps<T>,
) => React.ReactNode;

const rootVariants = cva("min-h-2 flex-1", {
  variants: {
    variant: {
      insets: "px-6",
      "full-width": "",
    },
    sectionHeaderAsGap: {
      true: "",
      false: "",
    },
  },
  defaultVariants: {
    variant: "full-width",
    sectionHeaderAsGap: false,
  },
});

function List<T extends ListDataItem>({
  variant = "full-width",
  rootClassName,
  rootStyle,
  renderItem,
  data,
  sectionHeaderAsGap = false,
  ...props
}: ListProps<T>) {
  return (
    <div
      className={cn(
        rootVariants({
          variant,
          sectionHeaderAsGap,
        }),
        rootClassName,
      )}
      style={rootStyle}
      {...props}
    >
      <ul className="flex flex-col gap-0.5 px-2">
        {data.map((item, index) => {
          const key = typeof item === "string" ? item : item.id || index;
          const previousItem = data[index - 1];
          const nextItem = data[index + 1];
          const isFirstInSection =
            !previousItem || typeof previousItem === "string";
          const isLastInSection = !nextItem || typeof nextItem === "string";

          if (renderItem) {
            return (
              <React.Fragment key={key}>
                {renderItem({
                  item,
                  index,
                  variant,
                  isFirstInSection,
                  isLastInSection,
                  sectionHeaderAsGap,
                })}
              </React.Fragment>
            );
          } else {
            return null;
          }
        })}
      </ul>
    </div>
  );
}

type ListItemProps<T extends ListDataItem> = {
  item: T;
  index: number;
  variant?: ListVariant;
  isFirstInSection?: boolean;
  isLastInSection?: boolean;
  sectionHeaderAsGap?: boolean;
  className?: string;
  titleClassName?: string;
  titleStyle?: React.CSSProperties;
  subTitleClassName?: string;
  subTitleStyle?: React.CSSProperties;
  textContentClassName?: string;
  leftView?: string | React.ReactNode;
  rightView?: string | React.ReactNode;
  removeSeparator?: boolean;
  onClick?: () => void;
};

function ListItem<T extends ListDataItem>({
  item,
  index,
  variant,
  className,
  titleClassName,
  titleStyle,
  subTitleStyle,
  subTitleClassName,
  textContentClassName,
  sectionHeaderAsGap,
  removeSeparator = false,
  leftView,
  rightView,
  onClick,
  isFirstInSection,
  isLastInSection,
  // Note: Remove the rest parameter to avoid spreading unwanted props
}: ListItemProps<T>) {
  if (typeof item === "string") {
    console.warn(
      "Invalid item of type 'string' was provided. Use ListSectionHeader instead.",
    );
    return null;
  }
  const Comp = variant === "full-width" ? "div" : View;
  return (
    <Comp asChild>
      <Hoverable enabled={onClick !== undefined} asChild>
        <li
          className={cn(
            "min-h-14 py-2",
            "flex items-center transition-all",
            "[&_button]:pointer-events-auto [&_div]:pointer-events-none [&_p]:pointer-events-none",
            {
              "rounded-xl": variant === "full-width",
              "rounded-t-xl": isFirstInSection && variant === "insets",
              "rounded-b-xl": isLastInSection && variant === "insets",
            },
            "hover:bg-blend-color-dodge hover:[background:linear-gradient(0deg,rgba(94,94,94,0.18)0%,rgba(94,94,94,0.18)100%),rgba(255,255,255,0.07)]",
            "hover:[background-blend-mode:color-dodge,normal]",
            className,
          )}
        >
          <div onClick={onClick} className="flex w-full items-center text-left">
            {leftView && <div>{leftView}</div>}
            <div className={cn("flex flex-1", textContentClassName)}>
              <div className="flex-1">
                <Text style={titleStyle} className={titleClassName} size="body">
                  {item.title}
                </Text>
                {item.subTitle && (
                  <Text
                    style={subTitleStyle}
                    className={cn(subTitleClassName)}
                    variant="secondary"
                    size="caption1"
                  >
                    {item.subTitle}
                  </Text>
                )}
              </div>
              {rightView && (
                <div className="flex items-center justify-center">
                  {typeof rightView === "string" ? (
                    <Text className="pr-4" variant="tertiary">
                      {rightView}
                    </Text>
                  ) : (
                    rightView
                  )}
                  {item.detail && (
                    <ChevronRightIcon className="mr-4 size-4 opacity-50" />
                  )}
                </div>
              )}
            </div>
          </div>
        </li>
      </Hoverable>
    </Comp>
  );
}

type ListSectionHeaderProps<T extends ListDataItem> = {
  item: T;
  index: number;
  variant?: ListVariant;
  sectionHeaderAsGap?: boolean;
  className?: string;
  textClassName?: string;
  isFirstInSection?: boolean;
  isLastInSection?: boolean;
};

function ListSectionHeader<T extends ListDataItem>({
  item,
  className,
  textClassName,
  sectionHeaderAsGap,
}: ListSectionHeaderProps<T>) {
  if (typeof item !== "string") {
    console.warn(
      "Invalid item provided. Expected type 'string'. Use ListItem instead.",
    );
    return null;
  }

  if (sectionHeaderAsGap) {
    return (
      <div className={cn(className)}>
        <div className="h-8" />
      </div>
    );
  }
  return (
    <div className={cn("w-full pb-4 pl-4 pt-4", className)}>
      <Text
        className={cn(
          "text-left uppercase text-muted-foreground",
          textClassName,
        )}
        size="caption1"
      >
        {item}
      </Text>
    </div>
  );
}

export { List, ListItem, ListSectionHeader };
export type {
  ListDataItem,
  ListItemProps,
  ListProps,
  ListRenderItemProps,
  ListSectionHeaderProps,
};
