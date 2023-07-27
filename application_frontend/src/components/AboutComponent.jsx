import React, { Component } from 'react'
import MapCanvas from './canvas/PreviewMap';

class AboutComponent extends Component {

    render() {
        return (
            <div>
                <h3>Sobre</h3>
                <MapCanvas/>
            </div>
        )
    }
}

export default AboutComponent;