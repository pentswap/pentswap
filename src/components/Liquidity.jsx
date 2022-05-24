import React from 'react';
import { NavLink } from 'react-router-dom'; 
import '../index.css'
import { useMoralis } from "react-moralis";
import { message } from 'antd';
import { useHistory } from "react-router-dom";


const Liquidity = () => {
    const { isAuthenticated, account,Moralis } = useMoralis();
    let navigate = useHistory();

    const addLiquidity = () => {
        if (!isAuthenticated || !account) {
            message.error('Please connect to your wallet');
            return;
        }
        navigate.push('/add-liquidity');
    }
  return (
    <section className='liquidity'>
        <div className='liquidityHeader'>
            <div style={{padding:"2rem",borderBottom: "1px solid rgb(56, 50, 65)",display:"flex",justifyContent:"space-between",marginBottom:"2rem"}}>
                <div>
                    <h2>Your Liquidity</h2>
                    <p>Remove liquidity to receive tokens back</p>
                </div>
                <div style={{display:"flex", justifyContent:"center",alignItems:"center"}}>
                    <button style={{border:"0px",background:"none",cursor:"pointer"}}>
                        <svg viewBox="0 0 24 24"  color="textSubtle" width="24px" xmlns="http://www.w3.org/2000/svg" className="sc-5a69fd5e-0 doneTG"><path d="M13 3C8.03 3 4 7.03 4 12H2.20711C1.76165 12 1.53857 12.5386 1.85355 12.8536L4.54604 15.546C4.73751 15.7375 5.04662 15.7418 5.24329 15.5556L8.08805 12.8631C8.4164 12.5524 8.19646 12 7.74435 12H6C6 8.13 9.13 5 13 5C16.87 5 20 8.13 20 12C20 15.87 16.87 19 13 19C11.4314 19 9.98175 18.4782 8.81739 17.601C8.37411 17.267 7.74104 17.259 7.3486 17.6514C6.95725 18.0428 6.95413 18.6823 7.38598 19.0284C8.92448 20.2615 10.8708 21 13 21C17.97 21 22 16.97 22 12C22 7.03 17.97 3 13 3ZM12 8V13L16.28 15.54L17 14.33L13.5 12.25V8H12Z"></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* <div style={{marginBottom:"2rem",padding:"2rem"}}>
                <div>
                    <p style={{paddingBottom:"2rem", textAlign:"center"}}>
                        No liquidity found.
                    </p>
                    <div style={{textAlign:"center"}}>
                        <p>
                            Don't see a pool you joined?
                        </p>
                        <NavLink to="#" className="liqudityLink">
                            Find other LP tokens
                        </NavLink>
                    </div>
                </div>
            </div> */}
             {!isAuthenticated || !account ? (
            <div className="sc-df4f0a61-0 sc-de763a8d-0 hahFfL fWggAe">
                <div color="textSubtle" fontSize="16px" className="sc-7fd741e1-0 gCSNOC">Connect to a wallet to view your liquidity.</div>
            </div>
            ) 
            : 
                (<div style={{marginBottom:"2rem",padding:"2rem"}}>
                <div>
                    <p style={{paddingBottom:"2rem", textAlign:"center"}}>
                        No liquidity found.
                    </p>
                    
                </div>
            </div>
            )}

            <div style={{ padding:"2rem"}}>
                <button 
                    className="liq-btn" 
                    id="join-pool-button" 
                    width="100%" 
                    scale="md" 
                    onClick={addLiquidity}
                    >
                    <svg viewBox="0 0 24 24" style={{color:"#fff"}} fill="white" color="white" width="20px" xmlns="http://www.w3.org/2000/svg" className="sc-5a69fd5e-0 eJqhSk"><path d="M18 13H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11V6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z"></path>
                    </svg>
                    Add Liquidity
                </button>
            </div>
        </div>
    </section>
  )
}

export default Liquidity