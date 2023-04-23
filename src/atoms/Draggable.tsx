import { DragOptions as _DragOptions, useDrag } from "react-aria";
import { ForwardedRef, forwardRef } from "react";
import { getBorderColorValue, getBorderRadiusValue, getBorderSizeValue, getDimensionValue } from "../utils/reactSpectrum";

export interface DragOptions extends Omit<_DragOptions, 'getItems'> {
  draggableId?: string;
}

function _Draggable(props: DragOptions, ref: ForwardedRef<HTMLDivElement>) {
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
    <div
      style={{
        borderColor: getBorderColorValue("default"),
        borderWidth: getBorderSizeValue("thin"),
        borderStyle: "solid",
        padding: getDimensionValue("size-100"),
        borderRadius: getBorderRadiusValue("regular"),
        opacity: isDragging ? 0.5 : 1,
      }}
      ref={ref}
      {...dragProps}
    >
      Draggable
    </div>
  )
}

export const Draggable = forwardRef(_Draggable);
