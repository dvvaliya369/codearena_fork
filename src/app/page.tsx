"use client";

import { FormEvent, useState } from "react";

export default function Home() {
  const [status, setStatus] = useState("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // randomize two models
    setStatus("loading");
    let [model1, model2] = getRandomModels();

    // create a stream for each model

    // store the code in state
    setStatus("complete");
  }

  return (
    <div>
      Code arena
      <form onSubmit={handleSubmit}>
        <fieldset disabled={status !== "loading"}>
          <input
            type="text"
            className="border border-gray-300 px-2 py-1"
            defaultValue="A todo app"
          />
          <input type="submit" />
        </fieldset>
      </form>
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
