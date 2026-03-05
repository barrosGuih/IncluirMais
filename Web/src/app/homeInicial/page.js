import Style from './page.module.css';
import Perfil from './imgs/profile1.png';
import Image from 'next/image';
import Link from 'next/link';

export default function HomeInicial() {
  return (
    <div className={Style.mainContainer}>
      <div className={Style.glassWrapper}>
        <div className={Style.contentCard}>
          
          {/* Header de Boas Vindas */}
          <header className={Style.headerHero}>
            <div className={Style.profileCircle}>
              <Image alt='Perfil' src={Perfil} className={Style.profileImg} priority />
            </div>
            <h1 className={Style.welcomeText}>Bem Vindo, <span>Sicrano!</span></h1>
          </header>

          {/* Seção Principal: Logo + Texto */}
          <main className={Style.mainSection}>
            <div className={Style.logoWrapper}>
              <Image
                alt='Logo Incluir Plus'
                src={'https://i.ibb.co/Dg5pnHjF/incluirpluslogo-1-3-3.png'}
                width={300}
                height={300}
                className={Style.logoImg}
              />
            </div>
            
            <div className={Style.infoWrapper}>
              <h2>Seja bem vindo ao <strong>INCLUIR+</strong>!</h2>
              <p>
                Aqui você encontrará facilidade de acesso às ajudas psicopedagogas e alunos apoiadores 
                para auxiliar seus problemas durante as aulas.
              </p>
              <p className={Style.callToAction}>
                Comece pesquisando para encontrar seu aluno apoiador de hoje!
              </p>
            </div>
          </main>

          {/* Botões de Ação */}
          <footer className={Style.actions}>
            <Link className={Style.btnPrimary} href="/apoiadores">
              <Image src={'https://i.ibb.co/gFMChP3B/aluna.png'} width={30} height={30} alt='ícone' />
              <span>Alunos Apoiadores</span>
            </Link>
            
            <Link className={Style.btnPrimary} href="/apoiados">
              <Image src={'https://i.ibb.co/8gJktMqV/aluno.png'} width={30} height={30} alt='ícone' />
              <span>Alunos Apoiados</span>
            </Link>
          </footer>

        </div>
      </div>
    </div>
  );
}