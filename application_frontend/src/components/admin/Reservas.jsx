import React, { Component } from "react";
import {
  BsFillTrashFill,
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

class ReservasComponent extends Component {
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
      reservas: "",
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
        const listReserva = await AppServices.listReserva();

        this.setState({
          reservas: listReserva.data,
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
      AppServices.deleteReserva(id).then((res) => {
        if (res.data === "Reserva deletada") {
          this.showDesactivate();
          this.metodoInicial();
        }
      });
    }
  };

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
    return (
      <>
        <button
          title="Novo"
          className="btn btn-primary"
          onClick={() => this.handleShow()}
        >
          <BsFillPlusSquareFill />
        </button>
        <h4>Reservas cadastradas</h4>
        <table className="table table-dark table-striped table-bordered text-center">
          <thead>
            <tr>
              <th>ID</th>
              <th>Periodo Inicio</th>
              <th>Periodo Fim</th>
              <th>Id Usuario</th>
              <th>Id Mesa</th>
              <th>Ativa?</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(this.state.reservas).map(([key, data]) => (
              <tr key={key}>
                <td>{data.id}</td>
                <td>
                  <label variant="primary">{this.formatarData(data.periodo_inicio)}</label>
                </td>
                <td>
                  <label variant="primary">{this.formatarData(data.periodo_fim)}</label>
                </td>
                <td>
                  <label variant="primary">{data.id_usuario_reserva}</label>
                </td>
                <td>
                  <label variant="primary">{data.id_baia_reserva}</label>
                </td>
                <td>
                  <label variant="primary">
                    {data.fl_ativo ? "Ativo" : "Inativo"}
                  </label>
                </td>
                <td>
                    <button
                      title="Excluir"
                      className="btn btn-danger"
                      onClick={() => this.handleActivateBaia(false, data.id)}
                    >
                      <BsFillTrashFill />
                    </button>
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

export default ReservasComponent;
