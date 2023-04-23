import { Flex, TextDropItem, View, useDragAndDrop } from "@adobe/react-spectrum";
import { ItemData, MyListView, MyListViewProps } from "../atoms/MyListView";
import { Draggable } from "../atoms/Draggable";
import { useState } from "react";

export type Action = 'onInsert';
export interface DroppableListViewProps<T extends ItemData> extends MyListViewProps<T> {
  actions: Action[];
};

export function DroppableListView<T extends ItemData>(props: DroppableListViewProps<T>) {
  const draggableId = "DroppableListView";
  const { actions, ...rest } = props;
  const [ cnt, setCnt ] = useState(0);
  const action_fn = {
    'onInsert': async (e: any) => {
      console.log(e);
      const { items, target } = e;
      const processedItems = await Promise.all(
        items.map(async (item: TextDropItem) => {
          setCnt((cnt) => cnt + 1);
          return {
            id: 'tmp' + cnt,
            name: await item.getText('text/plain') + ` ${cnt}`,
          }
        })
      );
      if (target.dropPosition === 'before') {
        props.lst.insertBefore(target.key, ...processedItems)
      } else {
        props.lst.insertAfter(target.key, ...processedItems)
      }
    }
  }
  const { dragAndDropHooks } = useDragAndDrop({
    acceptedDragTypes: [draggableId],
    ...(actions.includes('onInsert') ? {onInsert: action_fn['onInsert']} : {})
  });

  return (
    <Flex wrap gap="size-200">
      <View alignSelf="normal">
        <Draggable draggableId={draggableId} />
      </View>
      <MyListView
        dragAndDropHooks={dragAndDropHooks}
        {...rest}
      />
    </Flex>
  )
}
