import { afterEach, describe, expect, it, vi } from 'vitest';
import { mockFetch } from '@/api/mock-fetch';

describe('mockFetch', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('resolves with the resolver result when no rejection occurs', async () => {
    vi.useFakeTimers();
    vi.spyOn(Math, 'random').mockReturnValue(0.99);
    const resolver = vi.fn(() => 'ok');

    const promise = mockFetch(resolver);
    await vi.advanceTimersByTimeAsync(800);

    await expect(promise).resolves.toBe('ok');
    expect(resolver).toHaveBeenCalledTimes(1);
  });

  it('rejects with an Error when rejection occurs', async () => {
    vi.useFakeTimers();
    vi.spyOn(Math, 'random').mockReturnValue(0);
    const resolver = vi.fn();

    const promise = mockFetch(resolver);
    const assertion = expect(promise).rejects.toThrow('Network request failed');
    await vi.advanceTimersByTimeAsync(800);
    await assertion;

    expect(resolver).not.toHaveBeenCalled();
  });

  it('schedules the timeout with a delay between 300 and 800ms', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    const setTimeoutSpy = vi.spyOn(globalThis, 'setTimeout');

    mockFetch(() => undefined);

    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    const delay = setTimeoutSpy.mock.calls[0][1] as number;
    expect(delay).toBeGreaterThanOrEqual(300);
    expect(delay).toBeLessThanOrEqual(800);
  });
});
