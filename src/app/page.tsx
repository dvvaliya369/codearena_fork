"use client";

import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import { FormEvent, useActionState, useEffect, useRef, useState } from "react";
import { ChatCompletionStream } from "together-ai/lib/ChatCompletionStream.mjs";
import { dracula } from "@codesandbox/sandpack-themes";
import SwordsIcon from "@/components/icons/swords";
import saveBattle from "./actions";
import { z } from "zod";
import { Battle } from "@/schema";

type App = {
  clientId: string;
  model: { label: string; apiName: string };
  isLoading: boolean;
  response?: Response;
  code?: string;
};

export default function Home() {
  const [status, setStatus] = useState("idle");
  const [prompt, setPrompt] = useState("A todo app");
  const [appA, setAppA] = useState<App>();
  const [appB, setAppB] = useState<App>();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const prompt = formData.get("prompt");
    const testModel = formData.get("testModel");

    setStatus("submitted");
    let modelA, modelB;

    if (testModel) {
      const model = models.find((m) => m.apiName === testModel);
      if (!model) {
        throw new Error("Test model not found");
      }
      modelA = model;
      modelB = model;
    } else {
      [modelA, modelB] = getRandomModels();
    }

    setAppA({
      clientId: crypto.randomUUID(),
      model: modelA,
      isLoading: true,
    });
    setAppB({
      clientId: crypto.randomUUID(),
      model: modelB,
      isLoading: true,
    });

    // create a stream for each model
    const [resA, resB] = await Promise.all([
      fetch("/api/generate-app", {
        method: "POST",
        body: JSON.stringify({
          prompt,
          model: modelA.apiName,
        }),
      }),
      fetch("/api/generate-app", {
        method: "POST",
        body: JSON.stringify({
          prompt,
          model: modelB.apiName,
        }),
      }),
    ]);

    // if (!resA.body || !resB.body) return;

    setAppA((a) => (a ? { ...a, response: resA } : undefined));
    setAppB((b) => (b ? { ...b, response: resB } : undefined));
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="text-center">
        <h1 className="mt-16 text-2xl font-bold tracking-tighter text-gray-900">
          Which LLM Codes the Best?
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Watch AI models compete in real-time, and see who emerges victorious.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-4">
        <fieldset disabled={status !== "idle"} className="space-y-3">
          {/* <div>
            <select
              name="testModel"
              className="border border-gray-300 px-0.5 py-1"
            >
              <option value="">Compare random models</option>
              {models.map((model) => (
                <option key={model.apiName} value={model.apiName}>
                  {model.label}
                </option>
              ))}
            </select>
          </div> */}

          <div className="relative">
            <input
              className="w-full border border-gray-300 px-4 py-5"
              name="prompt"
              placeholder="Enter a prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <div className="absolute inset-y-0 right-4 flex items-center justify-center">
              <button
                className="inline-flex size-6 items-center justify-center bg-blue-500"
                type="submit"
              >
                <SwordsIcon />
              </button>
            </div>
          </div>
        </fieldset>
      </form>
      {status === "submitted" && appA && appB && (
        <div>
          <div className="mt-8 grid grid-cols-2 gap-8">
            <Result app={appA} />
            <Result app={appB} />
          </div>
          <div>
            <p>appA code: {!!appA.code}</p>
            <p>appA code: {!!appB.code}</p>
          </div>
          {!!appA.code && !!appB.code && (
            <div>
              <Vote prompt={prompt} apps={[appA, appB]} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Result({ app }: { app: App }) {
  const [code, setCode] = useState("");
  const [tab, setTab] = useState<"preview" | "code">("code");
  const isRunningRef = useRef(false);
  const response = app.response;

  let trimmedCode = code.split("\n")[0]?.trim().startsWith("```")
    ? code.split("\n").slice(1).join("\n")
    : code;
  trimmedCode = trimmedCode.split("\n").at(-1)?.trim().startsWith("```")
    ? trimmedCode.split("\n").slice(0, -1).join("\n")
    : trimmedCode;

  useEffect(() => {
    if (!response || !response.body || isRunningRef.current) return;

    isRunningRef.current = true;
    ChatCompletionStream.fromReadableStream(response.body)
      .on("content", (delta) => {
        setCode((text) => text + delta);
      })
      .on("end", () => setTab("preview"));
  }, [response]);

  return (
    <div>
      <div className="relative">
        <p className="text-center text-sm">{app.model.label}</p>
        <div className="absolute inset-y-0 right-0 flex gap-2 text-sm">
          <button onClick={() => setTab("preview")}>Preview</button>
          <button onClick={() => setTab("code")}>Code</button>
        </div>
      </div>

      <div className="mt-4">
        <SandpackProvider
          files={{ "App.tsx": trimmedCode }}
          template="react-ts"
          theme={dracula}
          options={{
            externalResources: [
              "https://unpkg.com/@tailwindcss/ui/dist/tailwind-ui.min.css",
            ],
          }}
        >
          <SandpackLayout>
            <div className={`${tab === "code" ? "" : "hidden"} w-full`}>
              <SandpackCodeEditor style={{ height: "60vh" }} />
            </div>
            <div className={`${tab === "preview" ? "" : "hidden"} w-full`}>
              <SandpackPreview style={{ height: "60vh" }} />
            </div>
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </div>
  );
}

const savableAppSchema = z.object({
  model: z.object({
    label: z.string(),
    apiName: z.string(),
  }),
  code: z.string(),
});

const saveBattleSchema = z.object({
  prompt: z.string(),
  winners: z.array(savableAppSchema),
  losers: z.array(savableAppSchema),
});

type State = {
  battle?: Battle;
  didVote: boolean;
};

function Vote({ prompt, apps }: { prompt: string; apps: [App, App] }) {
  const [appA, appB] = apps;

  const [state, dispatch, isPending] = useActionState<
    State,
    { winners: App[] }
  >(
    async (previous, payload) => {
      if (previous.didVote) return previous;

      const winners = payload.winners;
      const losers = apps.filter(
        (app) => !winners.some((winner) => winner.clientId === app.clientId),
      );

      const data = saveBattleSchema.parse({ prompt, winners, losers });
      const battle = await saveBattle(data);

      return {
        battle,
        didVote: true,
      };
    },
    { didVote: false },
  );

  return (
    <div className="flex items-center space-x-4">
      <form>
        <fieldset disabled={isPending || state.didVote}>
          <button
            formAction={() => {
              dispatch({ winners: [appA] });
            }}
          >
            A did better
          </button>
          <button
            formAction={() => {
              dispatch({ winners: [appA, appB] });
            }}
          >
            Both good
          </button>
          <button
            formAction={() => {
              dispatch({ winners: [] });
            }}
          >
            Both bad
          </button>
          <button
            formAction={() => {
              dispatch({ winners: [appB] });
            }}
          >
            B did better
          </button>
        </fieldset>
      </form>
    </div>
  );
}

const models = [
  {
    label: "Llama 3.1 8B Instruct Turbo",
    apiName: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
  },
  {
    label: "Llama 3.1 70B Instruct Turbo",
    apiName: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
  },
  {
    label: "Llama 3.1 405B Instruct Turbo",
    apiName: "meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo",
  },
  // {
  //   label: "Llama 3.2 11B Vision Instruct Turbo",
  //   apiName: "meta-llama/Llama-3.2-11B-Vision-Instruct-Turbo",
  // },
  // {
  //   label: "Llama 3.2 90B Vision Instruct Turbo",
  //   apiName: "meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo",
  // },
  {
    label: "WizardLM-2 8x22B",
    apiName: "microsoft/WizardLM-2-8x22B",
  },
  {
    label: "Gemma 2 9B",
    apiName: "google/gemma-2-9b-it",
  },
  {
    label: "Gemma 2 27B",
    apiName: "google/gemma-2-27b-it",
  },
  {
    label: "Mixtral-8x22B Instruct (141B)",
    apiName: "mistralai/Mixtral-8x22B-Instruct-v0.1",
  },
  {
    label: "Qwen 2.5 Coder 32B Instruct",
    apiName: "Qwen/Qwen2.5-Coder-32B-Instruct",
  },
  {
    label: "Qwen 2.5 72B Instruct Turbo",
    apiName: "Qwen/Qwen2.5-72B-Instruct-Turbo",
  },
  {
    label: "Llama 3.1 Nemotron 70B",
    apiName: "nvidia/Llama-3.1-Nemotron-70B-Instruct-HF",
  },
  {
    label: "Nous Hermes 2 - Mixtral 8x7B-DPO (46.7B)",
    apiName: "NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO",
  },
];

function getRandomModels() {
  const shuffled = models.sort(() => 0.5 - Math.random());
  return [shuffled[0], shuffled[1]];
}
