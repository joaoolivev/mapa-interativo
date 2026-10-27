import { useState, useEffect } from "react";

import Mapa from "./components/Mapa";
import PainelLateral from "./components/PainelLateral";

import { locais } from "./data/locais";

import "./App.css";

function App() {

  const [marcadores, setMarcadores] = useState(() => {
    try {
      const salvos = localStorage.getItem("marcadores");

      if (salvos) {
        const dados = JSON.parse(salvos);

        if (Array.isArray(dados)) {
          return dados;
        }
      }

      return locais;
    } catch {
      return locais;
    }
  });

  const [selecionado, setSelecionado] = useState(null);

  // SALVAMENTO AUTOMÁTICO
  useEffect(() => {
    localStorage.setItem(
      "marcadores",
      JSON.stringify(marcadores)
    );
  }, [marcadores]);

  // ADICIONAR MARCADOR
  function adicionarMarcador(latitude, longitude) {

    const novo = {
      id: crypto.randomUUID(),
      nome: "Novo marcador",
      rua: "",
      bairro: "",
      cidade: "Goiana - PE",
      descricao: "",
      latitude,
      longitude,
      editando: true
    };

    setMarcadores((anteriores) => [
      ...anteriores,
      novo
    ]);

    setSelecionado(novo.id);
  }

  // ATUALIZAR MARCADOR
  function atualizarMarcador(id, dados) {

    setMarcadores((anteriores) =>
      anteriores.map((marcador) =>
        marcador.id === id
          ? { ...marcador, ...dados }
          : marcador
      )
    );
  }

  // CONCLUIR EDIÇÃO
  function concluirEdicao(id) {
    atualizarMarcador(id, {
      editando: false
    });
  }

  // INICIAR EDIÇÃO
  function iniciarEdicao(id) {
    atualizarMarcador(id, {
      editando: true
    });
  }

  // EXCLUIR MARCADOR
  function excluirMarcador(id) {

    setMarcadores((anteriores) =>
      anteriores.filter(
        (marcador) => marcador.id !== id
      )
    );

    setSelecionado(null);
  }

  // MARCADOR SELECIONADO
  const marcadorSelecionado = marcadores.find(
    (marcador) => marcador.id === selecionado
  );

  return (
    <div className="container">

      <Mapa
        marcadores={marcadores}
        selecionarLocal={setSelecionado}
        adicionarMarcador={adicionarMarcador}
        atualizarMarcador={atualizarMarcador}
      />

      <PainelLateral
        local={marcadorSelecionado}
        fechar={() => setSelecionado(null)}
        atualizarMarcador={atualizarMarcador}
        excluirMarcador={excluirMarcador}
        concluirEdicao={concluirEdicao}
        iniciarEdicao={iniciarEdicao}
      />

    </div>
  );
}

export default App;