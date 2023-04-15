import { Flex } from "@adobe/react-spectrum";
import { Draggable } from "../atoms/Draggable";
import { Droppable } from "../atoms/Droppable";

type DraggrableDroppableProps = {
  draggableId?: string;
}

export function DraggableDroppable(props: DraggrableDroppableProps) {
  const { draggableId = "draggable" } = props;
  return (
    <Flex gap="size-200">
      <Draggable draggableId={draggableId} />
      <Droppable draggableId={draggableId} />
    </Flex>
  )
}
