import { Base } from './base';
import { ValueType } from '../types/value-type';

export interface Property extends Base {
  valueType: ValueType;
}
