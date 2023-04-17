import {defaultTheme, Flex, Heading, Provider, useListData, View} from '@adobe/react-spectrum';
import { DraggableListView } from './molecules/DraggableListView';
import { SimpleListViewDragIntoList } from './components/SimpleListViewDragIntoList';
import { SimpleListViewDndFrom } from './components/SimpleListViewDndFrom';
import { Draggable } from './atoms/Draggable';
import { Droppable } from './atoms/Droppable';
import { DraggableDroppable } from './molecules/DraggableDroppable';
import { MyListView } from './atoms/MyListView';

export function App() {
  const initialItems = [
    {id: '1', name: 'Adobe Photoshop'},
    {id: '2', name: 'Adobe InDesign'},
    {id: '3', name: 'Adobe AfterEffects'},
    {id: '4', name: 'Adobe Illustrator'},
    {id: '5', name: 'Adobe Lightroom'},
  ]
  const myListViewLst = useListData({initialItems});

  return (
    <Provider
      theme={defaultTheme}
      colorScheme='dark'
      minHeight="100vh"
      UNSAFE_className='spectrum spectrum--medium spectrum--dark'
    >
      <View padding="size-100">
        <Flex direction="column" maxWidth="1200px" gap="size-300" margin="0 auto">
          <View>
            <Heading level={1}>Atoms</Heading>
            <Flex direction="column" gap="size-300">
              <View>
                <Heading level={2}>ListView</Heading>
                <MyListView lst={myListViewLst} />
              </View>
              <View>
                <Heading level={2}>Draggable</Heading>
                <Draggable />
              </View>
              <View>
                <Heading level={2}>Droppable</Heading>
                <Droppable />
              </View>
            </Flex>
            <Heading level={1}>Molecules</Heading>
            <Flex direction="column" gap="size-300">
              <View>
                <Heading level={2}>DraggableDroppable</Heading>
                <DraggableDroppable />
              </View>
              <View>
                <Heading level={2}>DraggableListView</Heading>
                <DraggableListView />
              </View>
            </Flex>
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
