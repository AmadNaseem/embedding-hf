let extractor = null;
export async function generateEmbeddingHF(text) {
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
export default { generateEmbeddingHF };
