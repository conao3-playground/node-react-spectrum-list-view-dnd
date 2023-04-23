import { DropItem, DroppableCollectionDropEvent, DroppableCollectionInsertDropEvent, DroppableCollectionRootDropEvent, Flex, TextDropItem, View, useDragAndDrop } from "@adobe/react-spectrum";
import { ItemData, MyListView, MyListViewProps } from "../atoms/MyListView";
import { Draggable } from "../atoms/Draggable";
import { useState } from "react";

export type Action = 'onDrop' | 'onInsert' | 'onRootDrop';
export interface DroppableListViewProps<T extends ItemData> extends MyListViewProps<T> {
  actions: Action[];
};

export function DroppableListView<T extends ItemData>(props: DroppableListViewProps<T>) {
  const draggableId = "DroppableListView";
  const { actions, ...rest } = props;
  const [ cnt, setCnt ] = useState(0);

  const onDropFn = async (e: DroppableCollectionDropEvent) => {
    console.log(e);
    const { items, target } = e;
    const processedItems: any[] = await Promise.all(
      items.map(async (item_: DropItem) => {
        setCnt((cnt) => cnt + 1);
        const item = item_ as TextDropItem;
        return {
          id: 'tmp' + cnt,
          name: await item.getText('text/plain') + ` ${cnt}`,
        }
      })
    );
    switch (target.type) {
      case 'root':
        props.lst.append(...processedItems);
        break;
      case 'item':
        switch (target.dropPosition) {
          case 'before':
            props.lst.insertBefore(target.key, ...processedItems)
            break;
          case 'after':
            props.lst.insertAfter(target.key, ...processedItems)
            break;
          case 'on':
            const origItem = props.lst.getItem(target.key);
            props.lst.update(target.key, {...origItem, name: `${origItem.name} updated ${cnt}` })
            break;
          default:
            const _: never = target.dropPosition;
        }
        break;
      default:
        const _: never = target;
    }
  };

  const onInsertFn = async (e: DroppableCollectionInsertDropEvent) => {
    console.log(e);
    const { items, target } = e;
    const processedItems: any[] = await Promise.all(
      items.map(async (item_: DropItem) => {
        setCnt((cnt) => cnt + 1);
        const item = item_ as TextDropItem;
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
    switch (target.dropPosition) {
      case 'before':
        props.lst.insertBefore(target.key, ...processedItems)
        break;
      case 'after':
        props.lst.insertAfter(target.key, ...processedItems)
        break;
      default:
        throw new Error(`Unexpected dropPosition: ${target.dropPosition}`)
    }
  }

  const onRootDropFn = async (e: DroppableCollectionRootDropEvent) => {
    console.log(e);
    const { items } = e;
    const processedItems: any[] = await Promise.all(
      items.map(async (item_: DropItem) => {
        setCnt((cnt) => cnt + 1);
        const item = item_ as TextDropItem;
        return {
          id: 'tmp' + cnt,
          name: await item.getText('text/plain') + ` ${cnt}`,
        }
      })
    );
    props.lst.append(...processedItems);
  }

  const actionFn = {
    'onDrop': onDropFn,
    'onInsert': onInsertFn,
    'onRootDrop': onRootDropFn,
  }

  const { dragAndDropHooks } = useDragAndDrop({
    acceptedDragTypes: [draggableId],
    ...(actions.includes('onDrop') ? {onDrop: actionFn['onDrop']} : {}),
    ...(actions.includes('onInsert') ? {onInsert: actionFn['onInsert']} : {}),
    ...(actions.includes('onRootDrop') ? {onRootDrop: actionFn['onRootDrop']} : {}),
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
