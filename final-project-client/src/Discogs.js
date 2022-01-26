import React from 'react'

class Discogs extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            albums : [],
            error : null
        }
    }

    dataFetch = (event) =>{
        fetch("https://api.discogs.com/database/search?key=xLxRhchBfxfAOtMiCAxV&secret=WzSiMvgXqyscrehWUFYekOIVICGYkNmH&artist="+document.getElementById('artist').value+"&country=canada",
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
                        this.setState({albums : data.results})
                    }
                },

                (error) => {
                    // only NO RESPONSE URL errors will trigger this code
                    document.getElementById("recieved_data").innerHTML = "AJAX error: URL wrong or unreachable, see console"
                }
            )
    }

    addTrack = (event) =>{
        console.log(this.state.albums[event.target.value].title + "added")
    }

    rowCreator = (onevalue,index) =>{
        return (<div key={index}>
                    <p>
                        <img src={onevalue.thumb} alt={onevalue.title}/>
                        {onevalue.title}<br/>
                        Style : {onevalue.style}<br/>
                        Year Release : {onevalue.year}<br/>
                        <a href={"http://www.discogs.com/"+onevalue.uri}>More Information</a><br/>
                        master_id : {onevalue.master_id}
                    </p><br/>
                    <p>
                        <button value={index} onClick={(event)=> this.addTrack(event)}>Add</button>
                    </p>
                </div>)
    }

    render () {
        return (
            <div>
                <input type='text' id='artist'/>
                <button onClick={(event) => this.dataFetch(event)}>Search</button>
                <div id='recieved_data'>
                    {this.state.albums.map(this.rowCreator)}
                </div>
            </div>

            )
        }
    }

export default Discogs
