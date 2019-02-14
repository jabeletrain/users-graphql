import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import autoBind from 'react-autobind';

const ADD_USER_QUERY = gql`
    mutation AddUserQuery($firstName: String!, $age: Int!, $companyId: String) {
        addUser(firstName: $firstName, age: $age, companyId: $companyId) {
            id
            firstName
            age
        }
    }
`;

export default class CreateUser extends Component {
    constructor() {
        super();
        autoBind(this);

        this.state = {
            firstName: null,
            age: null,
            companyId: null,
        }
    }


    render() {
        const labelStyle = {
            margin: "5px",
        };

        const textStyle = {
            margin: "5px",
        };

        const buttonStyle = {
            margin: "5px",
        };
        
        return (
            <Mutation mutation={ADD_USER_QUERY}>
                {
                    (addUser) => (                        
                        <Fragment>
                            <h4>Create User</h4>
                            <label htmlFor="id_firstName" style={labelStyle}>First Name:</label><input type="text" style={textStyle} id="id_firstName" name="firstName" value={this.state.firstName} onChange={this.handleChange} /><br />
                            <label htmlFor="id_age" style={labelStyle}>Age:</label><input type="text"  style={textStyle}id="id_age" name="age" value={this.state.age} onChange={this.handleChange} /><br />
                            <label htmlFor="id_companyId" style={labelStyle}>Company ID:</label><input type="text"  style={textStyle}id="id_companyId" name="companyId" value={this.state.companyId} onChange={this.handleChange} /><br /><br /><br />
                            <button style={buttonStyle} onClick={ e => {
                                        addUser( { variables: {
                                            firstName: this.state.firstName,
                                            age: parseInt(this.state.age),
                                            companyId: this.state.companyId
                                        }})
                                }
                            } >Create</button><br /><br /><br />
                        </Fragment>
                    )
                }
            </Mutation>
        );
    }

    handleChange(e) {
        if (typeof e.preventDefault === 'function') {
           e.preventDefault();
        }
    
        if ('target' in e && 'name' in e.target && 'value' in e.target) { 
          let name = e.target.name;    // Name of the state variable
          let value = e.target.value;  // The new value to be assigned to the state variable
    
          //console.log({name,value});
    
          let stateChange = {};  // Used to change the state
          stateChange[name] = value;
    
          this.setState(stateChange);
        }
        else {
          console.log(typeof e);  // Something unusual, lets find out
          console.log(e);
        }
      }
    }