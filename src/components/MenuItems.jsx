import { useLocation } from "react-router";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import { AiOutlineSwap } from "react-icons/ai";
import { GrMoney } from "react-icons/gr";
import { AiOutlineRocket, AiOutlineTwitter } from "react-icons/ai";
import { BsTelegram } from "react-icons/bs";
import { AppstoreOutlined, HomeFilled, HomeOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import "../index.css";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons'
const { SubMenu } = Menu;

function MenuItems({onClose}) {
  const { pathname } = useLocation();


  return (
      <Menu
         style={{            
            maxWidth: "250px",
            position: "fixed",
            top: "65px",
            height: "100vh",
            zIndex: 99
          }}
        defaultSelectedKeys={['1']}
       className="mobileMenu"
        mode="inline"
      >
        <Menu.Item onClick={onClose}  key="/home" icon={<HomeOutlined />}>
          <NavLink to="/home"> Home</NavLink>
        </Menu.Item>
        <Menu.Item onClick={onClose} key="/dex" icon={<AiOutlineSwap />}>
          <NavLink to="/dex">Swap</NavLink>
        </Menu.Item>
        <Menu.Item onClick={onClose} key="/presale" icon={<GrMoney />}>
         <NavLink to="/presale"> Presale</NavLink>
      </Menu.Item >
        <SubMenu key="sub1" icon={<MailOutlined />} title="Launchpads">
          <Menu.ItemGroup >
            <Menu.Item onClick={onClose}>
              <NavLink to="/launchpad/create">
                Create launchpad
              </NavLink>             
            </Menu.Item>
            {/* <Menu.Item onClick={onClose}>
              <NavLink to="/fairlaunch/create">
                Create fair launch
              </NavLink> 
            </Menu.Item>
            <Menu.Item onClick={onClose}>
              <NavLink to="/token/create">
                Create token
              </NavLink> 
            </Menu.Item> */}
            <Menu.Item onClick={onClose}>
              <NavLink to="/launchpad/list">
                Launchpad list
              </NavLink>              
            </Menu.Item>
          </Menu.ItemGroup>
          
        </SubMenu>
      
      <Menu.Item onClick={onClose} key="/liquidity" >
        <NavLink to="/liquidity">Liquidity</NavLink>
      </Menu.Item>

      <Menu.Item onClick={onClose} key="/staking/pools" >
        <NavLink to="/staking/pools">Stake</NavLink>
      </Menu.Item>

      {/* <Menu.Item onClick={onClose} key="/launchpad/farm" icon={<GrMoney />}>
        <NavLink to="/launchpad/farm">Farms</NavLink>
      </Menu.Item> */}

      <Menu.Item onClick={onClose} key="/quickstart" icon={<AiOutlineTwitter />}>
        <a rel="noreferrer" href="https://twitter.com/pentswap" target="_blank">Twitter</a>
      </Menu.Item>
     
      <Menu.Item onClick={onClose} key="/telegram" icon={<BsTelegram />}>
        <a rel="noreferrer" href="https://t.me/pentswap" target="_blank"> Telegram</a>
      </Menu.Item>
    </Menu>
  );
}

export default MenuItems;
