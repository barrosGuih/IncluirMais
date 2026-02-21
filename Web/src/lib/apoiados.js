import db from './db';

export async function getAlunosById(id) {
    
        console.log(process.env.POSTGRES_URL);
        const con = await db.connect()
        console.log("ID:"+id);
        const result = await con.query('SELECT * FROM apoiado WHERE id = $1', [id]);
        console.log(result);
        const aluno = result.rows[0] ? result.rows[0] : { nome: "Não encontrado" }
        console.log("TESTE: " + aluno.nome + aluno.turma);
        return aluno;
}