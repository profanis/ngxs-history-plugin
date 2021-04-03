import { ModuleWithProviders, NgModule } from '@angular/core'
import { NGXS_PLUGINS } from '@ngxs/store'
import { NGXS_HISTORY_PLUGIN_OPTIONS, PluginOptions } from './models/plugin-options'
import { NgxHistoryPlugin } from './ngxs-history.plugin'

@NgModule()
export class NgxsHistoryModule {
  static forRoot(config?: PluginOptions): ModuleWithProviders<NgxsHistoryModule> {
    return {
      ngModule: NgxsHistoryModule,
      providers: [
        {
          provide: NGXS_PLUGINS,
          useClass: NgxHistoryPlugin,
          multi: true,
        },
        {
          provide: NGXS_HISTORY_PLUGIN_OPTIONS,
          useValue: config,
        },
      ],
    }
  }
}
