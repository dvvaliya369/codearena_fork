import { db } from "@/db";
import { apps, battles } from "@/schema";
import { count, countDistinct, desc, sql, sum } from "drizzle-orm";
import { MoveUpRightIcon } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { models } from "../models";

export default async function Page() {
  const [{ totalUsers }] = await db
    .select({ totalUsers: countDistinct(battles.creatorCookie) })
    .from(battles);

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
    <div className="mx-auto max-w-2xl px-4">
      <h1 className="text-center font-title text-2xl font-bold uppercase text-gray-900">
        Top models <span className="text-blue-500">[all time]</span>
      </h1>

      <div className="border-gray-100 mt-12 flex items-center justify-between border px-12 py-5 tracking-[-0.02em] text-gray-900">
        <div className="text-center">
          <div className="font-title text-xl font-semibold">
            {results.length}
          </div>
          <div className="text-sm"># of models</div>
        </div>
        <div className="text-center">
          <div className="font-title text-xl font-semibold">
            {results.reduce((total, row) => total + row.wins, 0)}
          </div>
          <div className="text-sm"># of votes</div>
        </div>
        <div className="text-center">
          <div className="font-title text-xl font-semibold">
            {results.reduce((total, row) => total + row.games, 0)}
          </div>
          <div className="text-sm"># games played</div>
        </div>
        <div className="text-center">
          <div className="font-title text-xl font-semibold">{totalUsers}</div>
          <div className="text-sm"># of users</div>
        </div>
      </div>

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
