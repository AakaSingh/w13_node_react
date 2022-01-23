import React from 'react'
import styles from './Header.Module.css'

class Header extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        if(this.props.companyName){
        return (
            <div>
            <header>
                {this.props.companyName}
            </header>
            <p className={styles.p1}>
                other text
            </p>
            </div>
        )} else{
            return(
            <p>company name not given</p>
            )
        }
    }
}

export default Header
