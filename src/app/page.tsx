"use client";

import {
  Sandpack,
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
} from "@codesandbox/sandpack-react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { ChatCompletionStream } from "together-ai/lib/ChatCompletionStream.mjs";
import { dracula } from "@codesandbox/sandpack-themes";

export default function Home() {
  const [status, setStatus] = useState("idle");
  const [modelA, setModelA] = useState("");
  const [modelB, setModelB] = useState("");
  const [modelACode, setModelACode] = useState("");
  const [modelBCode, setModelBCode] = useState("");
  const [modelALoading, setModelALoading] = useState(false);
  const [modelBLoading, setModelBLoading] = useState(false);
  const [modelAResponse, setModelAResponse] = useState<Response>();
  const [modelBResponse, setModelBResponse] = useState<Response>();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const prompt = formData.get("prompt");

    setStatus("submitted");
    setModelALoading(true);
    setModelBLoading(true);
    const [modelA, modelB] = getRandomModels();
    setModelA(modelA);
    setModelB(modelB);

    // create a stream for each model
    const [resA, resB] = await Promise.all([
      fetch("/api/generate-app", {
        method: "POST",
        body: JSON.stringify({ prompt, model: modelA }),
      }),
      fetch("/api/generate-app", {
        method: "POST",
        body: JSON.stringify({ prompt, model: modelB }),
      }),
    ]);

    if (!resA.body || !resB.body) return;

    setModelAResponse(resA);
    setModelBResponse(resB);
  }

  return (
    <div className="mx-auto max-w-7xl">
      Code arena
      <form onSubmit={handleSubmit}>
        <fieldset disabled={status !== "idle"}>
          <input
            type="text"
            className="border border-gray-300 px-2 py-1"
            defaultValue="A todo app"
            name="prompt"
          />
          <input type="submit" />
        </fieldset>
      </form>
      {status === "submitted" && modelAResponse && modelBResponse && (
        <div className="mt-8 grid grid-cols-2 gap-8">
          <Result model={modelA} response={modelAResponse} />
          <Result model={modelB} response={modelBResponse} />
        </div>
      )}
    </div>
  );
}

function Result({ model, response }: { model: string; response: Response }) {
  const [code, setCode] = useState("");
  const [tab, setTab] = useState<"preview" | "code">("code");
  const isRunningRef = useRef(false);
  const [firstTime, setFirstTime] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!response.body || isRunningRef.current) return;

    isRunningRef.current = true;
    ChatCompletionStream.fromReadableStream(response.body)
      .on("content", (delta) => setCode((text) => text + delta))
      .on("end", () => setIsDone(true));
  }, []);

  if (isDone && !firstTime) {
    setFirstTime(true);
    setTab("preview");
  }

  return (
    <div>
      <div className="relative">
        <p className="text-center text-sm">{model}</p>
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

const models = [
  "Llama 3.1 70B Instruct Turbo",
  "Llama 3.1 405B Instruct Turbo",
  "Llama 3.1 8B Instruct Turbo",
  "Llama 3.2 11B Vision Instruct Turbo",
  "Llama 3.2 90B Vision Instruct Turbo",
  "WizardLM-2 8x22B",
  "Gemma 2 27B",
  "Mixtral-8x22B Instruct (141B)",
  "Qwen 2.5 7B Instruct Turbo",
  "Qwen 2.5 72B Instruct Turbo",
];

function getRandomModels() {
  const shuffled = models.sort(() => 0.5 - Math.random());
  return [shuffled[0], shuffled[1]];
}
