const { generateEmbeddingHF } = require('..');

(async () => {
  const text = process.argv.slice(2).join(' ') || 'Hello from embeddings!';
  console.time('embedding');
  const embedding = await generateEmbeddingHF(text);
  console.timeEnd('embedding');
  console.log('dim:', embedding.length);
  console.log(embedding.slice(0, 8));
})();
