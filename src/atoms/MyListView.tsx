import { Item, ListData, ListView } from "@adobe/react-spectrum";

interface ItemData {
  id: string;
  name: string;
};

type MyListViewProps<T extends ItemData> = {
  lst: ListData<T>;
}

export function MyListView<T extends ItemData>(props: MyListViewProps<T>) {
  return (
    <ListView
      selectionMode="multiple"
      aria-label="Static ListView items example"
      width="100%"
      maxWidth="size-6000"
      items={props.lst.items}
    >
      {(item) => (
        <Item key={item.id}>{item.name}</Item>
      )}
    </ListView>
  )
}
