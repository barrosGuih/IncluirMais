import Style from './page.module.css';
import Perfil from './imgs/profile1.png';
import Image from 'next/image';
import Link from 'next/link';

export default function HomeInicial() {
  return (
    <div className={Style.container}>
      <div className={Style.boxperfil_bground1}>
        <div className={Style.boxperfil}>
          <div className={Style.ajustes}>
            <Image
            alt='img'
              src={Perfil}
              className={Style.img}
            ></Image>
            <h1 className={Style.hello}>Bem Vindo, Sicrano!</h1>
          </div>
          <div className={Style.escopo}>
          <Image
            alt='my photo'
            src={'https://i.ibb.co/Dg5pnHjF/incluirpluslogo-1-3-3.png'}
            width={500}
            height={500}
            className={Style.logo} 
            ></Image>
         {/* <h1 className={Style.information}>Seja bem vindo ao INCLUIR+</h1>*/}
          <h3 className={Style.information}>Seja bem vindo ao INCLUIR+!<br></br><br></br>Aqui você encontrará facilidade de acesso
às ajudas psicopedagogas, você
encontrará alunos apoiadores, aprovados
pelo sistema de aluno apoiador, para auxiliar
seus problemas durante as aulas.

Começe a fazer umas pesquisas para saber
qual o seu aluno apoiador de hoje!</h3>
</div>
        <div className={Style.botooes}>
            <Link className={Style.botaohome} href={"./apoiadores"}><button className={Style.botaohome}><Image src={'https://i.ibb.co/gFMChP3B/aluna.png'} width={40} alt='img' height={40}></Image>Alunos Apoiadores</button></Link>
            <Link className={Style.botaohome} href={"./apoiados"}><button className={Style.botaohome}><Image src={'https://i.ibb.co/8gJktMqV/aluno.png'} width={40} alt='img' height={40}></Image>Alunos Apoiados</button></Link>
        </div>
          
        </div>
      </div>
    </div>
  );
}
