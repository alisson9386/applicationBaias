import React, { Component } from 'react';
import Cookies from 'js-cookie';
import useAuth from '../context/useAuth';
import { isExpired, decodeToken } from 'react-jwt';
import appServices from '../services/app-services';
import Badge from 'react-bootstrap/Badge';
import moment from 'moment';
import { BsFillTrashFill, BsPencilSquare } from "react-icons/bs";
import Swal from 'sweetalert2';
import AppServices from '../services/app-services'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import ChairCanvas from './canvas/Chair';

class HomeComponent extends Component {
  
  showLoading = (text) => {
    Swal.fire({
        title: 'Aguarde !',
        html: text,// add html attribute if you want or remove
        allowOutsideClick: false,
        allowEscapeKey: false,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
        },
    });
}

deleteStatus = (confirm) =>{
  if(confirm){
    this.componentDidMount();
    Swal.fire(
      'Excluído!',
      'Sua reserva foi excluída.',
      'success'
    )
  }else{
    Swal.fire(
      'Erro ao excluir!',
      'Contate um administrador!',
      'error'
    )
  }
}

  confirmDelete = (idReserva) =>{
    Swal.fire({
      title: 'Deseja deletar essa reserva?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceDelete(idReserva);
      }
    })
  }


  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      idUser: 0,
      countReservas: 0,
      reservasUser: {}
    };
  }

  handleClose = () => {
      this.setState({showModal: false});
  }

  handleShow  = () => {
    this.setState({showModal: true});
  }

  componentDidMount() {
    const token = Cookies.get('token');
    const myDecodedToken = decodeToken(token);
    const isMyTokenExpired = isExpired(token);

    if (isMyTokenExpired) {
      useAuth.handleLogout();
    } else if (!isMyTokenExpired) {
      this.setState({ idUser: myDecodedToken.user.id }, () => {
        const idUser = this.state.idUser;
        appServices
          .listReservaByIdUser(idUser)
          .then((res) => {
            this.setState({ reservasUser: res.data });
            this.setState({ countReservas: res.data.length });
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  }

  handleEditaReserva = () =>{
    this.handleShow();

  }

  handleDeleteReserva = (idReserva) =>{
    this.confirmDelete(idReserva);
  }

  serviceDelete = (idReserva) =>{
    this.showLoading('Excluindo');
    AppServices.deleteReserva(idReserva).then((res) =>{
      if(res.data === 'Reserva deletada'){
        var confirm = true;
        this.deleteStatus(confirm)
        window.location.reload();
      }
    }).catch(error => {
      console.log(error);
      var confirm = false;
      this.deleteStatus(confirm)
    });
  }

  
  render() {
    const temReserva = this.state.reservasUser.length > 0 ? true : false;
    return (
      <div>
        <div className='containerUsually'>
          <div className='containerCenter'>
            <h1 className='display-4'>WorkSpots</h1>
            <p className='lead'>Escolha seu espaço. Liberdade para trabalhar.</p>
            <br />
          </div>
          <div className='row'>
            <div className='col-sm-6'>
              {temReserva ? 
              <><h4>Suas reservas</h4><table className='table table-dark table-striped table-bordered text-center'>
                  <thead>
                    <tr>
                      <th>Andar/Mesa reservada</th>
                      <th>Período inicio</th>
                      <th>Período fim</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(this.state.reservasUser).map(([key, data]) => (
                      <tr key={key}>
                        <td>
                          <Badge>{data.andar}° andar - {data.nome}</Badge>
                        </td>
                        <td>
                          <label variant='primary'>{moment(data.periodo_inicio).format('DD/MM/yyyy HH:mm')}</label>
                        </td>
                        <td>
                          <label variant='primary'>{moment(data.periodo_fim).format('DD/MM/yyyy HH:mm')}</label>
                        </td>
                        <td>
                          <button title="Editar"
                            className='btn btn-warning'
                            onClick={() => this.handleEditaReserva(data.id)}
                          >
                            <BsPencilSquare />
                          </button>
                          {" "}
                          <button title="Excluir"
                            className='btn btn-danger'
                            onClick={() => this.handleDeleteReserva(data.id)}
                          >
                            <BsFillTrashFill />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table></>
               : <h4>Você não possui reservas</h4>     }
            </div>
            <div className='col-sm-6'>
              <ChairCanvas/>
            </div>
          </div>
        </div>
        <Modal className='modal' show={this.state.showModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Editar reserva</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="primary" id="termosButton" data-toggle="modal" /*onClick={() => {this.handleClose(); this.handleAceitarTerminos();}}*/>Salvar</Button>
                        <span style={{ marginLeft: '10px' }}></span>
                        <Button variant="secondary" onClick={this.handleClose}>
                        Cancelar
                        </Button>
                        </Modal.Footer>
                    </Modal>
      </div>
    );
  }
}

export default HomeComponent;
