'use client'
import Style from './page.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react'
import Link from 'next/link';
import AlunoForm from '../../components/incluirapoiado/apoiadoform' // Nome corrigido do componente
import Voltar from '../apoiados/imgs/voltar.png'

export default function HomeInicial() {
  const [alunos, setAlunos] = useState([])

  useEffect(() => {
    fetchAlunos()
  }, [])

  const fetchAlunos = async () => {
    const response = await fetch('/api/alunos')
    if(response.ok){
      const data = await response.json()
      setAlunos(data)
    }
  }

  const addAluno = async (aluno) => {
    const response = await fetch('/api/alunos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(aluno),
    })
    
    if (!response.ok) {
       console.error('Falha ao adicionar aluno');
    }
  }

  return (
    <div className={Style.mainContainer}>
      <div className={Style.glassWrapper}>
        <div className={Style.contentCard}>
          
          {/* HEADER PADRONIZADO */}
          <div className={Style.topBar}>
            <Link href="/homeInicial" className={Style.btnVoltar}>
              <Image src={Voltar} alt="Voltar" width={30} height={30} />
            </Link>
            <h1 className={Style.pageTitle}>Incluir Aluno Apoiado</h1>
          </div>

          {/* ÁREA DO FORMULÁRIO COM SCROLL */}
          <div className={Style.scrollContent}>
            <div className={Style.formCard}>
              <div className={Style.headerIllustration}>
                <div className={Style.iconCircle}>➕</div>
                <p>Preencha as informações para cadastrar um novo aluno no sistema de apoio.</p>
              </div>
              
              {/* O COMPONENTE QUE FIZEMOS ANTES */}
              <AlunoForm onAddAluno={addAluno} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}