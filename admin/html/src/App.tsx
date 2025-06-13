
import { Provider } from 'react-redux';
import initialStore from 'store';
import RouterComponent from 'commons/routes';
import 'global.css';

const App = () => {
  return (
    <Provider store={initialStore()}>
      <RouterComponent/>
    </Provider>
  )
}

export default App;
