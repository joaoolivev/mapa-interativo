function PainelLateral({
  local,
  fechar,
  atualizarMarcador,
  excluirMarcador,
  concluirEdicao,
  iniciarEdicao
}) {
  if (!local) return null;

  const editando = local.editando === true;

  function alterar(campo, valor) {
    if (!editando) return;

    atualizarMarcador(local.id, {
      [campo]: valor
    });
  }

  return (
    <div className="painel-lateral">

      <div className="painel-header">
        <h2>
          {editando
            ? "Editar marcador"
            : "Informações do marcador"}
        </h2>

        <button
          type="button"
          onClick={fechar}
          aria-label="Fechar painel"
        >
          ✕
        </button>
      </div>

      <div className="painel-conteudo">

        <div className="campo">
          <label>Nome</label>
          <input
            type="text"
            value={local.nome || ""}
            disabled={!editando}
            onChange={(e) =>
              alterar("nome", e.target.value)
            }
          />
        </div>

        <div className="campo">
          <label>Rua</label>
          <input
            type="text"
            placeholder="Digite o nome da rua"
            value={local.rua || ""}
            disabled={!editando}
            onChange={(e) =>
              alterar("rua", e.target.value)
            }
          />
        </div>

        <div className="campo">
          <label>Bairro</label>
          <input
            type="text"
            value={local.bairro || ""}
            disabled={!editando}
            onChange={(e) =>
              alterar("bairro", e.target.value)
            }
          />
        </div>

        <div className="campo">
          <label>Cidade</label>
          <input
            type="text"
            value={local.cidade || ""}
            disabled={!editando}
            onChange={(e) =>
              alterar("cidade", e.target.value)
            }
          />
        </div>

        <div className="campo">
          <label>Descrição</label>
          <textarea
            value={local.descricao || ""}
            disabled={!editando}
            onChange={(e) =>
              alterar("descricao", e.target.value)
            }
          />
        </div>

        <div className="campo">
          <label>Latitude</label>
          <input
            type="text"
            value={Number(local.latitude).toFixed(6)}
            disabled
          />
        </div>

        <div className="campo">
          <label>Longitude</label>
          <input
            type="text"
            value={Number(local.longitude).toFixed(6)}
            disabled
          />
        </div>

        <div className="botoes">

          {editando ? (
            <>
              <button
                className="botao-salvar"
                onClick={() => concluirEdicao(local.id)}
              >
                ✓ Concluir edição
              </button>

              <button
                className="botao-excluir"
                onClick={() => excluirMarcador(local.id)}
              >
                Excluir marcador
              </button>
            </>
          ) : (
            <button
              className="botao-editar"
              onClick={() => iniciarEdicao(local.id)}
            >
              ✏️ Editar marcador
            </button>
          )}

        </div>

      </div>
    </div>
  );
}

export default PainelLateral;