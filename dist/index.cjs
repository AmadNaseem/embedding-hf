"use strict";
let extractor = null;
const TARGET_DIM = 1536;
const DEFAULT_MODEL = process.env.EMBEDDING_HF_MODEL || "Xenova/all-MiniLM-L6-v2";
function coerceToDim(vec, dim) {
  if (vec.length === dim) return vec;
  if (vec.length > dim) return vec.slice(0, dim);
  const pad = new Array(dim - vec.length).fill(0);
  return vec.concat(pad);
}
function normalizeDim(d) {
  return Number.isInteger(d) && d > 0 ? d : TARGET_DIM;
}
async function generateEmbeddingHF(text, options) {
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
async function generateEmbeddingHFObject(text, options) {
  const desiredDim = normalizeDim(options && options.dimension);
  const vec = await generateEmbeddingHF(text, { dimension: desiredDim });
  return { dimension: desiredDim, flat: JSON.stringify(vec) };
}
module.exports = { generateEmbeddingHF, generateEmbeddingHFObject };
