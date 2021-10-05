import React, { useEffect } from 'react';
import Header from './Header.js';
import Home from './Home.js'
import Checkout from './Checkout.js';
import Login from './Login.js'
import Orders from './Orders.js'
import Payment from './Payment.js'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { auth } from './firebase'
import { useStateValue } from './StateProvider.js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const promise = loadStripe('pk_test_51J3PzZK0Y0lJuG2eNmIwASSp1QJXXWbBVO4Kt8iMRMYOCGLdxYhXZccBJR5q4xXefPLrsMHBy8RRxgobm9QW5h8j00uwogiOHj');


function App() {
  const [{ }, dispatch] = useStateValue();

  useEffect(() => {
    // this will only run once when app component loads
    auth.onAuthStateChanged(authUser => {
      console.log('THE USER IS>>>>>', authUser)

      if (authUser) {
        // user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser

        })

      } else {
        //user is logged out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    })


  }, [])

  return (
    <Router>
      <div className="app">
        {/*because the header component is on every page you can also put it outside the route and switch */}
        <Switch>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/payment">
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router >

  );
}

export default App;
