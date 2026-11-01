export function pickCyclic<T>(list: readonly [T, ...T[]], index: number): T {
  return list[index % list.length] ?? list[0];
}
