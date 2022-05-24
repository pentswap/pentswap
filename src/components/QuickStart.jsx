import React from "react";
import moment from 'moment';
import "../index.css";
import { CgProfile } from "react-icons/cg";
import { AiOutlineTwitter, AiFillGithub } from "react-icons/ai";
import { BsTelegram } from "react-icons/bs";
import Disqus from "disqus-react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Alert, Statistic, Progress} from 'antd';
import {Pie, Doughnut} from 'react-chartjs-2';
import { getPresale} from 'helpers/dbqueries';

ChartJS.register(ArcElement, Tooltip, Legend);
const { Countdown } = Statistic;




export default function QuickStart({ isServerInfo }) {
  const [presale, setPresale] = React.useState({presaleAddress: "0x0", start: "",endTime: ""});
  const disqusShortname = "pentswap"
  const disqusConfig = {
    url: "http://localhost:3000",
    identifier: "article-id",
    title: "Title of Your Article"
  }
  const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        const unsubscribe = getPresale((presale) => {           
           setPresale(presale);
           setLoading(false);
        });
        return () => {
            unsubscribe();
        };
    }, []);

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
                    PentSwap Token Launch
                    <div class="status-wrapper"><span class="is-flex status-dot incoming"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8"></circle></svg><span> Upcoming</span></span></div>
                  </h1>{" "}
                

                </div>
                <div className="presaleicons" style={{paddingTop: "0px"}}>
                  <AiOutlineTwitter color="#B49658" /> {" "} <BsTelegram color="#B49658" /> {" "} <AiFillGithub color="#B49658" />
                </div>

                <p style={{fontSize: "14px"}}>
                 PentSwap is committed to providing a sophisticated easy to use crypto swap application that will allow anyone to store, send, receive, exchange, and swap crypto assets at the convenience of users.
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
                   {presale.presaleAddress}
                  </a>
                </p>
              </div>

              <div className="presaleDetails">
                <p>
                  Token Name
                </p>

                <p>
                  <a >
                  Pent Token
                  </a>
                </p>
              </div>

              <div className="presaleDetails">
                <p>
                  Token Symbol
                </p>

                <p>
                  <a >
                    PNTG
                  </a>
                </p>
              </div>

              <div className="presaleDetails">
                <p>
                  Token Decimals
                </p>

                <p>
                  <a >
                    18
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
                   	500,000,000 PNTG
                  </a>
                </p>
              </div>

              <div className="presaleDetails">
                <p>
                  Tokens for Presale
                </p>

                <p>
                  <a >
                  15,000,000 PNTG
                  </a>
                </p>
              </div>

              <div className="presaleDetails">
                <p>
                  Tokens Allocated for Development
                </p>

                <p>
                  <a >
                   	15%
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
                    {presale.start} (UTC)
                  </a>
                </p>
              </div>

              <div className="presaleDetails">
                <p>
                  Presale End Time
                </p>

                <p>
                  <a>
                    {presale.endTime} (UTC)
                  </a>
                </p>
              </div>

              <div className="presaleDetails">
                <p>
                  Listing On
                </p>

                <p>
                  <a >
                    Pancakeswap
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
                <Countdown title="Presale Starts In" value={presale.start} format="HH:mm:ss" />
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
