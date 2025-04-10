import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";
import * as schema from "./schema";

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);

  await seed(db, { patients: schema.patients }).refine((f) => ({
    patients: {
      columns: {
        firstName: f.firstName(),
        lastName: f.lastName(),
        dateOfBirth: f.date(),
        email: f.email(),
      },
      count: 20,
    },
  }));
}

main();
