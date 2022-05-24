import React from 'react';
import '../index.css';
// import "./Launchpad/launchpad.css";
import { NavLink } from "react-router-dom";
import {BsFillForwardFill, BsFillGrid3X2GapFill, BsFillGrid1X2Fill} from 'react-icons/bs';


const Farms = () => {
  return (
    <section className="launchPadListDiv">

        <div className="padListNav">
            <div className="padlink">
                <NavLink
                    to="#"
                    activeStyle={{
                        fontWeight: '400',
                        borderBottom: '2px solid #16a3fe',
                        paddingBottom: "1rem"
                        }}
                        style={isActive => ({
                        color: isActive ? "#16a3fe" : "black"
                    })}>
                    Farms
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

                    Pools
                </NavLink>
            </div>
        </div>

        <div className="launchPadList">

            <h1 style={{fontSize: "36px", marginTop: "84x", fontWeight:"600"}}>
                Farms
            </h1>

            <p style={{fontSize: "23px", paddingTop: "10px"}}>
                Stake LP tokens to earn
            </p>

            <a href="#">
                <span>Community Auctions</span> <BsFillForwardFill/>
            </a>

            <div style={{marginTop:"3rem"}}>
                <form className='farmFormInput'>
                    <div 
                        className="farmInputDiv"
                    >
                        <div className="farmInputDivIcons">
                            <BsFillGrid3X2GapFill/> {" "} 
                            <BsFillGrid1X2Fill/>  
                        </div>

                        <div style={{display:"flex", alignItems:"center"}}>
                            <div 
                                className='checkboxDiv'
                                style={{display:"flex", alignItems:"center"}}
                            >
                                <input type="checkbox"/>
                                <div className='nut'></div>
                            </div>

                            <div className='staked'>
                                <span>
                                    Staked only
                                </span>
                            </div>
                        </div>

                        <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                            <div className='liveStake'>
                                <a href="#" className='liveLink'>
                                    Live
                                </a>

                                <span>
                                    Finished
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="farmFormSelect">
                        <div className='farmFormSelectDiv' style={{display: "flex", width:"100%", flexDirection:"column"}}>
                            <p style={{fontSize: "12px"}}>SORT BY</p>
                            <select>
                                <option>
                                    Hot
                                </option>
                                <option>
                                    APR
                                </option>
                                <option>
                                    Multiplier
                                </option>
                                <option>
                                    Earned
                                </option>
                                <option>
                                    Liquidity
                                </option>
                                <option>
                                    Latest
                                </option>
                            </select>
                        </div>

                        <div className='farmFormInputDiv' style={{display: "flex", flexDirection:"column", width:"100%"}}>
                            <p style={{fontSize: "12px"}}>SEARCH</p>
                            <input type="text" placeholder='Search Farms'/>
                        </div>
                    </div>
                </form>
            </div>    

            <div className='farmGridDiv' style={{marginTop:'5rem'}}>

               <div className='farmGrid'>                    

                    <div className='farmGridDetails'>
                        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <div>
                                {/* <img src={}/> */}
                                <p>
                                    Logo
                                </p>
                            </div>
                            {" "}
                            <span style={{marginLeft:"1rem"}}>
                                CAKE-BNB
                            </span>
                        </div>

                        <div>
                            <p style={{fontSize:"14px"}}>
                                Earned
                            </p>
                            <h4>
                                0
                            </h4>
                        </div>

                        <div>
                            <p style={{fontSize:"14px"}}>
                                APR
                            </p>
                            <h4>
                                43.74% {" "}
                                <svg 
                                    viewBox="0 0 24 24" 
                                    width="18px" color="text" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    class="sc-5a69fd5e-0 bcGsoh"
                                >
                                    <path 
                                        d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z"></path><path d="M11.25 7.72H6.25V9.22H11.25V7.72Z"></path><path d="M18 15.75H13V17.25H18V15.75Z"></path><path d="M18 13.25H13V14.75H18V13.25Z"></path><path d="M8 18H9.5V16H11.5V14.5H9.5V12.5H8V14.5H6V16H8V18Z"></path><path d="M14.09 10.95L15.5 9.54L16.91 10.95L17.97 9.89L16.56 8.47L17.97 7.06L16.91 6L15.5 7.41L14.09 6L13.03 7.06L14.44 8.47L13.03 9.89L14.09 10.95Z">
                                    </path>
                                </svg>
                            </h4>
                        </div>

                        <div>
                            <p style={{fontSize:"14px"}}>
                                Earned
                            </p>
                            <h4>
                                0
                            </h4>
                        </div>                        

                        <div>
                            <p style={{fontSize:"14px"}}>
                                Multiplier
                            </p>
                            <h4>
                                40x
                                <svg 
                                    viewBox="0 0 24 24" 
                                    color="textSubtle" 
                                    width="20px" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    class="sc-5a69fd5e-0 doneTG"
                                >
                                    <path 
                                        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 16H13V18H11V16ZM12.61 6.04C10.55 5.74 8.73 7.01 8.18 8.83C8 9.41 8.44 10 9.05 10H9.25C9.66 10 9.99 9.71 10.13 9.33C10.45 8.44 11.4 7.83 12.43 8.05C13.38 8.25 14.08 9.18 14 10.15C13.9 11.49 12.38 11.78 11.55 13.03C11.55 13.04 11.54 13.04 11.54 13.05C11.53 13.07 11.52 13.08 11.51 13.1C11.42 13.25 11.33 13.42 11.26 13.6C11.25 13.63 11.23 13.65 11.22 13.68C11.21 13.7 11.21 13.72 11.2 13.75C11.08 14.09 11 14.5 11 15H13C13 14.58 13.11 14.23 13.28 13.93C13.3 13.9 13.31 13.87 13.33 13.84C13.41 13.7 13.51 13.57 13.61 13.45C13.62 13.44 13.63 13.42 13.64 13.41C13.74 13.29 13.85 13.18 13.97 13.07C14.93 12.16 16.23 11.42 15.96 9.51C15.72 7.77 14.35 6.3 12.61 6.04Z">                                            
                                    </path>
                                </svg>
                            </h4>
                        </div>

                        <div>
                            <a href="#">
                                Details
                            </a>
                        </div>

                    </div>

                    <div className='farmGridDetails'>
                        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <div>
                                {/* <img src={}/> */}
                                <p>
                                    Logo
                                </p>
                            </div>
                            {" "}
                            <span style={{marginLeft:"1rem"}}>
                                CAKE-BNB
                            </span>
                        </div>

                        <div>
                            <p style={{fontSize:"14px"}}>
                                Earned
                            </p>
                            <h4>
                                0
                            </h4>
                        </div>

                        <div>
                            <p style={{fontSize:"14px"}}>
                                APR
                            </p>
                            <h4>
                                43.74% {" "}
                                <svg 
                                    viewBox="0 0 24 24" 
                                    width="18px" color="text" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    class="sc-5a69fd5e-0 bcGsoh"
                                >
                                    <path 
                                        d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z"></path><path d="M11.25 7.72H6.25V9.22H11.25V7.72Z"></path><path d="M18 15.75H13V17.25H18V15.75Z"></path><path d="M18 13.25H13V14.75H18V13.25Z"></path><path d="M8 18H9.5V16H11.5V14.5H9.5V12.5H8V14.5H6V16H8V18Z"></path><path d="M14.09 10.95L15.5 9.54L16.91 10.95L17.97 9.89L16.56 8.47L17.97 7.06L16.91 6L15.5 7.41L14.09 6L13.03 7.06L14.44 8.47L13.03 9.89L14.09 10.95Z">
                                    </path>
                                </svg>
                            </h4>
                        </div>

                        <div>
                            <p style={{fontSize:"14px"}}>
                                Earned
                            </p>
                            <h4>
                                0
                            </h4>
                        </div>                        

                        <div>
                            <p style={{fontSize:"14px"}}>
                                Multiplier
                            </p>
                            <h4>
                                40x
                                <svg 
                                    viewBox="0 0 24 24" 
                                    color="textSubtle" 
                                    width="20px" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    class="sc-5a69fd5e-0 doneTG"
                                >
                                    <path 
                                        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 16H13V18H11V16ZM12.61 6.04C10.55 5.74 8.73 7.01 8.18 8.83C8 9.41 8.44 10 9.05 10H9.25C9.66 10 9.99 9.71 10.13 9.33C10.45 8.44 11.4 7.83 12.43 8.05C13.38 8.25 14.08 9.18 14 10.15C13.9 11.49 12.38 11.78 11.55 13.03C11.55 13.04 11.54 13.04 11.54 13.05C11.53 13.07 11.52 13.08 11.51 13.1C11.42 13.25 11.33 13.42 11.26 13.6C11.25 13.63 11.23 13.65 11.22 13.68C11.21 13.7 11.21 13.72 11.2 13.75C11.08 14.09 11 14.5 11 15H13C13 14.58 13.11 14.23 13.28 13.93C13.3 13.9 13.31 13.87 13.33 13.84C13.41 13.7 13.51 13.57 13.61 13.45C13.62 13.44 13.63 13.42 13.64 13.41C13.74 13.29 13.85 13.18 13.97 13.07C14.93 12.16 16.23 11.42 15.96 9.51C15.72 7.77 14.35 6.3 12.61 6.04Z">                                            
                                    </path>
                                </svg>
                            </h4>
                        </div>

                        <div>
                            <a href="#">
                                Details
                            </a>
                        </div>

                    </div>

                    <div className='farmGridDetails'>
                        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <div>
                                {/* <img src={}/> */}
                                <p>
                                    Logo
                                </p>
                            </div>
                            {" "}
                            <span style={{marginLeft:"1rem"}}>
                                CAKE-BNB
                            </span>
                        </div>

                        <div>
                            <p style={{fontSize:"14px"}}>
                                Earned
                            </p>
                            <h4>
                                0
                            </h4>
                        </div>

                        <div>
                            <p style={{fontSize:"14px"}}>
                                APR
                            </p>
                            <h4>
                                43.74% {" "}
                                <svg 
                                    viewBox="0 0 24 24" 
                                    width="18px" color="text" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    class="sc-5a69fd5e-0 bcGsoh"
                                >
                                    <path 
                                        d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z"></path><path d="M11.25 7.72H6.25V9.22H11.25V7.72Z"></path><path d="M18 15.75H13V17.25H18V15.75Z"></path><path d="M18 13.25H13V14.75H18V13.25Z"></path><path d="M8 18H9.5V16H11.5V14.5H9.5V12.5H8V14.5H6V16H8V18Z"></path><path d="M14.09 10.95L15.5 9.54L16.91 10.95L17.97 9.89L16.56 8.47L17.97 7.06L16.91 6L15.5 7.41L14.09 6L13.03 7.06L14.44 8.47L13.03 9.89L14.09 10.95Z">
                                    </path>
                                </svg>
                            </h4>
                        </div>

                        <div>
                            <p style={{fontSize:"14px"}}>
                                Earned
                            </p>
                            <h4>
                                0
                            </h4>
                        </div>                        

                        <div>
                            <p style={{fontSize:"14px"}}>
                                Multiplier
                            </p>
                            <h4>
                                40x
                                <svg 
                                    viewBox="0 0 24 24" 
                                    color="textSubtle" 
                                    width="20px" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    class="sc-5a69fd5e-0 doneTG"
                                >
                                    <path 
                                        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 16H13V18H11V16ZM12.61 6.04C10.55 5.74 8.73 7.01 8.18 8.83C8 9.41 8.44 10 9.05 10H9.25C9.66 10 9.99 9.71 10.13 9.33C10.45 8.44 11.4 7.83 12.43 8.05C13.38 8.25 14.08 9.18 14 10.15C13.9 11.49 12.38 11.78 11.55 13.03C11.55 13.04 11.54 13.04 11.54 13.05C11.53 13.07 11.52 13.08 11.51 13.1C11.42 13.25 11.33 13.42 11.26 13.6C11.25 13.63 11.23 13.65 11.22 13.68C11.21 13.7 11.21 13.72 11.2 13.75C11.08 14.09 11 14.5 11 15H13C13 14.58 13.11 14.23 13.28 13.93C13.3 13.9 13.31 13.87 13.33 13.84C13.41 13.7 13.51 13.57 13.61 13.45C13.62 13.44 13.63 13.42 13.64 13.41C13.74 13.29 13.85 13.18 13.97 13.07C14.93 12.16 16.23 11.42 15.96 9.51C15.72 7.77 14.35 6.3 12.61 6.04Z">                                            
                                    </path>
                                </svg>
                            </h4>
                        </div>

                        <div>
                            <a href="#">
                                Details
                            </a>
                        </div>

                    </div>

                    <div className='farmGridDetails'>
                        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <div>
                                {/* <img src={}/> */}
                                <p>
                                    Logo
                                </p>
                            </div>
                            {" "}
                            <span style={{marginLeft:"1rem"}}>
                                CAKE-BNB
                            </span>
                        </div>

                        <div>
                            <p style={{fontSize:"14px"}}>
                                Earned
                            </p>
                            <h4>
                                0
                            </h4>
                        </div>

                        <div>
                            <p style={{fontSize:"14px"}}>
                                APR
                            </p>
                            <h4>
                                43.74% {" "}
                                <svg 
                                    viewBox="0 0 24 24" 
                                    width="18px" color="text" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    class="sc-5a69fd5e-0 bcGsoh"
                                >
                                    <path 
                                        d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z"></path><path d="M11.25 7.72H6.25V9.22H11.25V7.72Z"></path><path d="M18 15.75H13V17.25H18V15.75Z"></path><path d="M18 13.25H13V14.75H18V13.25Z"></path><path d="M8 18H9.5V16H11.5V14.5H9.5V12.5H8V14.5H6V16H8V18Z"></path><path d="M14.09 10.95L15.5 9.54L16.91 10.95L17.97 9.89L16.56 8.47L17.97 7.06L16.91 6L15.5 7.41L14.09 6L13.03 7.06L14.44 8.47L13.03 9.89L14.09 10.95Z">
                                    </path>
                                </svg>
                            </h4>
                        </div>

                        <div>
                            <p style={{fontSize:"14px"}}>
                                Earned
                            </p>
                            <h4>
                                0
                            </h4>
                        </div>                        

                        <div>
                            <p style={{fontSize:"14px"}}>
                                Multiplier
                            </p>
                            <h4>
                                40x
                                <svg 
                                    viewBox="0 0 24 24" 
                                    color="textSubtle" 
                                    width="20px" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    class="sc-5a69fd5e-0 doneTG"
                                >
                                    <path 
                                        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 16H13V18H11V16ZM12.61 6.04C10.55 5.74 8.73 7.01 8.18 8.83C8 9.41 8.44 10 9.05 10H9.25C9.66 10 9.99 9.71 10.13 9.33C10.45 8.44 11.4 7.83 12.43 8.05C13.38 8.25 14.08 9.18 14 10.15C13.9 11.49 12.38 11.78 11.55 13.03C11.55 13.04 11.54 13.04 11.54 13.05C11.53 13.07 11.52 13.08 11.51 13.1C11.42 13.25 11.33 13.42 11.26 13.6C11.25 13.63 11.23 13.65 11.22 13.68C11.21 13.7 11.21 13.72 11.2 13.75C11.08 14.09 11 14.5 11 15H13C13 14.58 13.11 14.23 13.28 13.93C13.3 13.9 13.31 13.87 13.33 13.84C13.41 13.7 13.51 13.57 13.61 13.45C13.62 13.44 13.63 13.42 13.64 13.41C13.74 13.29 13.85 13.18 13.97 13.07C14.93 12.16 16.23 11.42 15.96 9.51C15.72 7.77 14.35 6.3 12.61 6.04Z">                                            
                                    </path>
                                </svg>
                            </h4>
                        </div>

                        <div>
                            <a href="#">
                                Details
                            </a>
                        </div>

                    </div>

                    <div className='farmGridDetails'>
                        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <div>
                                {/* <img src={}/> */}
                                <p>
                                    Logo
                                </p>
                            </div>
                            {" "}
                            <span style={{marginLeft:"1rem"}}>
                                CAKE-BNB
                            </span>
                        </div>

                        <div>
                            <p style={{fontSize:"14px"}}>
                                Earned
                            </p>
                            <h4>
                                0
                            </h4>
                        </div>

                        <div>
                            <p style={{fontSize:"14px"}}>
                                APR
                            </p>
                            <h4>
                                43.74% {" "}
                                <svg 
                                    viewBox="0 0 24 24" 
                                    width="18px" color="text" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    class="sc-5a69fd5e-0 bcGsoh"
                                >
                                    <path 
                                        d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z"></path><path d="M11.25 7.72H6.25V9.22H11.25V7.72Z"></path><path d="M18 15.75H13V17.25H18V15.75Z"></path><path d="M18 13.25H13V14.75H18V13.25Z"></path><path d="M8 18H9.5V16H11.5V14.5H9.5V12.5H8V14.5H6V16H8V18Z"></path><path d="M14.09 10.95L15.5 9.54L16.91 10.95L17.97 9.89L16.56 8.47L17.97 7.06L16.91 6L15.5 7.41L14.09 6L13.03 7.06L14.44 8.47L13.03 9.89L14.09 10.95Z">
                                    </path>
                                </svg>
                            </h4>
                        </div>

                        <div>
                            <p style={{fontSize:"14px"}}>
                                Earned
                            </p>
                            <h4>
                                0
                            </h4>
                        </div>                        

                        <div>
                            <p style={{fontSize:"14px"}}>
                                Multiplier
                            </p>
                            <h4>
                                40x
                                <svg 
                                    viewBox="0 0 24 24" 
                                    color="textSubtle" 
                                    width="20px" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    class="sc-5a69fd5e-0 doneTG"
                                >
                                    <path 
                                        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 16H13V18H11V16ZM12.61 6.04C10.55 5.74 8.73 7.01 8.18 8.83C8 9.41 8.44 10 9.05 10H9.25C9.66 10 9.99 9.71 10.13 9.33C10.45 8.44 11.4 7.83 12.43 8.05C13.38 8.25 14.08 9.18 14 10.15C13.9 11.49 12.38 11.78 11.55 13.03C11.55 13.04 11.54 13.04 11.54 13.05C11.53 13.07 11.52 13.08 11.51 13.1C11.42 13.25 11.33 13.42 11.26 13.6C11.25 13.63 11.23 13.65 11.22 13.68C11.21 13.7 11.21 13.72 11.2 13.75C11.08 14.09 11 14.5 11 15H13C13 14.58 13.11 14.23 13.28 13.93C13.3 13.9 13.31 13.87 13.33 13.84C13.41 13.7 13.51 13.57 13.61 13.45C13.62 13.44 13.63 13.42 13.64 13.41C13.74 13.29 13.85 13.18 13.97 13.07C14.93 12.16 16.23 11.42 15.96 9.51C15.72 7.77 14.35 6.3 12.61 6.04Z">                                            
                                    </path>
                                </svg>
                            </h4>
                        </div>

                        <div>
                            <a href="#">
                                Details
                            </a>
                        </div>

                    </div>

                    <div className='farmGridDetails'>
                        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
                            <div>
                                {/* <img src={}/> */}
                                <p>
                                    Logo
                                </p>
                            </div>
                            {" "}
                            <span style={{marginLeft:"1rem"}}>
                                CAKE-BNB
                            </span>
                        </div>

                        <div>
                            <p style={{fontSize:"14px"}}>
                                Earned
                            </p>
                            <h4>
                                0
                            </h4>
                        </div>

                        <div>
                            <p style={{fontSize:"14px"}}>
                                APR
                            </p>
                            <h4>
                                43.74% {" "}
                                <svg 
                                    viewBox="0 0 24 24" 
                                    width="18px" color="text" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    class="sc-5a69fd5e-0 bcGsoh"
                                >
                                    <path 
                                        d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19Z"></path><path d="M11.25 7.72H6.25V9.22H11.25V7.72Z"></path><path d="M18 15.75H13V17.25H18V15.75Z"></path><path d="M18 13.25H13V14.75H18V13.25Z"></path><path d="M8 18H9.5V16H11.5V14.5H9.5V12.5H8V14.5H6V16H8V18Z"></path><path d="M14.09 10.95L15.5 9.54L16.91 10.95L17.97 9.89L16.56 8.47L17.97 7.06L16.91 6L15.5 7.41L14.09 6L13.03 7.06L14.44 8.47L13.03 9.89L14.09 10.95Z">
                                    </path>
                                </svg>
                            </h4>
                        </div>

                        <div>
                            <p style={{fontSize:"14px"}}>
                                Earned
                            </p>
                            <h4>
                                0
                            </h4>
                        </div>                        

                        <div>
                            <p style={{fontSize:"14px"}}>
                                Multiplier
                            </p>
                            <h4>
                                40x
                                <svg 
                                    viewBox="0 0 24 24" 
                                    color="textSubtle" 
                                    width="20px" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    class="sc-5a69fd5e-0 doneTG"
                                >
                                    <path 
                                        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 16H13V18H11V16ZM12.61 6.04C10.55 5.74 8.73 7.01 8.18 8.83C8 9.41 8.44 10 9.05 10H9.25C9.66 10 9.99 9.71 10.13 9.33C10.45 8.44 11.4 7.83 12.43 8.05C13.38 8.25 14.08 9.18 14 10.15C13.9 11.49 12.38 11.78 11.55 13.03C11.55 13.04 11.54 13.04 11.54 13.05C11.53 13.07 11.52 13.08 11.51 13.1C11.42 13.25 11.33 13.42 11.26 13.6C11.25 13.63 11.23 13.65 11.22 13.68C11.21 13.7 11.21 13.72 11.2 13.75C11.08 14.09 11 14.5 11 15H13C13 14.58 13.11 14.23 13.28 13.93C13.3 13.9 13.31 13.87 13.33 13.84C13.41 13.7 13.51 13.57 13.61 13.45C13.62 13.44 13.63 13.42 13.64 13.41C13.74 13.29 13.85 13.18 13.97 13.07C14.93 12.16 16.23 11.42 15.96 9.51C15.72 7.77 14.35 6.3 12.61 6.04Z">                                            
                                    </path>
                                </svg>
                            </h4>
                        </div>

                        <div>
                            <a href="#">
                                Details
                            </a>
                        </div>

                    </div>
               </div>
            </div>
        </div>

        
    </section>
  )
}

export default Farms