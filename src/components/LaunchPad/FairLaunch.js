import React from 'react';
import "./launchpad.css";

const FairLaunch = () => {
  return (
    <section className="createLaunch">
        <ul>
            <li>
                <p className="currentCreate">1</p>
                <div>
                    <h3>Verify Token</h3>
                    <p>
                        Enter the token address and verify
                    </p>
                </div>
            </li>

            <li>
                <p className="nextCreat">2</p>
                <div>
                    <h3>Defi FairLaunch Info</h3>
                    <p>
                        Enter the fairlaunch information
                        that you want to raise , that 
                        should be enter all details 
                        about your presale
                    </p>
                </div>
            </li>

            <li>
                <p className="nextCreate">3</p>
                <div>
                    <h3>Add Additional Info</h3>
                    <p>
                        Let people know who you are
                    </p>
                </div>
            </li>

            <li>
                <p className="nextCreate">4</p>
                <div>
                    <h3>Finish</h3>
                    <p>
                        Review your information
                    </p>
                </div>
            </li>
        </ul>

        <div className="createForm" style={{marginTop: "2rem"}}>
            <form>
                <p style={{color:"red", fontSize: "12px"}}>
                    (*) is required field
                </p>

                <div className="labelForm">
                    <h4>
                        Token address*
                    </h4>
                    <div>
                        <button type="button">
                            Create Token
                        </button>
                    </div>
                </div>

                <input
                    type="text"
                    placeholder="Ex: PinkMoon"
                />                

                <div className="nextBtn">
                    <button disabled type="button">
                        Next
                    </button>
                </div>
            </form>
        </div>
    </section>
  )
}

export default FairLaunch