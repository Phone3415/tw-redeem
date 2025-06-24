function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000,
  backoffFactor: number = 2
): Promise<T> {
  let attempt = 0;
  let currentDelay = delayMs;

  while (true) {
    try {
      return await fn();
    } catch (error) {
      if (++attempt > maxRetries) {
        throw error;
      }

      await sleep(currentDelay);

      currentDelay *= backoffFactor;
    }
  }
}

export default retry;
