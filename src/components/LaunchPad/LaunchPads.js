import React from "react";
import { useParams } from "react-router-dom";
import "./loader.css";
import { CgProfile } from "react-icons/cg";
import { AiOutlineTwitter, AiFillGithub } from "react-icons/ai";
import { BsTelegram } from "react-icons/bs";
import Disqus from "disqus-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Alert, Statistic, Progress} from 'antd';
import {Pie, Doughnut} from 'react-chartjs-2';
import { getLaunchpad } from "helpers/dbqueries";
ChartJS.register(ArcElement, Tooltip, Legend);
const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 120 * 60 * 24 * 2 + 1000 * 30;


export default function LaunchPads (){
const { launchpadName, launchpadId } = useParams();

  const disqusShortname = "pentswap"
  const disqusConfig = {
    url: "http://localhost:3000",
    identifier: "article-id",
    title: "Title of Your Article"
  }

const state = {
    labels: ['Presale', 'Tokens Allocated for Marketing & team', 'Tokens Allocated for Development',
             'Tokens Allocated for Public usage'],
    datasets: [
      {
        label: 'Rainfall',
        backgroundColor: [
          '#b49658',
          '#C9DE00',
          '#1890ff',
          '#00A6B4'       
        ],
        hoverBackgroundColor: [
        '#b49658CC',
        '#4B5000',
        '#1890ffCC',
        '#003350'        
        ],
        data: [65, 5, 20, 10]
      }
    ]
  }

    const [launchpad, setLaunchpad] = React.useState({title: "", name:"", rate: "", softcap: 0, whitelist: 0,
                                                hardcap: 0,min: 0, max: 0, refund: 0, router: "Pancakeswap",
                                                liq: 0,listing: 0, start: "", end: "",
                                                days: 0, vesting: false,teamVesting: false  });
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        const unsubscribe = getLaunchpad(launchpadId,(launchpad) => {
            if(launchpad == null) {
                window.location.href = "/launchpad/list";
                return;
            }
           setLaunchpad(launchpad);
           setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);
   
return (
     <>
     {loading &&
     <div className="loaderP">
        <div className="loader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
     </div>
    }
    {!loading &&
        <div className="presaleGrid" >
                <div className="presaleGridMain">
                <div className="presaleMainContainer">
                    <div className="presaleMainHeader">
                    <div className="presaleImg">
                        <img src="https://pentswap.finance/temp/app/logo.jpg" alt="logo" style={{width: "73px", transform: "scale(1.5)"}} />
                    </div>
                    <div className="presaleProfileDiv">
                        <div className="presaleProfile" style={{position: "relative"}}>
                            <h1 style={{fontSize: "26px"}}>
                                {launchpad.name} Token Launch 
                                <div class="status-wrapper"><span class="is-flex status-dot incoming"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8"></circle></svg><span> Upcoming</span></span></div>
                            </h1>{" "}                        
                        </div>
                        
                        <div className="presaleicons" style={{paddingTop: "0px"}}>
                            <a href={launchpad.twitter}>
                                <AiOutlineTwitter color="#B49658" />
                            </a> {" "} 
                            <a href={launchpad.telegram}>
                                <BsTelegram color="#B49658" /> 
                            </a> {" "} 
                            <a href={launchpad.github}>
                                <AiFillGithub color="#B49658" />
                            </a>
                        </div>

                        <p style={{fontSize: "14px"}}>
                            {launchpad.description}
                        </p>
                    </div>
                    </div>

                    <div className="presaleDetailsDiv">
                    <div className="presaleDetails" >
                        <p>
                            Presale Address
                        </p>

                        <p>
                        <a>
                        {launchpad.title}
                        </a>
                        </p>
                    </div>

                    <div className="presaleDetails">
                        <p>
                        Token Name
                        </p>

                        <p>
                        <a >
                        {launchpad.name}
                        </a>
                        </p>
                    </div>

                    <div className="presaleDetails">
                        <p>
                        Token Symbol
                        </p>

                        <p>
                        <a >
                        {launchpad.name}
                        </a>
                        </p>
                    </div>

                    <div className="presaleDetails">
                        <p>
                        Token Decimals
                        </p>

                        <p>
                        <a >
                        {launchpad.liq}
                        </a>
                        </p>
                    </div>

                    <div className="presaleDetails">
                        <p>
                        Token Address
                        </p>

                        <p style={{display: "flex", flexDirection: "column"}}>
                        <p>
                            <a >
                                0x38eF279103736597461E822B00461E88D79Fed05
                            </a>                  
                        </p>
                        <p style={{fontSize: "14px"}}>(Do not send BNB to the token address)</p>
                        </p>
                    </div>

                    <div className="presaleDetails">
                        <p>
                        Total Supply
                        </p>

                        <p>
                        <a >
                        {launchpad.max}
                        </a>
                        </p>
                    </div>

                    <div className="presaleDetails">
                        <p>
                        Tokens for Presale
                        </p>

                        <p>
                        <a >
                        {launchpad.rate} {" "} {launchpad.name}
                        </a>
                        </p>
                    </div>

                    <div className="presaleDetails">
                        <p>
                        Tokens Allocated for Development
                        </p>

                        <p>
                        <a >
                        {launchpad.liq}
                        </a>
                        </p>
                    </div>

                    <div className="presaleDetails">
                        <p>
                        Tokens Allocated for Marketing & Team
                        </p>

                        <p>
                        <a >
                            10%
                        </a>
                        </p>
                    </div>

                    <div className="presaleDetails">
                        <p>
                        Presale Start Time
                        </p>

                        <p>
                        <a >
                        {launchpad.start}
                        </a>
                        </p>
                    </div>

                    <div className="presaleDetails">
                        <p>
                        Presale End Time
                        </p>

                        <p>
                        <a >
                        {launchpad.end}
                        </a>
                        </p>
                    </div>

                    <div className="presaleDetails">
                        <p>
                        Listing On
                        </p>

                        <p>
                        <a >
                        {launchpad.router}
                        </a>
                        </p>
                    </div>

                    <div className="presaleDetails">
                        <p>
                        Accepted
                        </p>

                        <p>
                        <a >
                            BNB
                        </a>
                        </p>
                    </div>

                    

                    </div>
                </div>

                <div>
                <div className="piechartDiv">
                <Doughnut
                    data={state}
                    options={{
                    title:{
                        display:true,
                        text:'Token Metrics',
                        fontSize:20
                    },
                    legend:{
                        display:true,
                        position:'right'
                    }
                    }}
                />
                </div>
                
                <div className="disqusContainer">         
                <Disqus.DiscussionEmbed
                    shortname={disqusShortname}
                    config={disqusConfig}
                />
                </div>
            </div>
                </div>

                <div className="presaleGridSidebar">
                <div className="presaleGridSidebarContainer">
                    <div className="presaleSidebarFlexed">
                    <Alert message=" Make sure the website is pentswap.finance!" type="warning" />
                    
                    <p style={{marginTop: "15px"}}>
                        <Countdown title="Presale Starts In" value={deadline} format="HH:mm:ss" />
                    </p>

                    <Progress percent={0} />
                    
                    <div class="is-flex is-align-items-center is-size-7"><div class="is-flex-grow-1 has-text-left">0 BNB</div><div class="is-flex-grow-1 has-text-center">1000 BNB</div></div>
                    </div>

                </div>
                </div>
                    
        </div>
    }
    </>
);
}
  