import React from 'react'

function lister(onevalue) {
    return <option value={onevalue['code']}>{onevalue['name']}</option>
}

class SelectList extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        if(this.props.array){
        return (
            <select>
                {this.props.array.map(lister)}
            </select>
        )} else{
            return(
            <p>array not given</p>
            )
        }
    }
}

export default SelectList
