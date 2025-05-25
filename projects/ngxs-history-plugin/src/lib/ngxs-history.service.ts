import { Injectable } from '@angular/core'
import { getValue, setValue } from '@ngxs/store'
import { ɵensureStoreMetadata } from '@ngxs/store/internals'
import { ActionMetadata } from './models/action-metadata'
import { actionsToHandle } from './models/decorators'
import { NgxsHistoryUndo } from './models/ngxs-history.actions'
import { PluginOptions } from './models/plugin-options'

@Injectable({
  providedIn: 'root',
})
export class NgxsHistoryService {
  /**
   *
   * @param actionType
   * @returns the state name
   */
  getStateName(actionType) {
    const currentActionMetadata: ActionMetadata = Object.values(actionsToHandle).find((it) => it.actions.includes(actionType))

    if (!currentActionMetadata) {
      return
    }
    const stateSliceMetadata = currentActionMetadata && ɵensureStoreMetadata(currentActionMetadata.ctor)

    return stateSliceMetadata?.name
  }

  handleTheUndoAction(actionName, historySlicePath, state) {
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

  discardUnwantedHistoryItems(historyData: any[], options: PluginOptions) {
    const shouldDiscard = () => historyData.length > options.historyLength

    if (historyData && options.historyLength && shouldDiscard()) {
      return historyData.slice(historyData.length - options.historyLength)
    }

    return historyData
  }
}
