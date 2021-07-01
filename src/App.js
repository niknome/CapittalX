import React from "react";
import Converter from './Components/Converter.js'
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
                  <div className="texto">
                    <h1>Convert & OTC Portal</h1>
                    <p>Faça trades de Bitcoin e outras criptomoedas em minutos</p>
                  </div>
              </div>
                
              <Converter />
          </div>
        )
    }
}