'use client';

import Style from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Voltar from '../../apoiadores/imgs/voltar.png'; // Verifique se o caminho está correto

const ApoiadorPage = () => {
  const [bolsista, setBolsista] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const res = await fetch(`/api/apoiador/${id}`);
          if (!res.ok) throw new Error('Apoiador não encontrado');
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
      <div className={Style.skeletonPulse}>Carregando perfil do apoiador...</div>
    </div>
  );

  if (error) return (
    <div className={Style.mainContainer}>
      <div className={Style.errorCard}>
        <h2>⚠️ Erro</h2>
        <p>{error}</p>
        <Link href="/apoiadores" className={Style.btnPrimary}>Voltar para lista</Link>
      </div>
    </div>
  );

  return (
    <div className={Style.mainContainer}>
      <div className={Style.glassWrapper}>
        <div className={Style.contentCard}>
          
          {/* HEADER DO PERFIL */}
          <header className={Style.profileHeader}>
            <Link href="/apoiadores" className={Style.backButton}>
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
                <Link href="/vincularApoiador" className={Style.btnAddApoiado}>
                  ＋ Vincular Aluno Apoiado
                </Link>
              </div>
            </div>
          </header>

          {/* CORPO DA PÁGINA */}
          <main className={Style.detailsGrid}>
            
            {/* DESCRIÇÃO */}
            <section className={Style.descriptionCard}>
              <h2 className={Style.sectionTitle}>Detalhes sobre o Apoiador</h2>
              <div className={Style.textScroll}>
                <p>{bolsista.descricao || "Este apoiador ainda não possui uma descrição cadastrada."}</p>
              </div>
            </section>

            {/* AÇÕES */}
            <section className={Style.actionsCard}>
              <h2 className={Style.sectionTitle}>Gestão e Relatórios</h2>
              <div className={Style.buttonGroup}>
                <Link href="/apoiador" className={Style.actionBtn}>
                   📋 Ver Relatórios Quinzenais Entregues
                </Link>
                
                <button className={Style.actionBtnSecondary}>
                   ⚙️ Editar Informações
                </button>
              </div>
            </section>

          </main>
        </div>
      </div>
    </div>
  );
}

export default ApoiadorPage;