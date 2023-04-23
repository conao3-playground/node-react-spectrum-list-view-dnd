import {
  DimensionValue as RSDimensionValue,
  ColorValue,
  BorderSizeValue,
  BorderRadiusValue,
  BorderColorAlias
} from "@react-types/shared";

// see https://github.com/adobe/react-spectrum/blob/main/packages/%40adobe/spectrum-css-temp/vars/spectrum-global.css
// see https://github.com/adobe/react-spectrum/blob/main/packages/%40adobe/spectrum-css-temp/vars/spectrum-medium.css
// see https://github.com/adobe/react-spectrum/blob/main/packages/%40adobe/spectrum-css-temp/vars/spectrum-dark.css

type DimensionValue = Omit<RSDimensionValue, number>;

export function getDimensionValue(val: DimensionValue) {
  return getRSValue(`global-dimension-${val}`)
}

export function getBorderColorValue(val: BorderColorAlias) {
  return getRSValue(`alias-border-color-${val}`)
}

export function getBorderSizeValue(val: BorderSizeValue) {
  return getRSValue(`alias-border-size-${val}`)
}

export function getBorderRadiusValue(val: BorderRadiusValue) {
  return getRSValue(`alias-border-radius-${val}`)
}

export function getColorValue(val: ColorValue) {
  return getRSValue(val);
}

export function getAliasValue(val: string) {
  return getRSValue(`alias-${val}`)
}

export function getRSValue(val: string) {
  return `var(--spectrum-${val})`
}
