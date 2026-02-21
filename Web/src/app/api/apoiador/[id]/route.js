import pool from "@/lib/db";

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const client = await pool.connect();
    // Realizando a consulta ao banco de dados com o ID
    const result = await client.query('SELECT * FROM apoiador WHERE id = $1', [id]);
    client.release();

    // Verificando se algum registro foi encontrado
    if (result.rows.length > 0) {
      return new Response(JSON.stringify(result.rows[0]), { status: 200 });
    } else {
      return new Response(JSON.stringify({ message: 'apoiador não encontrado' }), { status: 404 });
    }
  } catch (err) {
    console.error('Erro ao buscar aluno:', err);
    return new Response(JSON.stringify({ error: 'Erro ao buscar aluno apoiador' }), { status: 500 });
  }
}
