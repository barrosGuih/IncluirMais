import Style from './page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import db from '@/lib/db';

export default async function ApoiadoresPage() {
  const alunos = await db.query("select * from apoiador");

  return (
    <div className={Style.mainContainer}>
      <div className={Style.glassWrapper}>
        <div className={Style.contentCard}>
          
          <div className={Style.layoutGrid}>
            
            {/* COLUNA DA ESQUERDA: LISTA */}
            <section className={Style.listSection}>
              <header className={Style.listHeader}>
                <h1>Apoiadores Cadastrados</h1>
                <p>{alunos.rows.length} apoiadores encontrados</p>
              </header>

              <div className={Style.scrollArea}>
                {alunos.rows.map((a, index) => (
                  <Link 
                    key={a.id} 
                    href={`/perfilApoiador/${a.id}`} 
                    className={Style.cardLink}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={Style.studentCard}>
                      <div className={Style.cardContent}>
                        <h2 className={Style.studentName}>{a.nome}</h2>
                        <div className={Style.studentDetails}>
                          <span>📅 {a.data_nasc}</span>
                          <span>🎓 Turma: {a.turma}</span>
                        </div>
                      </div>
                      <div className={Style.cardArrow}>➔</div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* COLUNA DA DIREITA: AÇÕES (SIDEBAR) */}
            <aside className={Style.actionSidebar}>
              <div className={Style.stickyButtons}>
                <Link href='/incluirapoiador' className={Style.btnPrimary}>
                  <span>＋</span> Incluir Novo Apoiador
                </Link>
                <Link href='/homeInicial' className={Style.btnSecondary}>
                  <span>🏠</span> Voltar ao Início
                </Link>
                
                <div className={Style.helpBox}>
                  <p>Clique em um apoiador para ver detalhes, relatórios e agenda.</p>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </div>
  );
}