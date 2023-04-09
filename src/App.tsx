import {Button, defaultTheme, Provider} from '@adobe/react-spectrum';

export function App() {
  return (
    <Provider theme={defaultTheme} colorScheme='dark'>
      <Button
        variant="accent"
        onPress={() => alert('Hey there!')}
      >
        Hello React Spectrum!
      </Button>
    </Provider>
  );
}
