'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Style from './page.module.css';
import Voltar from '../../apoiados/imgs/voltar.png';

const AlunoPage = () => {
  const [bolsista, setBolsista] = useState(null);
  const [error, setError] = useState(null);
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const res = await fetch(`/api/alunos/${id}`);
          if (!res.ok) throw new Error('Aluno não encontrado');
          const data = await res.json();
          setBolsista(data);
        } catch (err) {
          setError(err.message);
        }
      }
    };
    fetchData();
  }, [id]);

  if (error) return <div className={Style.errorState}>Erro: {error}</div>;
  if (!bolsista) return <div className={Style.loadingState}><div className={Style.spinner}></div></div>;

  const secoes = [
    { id: 'motivo', titulo: '2.0 Motivo da Avaliação' },
    { id: 'procedimento', titulo: '3.0 Procedimento' },
    { id: 'desenvolvimento', titulo: '4.0 Informações do Desenvolvimento' },
    { id: 'resultados', titulo: '5.0 Observação e Resultados da Avaliação' },
  ];

  return (
    <div className={Style.mainContainer}>
      <div className={Style.glassWrapper}>
        <div className={Style.contentCard}>
          
          {/* HEADER */}
          <div className={Style.header}>
            <button onClick={() => router.back()} className={Style.btnVoltar}>
              <Image src={Voltar} alt="Voltar" width={28} height={28} />
            </button>
            <h1 className={Style.mainTitle}>Relatório Psicopedagógico</h1>
          </div>

          <div className={Style.scrollArea}>
            
            {/* 1.0 IDENTIFICAÇÃO (Sempre visível primeiro) */}
            <section className={Style.section} style={{ animationDelay: '0.1s' }}>
              <h3 className={Style.sectionHeader}>1.0 Identificação</h3>
              <div className={Style.identificacaoGrid}>
                <div className={Style.field}>
                  <label>Nome do Aluno</label>
                  <p>{bolsista.nome}</p>
                </div>
                <div className={Style.field}>
                  <label>Data de Nascimento</label>
                  <p>{bolsista.data_nasc}</p>
                </div>
                <div className={Style.field}>
                  <label>Turma / Situação</label>
                  <p>{bolsista.turma}</p>
                </div>
                <div className={Style.field}>
                  <label>Responsável pela Avaliação</label>
                  <p>{bolsista.psicopedagoga}</p>
                </div>
              </div>
            </section>

            {/* SEÇÕES DE TEXTO COM ANIMAÇÃO EM CASCATA */}
            {secoes.map((sec, index) => (
              <section 
                key={sec.id} 
                className={Style.section} 
                style={{ animationDelay: `${(index + 2) * 0.1}s` }}
              >
                <h3 className={Style.sectionHeader}>{sec.titulo}</h3>
                <textarea 
                  className={Style.relatorioInput}
                  placeholder="Descreva aqui..."
                />
              </section>
            ))}
          </div>

          {/* RODAPÉ FIXO */}
          <div className={Style.footer}>
            <button className={Style.btnSalvar}>
              FINALIZAR E ENVIAR RELATÓRIO
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AlunoPage;