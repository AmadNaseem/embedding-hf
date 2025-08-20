/**
 * Generate embeddings using HuggingFace sentence-transformers model.
 * Lazily initializes the model on first call and caches it for reuse.
 * @param text Input text to generate embedding for.
 * @returns Promise resolving to a normalized embedding vector.
 */
export declare function generateEmbeddingHF(text: string, options?: { dimension?: number }): Promise<number[]>;
export declare function generateEmbeddingHFObject(text: string, options?: { dimension?: number }): Promise<{ dimension: number; flat: string }>;
declare const _default: {
  generateEmbeddingHF: typeof generateEmbeddingHF;
  generateEmbeddingHFObject: typeof generateEmbeddingHFObject;
};
export default _default;
