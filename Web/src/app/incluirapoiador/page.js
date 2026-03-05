'use client'
import Style from './page.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ApoiadorForm from '../../components/incluirapoiado/apoiadorform';
import Voltar from '../apoiados/imgs/voltar.png';

export default function HomeInicial() {
  const [alunos, setAlunos] = useState([])
  const router = useRouter();

  useEffect(() => {
    fetchAlunos()
  }, [])

  const fetchAlunos = async () => {
    const response = await fetch('/api/apoiador')
    if(response.ok){
      const data = await response.json()
      setAlunos(data)
    }
  }

  const addAluno = async (aluno) => {
    const response = await fetch('/api/apoiador', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aluno),
    })
    
    if (response.ok) {
       router.push('/apoiadorincluido');
    } else {
       console.error('Falha ao adicionar');
    }
  }

  return (
    <div className={Style.mainContainer}>
      <div className={Style.glassWrapper}>
        <div className={Style.contentCard}>
          
          {/* HEADER PADRONIZADO */}
          <div className={Style.topBar}>
            <button onClick={() => router.back()} className={Style.btnVoltar}>
              <Image src={Voltar} alt="Voltar" width={30} height={30} />
            </button>
            <h1 className={Style.pageTitle}>Incluir Aluno Apoiador</h1>
          </div>

          {/* CONTEÚDO SCROLLABLE */}
          <div className={Style.scrollContent}>
            <div className={Style.formWrapper}>
              <div className={Style.headerIllustration}>
                <div className={Style.iconCircle}>🤝</div>
                <p>Preencha os dados abaixo para cadastrar um novo apoiador no projeto.</p>
              </div>
              
              <ApoiadorForm onAddAluno={addAluno} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}