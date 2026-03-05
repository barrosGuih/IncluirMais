'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Style from './page.module.css';
import Voltar from '../../apoiados/imgs/voltar.png'; 

const AlunoPage = () => {
  const [bolsista, setBolsista] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
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
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [id]);

  if (loading) return (
    <div className={Style.mainContainer}>
      <div className={Style.skeletonPulse}>Carregando dados do aluno...</div>
    </div>
  );

  if (error) return (
    <div className={Style.mainContainer}>
      <div className={Style.errorCard}>
        <h2>⚠️ Erro</h2>
        <p>{error}</p>
        <Link href="/apoiados" className={Style.btnPrimary}>Voltar para lista</Link>
      </div>
    </div>
  );

  return (
    <div className={Style.mainContainer}>
      <div className={Style.glassWrapper}>
        <div className={Style.contentCard}>
          
          <header className={Style.profileHeader}>
            <Link href="/apoiados" className={Style.backButton}>
              <Image src={Voltar} alt="Voltar" width={30} height={30} />
            </Link>

            <div className={Style.headerContent}>
              <div className={Style.avatarContainer}>
                <Image 
                  className={Style.profileImg}
                  src={bolsista.foto} 
                  width={150} 
                  height={150}
                  alt={bolsista.nome}
                  priority
                />
              </div>
              <div className={Style.basicInfo}>
                <h1 className={Style.studentName}>{bolsista.nome}</h1>
                <div className={Style.metaGrid}>
                  <span><strong>Matrícula:</strong> {bolsista.matricula}</span>
                  <span><strong>Turma:</strong> {bolsista.turma || "Não informada"}</span>
                </div>

                {/* --- LÓGICA DA TUPLA OU BOTÃO --- */}
                {!bolsista.apoiador_id ? (
                  /* Se NÃO tiver apoiador, mostra o botão antigo */
                  <Link href={`/vincularApoiador?alunoId=${id}`} className={Style.btnAddApoiador}>
                    ＋ Adicionar Apoiador
                  </Link>
                ) : (
                  /* Se JÁ TIVER apoiador, mostra a TUPLA (Mini Card) */
                  <div className={Style.tuplaVinculada}>
                    <p className={Style.tuplaLabel}>Apoiador Responsável:</p>
                    <Link href={`/perfilApoiador/${bolsista.apoiador_id}`} className={Style.tuplaContent}>
                        <Image 
                          src={bolsista.apoiador_foto || bolsista.foto} 
                          width={45} 
                          height={45} 
                          className={Style.tuplaFoto}
                          alt="Foto Apoiador"
                        />
                        <div className={Style.tuplaTexto}>
                           <strong>{bolsista.apoiador_nome}</strong>
                           <span>Ver perfil ➔</span>
                        </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </header>

          <main className={Style.detailsGrid}>
            <section className={Style.descriptionCard}>
              <h2 className={Style.sectionTitle}>Detalhes sobre o aluno</h2>
              <div className={Style.textScroll}>
                <p>{bolsista.descricao || "Nenhuma descrição disponível para este aluno."}</p>
              </div>
            </section>

            <section className={Style.actionsCard}>
              <h2 className={Style.sectionTitle}>Ações e Relatórios</h2>
              <div className={Style.buttonGroup}>
                <button className={Style.actionBtn}>📋 Ver Relatórios Quinzenais</button>
                <Link href={`/relatorioapoiado/${bolsista.id}`} className={Style.actionBtn}>✍️ Realizar Relatório</Link>
                <Link href={`/agenda/${bolsista.id}`} className={Style.actionBtn}>📅 Acessar Agenda</Link>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AlunoPage;