import React, { useRef, useState } from 'react';
import "./launchpad.css";

import { useMoralis } from "react-moralis";
// import moment from 'moment';
import moment from 'moment-timezone';
import { useWeb3Transfer } from "react-moralis";
import { createLaunchpad, getLaunchpadSettings } from 'helpers/dbqueries';
import { Steps, Button, message,notification, Divider, Space, Form, Input, DatePicker, Checkbox, Radio, Select, Upload } from 'antd';
import {RadiusUpleftOutlined, RadiusUprightOutlined,  RadiusBottomleftOutlined,  RadiusBottomrightOutlined, UploadOutlined , BorderTopOutlined,  BorderBottomOutlined,} from '@ant-design/icons';
import uploadImage from 'helpers/utils';


const { TextArea } = Input;

const CreateLaunchPad = () => {
     
      function disabledDate(current) {
        return current && current < moment().endOf('day');
      }
      
      const { Option } = Select;
      const { RangePicker } = DatePicker;
        
      const config = {
        rules: [
          {
            type: 'object',
            required: true,
            message: 'Please select time!',
          },
        ],
      };

      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
    const { isAuthenticated, account,Moralis } = useMoralis();
    const { Step } = Steps;
    const [current, setCurrent] = React.useState(0);
    const [launchpad, setLaunchpad] = useState({title: "", name:"", rate: "", softcap: 0, whitelist: 0,
                                                hardcap: 0,min: 0, max: 0, refund: 0, router: "Pancakeswap",
                                                liq: 0, listing: 0, start: "", end: "", twitter: "",
                                                telegram: "", github: "", description: "", 
                                                days: 0, vesting: false, teamVesting: false, approved: false  });      
    const [file, setFile] = React.useState("");           

    const [settings, setSettings] = React.useState({launchpadfeeAddress: "0x0", fee: 0});
    React.useEffect(() => {
        const unsubscribe = getLaunchpadSettings((settings) => {           
           setSettings(settings);      
        });
        return () => {
            unsubscribe();
        };
    }, []);
                                                                                   
    let processing = false;
    const onFinish = (e) => {
            if(processing){
                return; 
            }
            if(file.length === 0){
                message.error("Please upload token logo");
                return;
            }
            if(moment(launchpad.start).isSameOrAfter(launchpad.end)){
                message.error("Start date cannot be after end date");
                return;
            }
           processing = true;
            const options = {
                type: "native",
                amount: Moralis.Units.ETH(settings.fee),
                receiver: settings.launchpadfeeAddress,
            };
            let result = Moralis.transfer(options); 
            result.then(function(res) {
                createLaunchpad(launchpad,() =>{
                    setCurrent(current + 1); 
                    processing = false
                },account,file,res.hash)                
                
            }).catch(function(err) {
                processing = false
                message.error("Insuficient funds");
                 
            });     
    };

        
        const onChange = (e) => {
            e.preventDefault();
            setLaunchpad({...launchpad, [e.target.name]: e.target.value});     
        }

        function onChangeTeamCheckbox(e) {
            setLaunchpad({...launchpad, teamVesting: e.target.checked});
       }
       function onChangeVestingCheckbox(e) {
            setLaunchpad({...launchpad, vesting: e.target.checked});
       }
    const next = () => {
        if(launchpad.title.trim().length <= 1) {
            notification.info({
                message: 'Error',
                description:
                'Token address is not valid',
                placement: 'topRight'
            });
            return;
        }    
        setCurrent(current + 1);   
    }
    function handleChange(router) {
        setLaunchpad({...launchpad, router: router});
    } 
    function onChangeStartDate(date, dateString) {
        setLaunchpad({...launchpad, start: dateString});
       
    }
    function onChangeEndDate(date, dateString) {
        setLaunchpad({...launchpad, end: dateString});
       
    }
    const prev = () => {
        setCurrent(current - 1);
    };
    const onSubmit = (e) => {
        e.preventDefault();
    }
    const [percent, setPercent] = useState(0);
    const props = {
        customRequest: ({ onError, onSuccess, file,onProgress }) =>   {
            uploadImage(file, (url) => {
                onSuccess("OK")
                setFile(url);
            }, (err) => {
                message.error(err);  
            }, (progress) => {
                setPercent(progress);
                onProgress({ percent: progress});
            });
        },
        
        beforeUpload: file => {
          const isPNG = file.type === 'image/png';
          const isJPG = file.type === 'image/jpg';
          const isJPEG = file.type === 'image/jpeg';
          const isLt5M = file.size / 1024 / 1024 < 1;
          
          if (isPNG && isLt5M) {
            return isPNG;
          }
          else if (isJPEG && isLt5M) {
            return isJPEG;
          }
          else if (isJPG && isLt5M) {
            return isJPG;           
          }
          else {
              (!isLt5M) ? message.error(`${file.name} id greater than 1MB`) : message.error(`${file.name} is not a valid image`);             
              return Upload.LIST_IGNORE;
          }        
        },
        onChange: info => {
            if(info.fileList.length == 0){
                setFile("");
            }
            
        },
      };
        
  return (
    <section className="createLaunch" style={{backgroundColor: "#FAF9FA"}}>
    <Steps current={current}>
        <Step title="Verify Token" description="Enter the token address and verify" />
        <Step title="Defi Launchpad Info" description="Enter the launchpad information
                        that you want to raise , that 
                        should be enter all details 
                        about your presale" />
        <Step title="Finish" description="Conclusion" />  
    </Steps>
    {current == 0 && (
             <div className="createForm" style={{marginTop: "2rem"}}>
                <form onSubmit={onSubmit}>
                    <p style={{color:"red", fontSize: "12px"}}>
                        (*) is required field
                    </p>

                    <div className="labelForm">
                        <h4>
                            Token address*
                        </h4>
                    
                    </div>

                    <input
                        type="text"
                        placeholder="Ex: PNTG"
                        value={launchpad.title}
                        name="title"
                        onChange={onChange}
                    />
                    <p style={{color:"#3298dc", fontSize:"12px", marginTop: "5px"}}>
                        Create launchpad fee: {settings.fee}BNB
                    </p>

                    <div className="nextBtn">
                        {!isAuthenticated || !account ? (
                        <button disabled type="button">
                            Connect Wallet
                        </button>) 
                        : 
                        ( <Button onClick={() => next()} style={{backgroundColor: "transparent"}}>Next</Button>)}
                        
                    </div>
                </form>
            </div>
    )}
     {current == 1 && (

         <div className="launchpadformdiv">
        <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
        >
            <div className="padFormDiv">
                <Form.Item
                    label="Token name"
                    name="name"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your token name!',
                        whitespace: true,
                    },
                   
                    ]}
                >
                    <Input name='name' value={launchpad.name} onChange={onChange} placeholder="Token name"/>
                </Form.Item>                
            </div>

            <div className="padFormDiv">
                <Form.Item
                    label="Token description"
                    name="description"
                    rules={[
                    {
                        required: true,
                        message: 'Please input token description!',
                        whitespace: true,
                    },
                   
                    ]}
                >
                    <TextArea name='description' value={launchpad.description} onChange={onChange} placeholder="Token description" rows={4} />

                </Form.Item>                
            </div>

            <div className="padFormDiv">
                <Form.Item
                    label="Token logo (Max: 1mb)"
                    name="logo"  
                    rules={[
                    {
                        required: true,
                        message: 'Upload token logo',
                    },
                   
                    ]}    
                >
                    <Upload {...props} 
                        listType="picture"
                        accept="image/*"
                        maxCount={1}>
                        <Button icon={<UploadOutlined />}>Upload </Button>
                    </Upload>                   
                </Form.Item>
            </div>

            <div className="padFormDiv">
                <Form.Item
                    label="Presale rate"
                    name="rate"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your presale rate!',
                        whitespace: true,
                    },
                   
                    ]}
                >
                    <Input name='rate' value={launchpad.rate} onChange={onChange} placeholder="100"/>
                </Form.Item>

                <span style={{fontSize:"12px",color:"#16a3fe"}}>If I spend 1BNB how many tokens will I receive?</span>
            </div>

           <div className="padFormDiv">
                <Form.Item 
                    name="whitelist" 
                    label="Whitelist"
                    rules={[
                        {
                        required: true,
                        message: 'Please pick an item!',
                        },
                    ]}    
                >
                    <Radio.Group name='whitelist' onChange={onChange} value={launchpad.whitelist}>
                        <Radio value={0} >Disable</Radio>                    
                        <Radio value={1}>Enable</Radio>                    
                    </Radio.Group>
                    
                </Form.Item>
                <span style={{fontSize:"12px", lineHeight:"0", color:"#16a3fe"}}>If I spend 1BNB how many tokens will I receive?</span>
           </div>

            <div className="padFormDiv launchpadFormFlex">
                <div>
                    <Form.Item
                        label="Softcap(BNB)"
                        name="softcap"
                        rules={[
                        {
                            required: true,
                            message: '0',
                            whitespace: true,
                        },
                        ]}
                    >
                        <Input name='softcap' onChange={onChange} value={launchpad.softcap}  placeholder="0"/>
                    </Form.Item>
                </div>

                <div>
                    <Form.Item
                        label="HardCap(BNB)"
                        name="hardcap"
                        rules={[
                        {
                            required: true,
                            message: 'Invalid input',
                            whitespace: true,
                        },
                        ]}
                    >
                        <Input name='hardcap' onChange={onChange} value={launchpad.hardcap}  placeholder="0"/>
                    </Form.Item>
                </div>
            </div>

            
            <div className="padFormDiv launchpadFormFlex">
                <div>
                    <Form.Item
                        label="Minimum buy(BNB)"
                        name="min"
                        rules={[
                        {
                            required: true,
                            whitespace: true,
                        },
                        ]}
                    >
                        <Input name='min' onChange={onChange} value={launchpad.min}  placeholder="0"/>
                    </Form.Item>
                </div>

                <div>
                    <Form.Item
                        label="Maximum buy (BNB)"
                        name="max"
                        rules={[
                        {
                            required: true,
                            message: 'Invalid input',
                            whitespace: true,
                        },
                        ]}
                    >
                        <Input name='max' onChange={onChange} value={launchpad.max}  placeholder="0"/>
                    </Form.Item>
                </div>
            </div>

            <div className="padFormDiv launchpadFormFlex">
                <div>
                    <Form.Item
                        label="Refund type"
                        name="refund"
                        rules={[
                        {
                            required: true,
                            message: '0',
                            whitespace: true,
                        },
                        ]}
                    >
                        <Input name='refund' onChange={onChange} value={launchpad.refund} placeholder="Burn"/>
                    </Form.Item>
                </div>

                <div>
                    <Form.Item name="router" label="Router" rules={[{ required: true }]}>
                        <Select
                        placeholder="---Select Router Exchange---"
                        value={launchpad.router}
                        onChange={handleChange}
                        allowClear
                        >
                            <Option value="Pancakeswap">Pancakeswap</Option>
                            <Option value="MDex">MDex</Option>
                            <Option value="PinkSwap">PinkSwap</Option>
                            <Option value="Biswap">Biswap</Option>
                            <Option value="ApeSwap">ApeSwap</Option>
                        </Select>
                    </Form.Item>
                </div>
            </div>

            <div className="padFormDiv launchpadFormFlex">
                <div>
                    <Form.Item
                        label="Liquidity (%)"
                        name="liq"
                        rules={[
                        {
                            required: true,
                            
                        },
                        ]}
                    >
                        <Input name='liq' onChange={onChange} value={launchpad.liq} placeholder="0"/>
                    </Form.Item>
                </div>

                <div>
                    <Form.Item
                        label="Listing rate"
                        name="listing"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Input onChange={onChange} name='listing' value={launchpad.listing} placeholder="0"/>
                    </Form.Item>
                </div>
            </div>

            <p className="padFormDiv" style={{color:"#16a3fe", fontSize:"12px"}}>
                Enter the percentage of raised funds that
                should be allocated to Liquidity on (Min 51%, Max 100%)
            </p>

            <p style={{color:"#16a3fe", fontSize:"12px"}}>
                If I spend 1 BNB on how many tokens 
                will I receive? Usually this amount is lower 
                than presale rate to allow for a higher listing price on
            </p>

            <div className="padFormDiv launchpadFormFlex">
                <div>
                    <Form.Item 
                             rules={[
                                {
                                    required: true,
                                    message: 'Select start time',
                                    type: 'object',
                                }
                            ]}
                            
                             name="start"
                             label="Start time (UTC)">
                        <DatePicker 
                            disabledDate={disabledDate}
                            onChange={onChangeStartDate} 
                            format="YYYY-MM-D HH:mm:ss"
                            showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                        /> 
                    </Form.Item>
                </div>

                <div>
                    <Form.Item name="end" 
                    label="End time (UTC)" 
                     rules={[
                                {
                                    required: true,
                                    message: 'Select end time',
                                    type: 'object',
                                }
                            ]}>
                        <DatePicker 
                            onChange={onChangeEndDate} 
                            disabledDate={disabledDate} 
                            format="YYYY-MM-D HH:mm:ss"
                            showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                        />
                    </Form.Item>
                </div>
            </div>
            
            <div className="padFormDiv">
                <Form.Item
                    label="Twitter Link"
                    name="twitter"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your twitter link!',
                        whitespace: true,
                    },
                   
                    ]}
                >
                    <Input name='twitter' value={launchpad.twitter} onChange={onChange} placeholder="Twitter link"/>
                </Form.Item>                
            </div>

            <div className="padFormDiv">
                <Form.Item
                    label="Telegram link"
                    name="telegram"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your telegram link!',
                        whitespace: true,
                    },
                   
                    ]}
                >
                    <Input name='telegram' value={launchpad.telegram} onChange={onChange} placeholder="Telegram link"/>
                </Form.Item>                
            </div>


            <div className="padFormDiv">
                <Form.Item
                    label="Github profile link"
                    name="github"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your github profile link!',
                        whitespace: true,
                    },
                   
                    ]}
                >
                    <Input name='github' value={launchpad.github} onChange={onChange} placeholder="Github profile link"/>
                </Form.Item>                
            </div>
            
            <div className="padFormDiv">
                <Form.Item
                    label="Liquidity locip (days)"
                    name="days"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your presale rate!',
                        whitespace: true,
                    },
                    ]}
                >
                    <Input onChange={onChange} value={launchpad.days} name="days" placeholder="0"/>
                </Form.Item>
                
            </div>

            <div claassName="padFormDiv">
                <Form.Item
                    name="vesting"
                    valuePropName="checked"
                        
                >
                    <Checkbox value={launchpad.vesting} name="vesting" onChange={onChangeVestingCheckbox}>
                         Using Vesting Contributor?
                    </Checkbox>
                </Form.Item>
                
            </div>

            <div className="padFormDiv">
                <Form.Item
                    name="teamVesting"
                    valuePropName="checked"
                          
                >
                    <Checkbox value={launchpad.teamVesting} name="teamVesting" onChange={onChangeTeamCheckbox}>
                        Using Team Vesting ?
                    </Checkbox>
                </Form.Item>
            </div>

            <div className="padFormDiv" style={{marginBottom:"1rem"}}>
                <p style={{color:"#16a3fe", fontSize:"12px",textAlign:"center"}}>
                    Need {settings.fee} BNB to create launchpad.
                </p>
            </div>

            <div claassName="padFormDiv launchpadFormFlex" >
                <div className='padFormBtn'>
                    <Form.Item >
                        <Button style={{marginRight:"20px"}}  onClick={() => prev()}>
                            Back
                        </Button>

                        <Button htmlType='submit' type="primary"> 
                            Proceed with launchpad fee payment
                        </Button>
                    </Form.Item>
                </div>

                
            </div>
        </Form>
    </div>
    )}
    {
        current == 2 && (
            
            <div claassName="padFormDiv launchpadFormFlex" style={{marginTop: "80px"}} >
                     <span style={{fontSize:"20px",color:"#16a3fe"}}>Launchpad is awaiting approval</span>
            </div>
        
    )}
    </section>
  )
}

export default CreateLaunchPad