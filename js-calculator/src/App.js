import React from 'react';
import './App.css';


class App extends React.Component {
     state={
      value: null,
      displayValue: '0',
      waitingForOperand: false,
      operator: null
    };

    clearDisplay() {
      this.setState({
        displayValue: '0'
      })
    }

    inputDigit(digit) {
      const { displayValue, waitingForOperand } = this.state

      if (waitingForOperand){
        this.setState({
          displayValue: String(digit),
          waitingForOperand: false
        })
      } else {
        this.setState({
          displayValue: displayValue === '0' ? String(digit) : displayValue + digit
        })
      }      
    }

    

    inputDot(){
      const { displayValue, waitingForOperand } = this.state

      if (waitingForOperand) {
        this.setState({
          displayValue: '.',
          waitingForOperand: false
        })
      } else if (displayValue.indexOf('.') === -1){
        this.setState({
          displayValue: displayValue + '.',
          waitingForOperand: false
        })
      } 
    }
    toggleSign() {
      const { displayValue } = this.state
      const newValue = parseFloat(displayValue) * -1
      
      this.setState({
        displayValue: String(newValue)
      })
    }
    
    operation(nextOperator){
      const {displayValue, operator, value} = this.state

      const nextValue = parseFloat(displayValue)

      const operations = {
        '/': (prevValue, nextValue) => prevValue / nextValue,
        '+': (prevValue, nextValue) => prevValue + nextValue,
        '-': (prevValue, nextValue) => prevValue - nextValue,
        '*': (prevValue, nextValue) => prevValue * nextValue,
        '=': (prevValue, nextValue) =>  nextValue
      }

      if(value == null){
        this.setState({
          value: nextValue
        })
      } else if (operator) {
        const currentValue = value || 0
        const computedValue = operations[operator](currentValue, nextValue)

        this.setState({
          value: computedValue,
          displayValue: String(computedValue)
        })
      }

     this.setState({
       waitingForOperand: true,
       operator: nextOperator
     })
    }
  
  

  render () {
 const { displayValue } = this.state;

  return (
    <div className="container">      
        <div className="calculatorBody">          
          <div className="row" id="display">
            <p>{displayValue}</p>
          </div>
          <div className="row">
            <button className="col-6 key-clear" onClick={() => this.clearDisplay()}>Clear</button>
            <button className="col-3 function key-divide" onClick={() => this.operation('/')}>/</button>
            <button className="col-3 function key-mulitply" onClick={() => this.operation('*')}>X</button>
          </div>

          <div className="row">
            <button className="col-3 number key-7" onClick={() => this.inputDigit(7)}>7</button>
            <button className="col-3 number key-8" onClick={() => this.inputDigit(8)}>8</button>
            <button className="col-3 number key-9" onClick={() => this.inputDigit(9)}>9</button>
            <button className="col-3 function key-subtract" onClick={() => this.operation('-')}>-</button>
          </div>

          <div className="row">
            <button className="col-3 number key-4" onClick={() => this.inputDigit(4)}>4</button>
            <button className="col-3 number key-5" onClick={() => this.inputDigit(5)}>5</button>
            <button className="col-3 number jey-6" onClick={() => this.inputDigit(6)}>6</button>
            <button className="col-3 function key-add" onClick={() => this.operation('+')}>+</button>
          </div>

          <div className="row">
            <button className="col-3 number key-1" onClick={() => this.inputDigit(1)}>1</button>
            <button className="col-3 number key-2" onClick={() => this.inputDigit(2)}>2</button>
            <button className="col-3 number key-3" onClick={() => this.inputDigit(3)}>3</button>
            <button className="col-3 function key-equals" onClick={() => this.operation('=') }>=</button>
          </div>

          <div className="row">
            <button className="col-3 number key-0" onClick={() => this.inputDigit(0)}>0</button>
            <button className="col-3 number key-decimal" onClick={() => this.inputDot()}>.</button>
            <button className="col-3 number key-negative" onClick={() => this.toggleSign()}>+-</button>
           
          </div>
        </div>
      
    </div>
  );
}
}

export default App;
