import { Inject, Injectable } from '@angular/core'
import { getActionTypeFromInstance, getValue, NgxsNextPluginFn, NgxsPlugin, setValue } from '@ngxs/store'
import { NgxsHistoryUndo } from '../public-api'
import { Memento } from './models/memento'
import { NGXS_HISTORY_PLUGIN_OPTIONS, PluginOptions } from './models/plugin-options'

@Injectable()
export class NgxHistoryPlugin implements NgxsPlugin {

  private readonly ACTIONS_TO_IGNORE = new Set([NgxsHistoryUndo.type])

  constructor(
    @Inject(NGXS_HISTORY_PLUGIN_OPTIONS) private options: PluginOptions) {

      console.log('INIT')



  }

  handle(state: any, action: any, next: NgxsNextPluginFn) {

    const type = getActionTypeFromInstance(action);
    let nextState = state;


    const stateName = Object.keys(state)[0]
    const shouldHandleTheState = new Set(this.options.stateNames || []).has(stateName)
    const shouldIgnoreTheAction = this.ACTIONS_TO_IGNORE.has(type)

    if (NgxsHistoryUndo.type === type) {
      const historyModel: any[] = [...getValue(state, `history.${stateName}`)];
      if (historyModel.length) {
        const lastMemento = historyModel.pop()

        // update history
        nextState = setValue(nextState, `history.${stateName}`, lastMemento.state.history ? lastMemento.state.history[stateName]: []);
        nextState = setValue(nextState, stateName, lastMemento.state[stateName]);
      }

    }



    if (shouldHandleTheState && !shouldIgnoreTheAction) {
      const memento = new Memento(state, action)
      const historyModel = getValue(state, `history.${stateName}`);
      nextState = setValue(nextState, `history.${stateName}`, historyModel? [...historyModel, memento]: [memento]);
    }


    return next(nextState, action)
  }
}
