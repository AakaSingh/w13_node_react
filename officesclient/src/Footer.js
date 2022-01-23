import React from 'react'
import styles from './Footer.Module.css'

class Footer extends React.Component {
    constructor (props) {
        super(props)
    }

    render () {
        if(this.props.authorName){
        return (
            <div>
            <footer>
                Author : {this.props.authorName}
            </footer>
            <p className={styles.p1}>
            other text
        </p>
        </div>
        )} else{
            return(
            <p>not provided author</p>
            )
        }
    }
}

export default Footer
