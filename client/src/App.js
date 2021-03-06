import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import Login from './components/Login';
import Header from './components/Header';
import Logout from './components/Logout';
import AddProduct from './components/AddProduct';
import Products from './components/Products';
import Main from './components/Main';
import Product from './components/Product';
import Users from './components/Users';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import Register from './components/Register';

import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  request: async operation => {
    const auth = await JSON.parse(sessionStorage.getItem('auth'));
    operation.setContext({
      headers: {
        authorization: auth ? `Bearer ${auth.data.token}` : ''
      }
    })
  }
});

class App extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      isLogged: sessionStorage.getItem('auth') ? true : false,
      refetch: false
    }
  }

  login = (isLogged) => {
    if(isLogged) this.setState({ isLogged: true });
  }

  logout = (isLogout) => {
    if(isLogout) {
      sessionStorage.clear();
      this.setState({ isLogged: false });
      this.notify();
    }
  }

  notify = () => {
    toast.success('Nastąpiło poprawne wylogowanie')
  }

  render() 
  {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Header isLogged={this.state.isLogged}/>
          <ToastContainer position="top-center" />
          <Route 
            path="/" exact
            render={() => <Main />}
          />
          <Route 
            path="/products"
            render={() => <Products />}
          />
          <Route
            path="/product/:id"
            render={({ match }) => <Product id={match.params.id} />}
          />
          <Route 
            path="/add-product"
            render={() => <AddProduct isLogged={this.state.isLogged} />}
          />
          <Route 
            path="/users"
            render={() => <Users isLogged={this.state.isLogged} logout={this.logout}/>}
          />
          <Route
            path="/add-user"
            render={() => <AddUser isLogged={this.state.isLogged} />}
          />
          <Route 
            path="/edit-user/:id"
            render={({ match }) => <EditUser isLogged={this.state.isLogged} id={match.params.id} />}
          />
          <Route 
            path="/login"
            render={() => <Login isLogged={this.state.isLogged} login={this.login} />}
          />
          <Route 
            path="/register"
            component={Register}
          />
          <Route
            path="/logout"
            render={() => <Logout isLogged={this.state.isLogged} logout={this.logout} />}
          />
        </BrowserRouter>
      </ApolloProvider>
    )
  }
}

export default App;
