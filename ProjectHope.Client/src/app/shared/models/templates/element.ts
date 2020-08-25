import { Base } from './base';
import { Property } from './property';

export interface Element extends Base {
  properties?: Property[];
}
