"use client";

import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ChatCompletionStream } from "together-ai/lib/ChatCompletionStream.mjs";
import { dracula } from "@codesandbox/sandpack-themes";

type App = {
  model: { label: string; apiName: string };
  isLoading: boolean;
  response?: Response;
  code?: string;
};

export default function Home() {
  const [status, setStatus] = useState("idle");
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
      model: modelA,
      isLoading: true,
    });
    setAppB({
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
      <h1 className="font-bold uppercase tracking-tighter">Code arena</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <fieldset disabled={status !== "idle"} className="space-y-3">
          <div>
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
          </div>
          <div>
            <input
              type="text"
              className="border border-gray-300 px-2 py-1"
              defaultValue="A todo app"
              name="prompt"
            />
          </div>

          <div>
            <input type="submit" />
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
            <Vote apps={[appA, appB]} />
          </div>
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

  useEffect(() => {
    if (!response || !response.body || isRunningRef.current) return;

    isRunningRef.current = true;
    ChatCompletionStream.fromReadableStream(response.body)
      .on("content", (delta) => {
        console.log("Got response", delta);
        setCode((text) => text + delta);
      })
      .on("end", () => {
        setTimeout(() => {
          setTab("preview");
        }, 500);
      });
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
          files={{ "App.tsx": code }}
          template="react-ts"
          theme={dracula}
          options={{
            externalResources: [
              "https://unpkg.com/@tailwindcss/ui/dist/tailwind-ui.min.css",
            ],
          }}
        >
          <SandpackLayout>
            {tab === "code" ? (
              <SandpackCodeEditor style={{ height: "80vh" }} />
            ) : (
              <SandpackPreview style={{ height: "80vh" }} />
            )}
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </div>
  );
}

function Vote({ apps }: { apps: [App, App] }) {
  let [appA, appB] = apps;

  return (
    <div className="flex items-center space-x-4">
      <form>
        <button formAction={voteA}></button>
        <button formAction={voteBoth}></button>
        <button formAction={voteNeither}></button>
        <button formAction={voteB}></button>
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
