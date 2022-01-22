import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import Footer from './Footer.js'
import Header from './Header.js'
import SelectList from './SelectList.js'
import HeaderWithButton from './HeaderWithButton'
import LoginForm from './LoginForm'

const provinces=[ {code:'QC',name:'Quebec'},{code:'ON',name:'Ontario'},{code:'NB',name:'New-Brunswick'}]

const countries=[{code:'CA',name:'Canada'},{code:'US',name:'USA'},{code:'IN',name:'India'},{code:'MX',name:'Mexixo'}]

class Page extends React.Component{
  render(){
            return (
            <div>
                <Header companyName="blabla.com"/>
                <LoginForm username="aakash" pwd="thispass"></LoginForm>
                <p>Hello World !</p>
                <SelectList array={provinces}/>
                <SelectList array={countries}/>
                <Footer authorName="Aakash Singh"/>
            </div>
        )
    }
}

ReactDOM.render(
<React.StrictMode>
    <Page />
</React.StrictMode>,
document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
