import { Inject, Injectable, InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { NgxsPlugin, NGXS_PLUGINS } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Memento } from './models/memento';
import { PluginOptions } from './models/plugin-options';
import { NgxsHistoryService } from './ngxs-history.service';
export const NGXS_HISTORY_PLUGIN_OPTIONS = new InjectionToken<PluginOptions>('NGXS_HISTORY_PLUGIN_OPTIONS');


@Injectable()
export class NgxHistoryPlugin implements NgxsPlugin {

  private readonly ACTIONS_TO_IGNORE = new Set(['initstate', 'undo'])

  constructor(
    @Inject(NGXS_HISTORY_PLUGIN_OPTIONS) private options: PluginOptions,
    private careTaker: NgxsHistoryService) {
  }

  handle(state, action, next) {

    const stateName = Object.keys(state)[0]
    const actionName: string = action.constructor.name
    const shoudHandleTheState = new Set(this.options.stateNames || []).has(stateName)
    const shouldIgnoreTheAction = this.ACTIONS_TO_IGNORE.has(actionName.toLowerCase())

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
}

@NgModule()
export class NgxsHistoryModule {
  static forRoot(config?: PluginOptions): ModuleWithProviders {
    return {
      ngModule: NgxsHistoryModule,
      providers: [
        {
          provide: NGXS_PLUGINS,
          useClass: NgxHistoryPlugin,
          multi: true
        },
        {
          provide: NGXS_HISTORY_PLUGIN_OPTIONS,
          useValue: config
        }
      ]
    };
  }
}
