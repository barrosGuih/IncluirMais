import pool from "@/lib/db";

export async function GET(req, { params }) {
  const { id } = await params; 

  try {
    const client = await pool.connect();
    
    // Consulta robusta: Busca o apoiado e tenta trazer o nome e foto do apoiador
    const query = `
      SELECT 
        a.*, 
        ap.nome AS apoiador_nome, 
        ap.foto AS apoiador_foto, 
        ap.id AS apoiador_id
      FROM apoiado a
      LEFT JOIN apoiador ap ON a.id_apoiador = ap.id
      WHERE a.id = $1
    `;

    const result = await client.query(query, [id]);
    client.release();

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: "Não encontrado" }), { status: 404 });
    }

    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (error) {
    console.error("Erro na API [ID]:", error.message);
    // Se o JOIN falhar por algum motivo, tentamos buscar só o aluno para não travar a tela
    const client = await pool.connect();
    const simples = await client.query("SELECT * FROM apoiado WHERE id=$1", [id]);
    client.release();
    return new Response(JSON.stringify(simples.rows[0]), { status: 200 });
  }
}