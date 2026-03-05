'use client';

import Style from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Voltar from './imgs/voltar.png';

export default function Apoiadores() {
  const [alunos, setAlunos] = useState([]);
  const [alunosFiltrados, setAlunosFiltrados] = useState([]);
  const [busca, setBusca] = useState('');
  const [loading, setLoading] = useState(true); // Estado de carregamento

  const fetchAlunos = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/apoiador');
      const data = await res.json();
      setAlunos(data);
      setAlunosFiltrados(data);
    } catch (error) {
      console.error("Erro ao buscar alunos:", error);
    } finally {
      setLoading(false);
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
          
          {/* HEADER / BUSCA */}
          <div className={Style.topBar}>
            <Link href="/homeInicial" className={Style.btnVoltar}>
              <Image src={Voltar} alt="Voltar" width={30} height={30} />
            </Link>

            <div className={Style.searchContainer}>
              <div className={Style.searchWrapper}>
                <span className={Style.searchIcon}>🔍</span>
                <input
                  placeholder="Pesquisar apoiadores..."
                  value={busca}
                  onChange={(e) => handleSearch(e.target.value)}
                  className={Style.searchInput}
                />
              </div>
            </div>
          </div>

          {/* LISTA OU SKELETON */}
          <div className={Style.listContainer}>
            {loading ? (
              // Mostra 4 cards falsos enquanto carrega
              [1, 2, 3, 4].map((n) => (
                <div key={n} className={Style.skeletonCard}></div>
              ))
            ) : (
              alunosFiltrados.map((a, index) => (
                <Link
                  key={a.id}
                  href={`/perfilApoiador/${a.id}`}
                  className={Style.cardLink}
                  style={{ animationDelay: `${index * 0.1}s` }} // Efeito cascata
                >
                  <div className={Style.userCard}>
                    <div className={Style.avatarWrapper}>
                      <Image
                        src={a.foto}
                        width={60}
                        height={60}
                        alt={a.nome}
                        className={Style.userPhoto}
                      />
                    </div>

                    <div className={Style.userInfo}>
                      <h3 className={Style.userName}>{a.nome}</h3>
                      <div className={Style.userMeta}>
                        <span>📅 {a.data_nasc}</span>
                        <span>🎓 {a.turma}</span>
                      </div>
                    </div>

                    <span className={Style.statusBadge}>Ativo</span>
                  </div>
                </Link>
              ))
            )}
          </div>

          {/* RODAPÉ / AÇÃO */}
          <div className={Style.footerActions}>
            <Link href="./incluirapoiador" className={Style.btnNewApoiador}>
              ＋ INCLUIR NOVO APOIADOR
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}