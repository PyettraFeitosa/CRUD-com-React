import React, { Component } from "react";
import "./App.css";

class App extends Component {
  constructor(info) {
    super(info);
    this.estado = {
      titulo: "Formulário CRUD utilizando React JS",
      atual: 0,
      index: "",
      dados: []
    };
  }

  componentDidMount() {
    this.refs.nome.focus();
  }

  enviar = e => {
    e.preventDefault();
    console.log("try");

    let dados = this.estado.dados;
    let nome = this.refs.nome.value;
    let email = this.refs.email.value;

    if (this.estado.atual === 0) {
      let dado = {
        nome,
        email
      };
      dados.push(dado);
    } else {
      let index = this.estado.index;
      dados[index].nome = nome;
      dados[index].email = email;

      this.estado.atual = 0;
      this.estado.dados = dados;
    }

    this.setState({
      dados: dados,
      atual: 0
    });

    this.refs.form.reset();
    this.refs.nome.focus();
  };

  remover = i => {
    let dados = this.estado.dados;
    dados.splice(i, 1);
    this.setState({
      dados: dados
    });

    this.refs.form.reset();
    this.refs.nome.focus();
  };

  editar = i => {
    let dado = this.estado.dados[i];

    this.refs.nome.value = dado.nome;
    this.refs.email.value = dado.email;

    this.estado.atual = 1;
    this.estado.index = i;

    this.refs.nome.focus();
  };

  render() {
    let dados = this.estado.dados;
    return (
      <div className="App">
        <h2>{this.estado.titulo}</h2>
        <form ref="form" className="form">
          <input
            type="text"
            ref="nome"
            placeholder="Nome Completo"
            className="campoForm"
          />
          <input
            type="text"
            ref="email"
            placeholder="E-mail"
            className="campoForm"
          />
          <button onClick={e => this.enviar(e)} className="botao">
            Enviar
          </button>
        </form>
        <pre>
          {dados.map((dado, i) => (
            <li key={i} className="listar">
              {i + 1}. {dado.nome}, {dado.email}
              <button onClick={() => this.remover(i)} className="listarBotao">
                Remover{" "}
              </button>
              <button onClick={() => this.editar(i)} className="listarBotao">
                Editar
              </button>
            </li>
          ))}
        </pre>
      </div>
    );
  }
}

export default App;
