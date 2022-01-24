import React from 'react'
import styles from './Header.Module.css'

class Header extends React.Component {

    render () {
        if(this.props.heading){
        return (
            <header>
                <div  className={styles.topbar}>
                    {this.props.heading}
                </div>
            </header>
        )} else{
            return(
            <p>company name not given</p>
            )
        }
    }
}

export default Header
