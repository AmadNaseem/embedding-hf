"use strict";
let extractor = null;
async function generateEmbeddingHF(text) {
  if (!extractor) {
    const { pipeline } = await import("@xenova/transformers");
    extractor = await pipeline(
      "feature-extraction",
      "sentence-transformers/all-MiniLM-L6-v2"
    );
  }
  const output = await extractor(text, { pooling: "mean", normalize: true });
  return Array.from(output.data);
}
module.exports = { generateEmbeddingHF };
