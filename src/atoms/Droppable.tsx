import React from 'react';
import type { TextDropItem } from 'react-aria';
import { useDrop } from 'react-aria';
import { MyView } from './MyView';
import { getAliasValue } from '../utils/reactSpectrum';
import { getBorderSizeValue } from '../utils/reactSpectrum';
import { getBorderRadiusValue } from '../utils/reactSpectrum';
import { getColorValue } from '../utils/reactSpectrum';

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
      padding="size-100"
      filterDomProps={false}
      ref={ref}
      UNSAFE_style={{
        borderRadius: getBorderRadiusValue("regular"),
        borderColor: isDropTarget ? getColorValue("blue-400") : getColorValue("gray-400"),
        borderWidth: getBorderSizeValue("thin"),
        borderStyle: isDropTarget ? "solid" : "dashed",
        backgroundColor: isDropTarget ? getAliasValue("highlight-selected") : "transparent",
      }}
      {...dropProps}
    >
      {dropped || 'Drop here'}
    </MyView>
  )
}
