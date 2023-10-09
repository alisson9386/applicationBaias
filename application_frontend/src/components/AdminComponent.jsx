import React, { Component } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Cookies from "js-cookie";
import useAuth from "../context/useAuth";
import { isExpired, decodeToken } from "react-jwt";
import history from "../history";
import Swal from "sweetalert2";
import MesasComponent from "./admin/Mesas";
//import AppServices from "../services/app-services";
import ReservasComponent from "./admin/Reservas";

class AdminComponent extends Component {
  showLoading = (text) => {
    Swal.fire({
      title: "Aguarde !",
      html: text, // add html attribute if you want or remove
      allowOutsideClick: false,
      allowEscapeKey: false,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };

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
      reservas: "",
      setores: "",
      tipoUsuarios: "",
      usuarios: "",
    };
  }

  componentDidMount() {
    this.metodoInicial();
  }

  async metodoInicial() {
    const token = Cookies.get("token");
    const myDecodedToken = decodeToken(token);
    const isMyTokenExpired = isExpired(token);

    if (isMyTokenExpired) {
      useAuth.handleLogout();
    } else if (myDecodedToken.user.tipo_user !== 1) {
      history.push("/");
    } /*else {
      //this.showLoading("Carregando dados!");
      try {
        const [listBaia, listReserva, listSetor, listTipoUser, listUsers] =
          await Promise.all([
            AppServices.listBaia(),
            AppServices.listReserva(),
            AppServices.listSetor(),
            AppServices.listTipoUser(),
            AppServices.listUsers(),
          ]);

        this.setState({
          mesas: listBaia.data,
          reservas: listReserva.data,
          setores: listSetor.data,
          tipoUsuarios: listTipoUser.data,
          usuarios: listUsers.data,
        });
      } catch (error) {
        console.log(error);
      }
    }*/
  }

  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <br />
        <div className="containerUsually">
          <Tabs
            defaultActiveKey="mesas"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="mesas" title="Mesas">
              <MesasComponent/>
            </Tab>
            <Tab eventKey="reservas" title="Reservas">
              <ReservasComponent/>
            </Tab>
            <Tab eventKey="setores" title="Setores">
              Setores
            </Tab>
            <Tab eventKey="tipo-usuario" title="Tipos de Usuários">
              Tipos de Usuários
            </Tab>
            <Tab eventKey="usuarios" title="Usuarios">
              Usuarios
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default AdminComponent;
