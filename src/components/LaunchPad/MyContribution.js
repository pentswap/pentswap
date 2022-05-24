import React from 'react';
import "./launchpad.css";
import { NavLink } from "react-router-dom";

const MyContribution = () => {
  return (
    <section className="myContributionDiv">
        <div className="launchPadList">
            <h1>
                Current Presale
            </h1>

            <div className="padListNav">
                <div className="padlink">
                    <NavLink 
                        to="/launchpad/list"
                        activeStyle={{
                            fontWeight: 'bold',
                            color: '#1a4fc5',
                            borderBottom: '2px solid #1a4fc5',
                            paddingBottom: "1rem"
                        }}    
                    >
                        All launchpads
                    </NavLink>
                </div>

                <div className="padlink">
                    <NavLink 
                        to="/launchpad/mylist"
                        activeStyle={{
                            fontWeight: 'bold',
                            color: '#1a4fc5',
                            borderBottom: '2px solid #1a4fc5',
                            paddingBottom: "1rem"
                          }}    
                    >
                        My contribution
                    </NavLink>
                </div>
            </div>

            <div className="padListInput">
                <form>
                    <div className="padListInputDiv">
                        <input
                            type="text"
                            placeholder="Enter token name or token symbol"
                        />    
                    </div>

                    <div className="padListSelect">
                        <div style={{display: "flex", flexDirection:"column", marginBottom:"1.2rem"}}>
                            <p style={{fontSize: "12px"}}>Filter by:</p>
                            <select>
                                <option>
                                    All status
                                </option>
                                <option>
                                    KYC
                                </option>
                                <option>
                                    Upcoming
                                </option>
                                <option>
                                    In progress
                                </option>
                                <option>
                                    Cancelled
                                </option>
                                <option>
                                    Ended
                                </option>
                            </select>
                        </div>

                        <div style={{display: "flex", flexDirection:"column"}}>
                            <p style={{fontSize: "12px"}}>Sort by:</p>
                            <select>
                                <option>
                                    No Filter
                                </option>
                                <option>
                                    KYC
                                </option>
                                <option>
                                    Upcoming
                                </option>
                                <option>
                                    In progress
                                </option>
                                <option>
                                    Cancelled
                                </option>
                                <option>
                                    Ended
                                </option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>

            <div className="myContribution">
                <p>
                    No data
                </p>
            </div>
        </div>
    </section>
  )
}

export default MyContribution