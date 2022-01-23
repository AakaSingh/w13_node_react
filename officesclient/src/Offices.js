import React from 'react';
import styles from './Offices.module.css'

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
    refetchContent(){
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

    componentDidMount() {
        this.refetchContent()
    }

    deleteTable = (event) =>{
        let code = document.getElementById("code").placeholder

        fetch("http://localhost:8000/offices/" + code,
            {
                method: 'DELETE'
            }
        )
            .then((response) => {

                if (!response.ok) {
                    // handle response code other than 200 because
                    return "cannot delete entry"
                } else {
                    //server responds with text/html, execute second .then when done
                    this.refetchContent()
                    return response.text()
                }
            })
            .then(
                (server_text) => {
                    // show text reply on page
                    document.getElementById('response_data').innerHTML = server_text
                },

                (error) => {
                    // only NO RESPONSE URL errors will trigger this code
                    document.getElementById("response_data").innerHTML = "AJAX error: URL wrong or unreachable, see console"
                }
            )
    }

    saveTable = (event) =>{
        let data = {
            code:  (document.getElementById("code").value.length === 0? this.state.offices_data[this.state.offices_index].officecode : document.getElementById("code").value),
            addr1: (document.getElementById("addr1").value.length === 0? this.state.offices_data[this.state.offices_index].addressline1 : document.getElementById("addr1").value),
            addr2: (document.getElementById("addr2").value.length === 0? this.state.offices_data[this.state.offices_index].addressline2 : document.getElementById("addr2").value),
            city: (document.getElementById("city").value.length === 0? this.state.offices_data[this.state.offices_index].city : document.getElementById("city").value),
            state: (document.getElementById("state").value.length === 0? this.state.offices_data[this.state.offices_index].state : document.getElementById("state").value),
            country: (document.getElementById("country").value.length === 0? this.state.offices_data[this.state.offices_index].country : document.getElementById("country").value),
            phone: (document.getElementById("phone").value.length === 0? this.state.offices_data[this.state.offices_index].phone : document.getElementById("phone").value),
            pcode: (document.getElementById("pcode").value.length === 0? this.state.offices_data[this.state.offices_index].postalcode : document.getElementById("pcode").value),
            territory: (document.getElementById("territory").value.length === 0? this.state.offices_data[this.state.offices_index].territory : document.getElementById("territory").value)
        }
        fetch("http://localhost:8000/offices",
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data)
            }
        )
            .then((response) => {

                if (!response.ok) {
                    // handle response code other than 200 because
                    return ""
                } else {
                    //server responds with text/html, execute second .then when done
                    this.clearForm()
                    this.refetchContent()
                    return response.text()
                }
            })
            .then(
                (server_text) => {
                    // show text reply on page
                },

                (error) => {
                    // only NO RESPONSE URL errors will trigger this code
                    document.getElementById("response_data").innerHTML = "AJAX error: URL wrong or unreachable, see console"
                }
            )
    }

    previousChange = (event) =>{
        document.getElementById('response_data').innerHTML = ''
        let x = this.state.offices_index
            if(x > 0){
                x = x - 1
            }
        this.setState({offices_index: x })
    }

    nextChange = (event) =>{
        document.getElementById('response_data').innerHTML = ''
        let x = this.state.offices_index
            if(x < this.state.offices_count - 1){
                x = x + 1
            }
        this.setState({offices_index: x })
    }

    clearForm = (event) =>{
        document.getElementById("code").value = ""
        document.getElementById("addr1").value = ""
        document.getElementById("addr2").value = ""
        document.getElementById("city").value = ""
        document.getElementById("state").value = ""
        document.getElementById("country").value = ""
        document.getElementById("phone").value = ""
        document.getElementById("pcode").value = ""
        document.getElementById("territory").value = ""

        document.getElementById("code").placeholder = ""
        document.getElementById("addr1").placeholder = ""
        document.getElementById("addr2").placeholder = ""
        document.getElementById("city").placeholder = ""
        document.getElementById("state").placeholder = ""
        document.getElementById("country").placeholder = ""
        document.getElementById("phone").placeholder = ""
        document.getElementById("pcode").placeholder = ""
        document.getElementById("territory").placeholder = ""
    }
    // display the offices table
    render() {
        if(this.state.error){
            return <div><b>{this.state.error.message}</b></div>;
        }else if(this.state.isLoaded){
            if(this.state.offices_count!==0){
                // dress table not empty
                return (
                    <div className={styles.offdiv}>
                        {/* <b>List of offices from server localhost:3001/offices</b>
                        <table className={styles.tableoff}>
                            <tbody>
                            <tr className={styles.troff}><th>code</th><td>{this.state.offices_data[this.state.offices_index].officecode}</td></tr>
                            <tr className={styles.troff}><th>City</th><td>{this.state.offices_data[this.state.offices_index].city}</td></tr>
                            <tr className={styles.troff}><th>Phone</th><td>{this.state.offices_data[this.state.offices_index].phone}</td></tr>
                            <tr className={styles.troff}><th>State</th><td>{this.state.offices_data[this.state.offices_index].state}</td></tr>
                            <tr className={styles.troff}><th>Country</th><td>{this.state.offices_data[this.state.offices_index].country}</td></tr>
                            </tbody>
                        </table>
                        <button onClick={(event)=>this.previousChange(event)}>Previous</button>
                        <button onClick={(event)=>this.nextChange(event)}>Next</button> */}
                            Response : <span id='response_data'></span>
                            <table>
                                <tbody>
                                <tr>
                                    <td>officecode</td>
                                    <td><input type="number" name="code" id="code" placeholder={this.state.offices_data[this.state.offices_index].officecode} required /></td>
                                </tr>
                                <tr>
                                    <td>Address Line 1</td>
                                    <td><input type="text" name="addr1" id="addr1" placeholder={this.state.offices_data[this.state.offices_index].addressline1}/></td>
                                </tr>
                                <tr>
                                    <td>Address Line 2</td>
                                    <td><input type="text" name="addr2" id="addr2" placeholder={this.state.offices_data[this.state.offices_index].addressline2}/></td>
                                </tr>
                                <tr>
                                    <td>City</td>
                                    <td><input type="text" name="city" id="city" placeholder={this.state.offices_data[this.state.offices_index].city}/></td>
                                </tr>
                                <tr>
                                    <td>State</td>
                                    <td><input type="text" name="state" id="state" placeholder={this.state.offices_data[this.state.offices_index].state}/></td>
                                </tr>
                                <tr>
                                    <td>Country</td>
                                    <td><input type="text" name="country" id="country" placeholder={this.state.offices_data[this.state.offices_index].country}/></td>
                                </tr>
                                <tr>
                                    <td>Postal Code</td>
                                    <td><input type="text" name="pcode" id="pcode" placeholder={this.state.offices_data[this.state.offices_index].postalcode}/></td>
                                </tr>
                                <tr>
                                    <td>Phone</td>
                                    <td><input type="text" name="phone" id="phone" placeholder={this.state.offices_data[this.state.offices_index].phone}/></td>
                                </tr>
                                <tr>
                                    <td>Territory</td>
                                    <td><input type="text" name="territory" id="territory" placeholder={this.state.offices_data[this.state.offices_index].territory}/></td>
                                </tr>
                                <tr>
                                    <td><button onClick={(event)=>this.previousChange(event)}>Previous</button></td>
                                    <td><button onClick={(event)=>this.nextChange(event)}>Next</button></td>
                                </tr>
                                </tbody>
                            </table>
                            <button onClick={(event)=>this.saveTable(event)}>Save</button>
                            <button onClick={(event)=>this.deleteTable(event)}>Delete</button>
                            <button onClick={(event)=>this.clearForm(event)}>Clear form to add new office</button><br/>
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