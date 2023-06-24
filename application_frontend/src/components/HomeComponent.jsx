import React, { Component } from 'react'
import Cookies from 'js-cookie';
import useAuth from '../context/useAuth';
import { isExpired, decodeToken } from 'react-jwt';
import appServices from '../services/app-services';
import Badge from 'react-bootstrap/Badge';
import moment from 'moment';


class HomeComponent extends Component {
    constructor(props) {
		super(props)

		this.state = {
            idUser:0,
            countReservas: 0,
            reservasUser: {}
		}
	}

    componentDidMount(){
        const token = Cookies.get('token');
        const myDecodedToken = decodeToken(token);
        const isMyTokenExpired = isExpired(token);
        if(isMyTokenExpired){
            useAuth.handleLogout();
        }else if(!isMyTokenExpired){
            this.setState({idUser: myDecodedToken.user.id}, () => {
                  const idUser = this.state.idUser;
                  appServices.listReservaByIdUser(idUser)
                    .then((res) => {
                      this.setState({ reservasUser: res.data });
                      this.setState({countReservas: res.data.length}, () =>{
                        console.log(this.state);
                      })
                    })
                    .catch(error => {
                      console.log(error);
                    });
                });
                
              }
            }

    render() {
        return (
            <div>
                <div className='containerUsually'>
                <div className="containerCenter">
                    <h1 className="display-4">WorkSpots</h1>
                    <p className="lead">Escolha seu espaço. Liberdade para trabalhar.</p>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <h3>Reservas</h3>
                        <h4><Badge variant="primary">{this.state.countReservas}</Badge></h4>
                    </div>
                    <div className="col-sm-6">
                <table className="table table-striped table-bordered text-center">
                    <thead>
                        <tr>
                            <th><h6>Baia reservada</h6></th>
                            <th>Período inicio</th>
                            <th>Período fim</th>
                        </tr>
                    </thead>
                    <tbody>
                    {Object.entries(this.state.reservasUser).map(([key, data]) => (
                        <tr key={key}>
                            <td><Badge>{data.id_baia_reserva}</Badge></td>
                            <td><label variant="primary">{moment(data.periodo_inicio).format('DD/MM/yyyy HH:mm')}</label></td>
                            <td><label variant="primary">{moment(data.periodo_fim).format('DD/MM/yyyy HH:mm')}</label></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
                </div>
                </div>
            </div>
        )
    }
}

export default HomeComponent;