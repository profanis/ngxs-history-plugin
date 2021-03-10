import { Inject, Injectable } from '@angular/core'
import { getActionTypeFromInstance, getValue, NgxsNextPluginFn, NgxsPlugin, setValue } from '@ngxs/store'
import { actionsToHandle } from './models/decorators'
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

    const actionType = getActionTypeFromInstance(action);
    let nextState = state;

    const { statesToHandle } = this.options
    const stateName = Object.keys(state)[0]
    const shouldIgnoreTheAction = this.ACTIONS_TO_IGNORE.has(actionType)
    const shouldHandleTheState = !statesToHandle || !statesToHandle.length ? true : statesToHandle.includes(stateName)
    const shouldHandleTheAction = actionsToHandle.has(actionType)
    const historySlicePath = `history.${stateName}`


    // Handle the Undo action
    nextState = this.handleTheUndoAction(actionType, historySlicePath, stateName, nextState)


    if (!shouldIgnoreTheAction && shouldHandleTheState && shouldHandleTheAction) {
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

  private handleTheUndoAction(actionName, historySlicePath, stateName, state) {

    if (NgxsHistoryUndo.type === actionName) {
      const historyModel: any[] = [...getValue(state, historySlicePath)];
      if (historyModel.length) {
        const lastMemento = historyModel.pop()

        // update the history slice
        state = setValue(state, historySlicePath, historyModel || []);

        // update the business state slice
        state = setValue(state, stateName, lastMemento);
      }
    }

    return state
  }

  private discardUnwantedHistoryItems(historyData: any[]) {
    const shouldDiscard = () => historyData.length > this.options.historyLength

    if (historyData && this.options.historyLength && shouldDiscard()) {
      return historyData.slice(historyData.length  - this.options.historyLength)
    }

    return historyData
  }
}
