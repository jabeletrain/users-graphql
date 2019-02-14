import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import autoBind from 'react-autobind';

const DELETE_USER_QUERY = gql`
mutation DeleteUserQuery($id: String!) {
    deleteUser(id: $id) {
        id
        firstName
        age
    }
}
`;

export default class DeleteUser extends Component {
    constructor() {
        super();
        autoBind(this);

        this.state = {
            id: null,
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
            <Mutation mutation={DELETE_USER_QUERY}>
                {
                    (deleteUser) => (                        
                        <Fragment>
                            <h4>Delete User</h4>
                            <label htmlFor="id_id" style={labelStyle}>ID:</label><input type="text" style={textStyle} id="id_id" name="id" value={this.state.id} onChange={this.handleChange} /><br /><br /><br />
                            <button onClick={ e => {
                                        deleteUser( { variables: {
                                            id: this.state.id,
                                        }})
                                }
                            } >Delete</button><br /><br /><br />
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