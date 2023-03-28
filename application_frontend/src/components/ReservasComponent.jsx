import React, { Component } from 'react'

class ReservasComponent extends Component {
    constructor(props){
        super(props)
        this.state= {
            dataInicio: new Date(),
            dataFim: new Date(),
            select1: '',
            select2: ''
        }
        this.changeDataInicioHandler = this.changeDataInicioHandler.bind(this);
        this.changeDataFimHandler = this.changeDataFimHandler.bind(this);
        this.changeSelect1Handler = this.changeSelect1Handler.bind(this);
        this.changeSelect2Handler = this.changeSelect2Handler.bind(this);
    }

    changeDataInicioHandler= (event) => {
        this.setState({dataInicio: event.target.value});
    }

    changeDataFimHandler= (event) => {
        this.setState({dataFim: event.target.value});
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
                    <div className="form-group">
                    <label htmlFor="data">Inicio da Reserva:</label>
                        <input
                            type="datetime-local"
                            name="dataInicio"
                            value={this.state.dataInicio}
                            onChange={this.changeDataInicioHandler}
                        />
                        <label htmlFor="data">Fim da Reserva:</label>
                        <input
                            type="datetime-local"
                            name="dataFim"
                            value={this.state.dataFim}
                            onChange={this.changeDataFimHandler}
                        />
                        <br />
                    </div>
                    <div className="form-group">
                    <label htmlFor="select1">Opção 1:</label>
                        <select name="select1" value={this.state.select1} onChange={this.changeSelect1Handler}>
                            <option value="">Selecione uma opção</option>
                            <option value="opcao1">Opção 1</option>
                            <option value="opcao2">Opção 2</option>
                            <option value="opcao3">Opção 3</option>
                        </select>
                        <br />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
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