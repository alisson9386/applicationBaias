import React, { Component } from 'react'
import AppServices from '../services/app-services'
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class ReservasComponent extends Component {

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

    showAlertReservaRegister = () => {
        Swal.fire({
                    icon: 'success',
					title: 'Reserva cadastrada com sucesso!',
                    showConfirmButton: false,
                    timerProgressBar: true,
                    timer: 5000 
						})	
                        return;
    }

    showAlertNotBaias = () => {
        Swal.fire({
                    icon: 'error',
					title: 'Não há mesas disponíveis no horário especificado!',
                    showConfirmButton: false,
                    timerProgressBar: true,
                    timer: 5000 
						})	
                        return;
    }
    
    constructor(props){
        super(props)
        this.state= {
            showModal: false,
            dataInicio: '',
            dataFim: '',
            select: '',
            mesaSelecionada:'',
            baias:[]
        }
        this.changeDataInicioHandler = this.changeDataInicioHandler.bind(this);
        this.changeDataFimHandler = this.changeDataFimHandler.bind(this);
    }

    changeDataInicioHandler= (event) => {
        this.setState({dataInicio: event.target.value});
    }

    changeDataFimHandler= (event) => {
        this.setState({dataFim: event.target.value});
    }

    handleClose = () => {
        this.setState({showModal: false});
    }
  
    handleShow  = () => {
      this.setState({showModal: true});
    }

    handleCompletarReserva = (data) =>{
        this.setState({select1: data.id})
        this.setState({ mesaSelecionada: data})
        this.handleShow();
    }

    handleClearFields = () => {
        this.setState({
          dataInicio: "",
          dataFim: "",
          select: "",
          mesaSelecionada:"",
          baias: []
        });
      }

    /*async componentDidMount(){
        const mesas = await AppServices.listBaia();
        if(mesas.data){
            this.setState({ baias: mesas.data });
            console.log(mesas)
        }
    }*/

    handleSubmit = () => {
        //event.preventDefault();
        let token = Cookies.get('token');
        let myDecodedToken = decodeToken(token);
        var reserva = {
            'periodo_inicio': this.state.dataInicio,
            'periodo_fim': this.state.dataFim,
            'id_usuario_reserva': myDecodedToken.user.id,
            'id_baia_reserva' : this.state.mesaSelecionada.id
        }
        this.showLoading('Registrando reserva!');
        AppServices.saveReserva(reserva).then((res) =>{
            if(res.statusText === "Created"){
                Swal.close();
                this.showAlertReservaRegister();
                this.handleClearFields();
                return;
            }
            console.log(res);
        }).catch(error => {
            console.log(error);
          });
      };

      buscarBaiasDisponiveis = () =>{
        this.showLoading('Buscando mesas disponíveis');
        var periodos = {
            'periodo_inicio': this.state.dataInicio,
            'periodo_fim': this.state.dataFim
        }
        AppServices.listBaiasEmpty(periodos).then((res) =>{
            if(res.data.length > 0){
                this.setState({ baias: res.data });
                Swal.close();

            } else {
                Swal.close();
                this.setState({ baias: "" });
                this.showAlertNotBaias();
            }
        }).catch(error => {
            console.log(error);
          });
      }

      formatarData(dataString) {
        const data = new Date(dataString);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0'); // Mês é base 0, por isso somamos 1
        const ano = data.getFullYear();
        const horas = String(data.getHours()).padStart(2, '0');
        const minutos = String(data.getMinutes()).padStart(2, '0');
    
        return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
      }


    render() {
        const minHora = '07:00';
        const maxHora = '19:00';

        const minData = new Date().toISOString().slice(0, 10);
        const minDateTime = `${minData}T${minHora}`;

        const maxData = '';
        const maxDateTime = `${maxData}T${maxHora}`;
        const mesas = this.state.baias.length > 0 ? true : false;
        return (
            <><br/><br/><br/><br/>
            <div className="containerCenter">
            <form method="POST" className="formLogin">
                    <h3>Agendar reserva</h3>
                        <div className="row">
                        <div className="col">
                        <label htmlFor="data" className="label-with-spacing">Inicio da Reserva:</label>
                            <input
                                type="datetime-local"
                                name="dataInicio"
                                value={this.state.dataInicio}
                                onChange={this.changeDataInicioHandler}
                                min={minDateTime} />
                        </div>
                        <div className="col">
                        <label htmlFor="data" className="label-with-spacing">Fim da Reserva:</label>
                            <input
                                type="datetime-local"
                                name="dataFim"
                                value={this.state.dataFim}
                                onChange={this.changeDataFimHandler}
                                min={minDateTime}
                                max={maxDateTime} />
                        </div>
                        <div className="col">
                        <button type="button" className="btn btn-primary mr-2" onClick={this.buscarBaiasDisponiveis}>Buscar Mesas Disponíveis</button>
                            {" "}
                            <button type="button" className="btn btn-secondary ml-2" onClick={this.handleClearFields}>Limpar</button>
                        </div>
                        </div>
                {mesas ? <>
                <div className="row row-cols-1 row-cols-md-4 g-4">
                {Object.entries(this.state.baias).map(([key, data]) => (
                <div className="col" key={key}>
                    <div className="card">
                        <img src="https://static3.tcdn.com.br/img/img_prod/464234/mesa_para_escritorio_home_office_em_l_diretor_y37_connect_160x160cm_a02_nogal_preto_lyam_decor_26915_2_a094ee18c0c8e4e4fd9f4b948fdd43a6.jpg" className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{data.andar}° andar - {data.nome}</h5>
                            <button type="button" className="btn btn-primary mr-2" onClick={() => this.handleCompletarReserva(data)}>Reservar</button>
                            {/*<p className="card-text">{data.andar}° andar/{data.nome}</p>*/}
                        </div>
                    </div>
                </div>
                ))}
                </div>
                </>: <h1>Pesquise o período requerido</h1>}
                </form>
                <br/>
                <Modal className='modal' show={this.state.showModal} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                        <Modal.Title>Editar reserva</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4>Detalhes da reserva</h4>
                            <p>Andar: {this.state.mesaSelecionada.andar}</p>
                            <p>{this.state.mesaSelecionada.nome}</p>
                            <p>Inicio da Reserva: {this.formatarData(this.state.dataInicio)}</p>
                            <p>Fim da Reserva: {this.formatarData(this.state.dataFim)}</p>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="primary" id="termosButton" data-toggle="modal" onClick={() => {this.handleClose(); this.handleSubmit();}}>Reservar</Button>
                        <span style={{ marginLeft: '10px' }}></span>
                        <Button variant="secondary" onClick={this.handleClose}>
                        Cancelar
                        </Button>
                        </Modal.Footer>
                    </Modal>
            </div></>
        )
    }
}

export default ReservasComponent;