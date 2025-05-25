import {
  inject,
  Injectable,
  makeEnvironmentProviders,
  OnDestroy,
  provideEnvironmentInitializer,
} from '@angular/core';
import { Actions, ActionStatus, ActionContext } from '@ngxs/store';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NgxsActionCollectorService implements OnDestroy {
  readonly dispatched: any[] = [];
  readonly completed: any[] = [];
  readonly successful: any[] = [];
  readonly errored: any[] = [];
  readonly cancelled: any[] = [];

  private _destroyed$ = new ReplaySubject<void>(1);
  private _stopped$ = new Subject<void>();
  private _started = false;

  constructor(private _actions$: Actions) { }

  start() {
    if (this._started) {
      return;
    }
    this._started = true;
    this._actions$.pipe(takeUntil(this._destroyed$), takeUntil(this._stopped$)).subscribe({
      next: (actionCtx: ActionContext) => {
        switch (actionCtx.status) {
          case ActionStatus.Dispatched:
            this.dispatched.push(actionCtx.action);
            break;
          case ActionStatus.Successful:
            this.successful.push(actionCtx.action);
            this.completed.push(actionCtx.action);
            break;
          case ActionStatus.Errored:
            this.errored.push(actionCtx.action);
            this.completed.push(actionCtx.action);
            break;
          case ActionStatus.Canceled:
            this.cancelled.push(actionCtx.action);
            this.completed.push(actionCtx.action);
            break;
          default:
            break;
        }
      },
      complete: () => {
        this._started = false;
      },
      error: () => {
        this._started = false;
      },
    });
  }

  reset() {
    function clearArray(arr: any[]) {
      arr.splice(0, arr.length);
    }
    clearArray(this.dispatched);
    clearArray(this.completed);
    clearArray(this.successful);
    clearArray(this.errored);
    clearArray(this.cancelled);
  }

  stop() {
    this._stopped$.next();
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
  }
}

export function provideNgxsActionCollector() {
  return makeEnvironmentProviders([
    provideEnvironmentInitializer(() => inject(NgxsActionCollectorService).start()),
  ]);
}
