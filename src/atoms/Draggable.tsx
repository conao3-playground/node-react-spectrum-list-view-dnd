import { DragOptions as _DragOptions, useDrag } from "react-aria";
import { MyView } from "./MyView";
import { DOMRef } from "@react-types/shared";
import { forwardRef } from "react";

export interface DragOptions extends Omit<_DragOptions, 'getItems'> {
  draggableId?: string;
}

function _Draggable(props: DragOptions, ref: DOMRef) {
  const {
    draggableId = "draggable", ...otherProps
  } = props;
  const { dragProps, isDragging } = useDrag({
    getItems() {
      return [{
        'text/plain': 'hello world',
        [ draggableId ]: 'true',
      }];
    },
    ...otherProps
  })

  return (
    <MyView
      borderColor="default"
      borderWidth="thin"
      padding="size-100"
      borderRadius="regular"
      filterDomProps={false}
      ref={ref}
      UNSAFE_style={{
        opacity: isDragging ? 0.5 : 1,
      }}
      {...dragProps}
    >
      Draggable
    </MyView>
  )
}

export const Draggable = forwardRef(_Draggable);
