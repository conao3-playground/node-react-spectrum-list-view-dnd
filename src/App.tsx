import {defaultTheme, Flex, Heading, Provider, View} from '@adobe/react-spectrum';
import { SimpleListView } from './components/SimpleListView';
import { SimpleListViewDnd } from './components/SimpleListViewDnd';

export function App() {
  return (
    <Provider theme={defaultTheme} colorScheme='dark' height="100%">
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
        </Flex>
      </View>
    </Provider>
  );
}
