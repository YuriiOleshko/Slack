import React, { Component } from 'react';
import { Sidebar, Menu, Divider, Button, Modal, Segment, Label, Icon } from 'semantic-ui-react';
import firebase from '../firebase'
import {TwitterPicker} from 'react-color'
import {connect} from 'react-redux'
import {setCurrentColors} from '../redux/actions/colorsAction'

class ColorPanel extends Component {
  state = {
    modal: false,
    primary: '',
    secondary: '',
    usersRef: firebase.database().ref('users'),
    userColors:[]
  };
  componentDidMount(){
    if(this.props.user){
this.addListner(this.props.user.currentUser.uid);

    }
  }
// setColors=()=>{
//   this.props.color(this.state.userColors)
// }
  addListner=userId=>{
    let userColors=[];
    this.state.usersRef.child(`${userId}/colors`).on("child_added",snap=>{
      userColors.unshift(snap.val());
      this.setState({userColors});
      // this.setColors()
    })
  }
  openModal = () => this.setState({modal: true});

  closeModal = () => this.setState({modal: false});

  handleChangePrimaryColor = color => {
    this.setState({primary: color.hex})
  }
  handleChangeSecondaryColor = color => {
    this.setState({secondary: color.hex})
  };
  handleSaveColor=()=>{
      if (this.state.primary && this.state.secondary){
          this.saveColors(this.state.primary,this.state.secondary);
   
      }
  }
  saveColors =(primary,secondary)=>{
      this.state.usersRef
      .child(`${this.props.user.currentUser.uid}/colors`)
      .push()
      .update({
        primary,
          secondary
      }).then(()=>{
          console.log("colors added");
          this.closeModal();
      }).catch(err=>console.log(err))
  }
  displayUserColors=colors=>colors.length>0 && colors.map((color,i)=>(
    <React.Fragment key={i}>
    <Divider/>
    <div className='color__container'
    onClick={()=>this.props.setColors(color.primary,color.secondary)}>
<div className='color__square' style={{background:color.primary}}>
<div className='color__overlay'
style={{background:color.secondary}}/>
</div>
    </div>
    </React.Fragment>
  ));

  render() {
    const{modal, primary, secondary,userColors} = this.state
    return (
      <Sidebar
      as={Menu}
      icon='labeled'
      inverted
      visible
      vertical
      width='very thin'>
      <Divider/>
      <Button icon='add' size='small' color='blue' onClick={this.openModal}/>
      {this.displayUserColors(userColors)}
      
      <Modal basic open={modal} onClose={this.closeModal}>
        <Modal.Header>Choose App Colors</Modal.Header>
        <Modal.Content>
          <Segment>
            <Label content='Primary Color'/>
            <TwitterPicker onChange={this.handleChangePrimaryColor} color={primary}/>
          </Segment>
          <Segment>
            <Label content='Secondary Color'/>
            <TwitterPicker onChange={this.handleChangeSecondaryColor} color={secondary}/>
          </Segment>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' inverted onClick={this.handleSaveColor}>
            <Icon name='checkmark' /> Save Color
          </Button>
          <Button color='red' inverted onClick={this.closeModal}>
            <Icon name='remove'/> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
      </Sidebar>
    );
  }
}

function mapStateToProps (state) {
    return {
        user: state.user,
        colors:state.colors
    }
}
function mapDispatchToProps (dispatch) {
  return {
    setColors:function(primary,secondary){
      dispatch(setCurrentColors(primary,secondary))
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(ColorPanel);