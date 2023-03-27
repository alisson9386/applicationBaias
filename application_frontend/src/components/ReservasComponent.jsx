import React, { Component } from 'react'

class ReservasComponent extends Component {
    constructor(props){
        super(props)
        this.state= {
            data: new Date(),
            select1: '',
            select2: ''
        }
        this.changeDataHandler = this.changeDataHandler.bind(this);
        this.changeSelect1Handler = this.changeSelect1Handler.bind(this);
        this.changeSelect2Handler = this.changeSelect2Handler.bind(this);
    }

    changeDataHandler= (event) => {
        this.setState({data: event.target.value});
    }


    changeSelect1Handler= (event) => {
        this.setState({select1: event.target.value});
    }

    changeSelect2Handler= (event) => {
        this.setState({select2: event.target.value});
    }

    componentDidMount(){
    }

    handleSubmit = (event) => {
        event.preventDefault();
        // Aqui você pode fazer algo com os dados do formulário
        console.log(this.state);
      };


    render() {
        const planta = require('../assets/img/planta.jpg');
        return (
            <div className='parent'>
                <div className='formReserva'>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="data">Data:</label>
                        <input
                            type="datetime-local"
                            name="dataHora"
                            value={this.state.data}
                            onChange={this.changeDataHandler}
                        />
                        <br />

                        <label htmlFor="select1">Opção 1:</label>
                        <select name="select1" value={this.state.select1} onChange={this.changeSelect1Handler}>
                            <option value="">Selecione uma opção</option>
                            <option value="opcao1">Opção 1</option>
                            <option value="opcao2">Opção 2</option>
                            <option value="opcao3">Opção 3</option>
                        </select>
                        <br />

                        <label htmlFor="select2">Opção 2:</label>
                        <select name="select2" value={this.state.select2} onChange={this.changeSelect2Handler}>
                            <option value="">Selecione uma opção</option>
                            <option value="opcao4">Opção 4</option>
                            <option value="opcao5">Opção 5</option>
                            <option value="opcao6">Opção 6</option>
                        </select>
                        <br />

                        <button type="submit" className="btn">Enviar</button>
                    </form>
                </div>
                <div className='imgPlanta'>
                    <img src={planta} alt='planta'/>
                </div>
            </div>
        )
    }
}

export default ReservasComponent;