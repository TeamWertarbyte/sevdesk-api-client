export interface ObjectReference<T extends string> {
  id: string | number;
  objectName: T;
}

export type NumericBoolean = '1' | '0';

export type MixedNumber = string | number;
