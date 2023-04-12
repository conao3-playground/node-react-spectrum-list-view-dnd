import React from 'react';
import type { TextDropItem } from 'react-aria';
import { useDrop } from 'react-aria';

export function Droppable() {
  let [dropped, setDropped] = React.useState<string | null>(null);
  let ref = React.useRef(null);
  let { dropProps, isDropTarget } = useDrop({
    ref,
    async onDrop(e) {
      let items = await Promise.all(
        e.items
          .filter((item) =>
            item.kind === 'text' && item.types.has('text/plain')
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
      className={`spectrum-Dropzone${isDropTarget ? ' is-dragged' : ''}`}
    >
      {dropped || 'Drop here'}
    </div>
  );
}
