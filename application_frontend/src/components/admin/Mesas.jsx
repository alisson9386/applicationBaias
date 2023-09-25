import React, { Component } from "react";
import {
  BsPencilSquare,
  BsFillCheckCircleFill,
  BsFillDashCircleFill,
  BsFillPlusSquareFill,
} from "react-icons/bs";
import Cookies from "js-cookie";
import { isExpired, decodeToken } from "react-jwt";
import history from "../../history";
import AppServices from "../../services/app-services";
import useAuth from "../../context/useAuth";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class MesasComponent extends Component {
  showActivate = () => {
    Swal.fire({
      icon: "success",
      title: "Ativado!",
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
    });
    return;
  };
  showDesactivate = () => {
    Swal.fire({
      icon: "success",
      title: "Desativado!",
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
    });
    return;
  };

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      mesas: "",
    };
  }

  componentDidMount() {
    this.metodoInicial();
  }

  handleClose = () => {
    this.setState({ showModal: false });
  };

  handleShow = () => {
    this.setState({ showModal: true });
  };

  async metodoInicial() {
    const token = Cookies.get("token");
    const myDecodedToken = decodeToken(token);
    const isMyTokenExpired = isExpired(token);

    if (isMyTokenExpired) {
      useAuth.handleLogout();
    } else if (myDecodedToken.user.tipo_user !== 1) {
      history.push("/");
    } else {
      //this.showLoading("Carregando dados!");
      try {
        const listBaia = await AppServices.listBaia();

        this.setState({
          mesas: listBaia.data,
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  handleActivateBaia = (status, id) => {
    if (status) {
      AppServices.activateBaia(id).then((res) => {
        if (res.data === "Baia ativada") {
          this.showActivate();
          this.metodoInicial();
        }
      });
    } else {
      AppServices.deleteBaia(id).then((res) => {
        if (res.data === "Baia deletada") {
          this.showDesactivate();
          this.metodoInicial();
        }
      });
    }
  };

  render() {
    return (
      <>
        <button
          title="Novo"
          className="btn btn-primary"
          onClick={() => this.handleShow()}
        >
          <BsFillPlusSquareFill />
        </button>
        <h4>Mesas cadastradas</h4>
        <table className="table table-dark table-striped table-bordered text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Andar</th>
              <th>Nome</th>
              <th>Foto</th>
              <th>Ativa?</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(this.state.mesas).map(([key, data]) => (
              <tr key={key}>
                <td>{data.id}</td>
                <td>
                  <label variant="primary">{data.andar}°</label>
                </td>
                <td>
                  <label variant="primary">{data.nome}</label>
                </td>
                <td>
                  <label variant="primary">Fotos</label>
                </td>
                <td>
                  <label variant="primary">
                    {data.fl_ativo ? "Ativo" : "Inativo"}
                  </label>
                </td>
                <td>
                  {
                    <button
                      title="Editar"
                      className="btn btn-warning"
                      onClick={() => this.handleEditaReserva(data.id)}
                    >
                      <BsPencilSquare />
                    </button>
                  }{" "}
                  {data.fl_ativo ? (
                    <button
                      title="Desativar"
                      className="btn btn-danger"
                      onClick={() => this.handleActivateBaia(false, data.id)}
                    >
                      <BsFillDashCircleFill />
                    </button>
                  ) : (
                    <button
                      title="Ativar"
                      className="btn btn-success"
                      onClick={() => this.handleActivateBaia(true, data.id)}
                    >
                      <BsFillCheckCircleFill />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          className="modal"
          show={this.state.showModal}
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Editar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="col-md-2">
              <label for="inputState" class="form-label">
                Andar
              </label>
              <select id="andar" class="form-select">
                <option>1°</option>
              </select>
            </div>

            <div class="col-md-4">
              <label for="inputState" class="form-label">
                Nome
              </label>
              <input
              className="form-control form-control-sm"
              type="text"
              placeholder=".form-control-sm"
              aria-label=".form-control-sm example"
              id="nome"
            />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              id="termosButton"
              data-toggle="modal"
              onClick={() => {
                this.handleClose();
                this.handleSubmit();
              }}
            >
              Salvar
            </Button>
            <span style={{ marginLeft: "10px" }}></span>
            <Button variant="secondary" onClick={this.handleClose}>
              Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default MesasComponent;
