import React from 'react';
import type { TextDropItem } from 'react-aria';
import { useDrop } from 'react-aria';
import { MyView } from './MyView';

type DropptableProps = {
  draggableId?: string;
}

export function Droppable(props: DropptableProps) {
  const { draggableId = "draggable" } = props;
  let [dropped, setDropped] = React.useState<string | null>(null);
  let ref = React.useRef(null);
  let { dropProps, isDropTarget } = useDrop({
    ref,
    async onDrop(e) {
      console.log(e);
      let items = await Promise.all(
        e.items
          .filter((item) =>
            item.kind === 'text' &&
            item.types.has('text/plain') &&
            item.types.has(draggableId)
          )
          .map((item) => (item as TextDropItem).getText('text/plain'))
      );
      setDropped(items.join('\n'));
    }
  });

  return (
    <MyView
      backgroundColor={isDropTarget ? "blue-400" : "transparent"}
      borderColor={isDropTarget ? "transparent" : "default"}
      borderWidth="thin"
      padding="size-100"
      borderRadius="regular"
      filterDomProps={false}
      ref={ref}
      UNSAFE_style={{
        borderStyle: "dashed",
      }}
      {...dropProps}
    >
      {dropped || 'Drop here'}
    </MyView>
  )
}
