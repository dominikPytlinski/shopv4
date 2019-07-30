import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './components/Login';
import Header from './components/Header';
import Logout from './components/Logout';
import AddProduct from './components/AddProduct';
import Products from './components/Products';
import Main from './components/Main';

import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
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
    }
  }

  checkRefetch = (isAdded) => {
    isAdded && this.setState({ refetch: true });
  }

  render() 
  {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Header isLogged={this.state.isLogged}/>
          <Route 
            path="/" exact
            render={() => <Main />}
          />
          <Route 
            path="/products"
            render={() => <Products refetch={this.state.refetch} />}
          />
          <Route 
            path="/add-product"
            render={() => <AddProduct refetch={this.checkRefetch} isLogged={this.state.isLogged} />}
          />
          <Route 
            path="/login"
            render={() => <Login isLogged={this.state.isLogged} login={this.login} />}
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
