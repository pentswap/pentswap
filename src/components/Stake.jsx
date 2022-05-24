import { createStake, getStakes } from 'helpers/dbqueries';
import React from 'react'
import '../index.css'
import { Modal, Button,InputNumber, message,Table } from 'antd';
import { useMoralis } from 'react-moralis';


const Stake = () => {
    
    let processing =  false;
    const [launchpads, setLaunchpads] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const { isAuthenticated, account,Moralis } = useMoralis();
    const [amount, setAmount] = React.useState(0);
    const [address, setAddress] = React.useState('');
    const [stake , setStake] = React.useState({});

    React.useEffect(() => {
        const unsubscribe = getStakes((launchpads) => {
            setLaunchpads(launchpads);
            setLoading(false);
        })
        return () => {
            unsubscribe();
        };
    }, []);

    const [visible, setVisible] = React.useState(false);
    const deposit  = (value, obj) => {
        setAddress(value);
        setStake(obj);
       setVisible(true);
    }

    const handleOk = () => {
        let key = "key"
        if(processing){
            return;
        }
        if(!account || !isAuthenticated) {
            message.error('Connect wallet');
            return
        }
        if(amount <= 0) {
            message.error('Amount must be greater than 0');
            return;
        }
        processing = true;
        message.loading({content: 'Processing...', key, duration: 0});
      // check if it is a native token
          const options = {
                type: "erc20",
                amount: Moralis.Units.Token(amount, 18),
                receiver: address,
                contractAddress: "0x38eF279103736597461E822B00461E88D79Fed05",
            };
            
            let result = Moralis.transfer(options); 
            result.then(function(res) { 
               createStake(stake,() =>{    
                    processing = false
                    message.success({content: 'Successfully staked', key});
                    setVisible(false);   
                },account,res.hash)
                
            }).catch(function(err) {
                console.log(address);
                console.log(err);
                processing = false
                message.error({content: "Insuficient funds",key}); 
                setVisible(false); 
            });    
        
    };

    const handleCancel = e => {
        setVisible(false);
    };

  function onChange(value) {
    setAmount(value);
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
        <section className='stake' style={{marginTop:"8rem"}}>
            <div style={{margin:"4rem", background:"#fff", paddingTop:"1rem", paddingBottom:"1rem"}}>
                <div className='pools'>
                    <h3 style={{fontSize:"20px"}}>
                        Pools
                    </h3>

                    <div style={{marginTop:"1.5rem"}}>
                        <form>
                            <input type="text" placeholder='Search using name or symbol' className='poolInput'/>
                        </form>
                    </div>
                    <div>

                    </div>
                </div>
            {launchpads.map(launchpad => (
                <div className='poolDetails'>
                    <div className='poolName'>
                        <h2>
                            {launchpad.name}
                        </h2>

                        <button  onClick={() => deposit(launchpad.stakingAddress, launchpad)}>
                            Deposit
                        </button>
                    </div>
                    <div className='poolNameDetail' style={{marginTop:"1.5rem", marginBottom:"1.2rem"}}>
                        <p>
                            Total deposited
                        </p>
                        <p>
                            ${launchpad.deposit}
                        </p>
                    </div>

                    <div className='poolNameDetail' style={{marginTop:"1.5rem", marginBottom:"1.2rem"}}>
                        <p>
                            Pool reward collection
                        </p>
                        <p>
                            {launchpad.reward}%
                        </p>
                    </div>

                    <div className='poolNameDetail' style={{marginTop:"1.5rem", marginBottom:"1.2rem"}}>
                        <p>
                            Emission rate
                        </p>
                        <p>
                            {launchpad.rate}
                        </p>
                    </div>
                </div>    
                 )
            )}     
            </div>

            <Modal title="Enter Amount" min={0} visible={visible} onOk={handleOk} onCancel={handleCancel}>
                <InputNumber style={{width: "100%"}} value={amount} defaultValue={0} onChange={onChange} />
            </Modal>
        </section>
        
     }
     </>
  )
}

export default Stake