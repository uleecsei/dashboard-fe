import { trigger, state, style, transition, animate } from '@angular/animations';


export const onSideNavChange = trigger('onSideNavChange', [
  state('close',
    style({
      'min-width': '67px'
    })
  ),
  state('open',
    style({
      'min-width': '242px'
    })
  ),
  transition('close => open', animate('250ms ease-in')),
  transition('open => close', animate('250ms ease-in')),
]);


export const onMainContentChange = trigger('onMainContentChange', [
  state('close',
    style({
      'margin-left': '67px'
    })
  ),
  state('open',
    style({
      'margin-left': '242px'
    })
  ),
  transition('close => open', animate('250ms ease-in')),
  transition('open => close', animate('250ms ease-in')),
]);


export const animateText = trigger('animateText', [
  state('hide',
    style({
      'display': 'none',
      opacity: 0,
    })
  ),
  state('show',
    style({
      'display': 'block',
      opacity: 1,
    })
  ),
  transition('close => open', animate('350ms ease-in')),
  transition('open => close', animate('200ms ease-out')),
]);
