import React, { Component } from 'react'
import history from '../history';
import useAuth from '../context/useAuth';
import { isExpired, decodeToken } from 'react-jwt';
import Swal from 'sweetalert2';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Cookies from 'js-cookie';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

class NavbarComponent extends Component {
    
    showAlertUserAuthenticated = () => {
        Toast.fire({
            icon: 'info',
            title: 'Acesso expirado, necessário refazer o login',
        });	
    }
    
    constructor(props){
        super(props)

        this.state = {
            id:'',
            tipo_user:'',
            usuario:'',
            nome:'',
            setor_user:''
        }
    }
    
    componentDidMount(){
        const token = Cookies.get('token');
        const myDecodedToken = decodeToken(token);
        const isMyTokenExpired = isExpired(token);
        if(isMyTokenExpired){
            useAuth.handleLogout();
        }else if(!isMyTokenExpired){
            this.setState({id: myDecodedToken.user.id});
            this.setState({tipo_user: myDecodedToken.user.tipo_user});
            this.setState({usuario: myDecodedToken.user.usuario});
            this.setState({nome: myDecodedToken.user.nome});
            this.setState({setor_user: myDecodedToken.user.setor_user});

        }
    }


    logout(){
        useAuth.handleLogout();
        history.push("/");
    }

    render() {
        const tipoUser = this.state.tipo_user;
        //const nomeUser = this.state.nome;
        return (
            <Navbar bg="dark" expand="lg" variant="dark">
            <Container>
            <Navbar.Brand href="/index">WorkSpots</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/index">Home</Nav.Link>

                    <NavDropdown title="Reservas" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/reserv">Cadastrar Nova Reserva</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.1">Minhas Reservas</NavDropdown.Item>
                    </NavDropdown>

                    <Nav.Link href="/about">Sobre</Nav.Link>
                    <NavDropdown title="Perfil" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.2">Perfil</NavDropdown.Item>
                    {tipoUser === 1 ? (<NavDropdown.Item href="/admin">Admin</NavDropdown.Item>) : (<></>)}
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#" onClick={this.logout}>
                        Logout
                    </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        )
    }
}

export default NavbarComponent;