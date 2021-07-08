mport '../style/App.css';
//, useQuery, gql,
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from "@apollo/client";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GetVeicles from './GetVehicles';
import Register from './SignUp';
import Login from './Login';

const link = from([
  new HttpLink({uri: "http://localhost:4000/api"})
]);

const client = new ApolloClient({
  //uri: 'http://localhost:4000/api',
  cache: new InMemoryCache(),
  link: link
});


function App() {
  return <Router>
    <ApolloProvider client={client}>
    <Route path="/sign-up" component={ Register } />
    <Route path="/vehicle" component={ GetVeicles } />
    <Route path="/login" component={ Login } />
    </ApolloProvider>
    </Router>;
}

export default App;
