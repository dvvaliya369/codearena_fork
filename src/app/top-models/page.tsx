import { db } from "@/db";
import { apps } from "@/schema";
import { count, desc, sql, sum } from "drizzle-orm";
import { MoveUpRightIcon } from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { models } from "../models";

export default async function Page() {
  const results = await db
    .select({
      model: apps.model,
      wins: sum(sql`CASE WHEN ${apps.didWin} = true THEN 1 ELSE 0 END`).mapWith(
        Number,
      ),
      losses: sum(
        sql`CASE WHEN ${apps.didWin} = false THEN 1 ELSE 0 END`,
      ).mapWith(Number),
      games: count(),
      winPercentage:
        sql`ROUND(SUM(CASE WHEN ${apps.didWin} = true THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 0)`
          .mapWith(Number)
          .as("win_percentage"),
    })
    .from(apps)
    .groupBy(apps.model)
    .orderBy(desc(sql`win_percentage`));

  return (
    <div>
      <h1>Top models</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Organization</TableHead>
            <TableHead>Total games</TableHead>
            <TableHead>Win %</TableHead>
            <TableHead className="text-right">Playground</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {results.map((result, index) => (
            <TableRow key={result.model}>
              <TableCell>{index + 1}.</TableCell>
              <TableCell className="font-medium">{result.model}</TableCell>
              <TableCell>
                {models.find((m) => m.apiName === result.model)?.organization}
              </TableCell>
              <TableCell>{result.games}</TableCell>
              <TableCell>{result.winPercentage}%</TableCell>
              <TableCell>
                <a
                  href={`https://api.together.ai/playground/chat/${result.model}`}
                  target="_blank"
                  className="flex items-center justify-end"
                >
                  <MoveUpRightIcon className="size-6 bg-blue-500 p-1 text-white" />
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
