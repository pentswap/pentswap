import React from 'react';
import "./launchpad.css";

const LaunchpadToken = () => {
  return (
    <section className="launchpadToken">
        <form>
            <p style={{color:"red", fontSize: "12px"}}>
                (*) is required field
            </p>

            <div>
                <label>
                    Token Type<span style={{color:"red"}}>*</span>
                </label>
                <select>
                    <option>
                        Standard Token
                    </option>
                    <option>
                        Liquidity Generator Token
                    </option>
                    <option>
                        Baby Token
                    </option>
                    <option>
                        Buyback Baby Token
                    </option>
                </select>
            </div>

            <div>
                <label>
                    Name<span style={{color:"red"}}>*</span>
                </label>
                <input
                    type="text"
                    placeholder="Ex: Ethereum"
                />
            </div>

            <div>
                <label>
                    Symbol<span style={{color:"red"}}>*</span>
                </label>
                <input
                    type="text"
                    placeholder="Ex: ETH"
                />
            </div>

            <div>
                <label>
                    Total Supply<span style={{color:"red"}}>*</span>
                </label>
                <input
                    type="text"
                    placeholder="Ex: 100000000000"
                />
            </div>

            <div>
                <label>
                    Router
                </label>
                <select>
                    <option>
                        ---Select Router Exchange---
                    </option>
                    <option>
                        Pancakeswap
                    </option>
                    <option>
                        MDex
                    </option>
                    <option>
                        Biswap
                    </option>
                    <option>
                        ApeSwap
                    </option>
                    <option>
                        PinkSwap
                    </option>
                </select>
            </div>

            <div className="flexedInput">
                <div>
                    <label>
                        Reward Token<span style={{color:"red"}}>*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Ex: 0x..."
                    />
                </div>
                <div>
                    <label>
                        Liquidity Fee (%)
                    </label>
                    <input
                        type="text"
                        placeholder="0-100"
                />
                </div>
            </div>

            <div className="flexedInput">
                <div>
                    <label>
                        Buyback Fee (%)
                    </label>
                    <input
                        type="text"
                        placeholder="3"
                    />
                </div>
                <div>
                    <label>
                        Reward Token<span style={{color:"red"}}>*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Ex: 0x..."
                    />
                </div>
            </div>

            <div>
                <label>
                    TMarketing Fee(%)<span style={{color:"red"}}>*</span>
                </label>
                <input
                    type="text"
                    placeholder="0-100"
                />
            </div>

            <div style={{marginTop: "2px"}}>                
                <input
                    type="checkbox"
                    className="selectInput"
                    style={{width: "0%"}}
                />
               
                <span>
                    Implement Pentswap Anti-Bot System?
                </span>
            </div>

                <div className="nextBtn">
                    <button disabled type="button">
                        Next
                    </button>
                </div>
        </form>
    </section>
  )
}

export default LaunchpadToken