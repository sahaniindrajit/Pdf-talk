import { HfInference } from '@huggingface/inference';
const hf = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_API_KEY);

export default hf;