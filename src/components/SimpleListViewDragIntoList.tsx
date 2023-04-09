import { Flex, Item, ListView, useDragAndDrop, useListData } from "@adobe/react-spectrum";
import type { DragAndDropOptions, ListData, TextDropItem } from "@adobe/react-spectrum"

interface Item {
  name: string;
  type?: string;
  childNodes?: Item[];
}

interface DndListViewProps extends DragAndDropOptions {
  list: ListData<Item>;
}

function DraggableListView(props: DndListViewProps) {
  let { list, ...otherProps } = props;
  let { dragAndDropHooks } = useDragAndDrop({
    // Only allow move operations when dropping items from this list
    getAllowedDropOperations: () => ['move'],
    getItems: (keys) =>
      [...keys].map((key) => {
        let item = list.getItem(key);
        // Setup the drag types and associated info for each dragged item.
        return {
          'custom-app-type': JSON.stringify(item),
          'text/plain': item.name
        };
      }),
    onDragEnd: (e) => {
      let {
        dropOperation,
        keys
      } = e;

      if (dropOperation === 'move') {
        list.remove(...keys);
      }
    },
    ...otherProps
  });

  return (
    <ListView
      aria-label="Draggable ListView in drag into list example"
      selectionMode="multiple"
      width="size-3600"
      height="size-2400"
      dragAndDropHooks={dragAndDropHooks}
      items={list.items}
    >
      {(item) => (
        <Item textValue={item.name}>{item.name}</Item>
      )}
    </ListView>
  );
}

function DroppableListView(props: DndListViewProps) {
  let { list, ...otherProps } = props;
  let { dragAndDropHooks } = useDragAndDrop({
    // Only accept items with the following drag type
    acceptedDragTypes: ['custom-app-type'],
    onInsert: async (e) => {
      let {
        items,
        target
      } = e;

      let processedItems = await Promise.all(
        items.map(async (item) =>
          JSON.parse(await (item as TextDropItem).getText('custom-app-type'))
        )
      );

      if (target.dropPosition === 'before') {
        list.insertBefore(target.key, ...processedItems);
      } else if (target.dropPosition === 'after') {
        list.insertAfter(target.key, ...processedItems);
      }
    },
    onRootDrop: async (e) => {
      let { items } = e;
      let processedItems = await Promise.all(
        items.map(async (item) =>
          JSON.parse(await (item as TextDropItem).getText('custom-app-type'))
        )
      );
      list.append(...processedItems);
    },
    ...otherProps
  });

  return (
    <ListView
      aria-label="Droppable ListView in drag into list example"
      width="size-3600"
      height="size-2400"
      dragAndDropHooks={dragAndDropHooks}
      items={list.items}
      density="compact"
    >
      {(item) => (
        <Item textValue={item.name}>{item.name}</Item>
      )}
    </ListView>
  );
}

export function SimpleListViewDragIntoList() {
  let sourceList = useListData({
    initialItems: [
      { id: '1', type: 'file', name: 'Adobe Photoshop' },
      { id: '2', type: 'file', name: 'Adobe XD' },
      { id: '3', type: 'file', name: 'Adobe InDesign' },
      { id: '4', type: 'file', name: 'Adobe AfterEffects' }
    ]
  });

  let targetList = useListData({
    initialItems: [
      { id: '5', type: 'file', name: 'Adobe Dreamweaver' },
      { id: '6', type: 'file', name: 'Adobe Fresco' },
      { id: '7', type: 'file', name: 'Adobe Connect' },
      { id: '8', type: 'file', name: 'Adobe Lightroom' }
    ]
  });

  return (
    <Flex wrap gap="size-200">
      <DraggableListView list={sourceList} />
      <DroppableListView list={targetList} />
    </Flex>
  );
}
