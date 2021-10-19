import './styles/App.scss';
import lighttheme from './theme/lighttheme';
import AppRoutes from './routes'
import { ThemeProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';
import store from './redux-saga/store';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={lighttheme}>
        <AppRoutes />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
