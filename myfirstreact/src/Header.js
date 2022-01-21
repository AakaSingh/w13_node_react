import React from 'react'

class Header extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        if(this.props.companyName){
        return (
            <header>
                {this.props.companyName}
            </header>
        )} else{
            return(
            <p>company name not given</p>
            )
        }
    }
}

export default Header
