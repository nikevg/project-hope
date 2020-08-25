import { Base } from './base';
import { Property } from './property';
import { Element } from './element';

export interface Template extends Base {
  id: string;
  updated: Date;
  elements?: Element[];
  properties?: Property[];
}
