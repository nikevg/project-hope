import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';

export const routeAnimation = trigger('routeAnimation', [
  transition('* <=> *', [
    style({ opacity: 0 }),
    animate('500ms ease-in-out', style({ opacity: 1 })),
  ]),
]);

export const enterLeaveAnimation = trigger('enterLeaveAnimation', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms ease-out', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('200ms ease-in', style({ opacity: 0 })),
  ]),
]);

export const inOutAnimation = trigger('inOutAnimation', [
  state('out', style({ opacity: 0 })),
  state('in', style({ opacity: 1 })),
  transition('out => in', [animate('400ms ease-in')]),
  transition('in => out', [animate('300ms ease-out')]),
]);

export const expandAnimation = trigger('expandAnimation', [
  state('collapsed', style({ height: '0px', minHeight: '0' })),
  state('expanded', style({ height: '*' })),
  transition(
    'expanded <=> collapsed',
    animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
  ),
]);
