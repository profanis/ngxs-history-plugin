import { Inject, Injectable, InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { NgxsPlugin, NGXS_PLUGINS } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { CareTaker } from './careTaker.service';
import { Memento } from './memento';
import { TodoStateModel } from './store/todo-state.model';

export function actionsToIgnore(): Set<string> {
  return new Set(['initState', 'undo'])
}

export interface MementoPluginOptions {
  stateNames: string[]
}

export const NGXS_MEMENTO_PLUGIN_OPTIONS = new InjectionToken<MementoPluginOptions>('NGXS_MEMENTO_PLUGIN_OPTIONS');


@Injectable()
export class MementoPlugin implements NgxsPlugin {

  // caretaker: CareTaker<TodoStateModel>;

  constructor(
    @Inject(NGXS_MEMENTO_PLUGIN_OPTIONS) private options: MementoPluginOptions,
    private careTaker: CareTaker<TodoStateModel>) {
    // this.caretaker = new CareTaker<TodoStateModel>();
  }

  handle(state, action, next) {

    const actionName: string = action.constructor.name


    // const actionNames = new Set(Object.values(this.options.actionsToHandle).map((it: any) => it.name))
    // console.log(actionNames.has(action))
    console.log('Action started!', state, actionName);


    // create new memento

    debugger
    if (!actionsToIgnore().has(actionName.toLowerCase())) {
      const memento = new Memento(state, action)
      this.careTaker.backup(memento);
    }


    return next(state, action).pipe(
      tap(result => {
        console.log('Action happened!', result);
      })
    );
  }

  shouldHandleTheState(name: string) {
    throw new Error('Implement')
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
