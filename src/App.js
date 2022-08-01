import Lay_out from './containers/Lay_out';
import { Route, Switch } from 'react-router-dom';
import Product from './components/Product';
import { Provider } from 'react-redux';
import { configstore } from './Redux/Store';

function App() {
  const store_productdata = configstore()
  return (
  <>
  <Provider store={store_productdata}>
  <Switch>
    <Lay_out>
      <Route path={"/products"} exact component={Product}/>
    </Lay_out>
  </Switch>
  </Provider>
  </>
  );
}

export default App;
