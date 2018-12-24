import React, { Component } from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';
import firebase from '../Firebase/firebase';
import {connect} from 'react-redux';
import { stat } from 'fs';
import {setCurrentChannels} from '../redux/action/currentAction'

class Channels extends Component {

    state= {
        channels : [],
        modal: false,
        channelName: '',
        channelDetails: '',
        channelsRef: firebase.database().ref('channels'),
        firstLoaded:true,
        ActiveChannel:''
    }
componentDidMount(){
    this.addListeners()
}

    addListeners =()=>{
        let loadedChannels=[];
        this.state.channelsRef.on('child_added',snap=>{
            loadedChannels.push(snap.val())
            console.log(loadedChannels);
            this.setState({
                channels:loadedChannels
            },()=>{this.loadFirstChannels()})
        })
    }
    loadFirstChannels=()=>{
        if (this.state.firstLoaded && this.state.channels.length>0){
            this.props.currentFetch(this.state.channels[0]);
            this.showActiveCHanel(this.state.channels[0])
        }
        this.setState({
                firstLoaded:false
        })
    }
    openModal = () => {
        this.setState({
            modal: true,
        })
    }

    closeModal = () => {
        this.setState({
            modal: false,    
        })
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    showActiveCHanel=(date)=>{
    this.setState({
        ActiveChannel:date.id
    })
    }
    isFormValid = ({channelName, channelDetails}) => channelName && channelDetails;

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.isFormValid(this.state)) {
            // console.log('channel added');
            this.addChannel();
        }
    } 

    addChannel = () => {
        const {channelsRef, channelName, channelDetails} = this.state;
        const key = channelsRef.push().key;
        const newchannel = {
            id: key,
            name: channelName,
            details: channelDetails,
            createdBy: {
                name: this.props.user.displayName,
                avatar: this.props.user.photoURL,
            }
        }
        // console.log(newchannel);
        channelsRef
        .child(key)
        .update(newchannel)
        .then(() => {
            this.setState({
                channelName: '',
                channelDetails: '',
            })
            this.closeModal();
            console.log('channel added');
        })
        .catch(err => console.log(err))
    }

    render() {
        const {channels, modal} = this.state;
        return (
            <React.Fragment>
            <Menu.Menu style={{paddingBottom:'2rem'}}>
            <Menu.Item>
                <span>
                    <Icon name='exchange'/> CHANNELS
                </span> ({channels.length})<Icon name='add' onClick={this.openModal}/>
            </Menu.Item>
            {channels.length > 0 && channels.map(channel=>(
                <Menu.Item 
                key={channel.id}
                onClick={(()=>{this.props.currentFetch(channel)
                this.showActiveCHanel(channel)})}
                active={channel.id===this.state.ActiveChannel}
                name={channel.name}
                style={{opacity:0.7}}
>

#{channel.name}</Menu.Item>
            ))}
            </Menu.Menu>
            <Modal open={modal} onClose={this.closeModal} style={{background:'#fff'}}>
            <Modal.Header>Add a Channel</Modal.Header>
            <Modal.Content>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <Input 
                        fluid 
                        label='Channel  Name'
                        name='channelName'
                        onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input 
                        fluid 
                        label='Channel Details'
                        name='channelDetails'
                        onChange={this.handleChange}
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' inverted onClick={this.closeModal}>
                    <Icon name='remove'/> Cancel
                </Button>
                <Button color='green' inverted onClick={this.handleSubmit}>
                    <Icon name='checkmark'/> Add
                </Button>
            </Modal.Actions>
            </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user.currentUser,
})
function mapDispatchToProps(dispatch){
    return{
        currentFetch:function(data){
            dispatch(setCurrentChannels(data))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Channels);