import { useEffect, useState } from "react";
import React from 'react';
import { useMoralis } from "react-moralis";
import {
  BrowserRouter as Router,
  Switch,
  Route, 
 Redirect,
} from "react-router-dom";
import Account from "components/Account/Account";
import DEX from "components/DEX";
import AddLiquidity from "components/AddLiquidity";
import { Layout} from "antd";
import "antd/dist/antd.css";
import "./style.css";
import MenuItems from "./components/MenuItems";
import QuickStart from "components/QuickStart";
import Home from "components/Home/Home";
import {GiHamburgerMenu} from "react-icons/gi";
import { Drawer, Button } from 'antd';
import { Menu, Breadcrumb } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import CreateLaunchPad from "components/LaunchPad/CreateLaunchPad";
import LaunchPadList from "components/LaunchPad/LaunchPadList";
import MyContribution from "components/LaunchPad/MyContribution";
import LaunchpadForm from "components/LaunchPad/LaunchpadForm";
import LaunchPads from "components/LaunchPad/LaunchPads";
import Liquidity from "components/Liquidity";
import Stake from "components/Stake";
import Farms from "components/Farms";
// import FairLaunch from "components/LaunchPad/FairLaunch";
// import LaunchpadToken from "components/LaunchPad/LaunchpadToken";

// const { Header, Sider } = Layout;
const { Header, Content, Sider } = Layout;
// const customTokens = {
//     "0x38eF279103736597461E822B00461E88D79Fed05": {
//       address: "0x38eF279103736597461E822B00461E88D79Fed05",
//       decimals: 18,
//       logoURI: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAABt0lEQVR4nO3csU3EQBRFUddBRiFIVEEtdLPV0M62sFTg6AuNPvcEN57n8QktX2+fj9ekj/cvHWz6/i4AdgdAPADiARAPgHgAxAMgHgDxAIgHQDwA4gEQD4B4AMQDIN4YwOkHeH7/jLJ/FgDx/QDE9wMQ3w9AfD8A8f0AxPcDEN8PQHw/APH9AMT3AxDfD0B8PwDx/QDE9wMQ338cwPSDhu2dvn8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0P8LgHgAxAMgHgDxAIgHQDwA4gEQD4B4AMQDIB4A8QCIB0A8AOJdp39wcPr87fun5wOwfD8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwA2A0wOm52//wcPp+wMAgN0PAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANwB2H6B2zt9/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwFy9wev70g4pp2+8PAAB2PwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABw0y+Lh71yNxkiwgAAAABJRU5ErkJggg==",
//       name: "PENT TOKEN",
//       symbol: "PNTG",
//     },
//   };


const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    margin: "130px auto",
    padding: "10px",
    width: "100%",
    position: "static"
  },  
  header: {
    position: "fixed",
    zIndex: 999,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",  
  },
};
const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, isAuthenticated} =
    useMoralis();

  useEffect(() => {
  //  const connectorId = window.localStorage.getItem("connectorId");
    //if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      //enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  const [visible, setVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = () => {
    setCollapsed(!collapsed)
  }
  const showDrawer = () => {
    setVisible(true);
  }

  const onClose = () => {
    setVisible(false);
  }

  // const toggle = () => {
  //   setCollapsed(!collapsed)
  // }
  return (
    <>
      <Layout style={{ height: "auto", overflow: "auto" }}>
<Router>
  <Header style={styles.header}>

   <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Button 
        type="primary" 
        className="btnNav"
        onClick={showDrawer}
      >
        < GiHamburgerMenu  />
      </Button>
      <Logo />            
   </div>

    <div style={styles.headerRight}>
      
      <Account />
    </div>
  </Header>
  
  {/* <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <Button 
        type="primary" 
        className="btnNav"
        onClick={() => {
          setVisible(true);
        }}>
        < GiHamburgerMenu  />
      </Button>
    <MenuItems />    
  </Sider> */}
  <Drawer
    title="PentSwap" 
    placement="left" 
    closable={false}
    visible={visible}
    width="280"
    onClose={() => {
      setVisible(false)
    }}
  >
    <MenuItems onClose={onClose}/>     
  </Drawer>      

  <Content>
    <Switch>
      <Route path="/home">
        
        <Home />
      </Route>
      <Route path="/dex">
        
        <DEX  style={styles.content} chain="bsc"/>
      </Route>              
      <Route exact path="/presale">
        <QuickStart isServerInfo={isServerInfo} />
      </Route>
      <Route path="/liquidity">
        <Liquidity/>
      </Route>
      <Route path="/add-liquidity">
        <AddLiquidity />
      </Route>
      <Route path="/staking/pools">
        <Stake/>
      </Route>
      <Route path="/nonauthenticated">
        <>Please login using the "Authenticate" button</>
      </Route>
      <Route path="/launchpad/create">
        <CreateLaunchPad/>
      </Route>

      <Route path="/launchpad/list">
        <LaunchPadList/>
      </Route>

      <Route path="/launchpad/farm">
        <Farms/>
      </Route>

      <Route path="/launchpad/mylist">
        <MyContribution/>
      </Route>
      <Route exact path="/launchpad/">
        <Redirect to="/launchpad/list" />
      </Route>
      
      <Route path="/launchpad/:launchpadName/:launchpadId" component={LaunchPads}>
        <LaunchPads  />
      </Route>
      
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      {/* <Route path="/fairlaunch/create">
        <FairLaunch/>
      </Route>

      <Route path="/token/create">
        <LaunchpadToken/>
      </Route> */}
    </Switch>
  </Content>
</Router>

</Layout>
    </>
  );
};

export const Logo = () => (
  <div style={{ display: "flex" }}>
    <img src="https://pentswap.finance/temp/app/logo.jpg" alt="logo" style={{ width: "40px" }} />
  </div>
);

export default App;
