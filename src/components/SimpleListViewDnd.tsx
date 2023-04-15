import { Flex, Item, ListView, useDragAndDrop, useListData } from "@adobe/react-spectrum";
import { Droppable } from "../atoms/Droppable";

export function SimpleListViewDnd() {
  const draggableId = "SimpleListViewDnd";
  const lst = useListData({
    initialItems: [
      {id: '1', name: 'Adobe Photoshop'},
      {id: '2', name: 'Adobe InDesign'},
      {id: '3', name: 'Adobe AfterEffects'},
      {id: '4', name: 'Adobe Illustrator'},
      {id: '5', name: 'Adobe Lightroom'},
    ]
  });
  const { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys) => [...keys].map((key) => ({
      [ draggableId ]: 'true',
      'text/plain': String(lst.getItem(key).name),
    })),
  });

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
      <Droppable draggableId={draggableId}/>
    </Flex>
  </>
}
