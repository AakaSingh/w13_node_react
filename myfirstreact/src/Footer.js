import React from 'react'

class Footer extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        if(this.props.authorName){
        return (
            <footer>
                Author : {this.props.authorName}
            </footer>
        )} else{
            return(
            <p>not provided author</p>
            )
        }
    }
}

export default Footer
