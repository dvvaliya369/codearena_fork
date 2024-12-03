import { db } from "@/db";
import { apps, battles } from "@/schema";
import { count, countDistinct, desc, sql, sum } from "drizzle-orm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { models } from "../models";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import UpRightArrow from "@/components/icons/up-right-arrow";

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

      <div className="border-gray-100 mt-8 grid grid-cols-2 items-center justify-between gap-5 border p-5 tracking-[-0.02em] text-gray-900 md:grid-cols-4">
        <div className="text-center">
          <div className="font-title text-xl font-semibold">
            {results.length}
          </div>
          <div className="text-sm text-gray-500"># of models</div>
        </div>
        <div className="text-center">
          <div className="font-title text-xl font-semibold">
            {results.reduce((total, row) => total + row.wins, 0)}
          </div>
          <div className="text-sm text-gray-500"># of votes</div>
        </div>
        <div className="text-center">
          <div className="font-title text-xl font-semibold">
            {results.reduce((total, row) => total + row.games, 0)}
          </div>
          <div className="text-sm text-gray-500"># games played</div>
        </div>
        <div className="text-center">
          <div className="font-title text-xl font-semibold">{totalUsers}</div>
          <div className="text-sm text-gray-500"># of users</div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4 md:hidden">
        {results.map((result, index) => (
          <ResultCard result={result} index={index} key={result.model} />
        ))}
      </div>

      {/* <Table>
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
      </Table> */}
    </div>
  );
}

function ResultCard({
  result,
  index,
}: {
  result: {
    model: string;
    wins: number;
    losses: number;
    games: number;
    winPercentage: number;
  };
  index: number;
}) {
  const model = models.find((m) => m.apiName === result.model);
  if (!model) return;

  return (
    <div className="border-gray-100 flex border py-6">
      <div className="w-1/5 text-center font-title text-xl font-medium tabular-nums tracking-[-.02em]">
        {index + 1}.
      </div>
      <div className="w-3/5">
        <div className="flex items-center gap-2">
          <Image src={model.logo} alt="" className="size-6 shrink-0" />
          <p className="truncate font-title text-xl text-gray-900">
            {model.shortLabel}
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs">Organization:</p>
            <p className="truncate font-title text-sm">{model.organization}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs">Total Games:</p>
            <p className="font-title text-sm">{result.games}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs">Win %:</p>
            <p className="font-title text-sm text-gray-900">
              <strong>{result.winPercentage}%</strong>
            </p>
          </div>

          <div className="mt-4">
            <Button asChild className="h-auto w-full font-title">
              <Link
                href={`https://api.together.xyz/playground/chat/${result.model}`}
                target="_blank"
              >
                Playground
                <UpRightArrow className="size-2.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
