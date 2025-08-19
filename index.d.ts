/**
 * Generate embeddings using HuggingFace sentence-transformers model.
 * Lazily initializes the model on first call and caches it for reuse.
 * @param text Input text to generate embedding for.
 * @returns Promise resolving to a normalized embedding vector.
 */
export declare function generateEmbeddingHF(text: string): Promise<number[]>;
