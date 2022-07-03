import Lay_out from './containers/Lay_out';
import { Route, Switch } from 'react-router-dom';
import Product from './components/Product';

function App() {
  return (
  <>
  <Switch>
    <Lay_out>
      <Route path={"/products"} exact component={Product}/>
    </Lay_out>
  </Switch>
  </>
  );
}

export default App;
