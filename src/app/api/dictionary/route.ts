import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

const seed = async () => {
  const createdTable = sql`
    CREATE TABLE IF NOT EXISTS dictionary(
      id SERIAL PRIMARY KEY,
      word VARCHAR(255) NOT NULL,
      translation VARCHAR(255) UNIQUE NOT NULL
    )
  `;

  console.log('Created "dictionary" table ');

  const initialValues = await Promise.all([
    sql`
      INSERT INTO dictionary (word, translation)
      VALUES ('success', 'успех')
    `,
    sql`
      INSERT INTO dictionary (word, translation)
      VALUES ('word', 'слово')
    `,
  ]);

  console.log(`Seeded ${initialValues.length} words`);

  return { createdTable, initialValues };
};

export async function GET() {
  try {
    const { rows: dictionary } = await sql`SELECT * FROM dictionary`;

    return NextResponse.json({ ok: true, data: dictionary });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error?.message === 'relation "dictionary" does not exist') {
      console.log(
        "Table does not exist, creating ans seeding it with initial data now.."
      );

      await seed();

      const { rows: dictionary } = await sql`SELECT * FROM dictionary`;

      return NextResponse.json({ ok: true, data: dictionary });
    } else {
      console.error(error);
      return NextResponse.json({ ok: false, error, message: error?.message });
    }
  }
}
