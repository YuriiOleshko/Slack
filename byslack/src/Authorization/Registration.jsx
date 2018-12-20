import React, { Component } from 'react';
import firebase from '../Firebase/firebase'
import { Grid, Header,Message, Button,Icon,Form,Segment } from 'semantic-ui-react';
import {NavLink} from 'react-router-dom'
class Registration extends Component {
    state={
        username:'',
        email:'',
        password:'',
        passwordConfirm:''

   }
   handelChange=(ev)=>{
       let name=ev.target.name;
       let value=ev.target.value;
       this.setState({
           [name]:value
       })
   }
   handelSubmit=(ev)=>{
       ev.preventDefault();
       firebase
       .auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then(createdUser=>{
           console.log(createdUser);       })
           .catch(err=>{
               console.error(err);
           })

   }
    render() {
        return (
          <Grid textAlign='center' verticalAlign='middle' className='app'>
          <Grid.Column style={{
              maxWidth:450
          }}>
          <Header as="h2" icon color ='orange' textAlign="center">
                   <Icon name='comment alternate' color='orange'/>
                   Register for Slack Clone</Header> 
                   <Form size ='large' onSubmit={this.handelSubmit}>
                   <Segment stacked >
                   <Form.Input
                   fluid
                   name='username'
                   icon='user'
                   iconPosition='left'
                   placeholder='Username'
                   type='text' onChange={this.handelChange}/>
                   <Form.Input
                            fluid
                            name='email'
                            icon='mail'
                            iconPosition='left'
                            placeholder='Email'
                            type='mail' onChange={this.handelChange}/>
                      <Form.Input
                   fluid
                   name='password'
                   icon='lock'
                   iconPosition='left'
                   placeholder='Password'
                   type='password' onChange={this.handelChange}/>
                      <Form.Input
                   fluid
                   name='passwordConfirm'
                   icon='repeat'
                   iconPosition='left'
                   placeholder='Password Confirm'
                   type='password' onChange={this.handelChange}/>
                   <Button color='orange' fluid size='large'>Submit</Button>
                
                   </Segment>
                   </Form>
                   <Message>
                Already a user?
                <NavLink to='/login'>Login</NavLink>
              </Message>
                   </Grid.Column>

          </Grid>
        );
    }
}

export default Registration;