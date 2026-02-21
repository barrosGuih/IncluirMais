'use client'

import Style from './page.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect} from 'react';
import { useParams } from 'next/navigation';

const ApoiadorPage = () => {
  const [bolsista, setBolsista] = useState(null);
  const [error, setError] = useState(null);
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const res = await fetch(`/api/apoiador/${id}`);
          if (!res.ok) {
            throw new Error('Erro ao buscar dados do aluno apoiador');
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
    return <div className={Style.containerinfo}>Erro:: {error}</div>;
  }

  if (!bolsista) {
    return <div className={Style.containerinfo}>Carregando...</div>;
  }

  return (
    <div className={Style.container}>
      <div className={Style.boxperfil_bground1}>
        <div className={Style.perfilaluno}>
          <h1 className={Style.name}>{bolsista.nome}</h1>

                <div className={Style.conteudo}>
                    <h3 className={Style.name1}>Matrícula: {bolsista.matricula}</h3>
                    <h3 className={Style.name1}>Turma: {bolsista.turma || "zzz"}</h3>
                  <Link href={"vincularApoiador"}>
                <button className={Style.botaoadicionar}>Adicionar apoiado</button>
                </Link>
            </div>
            <Image className={Style.fotoperfil}
                  src={bolsista.foto} 
                  width={200} 
                  height={200}>
            </Image>
        </div>
        <h1 className={Style.detalhes}>Detalhes sobre o aluno:</h1>
              <div className={Style.containerperfil}>
                <div className={Style.perfilaluno2}>
                  <p>{bolsista.descricao}</p>
                </div>

                <div className={Style.perfilaluno3}>
                <Link href={'./apoiador'}>
                <button className={Style.funcaoaluno}>Ver relatórios Quinzenais entregues</button>
                </Link>
            
                </div>
            
              </div>
      </div>

    </div>
  );
}

export default ApoiadorPage;