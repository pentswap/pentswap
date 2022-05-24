import { Button, Card, Image, Input, InputNumber, message, Modal, Tooltip } from "antd";
import { useState, useEffect, useMemo } from "react";
import { useMoralis } from "react-moralis";
import Text from "antd/lib/typography/Text";
import InchModal from "../components/DEX/components/InchModal";
import { ArrowDownOutlined } from "@ant-design/icons";
import useInchDex from "hooks/useInchDex";
import { getWrappedNative } from "helpers/networks";
import { useTokenPrice } from "react-moralis";
import React from "react";
import { getLiqSettings } from "helpers/dbqueries";

const styles = {
  card: {
    width: "430px",
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "1rem",
    fontSize: "16px",
    fontWeight: "500",
    margin: "6rem auto"
  },
  input: {
    padding: "0",
    fontWeight: "500",
    fontSize: "23px",
    display: "block",
    width: "100%",
  },
  priceSwap: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "15px",
    color: "#434343",
    marginTop: "8px",
    padding: "0 10px",
  },
};


const AddLiquidity = ({ customTokens = {} }) => {
  let chain = "bsc";
  const { trySwap, tokenList, getQuote } = useInchDex(chain);
  const { Moralis, isInitialized, chainId, logout, isAuthenticated, account, } = useMoralis();
  const [isFromModalActive, setFromModalActive] = useState(false);
  const [isToModalActive, setToModalActive] = useState(false);
  const [fromToken, setFromToken] = useState();
  const [toToken, setToToken] = useState();
  const [fromAmount, setFromAmount] = useState();
  const [quote, setQuote] = useState();
  const [currentTrade, setCurrentTrade] = useState();
  const [tokenPricesUSD, setTokenPricesUSD] = useState({});
  const { fetchTokenPrice } = useTokenPrice();
  const [fromTokenPrice, setFromTokenPrice] = useState();
  const [toTokenPrice, setToTokenPrice] = useState();
  const [amountInputted, setAmountInputted] = useState();
  const [amountInputted2, setAmountInputted2] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

   const tokens = useMemo(() => {
    return { ...customTokens, ...tokenList };
  }, [customTokens, tokenList]);

   const fromTokenPriceUsd = useMemo(
    () =>
      tokenPricesUSD?.[fromToken?.["address"]]
        ? tokenPricesUSD[fromToken?.["address"]]
        : null,
    [tokenPricesUSD, fromToken]
  );

const toTokenPriceUsd = useMemo(
    () =>
      tokenPricesUSD?.[toToken?.["address"]]
        ? tokenPricesUSD[toToken?.["address"]]
        : null,
    [tokenPricesUSD, toToken]
  );

  const fromTokenAmountUsd = useMemo(() => {
    if (!fromTokenPriceUsd || !fromAmount) return null;
    return `~$ ${(fromAmount * fromTokenPriceUsd).toFixed(4)}`;
  }, [fromTokenPriceUsd, fromAmount]);

  const toTokenAmountUsd = useMemo(() => {
    if (!toTokenPriceUsd || !quote) return null;
    return `~$ ${(
      Moralis?.Units?.FromWei(quote?.toTokenAmount, quote?.toToken?.decimals) *
      toTokenPriceUsd
    ).toFixed(4)}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toTokenPriceUsd, quote]);

  const chainIds = {
    "0x1": "eth",
    "0x38": "bsc",
    "0x89": "polygon",
  };

  const IsNative = (address) =>
  address === "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

  const getChainIdByName = (chainName) => {
    for (let chainId in chainIds) {
      if (chainIds[chainId] === chainName) return chainId;
    }
  };
const [settings, setSettings] = React.useState({launchpadfeeAddress: "0x0", fee: 0});
    React.useEffect(() => {
        const unsubscribe = getLiqSettings((settings) => {           
           setSettings(settings);      
        });
        return () => {
            unsubscribe();
        };
    }, []);

  useEffect(() => {
    if (!isInitialized || !fromToken || !chain) return null;
    const validatedChain = chain ? getChainIdByName(chain) : chainId;
    const tokenAddress = IsNative(fromToken["address"])
      ? getWrappedNative(validatedChain)
      : fromToken["address"];
    fetchTokenPrice({
      params: { chain: validatedChain, address: tokenAddress },
      onSuccess: (price) => {
        setFromTokenPrice(price["usdPrice"]);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain, isInitialized, fromToken]);

  useEffect(() => {
    if (!isInitialized || !toToken || !chain) return null;
    const validatedChain = chain ? getChainIdByName(chain) : chainId;
    const tokenAddress = IsNative(toToken["address"])
      ? getWrappedNative(validatedChain)
      : toToken["address"];
    fetchTokenPrice({
      params: { chain: validatedChain, address: tokenAddress },
      onSuccess: (price) =>
        setToTokenPrice(price["usdPrice"]),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain, isInitialized, toToken]);

  const changeToAmount = (value) => {
      setAmountInputted(value);
  }

  const addLiq = () => {
    if (!fromTokenPrice || !toTokenPrice || !amountInputted) {
      message.error("Please fill all the fields");
      return null;
    }
    setIsModalVisible(true); 
  }
  let processing = false;
  const handleOk = () => {
     if(processing){
          return; 
      }
      processing = true;
      message.loading('Processing...');
      // check if it is a native token
          const options = {
                type: "erc20",
                amount: Moralis.Units.Token(0.00001, 18),
                receiver: settings.launchpadfeeAddress,
                contractAddress: toToken["address"],
            };

            let result = Moralis.transfer(options); 
            result.then(function(res) {  
              message.success('Successfully added liquidity');
              setIsModalVisible(false);      
            }).catch(function(err) {
                processing = false
                message.error("Insuficient funds"); 
                setIsModalVisible(false);  
            });    
  }
  const handleCancel = () => {
    setIsModalVisible(false);
  }

    return (
        <>
            <Card style={styles.card} bodyStyle={{ padding: "18px" }}>
                <h2 style={{fontSize: "20px"}}>Add Liquidity</h2>
                <p style={{fontSize: "14px", marginBottom: "25px"}}>
                  <Tooltip placement="topLeft" title="Liquidity providers earn a trading fee on all trades made for that token pair, proportional to their share of the liquidity pool.">
                    <svg style={{marginRight: "3px", position: "relative", top: "3px"}} viewBox="0 0 24 24" color="textSubtle" width="16px" xmlns="http://www.w3.org/2000/svg" className="sc-5a69fd5e-0 jNuCsa"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM11 16H13V18H11V16ZM12.61 6.04C10.55 5.74 8.73 7.01 8.18 8.83C8 9.41 8.44 10 9.05 10H9.25C9.66 10 9.99 9.71 10.13 9.33C10.45 8.44 11.4 7.83 12.43 8.05C13.38 8.25 14.08 9.18 14 10.15C13.9 11.49 12.38 11.78 11.55 13.03C11.55 13.04 11.54 13.04 11.54 13.05C11.53 13.07 11.52 13.08 11.51 13.1C11.42 13.25 11.33 13.42 11.26 13.6C11.25 13.63 11.23 13.65 11.22 13.68C11.21 13.7 11.21 13.72 11.2 13.75C11.08 14.09 11 14.5 11 15H13C13 14.58 13.11 14.23 13.28 13.93C13.3 13.9 13.31 13.87 13.33 13.84C13.41 13.7 13.51 13.57 13.61 13.45C13.62 13.44 13.63 13.42 13.64 13.41C13.74 13.29 13.85 13.18 13.97 13.07C14.93 12.16 16.23 11.42 15.96 9.51C15.72 7.77 14.35 6.3 12.61 6.04Z" /></svg>
                  </Tooltip>
                  
                      Add liquidity to receive LP tokens</p>
                 <Card
                    style={{ borderRadius: "1rem" }}
                    bodyStyle={{ padding: "0.8rem" }}
                    >
                    <div
                        style={{ marginBottom: "5px", fontSize: "14px", color: "#434343" }}>
                        
                    </div>
                    <div
                        style={{
                        display: "flex",
                        flexFlow: "row nowrap",
                        }}>
                      <div>
                        <InputNumber
                          bordered={false}
                          placeholder="0.00"
                          style={{ ...styles.input, marginLeft: "-10px" }}
                          onChange={changeToAmount}
                          value={amountInputted}
                        />
                        
                      </div>
                      <Button
                        style={{
                          height: "fit-content",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderRadius: "0.6rem",
                          padding: "5px 10px",
                          fontWeight: "500",
                          fontSize: "17px",
                          gap: "7px",
                          border: "none",
                        }}
                        onClick={() => setFromModalActive(true)}
                      >
                        {fromToken ? (
                          <Image
                            src={
                              fromToken?.logoURI ||
                              "https://etherscan.io/images/main/empty-token.png"
                            }
                            alt="nologo"
                            width="30px"
                            preview={false}
                            style={{ borderRadius: "15px" }}
                          />
                        ) : (
                          <span>Select a token</span>
                        )}
                       
                        <Arrow />
                      </Button>
                  </div>
                </Card>
                 <div
                     style={{ display: "flex", justifyContent: "center", padding: "10px" }}  >
                     <svg viewBox="0 0 24 24" width="16px" color="text" xmlns="http://www.w3.org/2000/svg" className="sc-5a69fd5e-0 fIBjTm"><path d="M18 13H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11V6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z" /></svg>
                </div>
                 <Card
                    style={{ borderRadius: "1rem" }}
                    bodyStyle={{ padding: "0.8rem" }}
                    >
                    <div
                      style={{ marginBottom: "5px", fontSize: "14px", color: "#434343" }}>
                      
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexFlow: "row nowrap",
                      }}>
                      <div>
                        <Input
                          bordered={false}
                          placeholder=""
                          style={styles.input}
                          readOnly
                          value=""
                        />
                        
                      </div>
                      <Button
                        style={{
                          height: "fit-content",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          borderRadius: "0.6rem",
                          padding: "5px 10px",
                          fontWeight: "500",
                          fontSize: "17px",
                          gap: "7px",
                          border: "none",
                        }}
                        onClick={() => setToModalActive(true)}
                        type={toToken ? "default" : "primary"}
                      >
                        {toToken ? (
                          <Image
                            src={
                              toToken?.logoURI ||
                              "https://etherscan.io/images/main/empty-token.png"
                            }
                            alt="nologo"
                            width="30px"
                            preview={false}
                            style={{ borderRadius: "15px" }}
                          />
                        ) : (
                          <span>Select a token</span>
                        )}
                        
                        <Arrow />
                      </Button>
                    </div>
                 </Card>
                 {(fromTokenPrice && toTokenPrice) && (
                  <div className="sc-c4ec0fdf-0 sc-2d513063-0 sc-2d513063-1 fQVbYE jlqjnZ lePRWO">
                    <div className="sc-c4ec0fdf-0 sc-2ce7e6d-0 sc-2ce7e6d-1 fpSgbJ gbThJh dqFzDr">
                      <div fontSize="14px" color="text" className="sc-7fd741e1-0 fcWrMj">Pool share</div>
                    </div>
                    <div className="sc-c4ec0fdf-0 sc-2d513063-0 sc-2d513063-1 djpjPH cvvwxO lePRWO">
                      <div className="sc-91e5cc43-2 hrZXra">
                        <div className="sc-c4ec0fdf-0 sc-2ce7e6d-0 sc-2ce7e6d-3 dGKbaC iiLrMW gkInXt">
                          <div style={{display: "none"}} className="sc-91e5cc43-2 bpXzfW">
                            <div color="text" fontSize="16px" className="sc-7fd741e1-0 khYIaZ">{(parseInt(fromTokenPrice) > 1) ? fromTokenPrice.toFixed(3): fromTokenPrice.toFixed(6)}</div>
                            <div fontSize="14px" color="text" className="sc-7fd741e1-0 bBeuWB">{toToken.symbol} per {fromToken.symbol}</div>
                          </div>
                           <div className="sc-91e5cc43-2 bpXzfW">
                            <div color="text" fontSize="16px" className="sc-7fd741e1-0 khYIaZ">{settings.fee}%</div>
                            <div fontSize="14px" color="text" className="sc-7fd741e1-0 bBeuWB">Share of Pool</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                  {(!account || !isAuthenticated) && ( 
                   <Button
                    type="primary"
                    size="large"
                    disabled={true}
                    style={{
                        width: "100%",
                        marginTop: "15px",
                        borderRadius: "0.6rem",
                        height: "50px",
                    }}                   
                    >
                    Connect Wallet
                    </Button>
                 )}
                  {(account && isAuthenticated) && (
                    <Button
                    type="primary"
                    size="large"
                    style={{
                        width: "100%",
                        marginTop: "15px",
                        borderRadius: "0.6rem",
                        height: "50px",
                    }} 
                    onClick={addLiq}               
                    >
                      Add Liquidity
                    </Button>
                  )}
            </Card>
              <Modal
                  title="Select a token"
                  visible={isFromModalActive}
                  onCancel={() => setFromModalActive(false)}
                  bodyStyle={{ padding: 0 }}
                  width="450px"
                  footer={null}
                >
        
        <InchModal
          open={isFromModalActive}
          onClose={() => setFromModalActive(false)}
          setToken={setFromToken}
          tokenList={tokens}
        />
      </Modal>
      <Modal
        title="Select a token"
        visible={isToModalActive}
        onCancel={() => setToModalActive(false)}
        bodyStyle={{ padding: 0 }}
        width="450px"
        footer={null}
      >
        <InchModal
          open={isToModalActive}
          onClose={() => setToModalActive(false)}
          setToken={setToToken}
          tokenList={tokens}
        />
      </Modal>
       {(fromTokenPrice && toTokenPrice) && (
        <Modal title="Confirm Transaction" footer={null} 
            visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <div className="sc-c4ec0fdf-0 sc-32d5f017-0 sc-c1f6347f-2 eQkZMk fOPopv elbMpA">
            <div className="sc-5fed90e7-0 kmKGvM">
              <div className="sc-c4ec0fdf-0 dGKbaC">
                <div className="sc-91e5cc43-2 ffyZiF">
                  <div className="sc-c4ec0fdf-0 sc-32d5f017-0 dGKbaC chfQFH">
                    <div style={{fontSize: "24px"}} color="text" className="sc-7fd741e1-0 bSFfGt">{amountInputted}</div>
                    
                  </div>
                  <div className="sc-c4ec0fdf-0 sc-2ce7e6d-0 dGKbaC iyDJze">
                    <div fontSize="24px" color="text" className="sc-7fd741e1-0 kPCBgk">{fromToken.symbol} / {toToken.symbol} Pool Tokens</div>
                  </div>
                  <div color="text" fontSize="16px" className="sc-7fd741e1-0 DPnhl">Output is estimated. If the price changes by more than 0.5% your transaction will revert.</div>
                </div>
              </div>
              <div className="sc-c4ec0fdf-0 dGKbaC">
                <div className="sc-c4ec0fdf-0 sc-2ce7e6d-0 sc-2ce7e6d-1 dGKbaC iyDJze dqFzDr">
                  <div color="text" fontSize="16px" className="sc-7fd741e1-0 khYIaZ">{fromToken.symbol} Inputted</div>
                  <div className="sc-c4ec0fdf-0 sc-2ce7e6d-0 sc-2ce7e6d-4 dGKbaC iyDJze jKFiHD">
                    
                    <div color="text" fontSize="16px" className="sc-7fd741e1-0 khYIaZ">{amountInputted} {fromToken.symbol}</div>
                  </div>
                </div>
              
                <div className="sc-c4ec0fdf-0 sc-2ce7e6d-0 sc-2ce7e6d-1 dGKbaC iyDJze dqFzDr">
                  <div color="text" fontSize="16px" className="sc-7fd741e1-0 khYIaZ">Share of Pool:</div>
                  <div color="text" fontSize="16px" className="sc-7fd741e1-0 khYIaZ">{settings.fee}%</div>
                </div>
                <button onClick={handleOk} className="sc-a8cf5f33-0 chqMWk" width="100%" scale="md">Confirm Supply</button>
              </div>
            </div>
          </div>

        </Modal>
      )}
        </>
    )
};

export default AddLiquidity;

const Arrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
