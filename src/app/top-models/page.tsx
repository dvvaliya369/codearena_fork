// import { db } from "@/db";
// import { apps, battles } from "@/schema";
// import { count, countDistinct, desc, sql, sum } from "drizzle-orm";
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
  // Mock data for demo since we don't have database access
  const results = [
    {
      model: "meta-llama/Llama-3.2-3B-Instruct-Turbo",
      wins: 45,
      losses: 15,
      games: 60,
      winPercentage: 75,
    },
    {
      model: "meta-llama/Llama-3.1-8B-Instruct-Turbo",
      wins: 38,
      losses: 22,
      games: 60,
      winPercentage: 63,
    },
    {
      model: "microsoft/WizardLM-2-8x22B",
      wins: 35,
      losses: 25,
      games: 60,
      winPercentage: 58,
    },
  ];

  const totalUsers = 150;
  const battlesCount = 180;

  return (
    <div className="mx-auto max-w-2xl px-4">
      <h1 className="text-center font-title text-2xl font-bold uppercase text-gray-900">
        Leaderboard: Top <span className="text-blue-500">OSS Coding</span>{" "}
        models
      </h1>

      <div className="mt-8 grid grid-cols-3 items-center justify-between gap-5 border border-gray-400 bg-gray-300 p-5 tracking-[-0.02em] text-gray-900">
        <div className="text-center">
          <div className="font-title text-xl font-semibold">
            {results.length}
          </div>
          <div className="text-sm text-gray-500">models</div>
        </div>
        {/* <div className="text-center">
          <div className="font-title text-xl font-semibold">
            {results.reduce((total, row) => total + row.wins, 0)}
          </div>
          <div className="text-sm text-gray-500"># of votes</div>
        </div> */}
        <div className="text-center">
          <div className="font-title text-xl font-semibold">{battlesCount}</div>
          <div className="text-sm text-gray-500">games/votes</div>
        </div>
        <div className="text-center">
          <div className="font-title text-xl font-semibold">{totalUsers}</div>
          <div className="text-sm text-gray-500">unique users</div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4 bg-gray-300 md:hidden">
        {results.map((result, index) => (
          <ResultCard result={result} index={index} key={result.model} />
        ))}
      </div>

      <div className="mt-4 hidden bg-gray-300 md:flex">
        <div className="w-full shadow-lg shadow-gray-500/20">
          <Table className="border border-gray-400 shadow-lg">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[10%]"></TableHead>
                <TableHead className="w-[40%] whitespace-nowrap text-xs text-gray-500">
                  Model
                </TableHead>
                <TableHead className="whitespace-nowrap text-center text-xs text-gray-500">
                  Organization
                </TableHead>
                <TableHead className="whitespace-nowrap text-center text-xs text-gray-500">
                  Total games
                </TableHead>
                <TableHead className="whitespace-nowrap text-xs text-gray-500">
                  Win %
                </TableHead>
                <TableHead className="whitespace-nowrap text-xs text-gray-500">
                  Playground
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {results.map((result, index) => (
                <ResultRow key={result.model} result={result} index={index} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

function ResultRow({
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
    <TableRow key={result.model} className="font-title tracking-[-.02em]">
      <TableCell className="text-center font-title text-xs">
        {index + 1}.
      </TableCell>
      <TableCell className="inline-flex items-center gap-1 text-sm text-gray-900">
        <Image
          src={model.logo}
          alt=""
          className="size-10 shrink-0 object-contain"
        />
        {model.shortLabel}
      </TableCell>
      <TableCell className="text-center">
        {models.find((m) => m.apiName === result.model)?.organization}
      </TableCell>
      <TableCell className="text-center">{result.games}</TableCell>
      <TableCell className="font-medium text-gray-900">
        {result.winPercentage}%
      </TableCell>
      <TableCell>
        <Button asChild className="mx-auto flex size-6 p-0">
          <Link
            href={`https://api.together.xyz/playground/chat/${result.model}`}
            target="_blank"
          >
            <UpRightArrow className="size-2.5" />
          </Link>
        </Button>
      </TableCell>
    </TableRow>
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
    <div className="flex border border-gray-400 py-6">
      <div className="w-1/5 text-center font-title text-xl font-medium tabular-nums tracking-[-.02em]">
        {index + 1}.
      </div>
      <div className="w-3/5">
        <div className="flex items-center gap-2">
          <Image
            src={model.logo}
            alt=""
            className="size-6 shrink-0 object-contain"
          />
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

export const dynamic = "force-dynamic";
