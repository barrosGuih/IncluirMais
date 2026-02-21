'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Style from './page.module.css';

const AlunoPage = () => {
  const [bolsista, setBolsista] = useState(null);
  const [error, setError] = useState(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const res = await fetch(`/api/alunos/${id}`);
          if (!res.ok) {
            throw new Error('Erro ao buscar dados do aluno');
          }
          const data = await res.json();
          setBolsista(data);
        } catch (err) {
          setError(err.message);
        }
      }
    };
    fetchData();
  }, [id]);

  if (error) {
    return <div className={Style.containerinfo}>Erro: {error}</div>;
  }

  if (!bolsista) {
    return <div className={Style.containerinfo}>Carregando...</div>;
  }

  return (
    <div className={Style.container}>
      <div className={Style.boxperfil_bground1}>
          <div className={Style.conteudorelatorio}>
            <section className={Style.secao}>
            <h3 className={Style.pontos}>1.0 Identificação</h3>
            <h4 className={Style.secao1}>Nome:ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ</h4>
            <h4 className={Style.secao2}>{bolsista.nome}</h4>
            <br/>
            <h4 className={Style.secao1}>Data de Nascimento:ㅤㅤㅤㅤ</h4>
            <h4 className={Style.secao2}>{bolsista.data_nasc}</h4>
            <br/>
            <h4 className={Style.secao1}>Situação Escolar:ㅤㅤㅤㅤㅤㅤ</h4>
            <h4 className={Style.secao2}>{bolsista.turma}</h4>
            <br/>
            <h4 className={Style.secao1}>Data de Avaliação:ㅤㅤㅤㅤㅤ</h4>
            <h4 className={Style.secao2}></h4>
            <br/>
            <h4 className={Style.secao1}>Responsaveis pela Avaliação:</h4>
            <h4 className={Style.secao2}>{bolsista.psicopedagoga}</h4>
            <br/>
            </section>
            <section>
            <h3 className={Style.pontos}>2.0 Motivo da Avaliação</h3>
            <textarea id={Style.area} className={Style.motivoavali}></textarea>
            </section>
            <section>
            <h3 className={Style.pontos}>3.0 Procedimento</h3>
            <textarea id={Style.area} className={Style.motivoavali}></textarea>
            </section>
            <section>
            <h3 className={Style.pontos}>4.0 Informações do Desenvolvimento</h3>
            <textarea id={Style.area} className={Style.motivoavali}></textarea>
            </section>
            <section>
            <h3 className={Style.pontos}>5.0 Observação e Resultados da Avaliação</h3>
            <textarea id={Style.area} className={Style.motivoavali}></textarea>
            </section>
            <div className={Style.divbotaoo}>
            <button className={Style.fimrelatorio}>Enviar Relatório</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AlunoPage;
