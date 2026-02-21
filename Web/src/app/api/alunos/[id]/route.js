import pool from "@/lib/db";

export async function GET(req, { params }) {
  const { id } = await params; 
  
  console.log("ID recebido:", id);

  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT * FROM apoiado WHERE id=$1",
      [id]
    );
    client.release();

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: "Apoiado não encontrado" }), { 
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