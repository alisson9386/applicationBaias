import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import history from '../history';
import useAuth from '../context/useAuth';
import { isExpired } from 'react-jwt';
import Swal from 'sweetalert2';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

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

    componentDidMount(){
        const token = localStorage.getItem('token');
        const isMyTokenExpired = isExpired(token);
        if(isMyTokenExpired){
            useAuth.handleLogout();
        }
    }

    logout(){
        useAuth.handleLogout();
        history.push("/");
    }

    render() {
        return (
            <Navbar bg="dark" expand="lg" variant="dark">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link to="/index"><Nav.Link href="#home">Home</Nav.Link></Link>
                    <Link to="/about"><Nav.Link href="#home">About</Nav.Link></Link>
                    <Link to="/contact"><Nav.Link href="#home">Contact</Nav.Link></Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                        Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                        Separated link
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