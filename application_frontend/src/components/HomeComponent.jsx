import React, { Component } from 'react'

class HomeComponent extends Component {
    constructor(props) {
		super(props)

		this.state = {
		}
	}

    componentDidMount(){
    }

    render() {
        return (
            <div>
                <div className="jumbotron jumbotron-fluid">
                <div className="container">
                    <h1 className="display-4">Fluid jumbotron</h1>
                    <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
                </div>
                </div>
            </div>
        )
    }
}

export default HomeComponent;