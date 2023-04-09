import { Flex, Item, ListView, View, useDragAndDrop, useListData } from "@adobe/react-spectrum";
import React from "react";
import type { TextDropItem } from "react-aria";
import { useDrop } from "react-aria";

export function SimpleListViewDnd() {
  const lst = useListData({
    initialItems: [
      {id: '1', name: 'Adobe Photoshop'},
      {id: '2', name: 'Adobe InDesign'},
      {id: '3', name: 'Adobe AfterEffects'},
      {id: '4', name: 'Adobe Illustrator'},
      {id: '5', name: 'Adobe Lightroom'},
    ]
  });
  type DropItem = {
    item: string
  }
  const [dropped, setDropped] = React.useState<DropItem[]>();
  const ref = React.useRef(null);
  const { dropProps, isDropTarget } = useDrop({
    ref,
    async onDrop(e) {
      console.log(e)
      const items = await Promise.all(
        e.items.filter((item) => (
          item.kind === 'text' &&
          item.types.has('SimpleListViewDnd')
        ))
        .map(async (item) => {
          item = item as TextDropItem
          return {
            item: await item.getText('text/plain')
          }
        })
      );
      setDropped(items);
    }
  });
  const { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys) => [...keys].map((key) => ({
      'SimpleListViewDnd': 'true',
      'text/plain': String(lst.getItem(key).name),
    })),
  });

  const DroppableStyle = {
    height: '100%',
  }

  return <>
    <Flex wrap gap="size-200">
      <ListView
        selectionMode="multiple"
        aria-label="Static ListView items example"
        width="100%"
        maxWidth="size-6000"
        dragAndDropHooks={dragAndDropHooks}
        items={lst.items}
      >
        {(item) => (
          <Item key={item.id}>{item.name}</Item>
        )}
      </ListView>
      <View
        borderWidth="thin"
        borderRadius="regular"
        borderColor={isDropTarget ? "focus" : "default"}
        backgroundColor={isDropTarget ? "informative" : "transparent"}
        padding="size-100"
        width="100%"
        maxWidth="size-6000"
        minHeight="size-2000"
      >
        <div
          style={DroppableStyle}
          ref={ref}
          {...dropProps}
        >
          {(dropped && dropped.map((elm) => elm.item).join(" / ")) || 'Drop here'}
        </div>
      </View>
    </Flex>
  </>
}
