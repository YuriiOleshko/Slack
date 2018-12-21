import React, { Component } from 'react';
import {Grid} from 'semantic-ui-react'
import { Header,Icon, Dropdown,Image } from 'semantic-ui-react';
import firebase from  '../Firebase/firebase.js'
import { connect } from 'react-redux';
class UserPanel extends Component {
    dropdownOption=()=>[
        {
        key: 'user',
        text: <span>Signed in as <strong>User</strong></span>,
        disabled: true,
    },
    {
        key: 'avatar',
        text: <span>Change Avatar</span>
    },
    {
        key: 'out',
        text: <span onClick={this.signOut}> <Icon name=''></Icon>Sign Out</span>
    }
]
signOut=()=>{
    firebase
    .auth()
    .signOut().then(()=>{
        console.log('signed out');
    })
}
    render() {
        return (
            <Grid style={{
                background:'4c3c4c'
            }}>
            <Grid.Column>
                <Grid.Row
                style={{padding:'1.2rem',
            margin:'0'}}>
            <Header inverted floated='left' as='h2'>
            <Icon name='cloud'/>
            <Header.Content>
                Slack clone
            </Header.Content>

            </Header>
            </Grid.Row>
           
<Header style={{padding :'0.25rem'}} as='h4'inverted>
<Dropdown trigger={<span style={{marginLeft:'1rem'}}><Image src={this.props.current.photoURL} spaced='right' avatar/>
{this.props.current.displayName}</span>}
options={this.dropdownOption()}/>
 </Header>
</Grid.Column>
            </Grid>
        );
    }
}
function mapStateToProps(state){
    return{
        current:state.user.currentUser

    }
}
export default connect(mapStateToProps,null) (UserPanel);