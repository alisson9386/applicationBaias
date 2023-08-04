import React, { Component } from 'react'
import Cookies from 'js-cookie';
import { isExpired, decodeToken } from 'react-jwt';
import useAuth from '../context/useAuth';
import AppServices from '../services/app-services'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import AWS from 'aws-sdk';
import awsConfig from '../services/aws-config';
import Swal from 'sweetalert2';
import { BsPenFill } from "react-icons/bs";

AWS.config.update(awsConfig);
const s3 = new AWS.S3();

const imgPerfilPadrao = "https://www.promoview.com.br/uploads/images/unnamed%2819%29.png";

class PerfilComponent extends Component {

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

    updateUserSuccess = () => {
        Swal.fire({
            icon: 'success',
            title: 'Usuário atualizado!',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 3000
        })
        return;
    }

    showAlertError = (err) => {
        Swal.fire({
            icon: 'error',
            title: 'Erro, por favor contate o administrador!',
            text: err
        })
    }

    constructor(props) {
        super(props)

        this.state = {
            id: '',
            tipo_user: '',
            tipo_user_id: '',
            usuario: '',
            senha: '',
            senhaConfirm: '',
            nome: '',
            email: '',
            setor_user: '',
            setores: [],
            tipoUsuarios: [],
            showModal: false,
            imgPerfil: '',
            imgPerfilHash: '',
            awsBucket: ''
        }

        this.fileInputRef = React.createRef();
        this.changeTipoUserHandler = this.changeTipoUserHandler.bind(this);
        this.changeUserHandler = this.changeUserHandler.bind(this);
        this.changeSenhaHandler = this.changeSenhaHandler.bind(this);
        this.changeSenhaConfirmHandler = this.changeSenhaConfirmHandler.bind(this);
        this.changeNomeHandler = this.changeNomeHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changeSetorHandler = this.changeSetorHandler.bind(this);
        this.changeImgPerfilHandler = this.changeImgPerfilHandler.bind(this);
    }


    handleClose = () => {
        this.setState({ showModal: false });
        this.componentDidMount();
    }

    handleShow = () => {
        this.setState({ showModal: true });
    }

    handleEditPerfil = () => {
        this.handleShow();

    }

    handleImgPerfilClick = () => {
        this.fileInputRef.current.click();
    };

    async componentDidMount() {
        try {
            const token = Cookies.get('token');
            const myDecodedToken = decodeToken(token);
            const isMyTokenExpired = isExpired(token);
            if (isMyTokenExpired) {
                useAuth.handleLogout();
            } else if (!isMyTokenExpired) {
                this.setState({ id: myDecodedToken.user.id });
                this.setState({ usuario: myDecodedToken.user.usuario });
                this.setState({ nome: myDecodedToken.user.nome });
                this.setState({ email: myDecodedToken.user.email });
                if (myDecodedToken.user.img_perfil != null) {
                    this.setState({ imgPerfil: myDecodedToken.user.img_perfil })
                } else {
                    this.setState({ imgPerfil: imgPerfilPadrao })
                }
                const responseSetor = await AppServices.listSetor();
                if (responseSetor.data != null) {
                    this.setState({ setores: responseSetor.data });
                }
                const responseTipoUser = await AppServices.listTipoUser();
                if (responseTipoUser.data != null) {
                    this.setState({ tipoUsuarios: responseTipoUser.data });
                }
                const setor = responseSetor.data.find((setores) => setores.id === myDecodedToken.user.setor_user);
                const tipo = responseTipoUser.data.find((tipos) => tipos.id === myDecodedToken.user.tipo_user);
                this.setState({ setor_user: setor.nome_setor })
                this.setState({ tipo_user: tipo.tipo })
                this.setState({ tipo_user_id: tipo.id })
                this.setState({ awsBucket: process.env.REACT_APP_AWS_BUCKET })
            }

        } catch (error) {
            console.log(error);
        }

    }

    changeTipoUserHandler = (event) => {
        this.setState({ tipo_user: event.target.value });
    }
    changeUserHandler = (event) => {
        this.setState({ usuario: event.target.value });
    }
    changeSenhaHandler = (event) => {
        this.setState({ senha: event.target.value });
    }
    changeSenhaConfirmHandler = (event) => {
        this.setState({ senhaConfirm: event.target.value });
    }
    changeNomeHandler = (event) => {
        this.setState({ nome: event.target.value });
    }
    changeEmailHandler = (event) => {
        this.setState({ email: event.target.value });
    }
    changeSetorHandler = (event) => {
        this.setState({ setor_user: event.target.value });
    }
    changeImgPerfilHandler = (event) => {
        const file = event.target.files[0];
        this.setState({ imgPerfilHash: event.target.files[0] })
        this.setState({ imgPerfil: URL.createObjectURL(file) });
    }

    getSetorETipoUser = (setorUser, tipoUser) => {
        const setor = this.state.setores.find((setores) => setores.id === setorUser);
        const tipo = this.state.tipoUsuarios.find((tipos) => tipos.id === tipoUser);
        this.setState({ setor_user: setor.nome_setor })
        this.setState({ tipo_user: tipo.tipo })
        this.setState({ tipo_user_id: tipo.id })
    }

    editarPerfil = async () => {
        this.showLoading('Salvando alterações');
        console.log(this.state)
        let senha = '';
        if (this.state.senha !== '' && this.state.senhaConfirm !== '' && this.state.senha === this.state.senhaConfirm) {
            senha = this.state.senha;
        }
        const tipoUser = this.state.tipoUsuarios.find((tipos) => tipos.tipo === this.state.tipo_user);
        const setorUser = this.state.setores.find((setores) => setores.nome_setor === this.state.setor_user);
        let img;
        if (this.state.imgPerfil !== imgPerfilPadrao && this.state.imgPerfilHash !== '') {
            const params = {
                Bucket: this.state.awsBucket,
                Key: this.state.usuario + '/perfilImg.' + this.state.imgPerfilHash.name.split('.').pop(),
                Body: this.state.imgPerfilHash,
                ContentDisposition: 'inline'
            }
            console.log(params)
            const data = await s3.upload(params).promise();
            img = data.Location;
        }
        const user = {
            'nome': this.state.nome,
            'usuario': this.state.usuario,
            'senha': senha,
            'email': this.state.email,
            'tipo_user': tipoUser.id,
            'setor_user': setorUser.id,
            'img_perfil': img
        }

        let id = this.state.id;

        const updateUser = await AppServices.updateUser(user, id);
            if (updateUser.status === 200) {
                const getUserImg = await AppServices.listUserById(id);
                this.setState({imgPerfil: getUserImg.data.img_perfil})
                this.updateUserSuccess();
                this.handleClose();
                window.location.reload();
            }else{
                console.log(updateUser.statusText);
                this.showAlertError(updateUser.statusText)

            }
    }

    render() {
        const { setores, tipoUsuarios, tipo_user, setor_user, imgPerfil } = this.state;
        return (
            <>
                <br /><br /><br /><br /><br />
                <div className='containerPerfil'>
                    <button title="Excluir"
                        className='btn btn-success'
                        onClick={() => this.handleEditPerfil()}
                    >Editar perfil</button>
                </div>
                <Modal className='modal modal-lg' show={this.state.showModal} onHide={this.handleClose} dialogClassName="custom-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Editar perfil</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='containerPerfil'>
                            <br />
                            <div className="edit-profile-image" onClick={this.handleImgPerfilClick} style={{ display: "flex", justifyContent: "center" }}>
                                <img
                                    src={imgPerfil}
                                    className="img-thumbnail"
                                    alt="..." width="200"
                                    height="200"
                                    style={{ borderRadius: "50%", margin: "auto" }}>
                                </img>
                                <div className="edit-profile-overlay">
                                    Editar <BsPenFill/>
                                </div>
                            </div>
                            <div className="form-group">
                                <input type="file" className="form-control-file" onChange={this.changeImgPerfilHandler} ref={this.fileInputRef} hidden />
                            </div>
                            <br /><br /><br />
                            <form onSubmit={this.editarPerfil}>
                                <div className="row g-3">
                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label>Nome</label>
                                            <input type="text"
                                                className="form-control"
                                                placeholder="Nome"
                                                value={this.state.nome}
                                                onChange={this.changeNomeHandler}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="email"
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                                placeholder="Seu email"
                                                value={this.state.email}
                                                onChange={this.changeEmailHandler}
                                                disabled={this.state.tipo_user_id !== 1}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label>Usuário</label>
                                            <input type="text"
                                                className="form-control"
                                                placeholder="Usuário"
                                                value={this.state.usuario}
                                                onChange={this.changeUserHandler}
                                                disabled={this.state.tipo_user_id !== 1}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label>Setor</label>
                                            <select className="form-control" value={setor_user} onChange={this.changeSetorHandler} disabled={this.state.tipo_user_id !== 1}>
                                                {/* Mapeia o array de opções e cria as opções do select */}
                                                {setores.map((option, index) => (
                                                    <option key={index} value={option.nome_setor}>
                                                        {option.nome_setor}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-3">
                                        <div className="form-group">
                                            <label>Tipo de usuário</label>
                                            <select className="form-control" value={tipo_user} onChange={this.changeTipoUserHandler} disabled={this.state.tipo_user_id !== 1}>
                                                {/* Mapeia o array de opções e cria as opções do select */}
                                                {tipoUsuarios.map((option, index) => (
                                                    <option key={index} value={option.tipo}>
                                                        {option.tipo}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label>Senha</label>
                                            <input type="password"
                                                className="form-control"
                                                placeholder="Senha"
                                                value={this.state.senha}
                                                onChange={this.changeSenhaHandler}
                                            />
                                        </div>
                                    </div>

                                    <div className="col-md-5">
                                        <div className="form-group">
                                            <label>Confirme sua senha</label>
                                            <input type="password"
                                                className="form-control"
                                                placeholder="Confirme sua senha"
                                                value={this.state.senhaConfirm}
                                                onChange={this.changeSenhaConfirmHandler}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group form-check">
                                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                        <label className="form-check-label" htmlFor="exampleCheck1">Clique em mim</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" id="termosButton" data-toggle="modal" onClick={this.editarPerfil}>Salvar</Button>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default PerfilComponent;