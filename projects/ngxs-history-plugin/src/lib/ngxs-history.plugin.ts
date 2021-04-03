import { Inject, Injectable } from '@angular/core'
import { ensureStoreMetadata, getActionTypeFromInstance, getValue, NgxsNextPluginFn, NgxsPlugin, setValue } from '@ngxs/store'
import { ActionMetadata } from './models/action-metadata'
import { actionsToHandle } from './models/decorators'
import { NgxsHistoryUndo } from './models/ngxs-history.actions'
import { NGXS_HISTORY_PLUGIN_OPTIONS, PluginOptions } from './models/plugin-options'

@Injectable()
export class NgxHistoryPlugin implements NgxsPlugin {
  private readonly ACTIONS_TO_IGNORE = new Set([NgxsHistoryUndo.type, '@@INIT'])

  constructor(@Inject(NGXS_HISTORY_PLUGIN_OPTIONS) private options: PluginOptions = {}) {}

  handle(state: any, action: any, next: NgxsNextPluginFn) {
    let nextState = state
    const actionType = getActionTypeFromInstance(action)
    const historySlicePath = 'history'
    const shouldIgnoreTheAction = this.ACTIONS_TO_IGNORE.has(actionType)
    const stateName = this.getStateName(actionType)

    // Handle the Undo action
    nextState = this.handleTheUndoAction(actionType, historySlicePath, nextState)

    if (!shouldIgnoreTheAction && stateName) {
      let historyData: any[] = getValue(state, historySlicePath) || []

      // add current action's data in history data array
      historyData = [...historyData, { data: state[stateName], stateName }]

      // discard unwanted history items
      historyData = this.discardUnwantedHistoryItems(historyData)

      nextState = setValue(nextState, historySlicePath, historyData)
    }

    return next(nextState, action)
  }

  /**
   *
   * @param actionType
   * @returns the state name
   */
  private getStateName(actionType) {
    const currentActionMetadata: ActionMetadata = Object.values(actionsToHandle).find((it) => it.actions.includes(actionType))

    if (!currentActionMetadata) {
      return
    }
    const stateSliceMetadata = currentActionMetadata && ensureStoreMetadata(currentActionMetadata.ctor)
    return stateSliceMetadata?.name
  }

  private handleTheUndoAction(actionName, historySlicePath, state) {
    if (NgxsHistoryUndo.type === actionName) {
      const historyModel: any[] = [...getValue(state, historySlicePath)]
      if (historyModel.length) {
        const lastMemento = historyModel.pop()

        // update the history slice
        state = setValue(state, historySlicePath, historyModel || [])

        // update the business state slice
        state = setValue(state, lastMemento.stateName, lastMemento.data)
      }
    }

    return state
  }

  private discardUnwantedHistoryItems(historyData: any[]) {
    const shouldDiscard = () => historyData.length > this.options.historyLength

    if (historyData && this.options.historyLength && shouldDiscard()) {
      return historyData.slice(historyData.length - this.options.historyLength)
    }

    return historyData
  }
}
