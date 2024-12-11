import LlamaLogo from "@/public/models/llama.png";
import MixtralLogo from "@/public/models/mixtral.png";
import QwenLogo from "@/public/models/qwen.png";
import GemmaLogo from "@/public/models/gemma.png";
import NemotronLogo from "@/public/models/nemotron.png";
import NousHermesLogo from "@/public/models/noushermes.webp";

export const models = [
  {
    label: "Llama 3.3 70B Instruct Turbo",
    shortLabel: "Llama 3.3 70B",
    organization: "Meta",
    logo: LlamaLogo,
    apiName: "meta-llama/Llama-3.3-70B-Instruct-Turbo",
  },
  {
    label: "Llama 3.1 405B Instruct Turbo",
    shortLabel: "Llama 3.1 405B",
    organization: "Meta",
    logo: LlamaLogo,
    apiName: "meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo",
  },
  {
    label: "Llama 3.1 8B Instruct Turbo",
    shortLabel: "Llama 3.1 8B",
    organization: "Meta",
    logo: LlamaLogo,
    apiName: "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
  },
  {
    label: "Llama 3.1 70B Instruct Turbo",
    shortLabel: "Llama 3.1 70B",
    organization: "Meta",
    logo: LlamaLogo,
    apiName: "meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo",
  },

  {
    label: "Gemma 2 9B",
    shortLabel: "Gemma 2 9B",
    organization: "Google",
    logo: GemmaLogo,
    apiName: "google/gemma-2-9b-it",
  },
  {
    label: "Gemma 2 27B",
    shortLabel: "Gemma 2 27B",
    organization: "Google",
    logo: GemmaLogo,
    apiName: "google/gemma-2-27b-it",
  },
  {
    label: "Mixtral-8x22B Instruct (141B)",
    shortLabel: "Mixtral-8x22B",
    organization: "Mistral AI",
    logo: MixtralLogo,
    apiName: "mistralai/Mixtral-8x22B-Instruct-v0.1",
  },
  {
    label: "Qwen 2.5 Coder 32B Instruct",
    shortLabel: "Qwen 2.5 32B",
    organization: "Qwen",
    logo: QwenLogo,
    apiName: "Qwen/Qwen2.5-Coder-32B-Instruct",
  },
  {
    label: "Qwen 2.5 72B Instruct Turbo",
    shortLabel: "Qwen 2.5 72B",
    organization: "Qwen",
    logo: QwenLogo,
    apiName: "Qwen/Qwen2.5-72B-Instruct-Turbo",
  },
  {
    label: "Llama 3.1 Nemotron 70B",
    shortLabel: "Nemotron 70B",
    organization: "NVIDIA",
    logo: NemotronLogo,
    apiName: "nvidia/Llama-3.1-Nemotron-70B-Instruct-HF",
  },
  {
    label: "Nous Hermes 2 Mixtral 8x7B-DPO (46.7B)",
    shortLabel: "Nous Hermes 2 – Mixtral 8x7B-DPO",
    organization: "Nous Research",
    logo: NousHermesLogo,
    apiName: "NousResearch/Nous-Hermes-2-Mixtral-8x7B-DPO",
  },
];
