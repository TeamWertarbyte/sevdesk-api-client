import { MixedNumber, NumericBoolean } from './types/common';

export function parseNumber(number: MixedNumber): number {
  if (typeof number === 'number') {
    return number;
  }
  return parseFloat(number);
}

export function parseOptionalNumber(
  number: MixedNumber | null | undefined,
): number | null {
  if (number == null) {
    return null;
  }
  if (typeof number === 'number') {
    return number;
  }
  return parseFloat(number);
}

export function parseBoolean(boolean: NumericBoolean): boolean {
  return boolean === '1';
}
