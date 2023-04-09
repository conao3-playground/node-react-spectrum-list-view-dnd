import {defaultTheme, Flex, Heading, Provider, View} from '@adobe/react-spectrum';
import { SimpleListView } from './components/SimpleListView';

export function App() {
  return (
    <Provider theme={defaultTheme} colorScheme='dark' height="100%">
      <View padding="size-100">
        <Flex direction="column" width="100%" maxWidth="1200px" gap="size-100" margin="0 auto">
          <View backgroundColor="celery-600" height="size-800" />
          <View backgroundColor="blue-600" height="size-800" />
          <View backgroundColor="magenta-600" height="size-800" />
          <Heading level={1}>SimpleListView</Heading>
          <SimpleListView />
        </Flex>
      </View>
    </Provider>
  );
}
