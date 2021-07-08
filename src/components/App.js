import '../style/App.css';

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from "@apollo/client";
//import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import GetVeicles from './GetVehicles';
import GetDrivers from './GetDrivers';
import Register from './SignUp';
import Login from './Login';

const link = from([
  new HttpLink({uri: "http://localhost:4000/api"})
]);

const token = localStorage.getItem('AUTH_TOKEN'); 

/*const authLink = setContext((_, { headers }) => {  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});*/

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link
});


function App() {
  return <Router>
    <ApolloProvider client={client}>
    <Route path="/sign-up"  component={ Register } />
    <Route path="/login" component={ Login } />
    <Route path="/vehicle" render = { () => token ? (<GetVeicles/>) : (<Redirect to="/login"/>)} />
    <Route path="/driver" render = { () => token ? (<GetDrivers/>) : (<Redirect to="/login"/>)} />
    </ApolloProvider>
    </Router>;
}

export default App;
