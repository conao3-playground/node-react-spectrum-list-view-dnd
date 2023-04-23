import { Flex, useDragAndDrop } from "@adobe/react-spectrum";
import { Droppable } from "../atoms/Droppable";
import { ItemData, MyListView, MyListViewProps } from "../atoms/MyListView";

export interface DraggableListViewProps<T extends ItemData> extends MyListViewProps<T> {};

export function DraggableListView<T extends ItemData>(props: DraggableListViewProps<T>) {
  const draggableId = "DraggableListView";
  const { dragAndDropHooks } = useDragAndDrop({
    getItems: (keys) => [...keys].map((key) => ({
      [ draggableId ]: 'true',
      'text/plain': String(props.lst.getItem(key).name),
    })),
  });

  return (
    <Flex wrap gap="size-200">
      <MyListView dragAndDropHooks={dragAndDropHooks} {...props} />
      <Droppable draggableId={draggableId} />
    </Flex>
  )
}
