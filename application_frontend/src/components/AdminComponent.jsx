import React, { Component } from 'react'
import $ from 'jquery';

class AdminComponent extends Component {
    constructor(props) {
		super(props)

		this.state = {
		}
	}

    componentDidMount(){
        $('#myTab button').on('click', function (event) {
            event.preventDefault();
            $(this).tab('show');
          });
    }

    render() {
        return (
            <div>
            </div>
        )
    }
}

export default AdminComponent;