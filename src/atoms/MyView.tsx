/*
 * Copyright 2020 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

import {ClearSlots, useDOMRef, useSlotProps, useStyleProps, viewStyleProps} from '@react-spectrum/utils';
import {ColorVersion, DOMRef} from '@react-types/shared';
import {filterDOMProps} from '@react-aria/utils';
import {forwardRef, ReactElement} from 'react';
import {ViewProps as _ViewProps} from '@adobe/react-spectrum';

interface ViewProps<C extends ColorVersion> extends _ViewProps<C> {
  UNSAFE_props?: React.HTMLAttributes<HTMLElement>;
}

function View<C extends ColorVersion>(props: ViewProps<C>, ref: DOMRef) {
  props = useSlotProps(props);
  const {
    elementType: ElementType = 'div',
    children,
    UNSAFE_props = {},
    ...otherProps
  } = props;
  const {styleProps} = useStyleProps(props, viewStyleProps);
  const domRef = useDOMRef(ref);

  return (
    <ElementType
      {...filterDOMProps(props)}
      {...styleProps}
      {...UNSAFE_props}
      ref={domRef}>
      <ClearSlots>
        {children}
      </ClearSlots>
    </ElementType>
  );
}

/**
 * View is a general purpose container with no specific semantics that can be used for custom styling purposes.
 * It supports Spectrum style props to ensure consistency with other Spectrum components.
 */
const _View = forwardRef(View) as <C extends ColorVersion = 5>(props: ViewProps<C> & {ref?: DOMRef}) => ReactElement;
export {_View as MyView};
