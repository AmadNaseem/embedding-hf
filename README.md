# embedding-hf

Tiny helper to generate sentence-transformers embeddings via `@xenova/transformers` in Node.js and the browser.

- Pure JS. No Python needed. Uses WebAssembly/ONNX under the hood.
- Lazy model load on first call, cached for reuse.

## Install

```
npm install embedding-hf 
```

Node 18+ is recommended for native fetch. In browsers, modern bundlers supported.

## Usage

Use it from anywhere:

JavaScript (CJS, Node.js):
```js
const { generateEmbeddingHF } = require('embedding-hf');
const vec = await generateEmbeddingHF('Hello world');
```

JavaScript/TypeScript (ESM, Node.js):
```js
import { generateEmbeddingHF } from 'embedding-hf';
const vec = await generateEmbeddingHF('Hello world');
```

TypeScript:
```ts
import { generateEmbeddingHF } from 'embedding-hf';
const vec: number[] = await generateEmbeddingHF('Hello world');
```

React (client component):
```tsx
import { useEffect, useState } from 'react';
import { generateEmbeddingHF } from 'embedding-hf';

export default function Example() {
  const [dim, setDim] = useState<number | null>(null);
  useEffect(() => {
    (async () => {
      const v = await generateEmbeddingHF('Hello from React');
      setDim(v.length);
    })();
  }, []);
  return <div>Embedding dim: {dim}</div>;
}
```

You can also run the example in this repo:

```
npm run example -- "Your text here!"
```

## API

### generateEmbeddingHF(text: string, options?: { dimension?: number }): Promise<number[]>
Generates a mean-pooled, L2-normalized embedding using a Xenova ONNX model.
Returns a vector coerced to 1536 dimensions (truncated or zero-padded if needed).

### generateEmbeddingHFObject(text: string, options?: { dimension?: number }): Promise<{ dimension: number; flat: string }>
Returns an object with `dimension` (default 1536) and `flat` as a JSON string of the embedding.

Example for {"dimension":1536,"flat":"..."}:
```ts
import { generateEmbeddingHFObject } from 'embedding-hf';
const out = await generateEmbeddingHFObject('hello', { dimension: 1536 });
// out => { dimension: 1536, flat: "[0.1, ...]" }
```

## Notes
- The first call downloads the model (~90MB) and can take a while.
- Subsequent calls reuse the loaded pipeline.
- Works offline after the model is cached.
 - Default model: `Xenova/all-MiniLM-L6-v2` (override via `EMBEDDING_HF_MODEL` env).
 - When resizing embeddings, vectors are re-normalized; if upscaling, padding cycles existing values (not zeros) for speed and stability in ANN backends.

## Contact

Author: Amad Naseem — https://github.com/AmadNaseem

## License
MIT
