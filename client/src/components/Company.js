import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import autoBind from 'react-autobind';
import IdValue from './IdValue';

const COMPANY_QUERY = gql`
    query CompanyQuery($id: String!) {
        company(id: $id) {
            id
            name
            description
        }
    }
`;

export default class Company extends Component {
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
                    <h4>Company</h4><br />
                    <IdValue callBack={this.childValues} />
                </div>
            );
        } else if (this.state.display === true && this.state.id !== null) {
            let id = this.state.id;

            return (
                <Fragment>
                    <Query query={COMPANY_QUERY} variables={{id}}>
                        {
                            ({ loading, error, data }) => {
                                if (loading) <h4>Loading...</h4>
                                if (error) console.log('Error', error);
                                console.log ('Data', data);
                                if (data.company == undefined) {
                                    return ( <div></div> );
                                } else {
                                    return (
                                        <div>
                                            <h4>Company Data</h4>
                                            <ul>
                                                <li>ID: {data.company.id}</li>
                                                <li>Name: {data.company.name}</li>
                                                <li>Description: {data.company.description}</li>
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
