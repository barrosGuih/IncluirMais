import pool from "@/lib/db";

export async function GET(req, { params }) {
  // NOVO: Em Next.js 15+, params é uma Promise, então precisamos dar await
  const { id } = await params; 
  
  console.log("ID recebido:", id);

  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM apoiador WHERE id=$1",
      [id]
    );
    client.release();

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: "Apoiador não encontrado" }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify(result.rows[0]), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Erro na API:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}