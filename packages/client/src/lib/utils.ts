export const fmap = <T, R>(
  a: T | null | undefined,
  fn: (a: T) => R
): R | null => (a !== null && a !== undefined ? fn(a) : null);
