'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './style.module.css';

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
    
    // Limpar campos
    setnome('');
    setmatricula('');
    setturma('');
    setdescricao('');
    setdata_nasc('');

    // Redirecionar
    router.push('/apoiadorincluido');
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
            placeholder="Ex: João Silva"
            required
          />
        </div>

        <div className={styles.field}>
          <label>Matrícula</label>
          <input
            type='text'
            value={matricula}
            onChange={(e) => setmatricula(e.target.value)}
            placeholder="000000"
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
            placeholder="Ex: 3º Ano A"
            required
          />
        </div>
      </div>

      <div className={styles.field}>
        <label>Descrição / Observações</label>
        <textarea
          value={descricao}
          onChange={(e) => setdescricao(e.target.value)}
          placeholder="Detalhes sobre o apoio necessário..."
          required
        />
      </div>

      <button className={styles.btnEnviar} type='submit'>
        CADASTRAR APOIADO
      </button>
    </form>
  );
}