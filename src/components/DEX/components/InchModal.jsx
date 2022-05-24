import React, { useState } from 'react';
import jconfirm from 'jquery-confirm';
import { useMoralis } from "react-moralis";

const divStyle = {
 display: "block", 
 width: "80%",
 marginLeft: "auto",
 marginRight: "auto",
 marginTop: "14px",
 marginBottom: "14px",
 border: "1px #ccc solid",
 borderRadius: "5px",
 height: "32px",
 padding: "5px"
};
const style1 = {
  flexGrow: 1,
  textAlign: "right",
  fontWeight: "bold"
}

 function InchModal({ open, onClose, setToken, tokenList,balance }) {
  
  const [filteredTokens1, setFoundTokens] = useState(tokenList);
    const { Moralis } = useMoralis();

  const options = {
      chain: "bsc"
  };
  const balances =  Moralis.Web3API.account.getTokenBalances(options);


  if (!open) return null;
 let filteredTokens = tokenList;
  function handleChange(event) {
    
    let input  = event.target.value;
    let filtered = Object.keys(tokenList).filter(function(key) {
      return tokenList[key].symbol.toLowerCase().indexOf(input.toLowerCase()) > -1;
    });
    
     filteredTokens = Object.keys(tokenList)
      .filter(key => filtered.includes(key))
      .reduce((obj, key) => {
          obj[key] = tokenList[key];
          return obj;
    }, {});
    setFoundTokens(filteredTokens);
    console.log(filteredTokens);
    balances.then(res => console.log(res));
    
  }
  return (
    <div style={{ overflow: "auto", height: "500px" }}>
       <div><input placeholder="Search by token symbol"  onChange={handleChange} type="text" style={divStyle} /></div>
      {!filteredTokens1
        ? null
        : Object.keys(filteredTokens1).map((token, index) => (
            <div
              style={{
                padding: "5px 20px",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                setToken(filteredTokens1[token]);
                onClose();
              }}
              key={index}
            >
              <img
                style={{
                  height: "32px",
                  width: "32px",
                  marginRight: "20px",
                }}
                src={filteredTokens1[token].logoURI}
                alt="noLogo"
              />
              <div>
                <h4>{filteredTokens1[token].name}</h4>
                <span
                  style={{
                    fontWeight: "600",
                    fontSize: "15px",
                    lineHeight: "14px",
                  }}
                >
                  {filteredTokens1[token].symbol}
                </span>
              </div>
              <div style={style1}>{filteredTokens1[token].balance}</div>
            </div>
          ))}
    </div>
  );
}

export default InchModal;
