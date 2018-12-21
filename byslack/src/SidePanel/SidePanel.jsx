import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'
import UserPanel from '../UserPanel/UserPanel'
import Channel from '../Channel/Channel';
class SidePanel extends Component {
    render() {
        return (
            <Menu size='large'
            inverted
            vertical
            fixed='left'
            style={{background :'#4c33c4c',fontSize:'1.2rem'}}>
            <UserPanel/>
            <Channel/>
            </Menu>
        );
    }
}

export default SidePanel;