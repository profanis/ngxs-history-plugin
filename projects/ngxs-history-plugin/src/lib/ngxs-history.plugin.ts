import { Inject, Injectable } from '@angular/core'
import { getActionTypeFromInstance, getValue, NgxsNextPluginFn, NgxsPlugin, setValue } from '@ngxs/store'
import { Memento } from './models/memento'
import { NgxsHistoryUndo } from './models/ngxs-history.actions'
import { NGXS_HISTORY_PLUGIN_OPTIONS, PluginOptions } from './models/plugin-options'

@Injectable()
export class NgxHistoryPlugin implements NgxsPlugin {

  private readonly ACTIONS_TO_IGNORE = new Set([NgxsHistoryUndo.type, '@@INIT'])

  constructor(
    @Inject(NGXS_HISTORY_PLUGIN_OPTIONS) private options: PluginOptions = {}) {

      console.log('INIT')

  }

  handle(state: any, action: any, next: NgxsNextPluginFn) {

    const type = getActionTypeFromInstance(action);
    let nextState = state;

    const { statesToHandle } = this.options
    const stateName = Object.keys(state)[0]
    const shouldIgnoreTheAction = this.ACTIONS_TO_IGNORE.has(type)
    const shouldHandleTheState = !statesToHandle || !statesToHandle.length ? true : statesToHandle.includes(stateName)
    const historySlicePath = `history.${stateName}`

    if (NgxsHistoryUndo.type === type) {
      const historyModel: any[] = [...getValue(state, historySlicePath)];
      if (historyModel.length) {
        const lastMemento = historyModel.pop()

        // update the history slice
        nextState = setValue(nextState, historySlicePath, historyModel || []);

        // update the business state slice
        nextState = setValue(nextState, stateName, lastMemento);
      }
    }



    if (!shouldIgnoreTheAction && shouldHandleTheState) {
      const memento = new Memento(state, action)
      let historyData: any[] = getValue(state, historySlicePath) || [];

      // add memento in history data array
      historyData = [...historyData, memento.state[stateName]]

      // discard unwanted history items
      historyData = this.discardUnwantedHistoryItems(historyData)

      nextState = setValue(nextState, historySlicePath, historyData);
    }


    return next(nextState, action)
  }

  private discardUnwantedHistoryItems(historyData: any[]) {
    const shouldDiscard = () => historyData.length > this.options.historyLength

    if (historyData && this.options.historyLength && shouldDiscard()) {
      return historyData.slice(historyData.length  - this.options.historyLength)
    }

    return historyData
  }
}
