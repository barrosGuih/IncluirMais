import Style from './page.module.css';
import Perfil from './imgs/profile1.png';
import Image from 'next/image';
import Link from 'next/link';
import  db  from '@/lib/db';

export default async ({ params }) => {
  const alunos = await db.query("select * from apoiador");

  return (
    <div className={Style.container}>
      <div className={Style.boxperfil_bground1}>
        <div className={Style.boxperfil}>

        {/*tupla*/}
          <div className={Style.tupla1}>
            {alunos.rows.map(a => 
           // <Link  href={"/perfilApoiador/" + a.id} className={Style.tuplas}> 
            <div className={Style.tupla}>
                  <div className={Style.divdotexto}>
                    <div className={Style.tamanhotexto}>
                    <h1 className={Style.nomee}>{a.nome}</h1> 
                    </div>
                    <h3 className={Style.info}>data nasc: {a.data_nasc}ㅤㅤㅤTurma: {a.turma}</h3> 
                    
                      <div>
                        
                      </div>
                        
                  </div>    
                </div>
            )}
          </div>
        {/*tupla*/}

          <div className={Style.botoessecun}>
            <Link href={'./incluirapoiador'}><button className={Style.butterc}>Incluir novo apoiador</button></Link>
            <Link href={'./homeInicial'}><button className={Style.butterc}>Voltar ao inicio</button></Link>

          
          </div>
          
        
          
        </div>
      </div>
    </div>
  );
}
