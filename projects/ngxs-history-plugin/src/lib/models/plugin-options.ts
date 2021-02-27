import { InjectionToken } from '@angular/core';

export interface PluginOptions {

  /**
   * The name of the states the plugin will keep history of
   */
  stateNames: string[]
}

export const NGXS_HISTORY_PLUGIN_OPTIONS = new InjectionToken<PluginOptions>('NGXS_HISTORY_PLUGIN_OPTIONS');
