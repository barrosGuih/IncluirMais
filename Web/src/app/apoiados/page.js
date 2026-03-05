'use client';

import Style from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Voltar from './imgs/voltar.png';

export default function Apoiados() {
  const [alunos, setAlunos] = useState([]);
  const [alunosFiltrados, setAlunosFiltrados] = useState([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchAlunos = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/alunos');
      const data = await res.json();
      setAlunos(data);
      setAlunosFiltrados(data);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    } finally {
      // Pequeno delay artificial para a transição não ser brusca
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    fetchAlunos();
  }, []);

  const handleSearch = (texto) => {
    setBusca(texto);
    const filtrados = alunos.filter(a => 
      a.nome.toLowerCase().includes(texto.toLowerCase())
    );
    setAlunosFiltrados(filtrados);
  };

  return (
    <div className={Style.mainContainer}>
      <div className={Style.glassWrapper}>
        <div className={Style.contentCard}>
          
          {/* BARRA SUPERIOR */}
          <header className={Style.topBar}>
            <Link href="/homeInicial" className={Style.btnVoltar}>
              <Image src={Voltar} alt="Voltar" width={35} height={35} />
            </Link>

            <div className={Style.searchContainer}>
              <div className={Style.searchField}>
                <span className={Style.searchIcon}>🔍</span>
                <input
                  placeholder="Pesquisar alunos apoiados..."
                  className={Style.searchInput}
                  value={busca}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>
          </header>

          {/* LISTAGEM COM SKELETON LOADING */}
          <main className={Style.listArea}>
            {loading ? (
              // Skeletons enquanto os dados não chegam
              [1, 2, 3, 4, 5].map((n) => (
                <div key={n} className={Style.skeletonCard}></div>
              ))
            ) : (
              alunosFiltrados.map((a, index) => (
                <Link
                  key={a.id}
                  href={`/perfilApoiado/${a.id}`}
                  className={Style.cardLink}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className={Style.studentCard}>
                    <div className={Style.photoBox}>
                      <Image
                        src={a.foto}
                        width={60}
                        height={60}
                        alt={a.nome}
                        className={Style.studentPhoto}
                      />
                    </div>

                    <div className={Style.studentDetails}>
                      <strong className={Style.studentName}>{a.nome}</strong>
                      <div className={Style.studentMeta}>
                        <span>📅 {a.data_nasc}</span>
                        <span>📍 Turma: {a.turma}</span>
                      </div>
                    </div>

                    <span className={Style.badgeApoiado}>Aluno Apoiado</span>
                  </div>
                </Link>
              ))
            )}
            
            {!loading && alunosFiltrados.length === 0 && (
              <p className={Style.noResults}>Nenhum aluno encontrado.</p>
            )}
          </main>

          {/* FOOTER AÇÃO */}
          <footer className={Style.footerAction}>
            <Link href="./incluirapoiado" className={Style.btnNewStudent}>
              ＋ INCLUIR NOVO APOIADO
            </Link>
          </footer>

        </div>
      </div>
    </div>
  );
}