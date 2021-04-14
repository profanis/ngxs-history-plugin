import { Inject, Injectable } from '@angular/core'
import { getActionTypeFromInstance, getValue, NgxsNextPluginFn, NgxsPlugin, setValue } from '@ngxs/store'
import { NgxsHistoryUndo } from './models/ngxs-history.actions'
import { NGXS_HISTORY_PLUGIN_OPTIONS, PluginOptions } from './models/plugin-options'
import { NgxsHistoryService } from './ngxs-history.service'

@Injectable()
export class NgxHistoryPlugin implements NgxsPlugin {
  private readonly ACTIONS_TO_IGNORE = new Set([NgxsHistoryUndo.type, '@@INIT'])

  constructor(@Inject(NGXS_HISTORY_PLUGIN_OPTIONS) private options: PluginOptions = {}, private ngxsHistoryService: NgxsHistoryService) {}

  handle(state: any, action: any, next: NgxsNextPluginFn) {
    let nextState = state
    const actionType = getActionTypeFromInstance(action)
    const historySlicePath = 'history'
    const shouldIgnoreTheAction = this.ACTIONS_TO_IGNORE.has(actionType)
    const stateName = this.ngxsHistoryService.getStateName(actionType)

    // Handle the Undo action
    nextState = this.ngxsHistoryService.handleTheUndoAction(actionType, historySlicePath, nextState)

    if (!shouldIgnoreTheAction && stateName) {
      let historyData: any[] = getValue(state, historySlicePath) || []

      // add current action's data in history data array
      historyData = [...historyData, { data: state[stateName], stateName }]

      // discard unwanted history items
      historyData = this.ngxsHistoryService.discardUnwantedHistoryItems(historyData, this.options)

      nextState = setValue(nextState, historySlicePath, historyData)
    }

    return next(nextState, action)
  }
}
