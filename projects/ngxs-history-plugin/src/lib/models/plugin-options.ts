import { InjectionToken } from '@angular/core'

export interface PluginOptions {
  /**
   * the number of elements to keep in the history.
   *
   * Empty means no restriction
   */
  historyLength?: number
}

export const NGXS_HISTORY_PLUGIN_OPTIONS = new InjectionToken<PluginOptions>('NGXS_HISTORY_PLUGIN_OPTIONS')
