import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'


@Injectable()
export class SidenavService {
  sideNavState$: Subject<boolean> = new Subject();
}
