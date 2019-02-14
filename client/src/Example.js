import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import User from './components/User';
import Company from './components/Company';
import CreateUser from './components/CreateUser';
import UpdateUser from './components/UpdateUser';
import DeleteUser from './components/DeleteUser';
import CreateCompany from './components/CreateCompany';
import UpdateCompany from './components/UpdateCompany';
import DeleteCompany from './components/DeleteCompany';
import autoBind from 'react-autobind';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

// eslint-disable-next-line react/prefer-stateless-function
export default class Example extends React.Component {
  constructor() {
    super();
    autoBind(this);
  }

  render() {

    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Route exact path="/user" component={User} />
            <Route exact path="/company" component={Company} />
            <Route exact path="/createuser" component={CreateUser} />
            <Route exact path="/updateuser" component={UpdateUser} />
            <Route exact path="/deleteuser" component={DeleteUser} />
            <Route exact path="/createcompany" component={CreateCompany} />
            <Route exact path="/updatecompany" component={UpdateCompany} />
            <Route exact path="/deletecompany" component={DeleteCompany} />
            <div>
              <Link to={`/user`}>User</Link><br />
              <Link to={`/company`}>Company</Link><br /><br />
              <Link to={`/createuser`}>Create User</Link><br />
              <Link to={`/updateuser`}>Update User</Link><br />
              <Link to={`/deleteuser`}>Delete User</Link><br /><br />
              <Link to={`/createcompany`}>Create Company</Link><br />
              <Link to={`/updatecompany`}>Update Company</Link><br />
              <Link to={`/deletecompany`}>Delete Company</Link><br />
            </div>
          </div>
        </Router>
      </ApolloProvider>
    );
  }

}
