import { Item, ListData, ListView, SpectrumListViewProps } from "@adobe/react-spectrum";

interface ItemData {
  id: string;
  name: string;
};

interface MyListViewProps<T extends ItemData> extends Omit<SpectrumListViewProps<T>, "children"> {
  lst: ListData<T>;
}

export function MyListView<T extends ItemData>(props: MyListViewProps<T>) {
  const { lst, ...rest } = props;
  return (
    <ListView
      selectionMode="multiple"
      aria-label="Static ListView items example"
      width="100%"
      maxWidth="size-6000"
      items={lst.items}
      {...rest}
    >
      {(item) => (
        <Item key={item.id}>{item.name}</Item>
      )}
    </ListView>
  )
}
