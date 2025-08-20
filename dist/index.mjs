let extractor = null;
const TARGET_DIM = 1536;
const DEFAULT_MODEL = process.env.EMBEDDING_HF_MODEL || "Xenova/all-MiniLM-L6-v2";
function normalizeVec(arr) {
  let norm = 0;
  for (let i = 0; i < arr.length; i++) norm += arr[i] * arr[i];
  if (norm <= 0 || !isFinite(norm)) return arr;
  const inv = 1 / Math.sqrt(norm);
  for (let i = 0; i < arr.length; i++) arr[i] = arr[i] * inv;
  return arr;
}
function coerceToDim(vec, dim) {
  const len = vec.length;
  if (len === dim) return vec;
  if (len > dim) {
    const out = vec.slice(0, dim);
    return normalizeVec(out);
  }
  if (len === 0) return new Array(dim).fill(0);
  const out = new Array(dim);
  for (let i = 0; i < dim; i++) out[i] = vec[i % len];
  return normalizeVec(out);
}
function normalizeDim(d) {
  return Number.isInteger(d) && d > 0 ? d : TARGET_DIM;
}
export async function generateEmbeddingHF(text, options) {
  const desiredDim = normalizeDim(options && options.dimension);
  if (!extractor) {
    const { pipeline } = await import("@xenova/transformers");
    extractor = await pipeline(
      "feature-extraction",
      DEFAULT_MODEL
    );
  }
  const output = await extractor(text, { pooling: "mean", normalize: true });
  const vec = Array.from(output.data);
  return coerceToDim(vec, desiredDim);
}
export async function generateEmbeddingHFObject(text, options) {
  const desiredDim = normalizeDim(options && options.dimension);
  const vec = await generateEmbeddingHF(text, { dimension: desiredDim });
  return { dimension: desiredDim, flat: JSON.stringify(vec) };
}
export default { generateEmbeddingHF, generateEmbeddingHFObject };
