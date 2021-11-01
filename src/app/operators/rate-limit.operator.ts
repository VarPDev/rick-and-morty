import {
  asyncScheduler,
  BehaviorSubject,
  timer,
  MonoTypeOperatorFunction,
  Observable,
} from 'rxjs';
import { filter, map, mergeMap, take } from 'rxjs/operators';

// ratelimit is a custom operator that we can define how many requests can occur over a given time period

export function rateLimit<T>(
  count: number,
  slidingWindowTime: number,
  scheduler = asyncScheduler
): MonoTypeOperatorFunction<T> {
  let tokens = count;
  const tokenChanged = new BehaviorSubject(tokens);
  const consumeToken = () => tokenChanged.next(--tokens);
  const renewToken = () => tokenChanged.next(++tokens);
  const availableTokens = tokenChanged.pipe(filter(() => tokens > 0));

  return mergeMap<T, Observable<T>>((value: T) =>
    availableTokens.pipe(
      take(1),
      map(() => {
        consumeToken();
        timer(slidingWindowTime, scheduler).subscribe(renewToken);
        return value;
      })
    )
  );
}
