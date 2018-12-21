import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react'
import UserPanel from '../UserPanel/UserPanel'
class SidePanel extends Component {
    render() {
        return (
            <Menu size='large'
            inverted
            fixed='left'
            verticlal
            style={{background :'#4c33c4c',fontSize:'1.2rem'}}>
            <UserPanel/>

            </Menu>
        );
    }
}

export default SidePanel;