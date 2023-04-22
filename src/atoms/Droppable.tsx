import React from 'react';
import type { TextDropItem } from 'react-aria';
import { useDrop } from 'react-aria';
import { getBorderColorValue, getBorderRadiusValue, getBorderSizeValue, getDimensionValue } from '../utils/reactSpectrum';

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
    <div
      {...dropProps}
      ref={ref}
      style={{
        borderColor: getBorderColorValue("dark"),
        borderWidth: getBorderSizeValue("thin"),
        borderRadius: getBorderRadiusValue("regular"),
        borderStyle: "dashed",
        padding: getDimensionValue("size-100"),
        backgroundColor: isDropTarget ? 'var(--spectrum-accent-background-color-key-focus)' : 'transparent',
      }}
    >
      {dropped || 'Drop here'}
    </div>
  );
}
