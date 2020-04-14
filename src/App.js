import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import Review from './components/Review/Review';
import ProductDetail from './components/ProductDetail/ProductDetail';
import NotFound from './components/NotFound/NotFound';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import { createContext } from 'react';
import {AuthContextProvider, PrivateRoute} from './components/Login/use-auth'
import Shipment from './components/Shipment/Shipment';

export const UserContext = createContext();

function App() {
  const user = {name: 'koduMia', email: 'koduand modu@email.com'}
  return (
    <div>
      <AuthContextProvider>
      <Header></Header>
      <Router>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          
          <Route path="/review">
            <Review></Review>
          </Route>

          
          <Route path="/inventory">
            <Inventory></Inventory>
          </Route>

          <Route exact path="/">
           <Shop></Shop>
          </Route>

          <Route path="/product/:productKey">
           <ProductDetail></ProductDetail>
          </Route>

          <Route path="/Login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/Shipment">
              <Shipment></Shipment>
          </PrivateRoute>
          <Route path="*">
           <NotFound></NotFound>
          </Route>
        </Switch> 
      </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
