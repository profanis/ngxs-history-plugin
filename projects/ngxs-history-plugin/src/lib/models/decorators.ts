import { ActionType, getActionTypeFromInstance } from '@ngxs/store'
import { ActionMetadata } from './action-metadata'

export const actionsToHandle: Record<string, ActionMetadata> = {}

/**
 *
 * @param ctr
 */
export function Undoable(action: ActionType) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const actionType = getActionTypeFromInstance(action)

    const ctorName = target.constructor.name

    actionsToHandle[ctorName] = {
      ctor: target.constructor,
      actions: actionsToHandle[ctorName] ? [...actionsToHandle[ctorName].actions, actionType] : [actionType],
    }
  }
}
