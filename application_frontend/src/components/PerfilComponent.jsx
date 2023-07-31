import React, { Component } from 'react'
import perfilImage from '../assets/img/perfil.png'; 

class PerfilComponent extends Component {
    constructor(props) {
		super(props)

		this.state = {
		}
	}

    componentDidMount(){
    }

    render() {
        return (
            <div className='containerPerfil'>
                <br/>
                <h3>Perfil</h3>
                <img src={perfilImage} className="img-thumbnail" alt="..." width="200" height="200" style={{ borderRadius: "50%" }}></img>
                <form>
                <div class="row g-3">

                <div class="col-md-2">
                <div class="form-group">
                    <label for="exampleInputEmail1">Endereço de email</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Seu email"/>
                </div>
                </div>

                <div class="col-md-2">
                <div class="form-group">
                    <label for="exampleInputPassword1">Nome</label>
                    <input type="text" class="form-control" placeholder="Nome"/>
                </div>
                </div>

                <div class="col-md-2">
                <div class="form-group">
                    <label for="exampleInputPassword1">Usuário</label>
                    <input type="text" class="form-control" placeholder="Usuário"/>
                </div>
                </div>

                <div class="form-group form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                    <label class="form-check-label" for="exampleCheck1">Clique em mim</label>
                </div>

                <div class="col-md-2">
                <button type="submit" class="btn btn-primary">Enviar</button>
                </div>

                </div>  
                </form>
            </div>
        )
    }
}

export default PerfilComponent;