import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import autoBind from 'react-autobind';

const EDIT_COMPANY_QUERY = gql`
    mutation EditCompanyQuery($id: String!, $name: String, $description: String) {
        editCompany(id: $id, name: $name, description: $description) {
            id
            name
            description
        }
    }
`;

export default class UpdateCompany extends Component {
    constructor() {
        super();
        autoBind(this);

        this.state = {
            id: null,
            name: undefined,
            description: undefined,
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
            <Mutation mutation={EDIT_COMPANY_QUERY}>
                {
                    (editCompany) => (                        
                        <Fragment>
                            <h4>Update Company</h4>
                            <label htmlFor="id_id" style={labelStyle}>ID:</label><input type="text" style={textStyle} id="id_id" name="id" value={this.state.id} onChange={this.handleChange} /><br />
                            <label htmlFor="id_name" style={labelStyle}>Company Name:</label><input type="text" style={textStyle} id="id_name" name="name" value={this.state.name} onChange={this.handleChange} /><br />
                            <label htmlFor="id_description" style={labelStyle}>Description:</label><input type="text" id="id_description" style={textStyle} name="description" value={this.state.description} onChange={this.handleChange} /><br /><br /><br />
                            <button onClick={ e => {
                                        editCompany( { variables: {
                                            id: this.state.id,
                                            name: this.state.name,
                                            description: this.state.description,
                                        }})
                                }
                            } >Update</button><br /><br /><br />
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