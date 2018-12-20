import React, { Component } from 'react';
import firebase from '../Firebase/firebase'
import { Grid, Header,Message, Button,Icon,Form,Segment } from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';
import md5 from 'md5'
class Registration extends Component {
    state={
        username:'',
        email:'',
        password:'',
        passwordConfirm:'',
        errors:[],
        loading:false,
        usersRef:firebase.database().ref('users')

   }
   saveUser=createdUser=>{
       return this.state.usersRef.child(createdUser.user.uid).set({
           name: createdUser.user.displayName,
           avatar: createdUser.user.photoURL
       })
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
       
       if(this.isFormValid()){
        firebase
       .auth().createUserWithEmailAndPassword(this.state.email,this.state.password).then(createdUser=>{
           console.log(createdUser);      
           createdUser.user.updateProfile({
               displayName:this.state.username,
               photoURL:`http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
           }) 
        .then(()=>{
            this.saveUser(createdUser).then(()=>console.log('user saved'))
        })
        })
           .catch(err=>{
               console.error(err);
               this.setState({errors:this.state.errors.concat(err),loading:false})
           })
   }}
   isFormEmpty=({username,email,password,passwordConfirm})=>{
if(username!==''&& email!==''&& password!=='' && passwordConfirm!==''){
return true;
}
else{
    return false
}
   }
   isPasswordValid=({password,passwordConfirm})=>{
    if(password===passwordConfirm){
    return true;
    }
    else{
        return false
    }
   }
   isFormValid=()=>{
       let errors=[];
       let error
       if (!this.isFormEmpty(this.state)){
           error={
               message:"Fill in all fields"
           }
           this.setState({
               errors:errors.concat(error)
           })
           return false;
       }else if(!this.isPasswordValid(this.state)){
           error={message:'Password is invalid'

           };
           this.setState({
               errors:errors.concat(error)
           })
           return false;
       }else{
           this.setState({
               errors:[]
           })
           return true;
       }

       }
       handelInput=(errors,inputName)=>{
           return errors.some(el=>el.message.toLowerCase().includes(inputName))?
          'error':''
       }
       
   
    render() {
        const {errors}=this.state
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
                   className={this.handelInput(errors,'username')}
                   fluid
                   name='username'
                   icon='user'
                   iconPosition='left'
                   placeholder='Username'
                   type='text' onChange={this.handelChange}/>
                   <Form.Input
                    className={this.handelInput(errors,'email')}
                            fluid
                            name='email'
                            icon='mail'
                            iconPosition='left'
                            placeholder='Email'
                            type='mail' onChange={this.handelChange}/>
                      <Form.Input
                       className={this.handelInput(errors,'password')}
                   fluid
                   name='password'
                   icon='lock'
                   iconPosition='left'
                   placeholder='Password'
                   type='password' onChange={this.handelChange}/>
                      <Form.Input
                       className={this.handelInput(errors,'passwordConfirm')}
                   fluid
                   name='passwordConfirm'
                   icon='repeat'
                   iconPosition='left'
                   placeholder='Password Confirm'
                   type='password' onChange={this.handelChange}/>
                   <Button color='orange' fluid size='large'>Submit</Button>

                   </Segment>
                   </Form>
                   {errors.length>0 && (
                       <Message error>
                       <h3>Error</h3>
                       {errors.map(el=><p key={el.message}>{el.message}</p>)}
                       </Message>
                   )}
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