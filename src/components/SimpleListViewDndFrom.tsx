import { Flex, useListData } from "@adobe/react-spectrum";
import { Draggable } from "../atoms/Draggable";

export function SimpleListViewDndFrom() {
  const lst = useListData({
    initialItems: [
      {id: '1', name: 'Adobe Photoshop'},
      {id: '2', name: 'Adobe InDesign'},
      {id: '3', name: 'Adobe AfterEffects'},
      {id: '4', name: 'Adobe Illustrator'},
      {id: '5', name: 'Adobe Lightroom'},
    ]
  });

  return (
    <Flex gap="size-200">
      <Draggable />
    </Flex>
  )
}
