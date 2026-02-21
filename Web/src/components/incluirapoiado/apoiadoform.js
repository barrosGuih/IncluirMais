"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './style.module.css'

export default function AlunoForm({ onAddAluno }) {
  const [nome, setnome] = useState('');
  const [matricula, setmatricula] = useState('');
  const [turma, setturma] = useState('');
  const [descricao, setdescricao] = useState('');
  const [data_nasc, setdata_nasc] = useState('');

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddAluno({ nome, matricula, turma, descricao, data_nasc });
    setnome('');
    setmatricula('');
    setturma('');
    setdescricao('');
    setdata_nasc('');
    // Redirecionar para outra página
    router.push('/apoiadorincluido');
  };

  return (
    <form onSubmit={handleSubmit} className={styles.forms}>
      <div className={styles.containerforms}>
        <label className={styles.laforms}>Nome:</label>
        <input
          className={styles.forms}
          type='text'
          value={nome}
          onChange={(e) => setnome(e.target.value)}
          required/>
      </div>

      <div className={styles.containerforms}>
        <label className={styles.laforms}>Matrícula:</label>
        <input
          className={styles.forms}
          type='text'
          value={matricula}
          onChange={(e) => setmatricula(e.target.value)}
        required/>
      </div>

      <div className={styles.containerforms}>
        <label className={styles.laforms}>Data de nasc:</label>
        <input
          className={styles.forms}
          type='date'
          value={data_nasc}
          onChange={(e) => setdata_nasc(e.target.value)}
        />
      </div>

      <div className={styles.containerforms}>
        <label className={styles.laforms}>Turma:</label>
        <input
          className={styles.forms}
          type='text'
          value={turma}
          onChange={(e) => setturma(e.target.value)}
          required/>
      </div>

      <div className={styles.containerdescr}>
        <label className={styles.descr}>Descrição</label>
        <textarea
          className={styles.forms1}
          type='text'
          value={descricao}
          onChange={(e) => setdescricao(e.target.value)}
          required/>
      </div>

      <div className={styles.enviardiv}>
        <button className={styles.enviar} type='submit'>Cadastrar Apoiado</button>
      </div>
    </form>
  );
}
