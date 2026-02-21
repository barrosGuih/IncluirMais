
import Style from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Incluir from './imgs/incluir.png'
import Ok from './imgs/ok.png'

export default function ApoiadorIncluido() {
  return (
    <div className={Style.container}>
      <div className={Style.boxperfil_bground1}>
        <div className={Style.conteudo}>
          <Link href={"./homeInicial"}><div className={Style.logocontainer}>
            <Image className={Style.Logo} src={Incluir}/>
          </div></Link>
          <h1 className={Style.texto1}>Aluno Apoiador incluido com sucesso!</h1>
          <Image className={Style.ok} src={Ok}></Image>
          <Link href={"./homeInicial"}><button className={Style.enviar} type='submit'>Voltar a tela inicial</button></Link>
        </div>
        <div>
        
        </div>
      </div>
    </div>
  );
}
