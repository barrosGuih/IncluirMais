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
  
  const fetchAlunos = async () => {
    const res = await fetch('/api/apoiador');
    const data = await res.json();
    setAlunos(data);
    setAlunosFiltrados(data);
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
}

  return (
    <div className={Style.container}>
      <div className={Style.boxperfil_bground1}>

        {/* VOLTAR */}
        <Link href="./homeInicial" className={Style.voltarBack}>
          <Image src={Voltar} alt="Voltar" className={Style.imgVoltar} />
        </Link>

        {/* BUSCA */}
        <div className={Style.divSearch}>
          <div className={Style.iconSearch} />
          <input
            placeholder="Pesquisar alunos..."
            value={busca}
            onChange={(e)=> handleSearch(e.target.value)}
            className={Style.search}
          />
        </div>

        {/* LISTA */}
        <div className={Style.boxperfil}>
          {alunosFiltrados.map(a => (
            <Link
              key={a.id}
              href={`/perfilApoiador/${a.id}`}
              className={Style.tuplas}
            >
              <div className={Style.tupla}>
                <Image
                  src={a.foto}
                  width={64}
                  height={64}
                  alt={a.nome}
                  className={Style.fotoperfil}
                />

                <div className={Style.divdotexto}>
                  <span className={Style.nomee}>{a.nome}</span>
                  <span className={Style.info}>
                    Data nasc: {a.data_nasc}
                  </span>
                  <span className={Style.info}>
                    Turma: {a.turma}
                  </span>
                </div>

                <span className={Style.badgeStatus}>Ativo</span>
              </div>
            </Link>
          ))}
        </div>

        {/* BOTÃO */}
        <div className={Style.botoessecun}>
          <Link href="./incluirapoiador">
            <button className={Style.butterc}>
              INCLUIR NOVO APOIADOR
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}
