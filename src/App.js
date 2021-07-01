import React from "react";
import Converter from './Converter.js'
import './app.css'
import Logo from './Images/logo.png'


export default class App extends React.Component{

    render(){
        return(
          <div className="App">
              <header>
                <div className="color_around_logo">

                  <div className="logo_cappitalx">
                    <img src={Logo} alt="Logo_CapittalX" />
                  </div>

                </div>
              </header>

              <div className="container">
                  <div className="background_img" />
                  <div className="overlay" />
                  <div className="texto"> TITULO A SER ESCOLIDO!</div>
              </div>
                
              <Converter />
          </div>
        )
    }
}