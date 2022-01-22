import React from 'react';

/**
* offices components
* uses our dress server REST API http://localhost:3001/offices
* props inputs: none
*/
class Offices extends React.Component {
    constructor(props) {
      super(props);

      // set initial state
      // do not use setState in constructor, write state directly
      this.state = {
        offices_data : [], // will contain offices data array from server
        offices_index : 0, // the index of the dress currently shown, start at first in array
        offices_count : 0, // how many offices in data array from server
        isLoaded : false,  // will be true after data have been received from server
        error : null       // no errors yet !
      };
    }

    // REACT component lifecycle for componentDidMount
    // https://www.w3schools.com/react/react_lifecycle.asp
    componentDidMount() {

       // AJAX call using fetch. Make sure the dress server is running !
       // see https://reactjs.org/docs/faq-ajax.html
      fetch('http://localhost:8000/offices')
        .then(
            (response)=> {
                // here full fetch response object
                //console.log(response)
                // fetch not like jQuery ! both ok code 200 and error code 404 will execute this .then code
                if (response.ok) {
                    // handle 2xx code success only
                    // get only JSON data returned from server with .json()
                    response.json().then(json_response => {
                        console.log(json_response)
                        this.setState({
                            offices_data:json_response.offices, // data received from server
                            offices_count:json_response.offices.length, // how many offices in array
                            offices_index:0,  // will first show the first dress in the array
                            isLoaded : true,  // we got data
                            error : null // no errors
                        })
                    }
                    )

                }else{
                    // handle errors, for example 404
                    response.json().then(json_response => {
                        this.setState({
                            isLoaded: false,
                            // result returned is case of error is like  {message: "dress not found"}
                            // save the error in state for display below
                            error:json_response,   // something in format  {message: "dress not found", db_data:{}}
                            offices_data: {}, // no data received from server
                            offices_count:0,
                            offices_index:0,
                        });
                    })
                }
            },

            (error) => {
                // Basically fetch() will only reject a promise if the URL is wrong, the user is offline,
                // or some unlikely networking error occurs, such a DNS lookup failure.
                this.setState({
                    isLoaded: false,
                    error: {message:"AJAX error, URL wrong or unreachable, see console"}, // save the AJAX error in state for display below
                    offices_data: {}, // no data received from server
                    offices_count:0,
                    offices_index:0,
                });
            }
        )
    }

    previousChange = (event) =>{
        let x = this.state.offices_index
            if(x > 0){
                x = x - 1
            }
        this.setState({offices_index: x })
    }

    nextChange = (event) =>{
        let x = this.state.offices_index
            if(x < this.state.offices_count - 1){
                x = x + 1
            }
        this.setState({offices_index: x })
    }

    // display the offices table
    render() {
        if(this.state.error){
            return <div><b>{this.state.error.message}</b></div>;
        }else if(this.state.isLoaded){
            if(this.state.offices_count!==0){
                // dress table not empty
                return (
                    <div>
                        <b>List of offices from server localhost:3001/offices</b>
                        <table>
                            <tbody>
                            <tr><th>code</th><td>{this.state.offices_data[this.state.offices_index].officecode}</td></tr>
                            <tr><th>City</th><td>{this.state.offices_data[this.state.offices_index].city}</td></tr>
                            <tr><th>Phone</th><td>{this.state.offices_data[this.state.offices_index].phone}</td></tr>
                            <tr><th>State</th><td>{this.state.offices_data[this.state.offices_index].state}</td></tr>
                            <tr><th>Country</th><td>{this.state.offices_data[this.state.offices_index].country}</td></tr>
                            </tbody>
                        </table>
                        <button onClick={(event)=>this.previousChange(event)}>Previous</button>
                        <button onClick={(event)=>this.nextChange(event)}>Next</button>
                    </div>
                )
            }else{
                return(<div><b>Dress table is empty</b></div>)
            }
        }else{
            return (<div><b>Waiting for server ...</b></div>)
        }
    }
  }

export default Offices;