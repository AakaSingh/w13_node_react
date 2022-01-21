import React from 'react'

class Nav extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        if(this.props.mylink){
        return (
            <nav>
                <ul>
                    <li><a href ="/">Home</a></li>
                    <li><a href= "this.props.mylink"> Variable Link</a></li>
                </ul>
            </nav>
        )} else{
            return(
            <p>link not provided</p>
            )
        }
    }
}

export default Nav
