import React, { Component } from 'react';
import {Grid ,Header,Message,Form,Segment,Input,Button,Icon} from'semantic-ui-react';
import {NavLink} from 'react-router-dom';
class Login extends Component {
    state={
        email:'',
        password:'',
        act:true,
    }
    handelChange=(ev)=>{
        let value=ev.target.value;
        let name=ev.target.name;
        this.setState({
            [name]:value
        })
    }
    changeButton=()=>{
        this.setState(prev=>({
            act:!prev.act,
        }))
    }
    isInputValid=({email,password})=>{
       return email!==''&& password!==''
       
    }
    isValidForm=()=>{
        return this.isInputValid(this.state)
    }
    render() {
     
        return (
            <Grid textAlign='center' verticalAlign='middle' className='app'>
          <Grid.Column style={{
              maxWidth:450
          }}>
          <Header as="h2" icon color ='blue' textAlign="center">
                   <Icon name='address card' color='blue'/>
                   Login for Slack Clone</Header> 
                   <Form size ='large' onSubmit={this.handelSubmit}>
                   <Segment stacked >
             
                   <Form.Input
                    // className={this.handelInput(errors,'email')}
                            fluid
                            name='email'
                            icon='mail'
                            iconPosition='left'
                            placeholder='Email'
                            type='mail' onChange={this.handelChange}/>
                      <Form.Input
                    //    className={this.handelInput(errors,'password')}
                   fluid
                   name='password'
                   icon='lock'
                   iconPosition='left'
                   placeholder='Password'
                   type='password' onChange={this.handelChange}/>
               
                   {this.state.act ?<Button color='blue' onClick={this.changeButton} fluid size='large' >Submit</Button>:<Button onClick={this.changeButton} color='blue' loading  fluid size='large' >Submit</Button>}
                 

                   </Segment>
                   </Form>
                   {/* {errors.length>0 && (
                       <Message error>
                       <h3>Error</h3>
                       {errors.map(el=><p key={el.message}>{el.message}</p>)}
                       </Message>
                   )} */}
                   <Message>
                   Don`t have an account?
                <NavLink to='/registration'>Regestration</NavLink>
              </Message>
                   </Grid.Column>

          </Grid>
        );
    }
}

export default Login;