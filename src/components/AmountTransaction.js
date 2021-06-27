import React, { useState } from 'react';
import '../css/AmountTransaction.css';

export default function AddAmount(props) {
  const [amountToBeAdded, addAmount] = useState('');
  const [trasctionType, setTransactionType] = useState('');
  const [errorMsg, setErrorMessage] = useState([]);

  var handleButtonclick = () => {
    handleFormValidation();
    if(errorMsg && errorMsg.length === 0) {
      if((trasctionType === "withdraw" && (props.balance - parseInt(amountToBeAdded) <= 0))) {
        return;
      } else {
        props.handleAmountTransaction(amountToBeAdded, trasctionType);
      }
    }
  }
  var handleFormValidation = () => {
    if(!trasctionType) {
      if(!errorMsg.find( item => item === "Please enter the action")) {
        let msgArr = [...errorMsg];
        msgArr.push('Please enter the action');
        setErrorMessage(msgArr);
      }
    } else {
      if(errorMsg.find( item => item === "Please enter the action")) {
        setErrorMessage(errorMsg.filter(item => item !== "Please enter the action"));
      }
    }
    if(!amountToBeAdded) {
      if(!errorMsg.find( item => item === "Please enter the amount")) {
        let msgArr = [...errorMsg];
        msgArr.push('Please enter the amount');
        setErrorMessage(msgArr);
      }
    } else {
      if(errorMsg.find( item => item === "Please enter the amount")) {
        setErrorMessage(errorMsg.filter(item => item !== "Please enter the amount"));
      }
    }
    if(trasctionType === "withdraw") {
      if(props.balance - parseInt(amountToBeAdded) <= 0) {
        let Arr = [...errorMsg];
        Arr.push('Please enter the valid amount');
        setErrorMessage(Arr);
      }  else {
        if(errorMsg.find( item => item === "Please enter the valid amount")) {
          setErrorMessage(errorMsg.filter(item => item !== "Please enter the valid amount"));
        }
      }
    } else {
      if(errorMsg.find( item => item === "Please enter the valid amount")) {
        setErrorMessage(errorMsg.filter(item => item !== "Please enter the valid amount"));
      }
    }
  }

  var handleValueChange = (e) => {
    addAmount(e.target.value);
  }

  var handleTransactionType = (e) => {
    setTransactionType(e.target.value);
  }

  return (
    <>
      <div>
        Please select the Action:
        <input type="radio" id="add" name="transactionType" value="add" checked={trasctionType === 'add'}  onChange={handleTransactionType} />
        <label htmlFor="add">Add amount </label>
      
        <input type="radio" id="withdraw" name="transactionType" value="withdraw" checked={trasctionType === 'withdraw'}  onChange={handleTransactionType} />
        <label htmlFor="withdraw">Withdraw amount </label>
      </div>
      <div className="amount-input">
        <label htmlFor="amount">Enter amount: </label>
        <input id="amount" type="number" onChange={handleValueChange}/>
      </div>
      <div>
        <button onClick={handleButtonclick} className="submit-button"> Submit </button>
        <div className="error-message">
          {
            errorMsg.map(item => (<div key={item}>{item}</div>))
          }
        </div>
      </div>
    </>
  );
}