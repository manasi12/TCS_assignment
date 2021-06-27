import React, { useState, useEffect } from 'react';
import '../css/DebitCard.css';

const AmountTransactionComponent = React.lazy(() => import('./AmountTransaction'));

export default function DebitCard(props) {
  const [accountInfo, setAccountInfo]=useState({});
  const [balance, updateBalance] = useState(0);

  const getAccountInfo = () => {
    fetch('./accountDetails.json'
    ,{
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    }
    )
    .then(function(response){
      return response.json();
    })
    .then(function(myJson) {
      setAccountInfo(myJson);
      updateBalance(parseInt(myJson.balance));
    });
  }
  useEffect(() => {
    getAccountInfo();
  }, []);

  var handleAmountTransaction = (amount, task) => {
    switch(task) {
      case 'add': 
        updateBalance(balance + parseInt(amount));
        break;
      case 'withdraw': 
        updateBalance(balance - parseInt(amount));
        break;
    }
  }

  return (
    <>
      <div className="card-name">Debit Card</div>
      <div className="card-holder">{accountInfo.accountHolder}: {accountInfo.id}</div>
      <div> Available Amount: {balance}</div>
      {
        <AmountTransactionComponent balance={balance} handleAmountTransaction={handleAmountTransaction}/>
      }
    </>
  );
}