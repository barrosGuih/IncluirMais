'use client'
import { useState } from 'react';
import styles from './style.module.css'

export default function ApoiadorForm({ onAddAluno }) {
  const [nome, setnome] = useState('');
  const [matricula, setmatricula] = useState('');
  const [turma, setturma] = useState('');
  const [descricao, setdescricao] = useState('');
  const [data_nasc, setdata_nasc] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddAluno({ nome, matricula, turma, descricao, data_nasc });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      
      <div className={styles.inputGroup}>
        <div className={styles.field}>
          <label>Nome Completo</label>
          <input
            type='text'
            value={nome}
            onChange={(e) => setnome(e.target.value)}
            placeholder="Nome do apoiador"
            required
          />
        </div>

        <div className={styles.field}>
          <label>Matrícula</label>
          <input
            type='text'
            value={matricula}
            onChange={(e) => setmatricula(e.target.value)}
            placeholder="Nº Matrícula"
            required
          />
        </div>
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.field}>
          <label>Data de Nascimento</label>
          <input
            type='date'
            value={data_nasc}
            onChange={(e) => setdata_nasc(e.target.value)}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Turma</label>
          <input
            type='text'
            value={turma}
            onChange={(e) => setturma(e.target.value)}
            placeholder="Série/Ano"
            required
          />
        </div>
      </div>

      <div className={styles.field}>
        <label>Descrição / Motivação</label>
        <textarea
          value={descricao}
          onChange={(e) => setdescricao(e.target.value)}
          placeholder="Conte um pouco sobre o perfil do apoiador..."
          required
        />
      </div>

      <button className={styles.btnEnviar} type='submit'>
        CADASTRAR APOIADOR
      </button>
    </form>
  );
}