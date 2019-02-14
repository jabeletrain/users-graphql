import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import autoBind from 'react-autobind';
import IdValue from './IdValue';

const USER_QUERY = gql`
    query UserQuery($id: String!) {
        user(id: $id) {
            id
            firstName
            age
            company {
                id
                name
                description
            }
        }
    }
`;


export default class User extends Component {
    constructor() {
        super();
        autoBind(this);
        
        this.state = {
            display: false,
            id: null,
        };
    }

    display() {
        this.setState( { display: true });
    }

    reset() {
        this.setState( { display: false });
    }

    childValues(values) {
        this.setState(values);
    }

    render() {
        if (this.state.display === false) {
            return (
                <div>
                    <h4>User</h4>
                    <IdValue callBack={this.childValues} />
                </div>
            );
        } else if (this.state.display === true && this.state.id !== null) {
            let id = this.state.id;

            return (
                <Fragment>
                    <Query query={USER_QUERY} variables={{id}}>
                        {
                            ({ loading, error, data }) => {
                                if (loading) <h4>Loading...</h4>
                                if (error) console.log('Error', error);
                                if (data.user == undefined) {
                                    return ( <div></div> );
                                } else {
                                    return (
                                        <div>
                                            <h4>User Data</h4>
                                            <ul>
                                                <li>ID: {data.user.id}</li>
                                                <li>First Name: {data.user.firstName}</li>
                                                <li>Age: {data.user.age}</li>
                                                <li>Company Name: {data.user.company.name}</li>
                                                <li>Description: {data.user.company.description}</li>
                                            </ul>
                                        </div>
                                    )
                                }
                            }
                        }
                    </Query>
                    <button onClick={this.reset}>Reset</button><br /><br /><br />
                </Fragment>
            );
        }
    }

}
