import Style from './page.module.css';
import { getAlunosById } from '../../../lib/apoiados';

export default async ({ params }) => {
  const bolsista = await getAlunosById(params.id);
  
  return (
    <div className={Style.container}>
      <div className={Style.boxperfil_bground1}>
        <div className={Style.boxperfil}>
            
            <h1 className={Style.hello}>Agenda de {bolsista.nome}</h1>
            <div className={Style.novaatividade}>
          
            </div>
  
        </div>
        <div>
        <button className={Style.botaoevento}>Criar evento</button>
        </div>
      </div>
    </div>
  );
}