import React from 'react';
import "./launchpad.css";
import { Form, Input, Button, DatePicker, Checkbox, Radio, Select } from 'antd';

const LaunchpadForm = () => {

    const onFinish = (values) => {
        console.log('Success:', values);
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    
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

  return (
    <div className="launchpadformdiv">
        <Form
            name="basic"
            // labelCol={{
            //     span: 2,
            // }}
            // wrapperCol={{
            //     span: 8,
            // }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <div className="padFormDiv">
                <Form.Item
                    label="Presale rate"
                    name="Presale rate"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your presale rate!',
                    },
                    ]}
                >
                    <Input  placeholder="100"/>
                </Form.Item>

                <span style={{fontSize:"12px",color:"blue"}}>If I spend 1BNB how many tokens will I receive?</span>
            </div>

           <div className="padFormDiv">
                <Form.Item 
                    name="Whitelist" 
                    label="Whitelist"
                    rules={[
                        {
                        required: true,
                        message: 'Please pick an item!',
                        },
                    ]}    
                >
                    <Radio.Group>
                        <Radio value="Disable">Disable</Radio>                    
                        <Radio value="Enable">Enable</Radio>                    
                    </Radio.Group>
                    
                </Form.Item>
                <span style={{fontSize:"12px", lineHeight:"0", color:"blue"}}>If I spend 1BNB how many tokens will I receive?</span>
           </div>

            <div className="padFormDiv launchpadFormFlex">
                <div>
                    <Form.Item
                        label="Softcap(BNB)"
                        name="Softcap(BNB)"
                        rules={[
                        {
                            required: true,
                            message: '0',
                        },
                        ]}
                    >
                        <Input placeholder="0"/>
                    </Form.Item>
                </div>

                <div>
                    <Form.Item
                        label="HardCap(BNB)"
                        name="HardCap(BNB)"
                        rules={[
                        {
                            required: true,
                            message: 'Invalid input',
                        },
                        ]}
                    >
                        <Input  placeholder="0"/>
                    </Form.Item>
                </div>
            </div>

            

            <div className="padFormDiv launchpadFormFlex">
                <div>
                    <Form.Item
                        label="Minimum buy(BNB)"
                        name="Minimum buy(BNB)"
                        rules={[
                        {
                            required: true,
                            message: '0',
                        },
                        ]}
                    >
                        <Input placeholder="0"/>
                    </Form.Item>
                </div>

                <div>
                    <Form.Item
                        label="Maximum buy (BNB)"
                        name="Maximum buy (BNB)"
                        rules={[
                        {
                            required: true,
                            message: 'Invalid input',
                        },
                        ]}
                    >
                        <Input  placeholder="0"/>
                    </Form.Item>
                </div>
            </div>

            <div className="padFormDiv launchpadFormFlex">
                <div>
                    <Form.Item
                        label="Refund type"
                        name="Refund type"
                        rules={[
                        {
                            required: true,
                            message: '0',
                        },
                        ]}
                    >
                        <Input placeholder="Burn"/>
                    </Form.Item>
                </div>

                <div>
                    <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
                        <Select
                        placeholder="---Select Router Exchange---"
                        // onChange={onRouterChange}
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
                        name="Liquidity (%)"
                        rules={[
                        {
                            required: true,
                            message: '0',
                        },
                        ]}
                    >
                        <Input placeholder="0"/>
                    </Form.Item>
                </div>

                <div>
                    <Form.Item
                        label="Listing rate"
                        name="Listing rate"
                        rules={[
                        {
                            required: true,
                            message: 'Invalid input',
                        },
                        ]}
                    >
                        <Input  placeholder="0"/>
                    </Form.Item>
                    <span style={{fontSize:"12px",color:"blue",textAlign:"right"}}>1BNB = 0PNTG</span>
                </div>
            </div>

            <p className="padFormDiv" style={{color:"blue", fontSize:"12px"}}>
                Enter the percentage of raised funds that
                should be allocated to Liquidity on (Min 51%, Max 100%)
            </p>

            <p style={{color:"blue", fontSize:"12px"}}>
                If I spend 1 BNB on how many tokens 
                will I receive? Usually this amount is lower 
                than presale rate to allow for a higher listing price on
            </p>

            <div className="padFormDiv launchpadFormFlex">
                <div>
                    <Form.Item name="start-time" label="Start time (UTC)" {...config}>
                        <DatePicker />
                    </Form.Item>
                </div>

                <div>
                    <Form.Item name="date-picker" label="End time (UTC)" {...config}>
                        <DatePicker />
                    </Form.Item>
                </div>
            </div>

            <div className="padFormDiv">
                <Form.Item
                    label="Liquidity locip (days)"
                    name="liqudity rate"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your presale rate!',
                    },
                    ]}
                >
                    <Input  placeholder="0"/>
                </Form.Item>
                
            </div>

            <div claassName="padFormDiv">
                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                    {
                        validator: (_, value) =>
                        value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                    },
                    ]}        
                >
                    <Checkbox>
                    Using Vesting Contributor?
                    </Checkbox>
                </Form.Item>
                
            </div>

            <div className="padFormDiv">
                <Form.Item
                    name="agreement"
                    valuePropName="checked"
                    rules={[
                    {
                        validator: (_, value) =>
                        value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                    },
                    ]}        
                >
                    <Checkbox>
                        Using Team Vesting ?
                    </Checkbox>
                </Form.Item>
            </div>

            <div className="padFormDiv" style={{marginBottom:"1rem"}}>
                <p style={{color:"blue", fontSize:"12px",textAlign:"center"}}>
                    Need 0 PNTG to create launchpad.
                </p>
            </div>

            <div claassName="padFormDiv launchpadFormFlex" >
                <div className='padFormBtn'>
                    <Form.Item >
                        <Button style={{marginRight:"20px"}} type="primary" htmlType="submit">
                            Back
                        </Button>

                        <Button htmlType="submit" disabled>
                            Next
                        </Button>
                    </Form.Item>
                </div>

                
            </div>
        </Form>
    </div>
  )
}

export default LaunchpadForm