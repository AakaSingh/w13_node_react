import React from 'react'
import styles from './Playlist.Module.css'

class Playlist extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            playlist : {},
            tracks :[],
            error : null
        }
    }

    componentDidMount(){
        this.dataFetch()
    }

    dataFetch(){
        fetch("http://localhost:8000/tracks",
            {
                method: 'GET',
            }
        )
            .then((response) => {
                console.log(response)
                if (!response.ok) {
                    // handle errors, response code other than 200 because
                    return {} //empty object, no data
                } else {
                    //ok code 200, convert data in FETCH response to JSON data
                    return response.json()
                }
                //execute second .then when done
            })
            .then(
                //executes after the first .then
                (data) => {// catch the data returned by first .then
                    //check for not empty data object
                    if (Object.keys(data).length !== 0) {
                        this.setState({tracks : data.tracks})
                    }
                },

                (error) => {
                    // only NO RESPONSE URL errors will trigger this code
                    document.getElementById("response_data").innerHTML = "AJAX error: URL wrong or unreachable, see console"
                }
            )
    }


    deleteTrack = (event) =>{
        console.log(event.target.value)
        fetch("http://localhost:8000/tracks/" + event.target.value,
            {
                method: 'DELETE'
            }
        )
            .then((response) => {
                console.log(response)
                if (!response.ok) {
                    // handle response code other than 200 because
                    return "cannot delete entry"
                } else {
                    //server responds with text/html, execute second .then when done
                    this.dataFetch()
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

    rowCreator = (onevalue,index) =>{
        return (<tr key={index}>
                    <td>
                        {onevalue.title}<br/>
                        ID : {onevalue.id}<br/>
                        Playlist : {onevalue.name}<br/>
                        {onevalue.uri}<br/>
                        master_id : {onevalue.master_id}
                    </td>
                    <td>
                        <button value={onevalue.id} onClick={(event)=> this.deleteTrack(event)}>Delete</button>
                    </td>
                </tr>)
    }

    render () {
        return (
            <div>
                <table className={styles.table}>
                    <tbody>
                        {(this.state.tracks).map(this.rowCreator)}
                    </tbody>
                </table>
                <span id='response_data'></span>
            </div>

            )
        }
    }

export default Playlist
