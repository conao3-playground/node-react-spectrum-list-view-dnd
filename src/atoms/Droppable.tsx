import React from 'react';
import type { TextDropItem } from 'react-aria';
import { useDrop } from 'react-aria';
import { getAliasValue, getBorderColorValue, getDimensionValue, getSemanticColorValue } from '../utils/reactSpectrum';
import { getBorderSizeValue } from '../utils/reactSpectrum';
import { getBorderRadiusValue } from '../utils/reactSpectrum';
import { getColorValue } from '../utils/reactSpectrum';

type DropptableProps = {
  draggableId?: string;
}

export function Droppable(props: DropptableProps) {
  const { draggableId = "draggable" } = props;
  const [dropped, setDropped] = React.useState<string | null>(null);
  const ref = React.useRef(null);
  const { dropProps, isDropTarget } = useDrop({
    ref,
    async onDrop(e) {
      console.log(e);
      const items = await Promise.all(
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
      style={{
        padding: getDimensionValue("size-100"),
        borderRadius: getBorderRadiusValue("regular"),
        borderColor: isDropTarget ? getSemanticColorValue("informative", "default") : getBorderColorValue("dark"),
        borderWidth: getBorderSizeValue("thin"),
        borderStyle: isDropTarget ? "solid" : "dashed",
        backgroundColor: isDropTarget ? getAliasValue("highlight-selected") : "transparent",
      }}
      ref={ref}
      {...dropProps}
    >
      {dropped || 'Drop here'}
    </div>
  )
}
