import Style from './page.module.css';
import { getAlunosById } from '../../../lib/apoiados';
import Link from 'next/link';

export default async ({ params }) => {
  const bolsista = await getAlunosById(params.id);
  
  return (
    <div className={Style.container}>
      <div className={Style.boxperfil_bground1}>
        <div className={Style.boxperfil}>
            
            <h1 className={Style.hello}>Agenda de {bolsista.nome}</h1>
            <iframe className={Style.calendar} src="https://calendar.google.com/calendar/embed?height=1000&wkst=1&ctz=America%2FRecife&bgcolor=%234215F4&mode=WEEK&showTz=0&showCalendars=0&showTabs=0&showPrint=0&showDate=0&showNav=0&src=Y19hOTkxZmYyNTc5NTQ4MWM1OTg0MTA3Mzc4MzI4ZWE1NjEzMTM0YzkyNTk4ZGM1NWE0ZGJmOWY0YTNmNzZmMWM0QGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23D56666"></iframe>
  
        </div>
        <div>
        <Link href={`/atividades/${params.id}`}>
        <button className={Style.botaoevento}>Cadastrar um novo evento</button>
        </Link>
        </div>
      </div>
    </div>
  );
}