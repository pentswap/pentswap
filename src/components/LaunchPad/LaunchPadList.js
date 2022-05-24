import React from 'react';
import "./launchpad.css";
import { NavLink } from "react-router-dom";
import { Progress, Statistic} from 'antd';
import { getLaunchpads } from 'helpers/dbqueries';

import moment from 'moment';

const { Countdown } = Statistic;

const LaunchPadList = () => {
    
    const [launchpads, setLaunchpads] = React.useState([]);
    React.useEffect(() => {
        const unsubscribe = getLaunchpads((launchpads) => {
            setLaunchpads(launchpads);
        })
        return () => {
            unsubscribe();
        };
    }, []);
        
    const compareDate = (st, et) => {
        const startTime = moment(st);
        const today = moment();
        const endTime = moment(et);

        
        if(today.isBefore(startTime)){
            return 0; // upcoming
        }
        else if(today.diff(startTime,'days')==0){
            return 1; // progress
        }
        else if(today.diff(endTime,'days')==0){
            return 1; // progress
        }
        else if(today.diff(startTime,'days') > 0 && today.diff(endTime,'days') < 0){
            return 1; // progress
        }
        else {
            return 2; // ended
        }
       
    }
    //relative time from now
    const relativeTime = (time) => {
        const a = moment(time);
        const b = moment();
        return a.from(b);
    }
   
    
    
  return (
    <section className="launchPadListDiv">
        <div className="launchPadList">
            <h1 style={{fontSize: "26px", paddingTop: "30px"}}>
                Launchpad List
            </h1>

            <div className="padListNav">
                <div className="padlink">
                    <NavLink
                        to="/launchpad/list"
                        activeStyle={{
                            fontWeight: '400',
                            borderBottom: '2px solid #16a3fe',
                            paddingBottom: "1rem"
                          }}
                          style={isActive => ({
                            color: isActive ? "#16a3fe" : "black"
                        })}>
                     All launchpads
                    </NavLink>
                </div>

                <div className="padlink">
                    <NavLink 
                        to="/launchpad/mylist"
                        activeStyle={{
                            fontWeight: '400',
                            borderBottom: '2px solid #16a3fe',
                            paddingBottom: "1rem"
                        }}
                        style={isActive => ({
                            color: isActive ? "#16a3fe" : "black"
                        })}>

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

            <div className="padListGrid">
             {launchpads.map(launchpad => (
                <div className="grid" key={launchpad.id}>
                    <div className="media is-flex is-align-items-center">
                        <figure className="media-left" style={{border: '1px solid rgba(249, 81, 146, 0.2)', borderRadius: '50%', overflow: 'hidden'}}>
                            <p className="image is-48x48"><img style={{filter: 'grayscale(0)'}} src={launchpad.logo} alt="" /></p>
                        </figure>
                        <div className="media-content">
                            {compareDate(launchpad.start, launchpad.end) == 0 &&
                            <div className="is-flex is-justify-content-flex-end">
                                <div className="is-flex has-text-right is-flex-direction-column">
                                    <div className="is-flex"> <span className="is-flex status-dot incoming">
                                <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx={8} cy={8} r={8} /></svg>
                                <span> </span> Upcoming</span>
                                    </div>
                                </div>
                            </div>
                            }
                            {compareDate(launchpad.start, launchpad.end) == 1 &&
                            <div className="is-flex is-justify-content-flex-end">
                                <div className="is-flex has-text-right is-flex-direction-column">
                                    <div className="is-flex"> <span className="is-flex status-dot incoming" style={{backgroundColor: "rgb(209, 250, 229)",color: "rgb(16, 185, 129)"}}>
                                <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx={8} cy={8} r={8} /></svg>
                                <span> </span> In progress</span>
                                    </div>
                                </div>
                            </div>
                            }                            
                            {compareDate(launchpad.start, launchpad.end) == 2 &&
                                <div className="is-flex is-justify-content-flex-end">
                                    <div className="is-flex has-text-right is-flex-direction-column">
                                        <div className="is-flex"> <span className="is-flex status-dot incoming" style={{backgroundColor: "rgb(255, 52, 101)",color: "rgb(255, 234, 239)"}}>
                                    <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx={8} cy={8} r={8} /></svg>
                                    <span> </span> Ended</span>
                                        </div>
                                    </div>
                                </div>
                            }

                        </div>
                    </div>
                    <div style={{marginTop:"1.5rem"}}>
                        <h3>{launchpad.name}</h3>
                        <p style={{color:"#888"}}>Fair Launch</p>
                    </div>

                    <div style={{marginTop:"1.5rem"}}>
                        <p>
                            Soft Cap:
                        </p>
                        <h3 style={{color:"#16a3fe", fontSize:"18px"}}>
                            {launchpad.softcap}
                        </h3>
                    </div>
                    

                   <Progress percent={32} />

                    <div style={{display:"flex", justifyContent:"space-between", fontSize:"12px"}}>
                        <p style={{color: "rgb(136, 136, 136)", fontSize: "13px"}}>{launchpad.min}{" "}BNB</p>
                        <p style={{color: "rgb(136, 136, 136)", fontSize: "13px"}}>{launchpad.max}{" "} BNB</p>
                    </div>

                    <div style={{borderBottom: "1px solid #f0f0f0", marginTop:"1rem", paddingBottom:"10px"}}>
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                            <h4>
                                Liquidity %:
                            </h4>
                            <p style={{color: "rgb(136, 136, 136)", fontSize: "13px"}}>
                                {launchpad.liq}
                            </p>
                        </div>

                        <div style={{display:"flex", justifyContent:"space-between"}}>
                            <h4>
                                Lockup Time:
                            </h4>
                            <p style={{color: "rgb(136, 136, 136)", fontSize: "13px"}}>
                                365 days
                            </p>
                        </div>
                    </div>

                    <div style={{display:"flex", justifyContent:"space-between", marginTop:"1.5rem"}}>
                        <div>
                            {compareDate(launchpad.start, launchpad.end) == 0 &&
                                <Countdown title="Sales starts in:" value={launchpad.start} format="HH:mm:ss" />
                            }
                            {compareDate(launchpad.start, launchpad.end) == 1 &&
                                <Countdown title="Sales ends in:" value={launchpad.end} format="HH:mm:ss" />          
                            }
                            {compareDate(launchpad.start, launchpad.end) == 2 &&
                                <Countdown title="Sales Ended" />
                            }
                        </div>
                        <div>
                            <NavLink 
                                to={`/launchpad/${launchpad.name}/${launchpad.key}`} 
                                className="padListBtn pt-8" 
                                style={{backgroundColor: "rgb(22, 163, 254)",color: "#fff"}}
                            >
                                View Pool                            
                            </NavLink>
                        </div>
                    </div>
                </div>
                )
            )}
               
            </div>
        </div>
    </section>
  )
}

export default LaunchPadList