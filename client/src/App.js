import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './components/Login';
import Header from './components/Header';
import Logout from './components/Logout';

import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

class App extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      isLogged: sessionStorage.getItem('auth') ? true : false
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

  render() 
  {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Header isLogged={this.state.isLogged}/>
          <Route 
            path="/" exact
            render={() => {}}
          />
          <Route 
            path="/login"
            render={() => <Login isLogged={this.state.isLogged} login={this.login} />}
          />
          <Route
            path="/logout"
            render={() => <Logout logout={this.logout} />}
          />
        </BrowserRouter>
      </ApolloProvider>
    )
  }
}

export default App;
