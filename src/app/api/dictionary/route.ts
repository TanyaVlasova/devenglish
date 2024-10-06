/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { words } from "./words";

const seed = async () => {
  const createdTable = await sql`
    CREATE TABLE IF NOT EXISTS dictionary(
      id SERIAL PRIMARY KEY,
      text VARCHAR(255) NOT NULL,
      translation VARCHAR(255) NOT NULL
    )
  `;

  console.log('Created "dictionary" table ');

  const initialValues = await Promise.all([
    words.map((word) => {
      return sql`
        INSERT INTO dictionary (text, translation)
        VALUES (${word.text}, ${word.translation})
      `;
    }),
  ]);

  console.log(`Seeded ${initialValues.length} words`);

  return { createdTable, initialValues };
};

export async function GET() {
  try {
    const { rows: dictionary } = await sql`SELECT * FROM dictionary`;

    return NextResponse.json({ ok: true, data: dictionary });
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

export async function GE2T() {
  await sql`DROP TABLE IF EXISTS dictionary`;

  return NextResponse.json({ drop: "ok" });
}
