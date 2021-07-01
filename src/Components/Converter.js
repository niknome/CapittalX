import React from "react";
import axios from 'axios'
import './converter.css'
import { styled } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';


const InputAmount = styled(OutlinedInput)({
  height: 55,
  width: 600,
})
const SelectCrypto = styled(Select)({
  height: 55,
  width: 150
})

const Buttons = styled(Button)({
  height: 60,
  width: 240
})

/*Carteira do Usuario */
const userCoinsAvailable = [
  {
    coin: "USDT",
    valueCoinApi: "USDC",
    amount: "10",
    icon: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
  },{
    coin: "BRL",
    amount: "0",
    icon: "https://cdn3.iconfinder.com/data/icons/flags-of-countries-3/128/Brazil-512.png"
  },{
    coin: "ETH",
    amount: "2",
    icon: "https://apichain.capittalx.com/dist/icons/png/ethereum-eth-logo.png"
  },{
    coin: "BTC",
    amount: "0.06",
    icon: "https://apichain.capittalx.com/dist/icons/png/bitcoin-btc-logo.png"
  }, 
]

let currencyTo
let currencyFrom

let interval;

let time = 10 * 60;

export default class Converter extends React.Component{
  state = {
    currencyOptions: [],

    dropDownTo: '',
    dropDownFrom: '',

    inputValueTo: '',
    inputValueFrom: '',

    avaibleAmout: [],

    countDownEl:  60,
    changeButtons: true,
    changeConfirm: 'CONFIRMAR OPERAÇÃO',

    aparecePorcentagem: false,
    dropDownPorcentagem: '',

  }

  componentDidMount() {
    this.createToken()
  }

  createToken = () =>{
    const body = {
      email: 'desafio@cpx.com',
      password: 'zaxscd@Q1W2E3'
    }
    axios.post(`https://apichain.capittalx.com/api/auth/login`, body, {

    }).then((res) => {
      axios.get(`https://apichain.capittalx.com/api/all`,
          {
            headers: {
              Authorization: `Bearer ${res.data.token}`
            }
          }
        )
        .then((response) => {
          this.setState({currencyOptions: response.data})
        })
        .catch((error) => {
          console.log(error);
        });
    }). catch((error) => {
      console.log(error.res.data)
    })
  }


  handleChangeDropDownTo = (event) =>{
    this.setState({dropDownTo: event.target.value})
  }

  handleChangeDropDownFrom = (event) =>{
    this.setState({dropDownFrom: event.target.value})

  }  

  handleChangeInputTo = (event) => {
    this.setState({inputValueTo: event.target.value})

    this.converterCurrency(event.target.value)

  }
 
  handleChangeInputFrom = (event) => {
     this.setState({inputValueFrom: event.target.value})
    
  }  

  onclickSelectTo = (event) => {
      if(event.target.value){
        this.setState({avaibleAmout: event.target.value})
      }
  }

  onClickMaxValue = () =>{
    const pegueiAmount = {...this.state.avaibleAmout}
      this.setState({inputValueTo: pegueiAmount.amount})  

    this.converterCurrency(pegueiAmount.amount)
  }

  updateCountDown = () =>{
    let seconds = time % 90;
    this.setState({countDownEl: seconds})

    time--
    if(this.state.countDownEl === 0){
      clearInterval(interval)
      this.setState({changeConfirm: 'REFAZER OPERAÇÃO'})
    }
  
  }

 buttonsChangeAndStartCountDown = () => {
   this.setState({changeButtons: !this.state.changeButtons})
   interval = setInterval(this.updateCountDown, 1000)

   this.converterCurrency();
 }

 handleChangeSelect = (event) => {
  this.setState({dropDownPorcentagem: event.target.value})
  this.setState({aparecePorcentagem: !this.state.aparecePorcentagem})



  switch(event.target.value){
    case '5%':
      const percentage5 = this.state.avaibleAmout.amount * (5/100)
      this.converterCurrency(percentage5)
      return this.setState({inputValueTo: percentage5})

    case '25%':
      const percentage25 = this.state.avaibleAmout.amount * (25/100)
      this.converterCurrency(percentage25)
      return this.setState({inputValueTo: percentage25})

    case '50%':
      const percentage50 = this.state.avaibleAmout.amount * (50/100)
      this.converterCurrency(percentage50)
      return this.setState({inputValueTo: percentage50}) 

    case '75%':
      const percentage75 = this.state.avaibleAmout.amount * (75/100)
      this.converterCurrency(percentage75)
      return this.setState({inputValueTo: percentage75})

    case '100%':
      const percentage100 = this.state.avaibleAmout.amount * (100/100)
      this.converterCurrency(percentage100)
      return this.setState({inputValueTo: percentage100})                      
    }

    this.converterCurrency()
 }

 converterCurrency = (event) =>{

  this.state.currencyOptions.filter(val =>{
    if(val.coin === this.state.dropDownTo.coin || val.coin === this.state.dropDownTo.valueCoinApi){
     return currencyTo = ((parseFloat(val.lastPrice.replace(/\./g,'').replace(',', '.')) * event))
    }
  })

  this.state.currencyOptions.filter(val =>{
    if(val.coin === this.state.dropDownFrom){
        currencyFrom = ((parseFloat(val.lastPrice.replace(/\./g,'').replace(',', '.'))))
    }
  })

  this.setState({inputValueFrom: currencyTo / currencyFrom})
 }


render(){

  const filterSelect = this.state.currencyOptions.filter(value =>{
    if(value.coin !== this.state.dropDownTo.coin){
      return <SelectCrypto><MenuItem value={value.coin}>{value.coin}</MenuItem></SelectCrypto>
    }
  })

  let showsPercentage = this.state.aparecePorcentagem ?  (
   <select
   value={this.state.dropDownPorcentagem}
   onChange={this.handleChangeSelect}>
     <option defaultValue> Percentage </option>
     <option>5%</option>
     <option>25%</option>
     <option>50%</option>
     <option>75%</option>
     <option>100%</option>
   </select>
  ) : false
 

  let myButtonsToShow = this.state.changeButtons ? (
      <Buttons onClick={this.buttonsChangeAndStartCountDown} variant="contained" size="large" color="primary">SIMULAR</Buttons>
  ) : (<div>
      <Buttons variant="contained" size="large" color="primary">{this.state.changeConfirm}</Buttons>
      <Buttons variant="contained" size="large" color="primary">{this.state.countDownEl} segundos</Buttons>
     </div>)


return(
<div className="Converter">

  <div className="Cointainer_converter">      

    <div>{showsPercentage}</div>
          
      <div className="inputs_coin">
           
        <div className="Container_Inputs">

              <div className="amount_and_info">  
                <div className="Info_De">
                <p>De</p>
                </div>

                <div className="Amount">
                <p>Disponivel:</p>
                <p onClick={this.handleChangeSelect}>{this.state.avaibleAmout.amount} {this.state.avaibleAmout.coin}</p>
                </div>
              </div>

            <div className="To">  
               <InputAmount
               placeholder="Por favor, insira 20-250000000000"
               endAdornment={<InputAdornment position="end" onClick={this.onClickMaxValue}>MAX</InputAdornment>}
               className="input"
               value={this.state.inputValueTo} 
               onChange={this.handleChangeInputTo} />
 
              <SelectCrypto variant="outlined"
               onClick={this.onclickSelectTo}
               className="select"
               value={this.state.dropDownTo}
               onChange={this.handleChangeDropDownTo}>
                   {userCoinsAvailable.map(option => (
                     <MenuItem key={option.coin} value={option}><div className="OptionCoin"> <img src={option.icon} alt="coin_icon"/> {option.coin}</div></MenuItem>
                   ))}          
              </SelectCrypto>
            </div>
        </div>  
          
         <div className="Container_Inputs">
            <p>Para</p>

           <div className="From">
              <InputAmount
              className="input" 
              value={this.state.inputValueFrom} 
              onChange={this.handleChangeInputFrom} />

              <SelectCrypto
              variant="outlined"
              className="select" 
              value={this.state.dropDownFrom} 
              onChange={this.handleChangeDropDownFrom}>
                 {filterSelect.map(option => (
                 <MenuItem key={option.idPrice} value={option.coin}><div className="OptionCoin"> <img src={option.icon} alt="coin_icon" /> {option.coin}</div></MenuItem>
                  ))}
              </SelectCrypto>
            </div>
         </div>  

      </div>
            
           <div className="Btn">
            {myButtonsToShow}
          </div>
  
  </div>          
</div>
    )
  }
}
