const MIN_DELAY_MS = 300;
const MAX_DELAY_MS = 800;
const REJECTION_RATE = 0.1;

export function mockFetch<T>(resolver: () => T): Promise<T> {
  const delay = MIN_DELAY_MS + Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < REJECTION_RATE) {
        reject(new Error('Network request failed'));
        return;
      }
      resolve(resolver());
    }, delay);
  });
}
