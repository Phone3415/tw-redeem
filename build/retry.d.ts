declare function retry<T>(fn: () => Promise<T>, maxRetries?: number, delayMs?: number, backoffFactor?: number): Promise<T>;
export default retry;
