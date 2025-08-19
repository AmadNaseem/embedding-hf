let extractor = null;

/**
 * Generate embeddings using HuggingFace sentence-transformers model
 * @param {string} text - Input text to generate embedding for
 * @returns {Promise<number[]>} - Normalized embedding vector
 */
async function generateEmbeddingHF(text) {
  if (!extractor) {
    // Lazy-load the model only once
    const { pipeline } = require("@xenova/transformers");
    extractor = await pipeline(
      "feature-extraction",
      "sentence-transformers/all-MiniLM-L6-v2"
    );
  }
  const output = await extractor(text, { pooling: "mean", normalize: true });
  return Array.from(output.data);
}

module.exports = { generateEmbeddingHF };
