import { Item, ListView } from "@adobe/react-spectrum";

export function SimpleListView() {
  return (
    <ListView
      selectionMode="multiple"
      aria-label="Static ListView items example"
      maxWidth="size-6000"
    >
      <Item>Adobe Photoshop</Item>
      <Item>Adobe InDesign</Item>
      <Item>Adobe AfterEffects</Item>
      <Item>Adobe Illustrator</Item>
      <Item>Adobe Lightroom</Item>
    </ListView>
  )
}
