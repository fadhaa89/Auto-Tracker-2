import '../style/App.css';

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
//import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GetVeicles from './GetVehicles';
import GetDrivers from './GetDrivers';
import Register from './SignUp';
import Login from './Login';
import SubscribeMyWeb from './SubscribeMyWeb'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      toast(message)
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const link = from([
  errorLink, 
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
    <Route path="/subscribe" render = { () => token ? (<SubscribeMyWeb/>) : (<Redirect to="/login"/>)} />

    
    <ToastContainer />
    </ApolloProvider>
    </Router>;
}

export default App;
