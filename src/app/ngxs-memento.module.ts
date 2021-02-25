import { Inject, Injectable, InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { NgxsPlugin, NGXS_PLUGINS } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { CareTaker } from './careTaker.service';
import { Memento } from './memento';

export const actionsToIgnore = new Set(['initstate', 'undo'])

export interface MementoPluginOptions {
  stateNames: string[]
}

export const NGXS_MEMENTO_PLUGIN_OPTIONS = new InjectionToken<MementoPluginOptions>('NGXS_MEMENTO_PLUGIN_OPTIONS');


@Injectable()
export class MementoPlugin implements NgxsPlugin {

  // caretaker: CareTaker<TodoStateModel>;

  constructor(
    @Inject(NGXS_MEMENTO_PLUGIN_OPTIONS) private options: MementoPluginOptions,
    private careTaker: CareTaker) {
    // this.caretaker = new CareTaker<TodoStateModel>();
  }

  handle(state, action, next) {

    const stateName = Object.keys(state)[0]
    const actionName: string = action.constructor.name
    const shoudHandleTheState = this.shouldHandleTheState(stateName)
    const shouldIgnoreTheAction = actionsToIgnore.has(actionName.toLowerCase())

    if (shoudHandleTheState && !shouldIgnoreTheAction) {

      const memento = new Memento(state, action)
      this.careTaker.backup(stateName, memento);
    }


    return next(state, action).pipe(
      tap(result => {
        console.log('Action happened!', result);
      })
    );
  }

  shouldHandleTheState(stateName: string) {
    return new Set(this.options.stateNames || []).has(stateName)
  }
}

@NgModule()
export class NgxsMementoModule {
  static forRoot(config?: MementoPluginOptions): ModuleWithProviders {
    return {
      ngModule: NgxsMementoModule,
      providers: [
        {
          provide: NGXS_PLUGINS,
          useClass: MementoPlugin,
          multi: true
        },
        {
          provide: NGXS_MEMENTO_PLUGIN_OPTIONS,
          useValue: config
        }
      ]
    };
  }
}
