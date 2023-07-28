import React, { Component } from 'react'
import DeskCanvas from './canvas/Desk';

class AboutComponent extends Component {

    render() {
        return (
            <div>
                <h3>Sobre</h3>
                <DeskCanvas/>
            </div>
        )
    }
}

export default AboutComponent;