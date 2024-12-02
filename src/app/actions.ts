"use server";

import { db } from "@/db";
import { apps, battles } from "@/schema";

type App = {
  model: { label: string; apiName: string };
  code: string;
  trimmedCode: string;
};

export default async function saveBattle({
  prompt,
  winners,
  losers,
}: {
  prompt: string;
  winners: App[];
  losers: App[];
}) {
  // TODO read cookie if it exists, otherwise create one
  const creatorCookie = "TODO";

  const result = await db
    .insert(battles)
    .values({
      prompt,
      creatorCookie,
    })
    .returning();

  const battle = result[0];

  for (const winner of winners) {
    await db.insert(apps).values({
      battleId: battle.id,
      model: winner.model.apiName,
      code: winner.code,
      trimmedCode: winner.trimmedCode,
      didWin: true,
    });
  }

  for (const loser of losers) {
    await db.insert(apps).values({
      battleId: battle.id,
      model: loser.model.apiName,
      code: loser.code,
      trimmedCode: loser.trimmedCode,
      didWin: false,
    });
  }

  return battle;
}
