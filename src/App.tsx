import {defaultTheme, Flex, Heading, Provider, View} from '@adobe/react-spectrum';
import { SimpleListView } from './components/SimpleListView';
import { SimpleListViewDnd } from './components/SimpleListViewDnd';
import { SimpleListViewDragIntoList } from './components/SimpleListViewDragIntoList';
import { SimpleListViewDndFrom } from './components/SimpleListViewDndFrom';

export function App() {
  return (
    <Provider
      theme={defaultTheme}
      colorScheme='dark'
      height="100%"
      UNSAFE_className='spectrum spectrum--medium spectrum--dark'
    >
      <View padding="size-100">
        <Flex direction="column" width="100%" maxWidth="1200px" gap="size-300" margin="0 auto">
          <View>
            <Heading level={1}>SimpleListView</Heading>
            <SimpleListView />
          </View>
          <View>
            <Heading level={1}>SimpleListViewDnd</Heading>
            <SimpleListViewDnd />
          </View>
          <View>
            <Heading level={1}>SimpleListViewDndFrom</Heading>
            <SimpleListViewDndFrom />
          </View>
          <View>
            <Heading level={1}>SimpleListViewDragIntoList</Heading>
            <SimpleListViewDragIntoList />
          </View>
        </Flex>
      </View>
    </Provider>
  );
}
