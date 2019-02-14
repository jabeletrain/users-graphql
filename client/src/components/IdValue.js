import React, { Component } from 'react';
import autoBind from 'react-autobind';

export default class IdValue extends Component {
    constructor() {
        super();
        autoBind(this);

        this.state = {
            id: null,
            display: false,
        };
    }

    display() {
        this.setState( { display: true });
        this.props.callBack(this.state);
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
            <div>
                <label htmlFor="id_id" style={labelStyle}>ID:</label><input type="text" style={textStyle} id="id_id" name="id" value={this.state.id} onChange={this.handleChange} /><br /><br /><br />
                <button onClick={this.display} style={buttonStyle}>Display</button><br /><br /><br />
            </div>
        )
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