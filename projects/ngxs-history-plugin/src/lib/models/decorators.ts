import { ActionType, ensureStoreMetadata, getActionTypeFromInstance } from '@ngxs/store'
import { ActionMetadata } from './action-metadata'

export const actionsToHandle: Record<string, ActionMetadata> = {}

/**
 *
 * @param ctr
 */
export function Undoable(action: ActionType) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const meta = ensureStoreMetadata(target.constructor)
    const actionType = getActionTypeFromInstance(action)

    actionsToHandle[target.constructor.name]
      ? (actionsToHandle[target.constructor.name] = {
          ctor: target.constructor,
          actions: [...actionsToHandle[target.constructor.name].actions, actionType],
        })
      : (actionsToHandle[target.constructor.name] = {
          ctor: target.constructor,
          actions: [actionType],
        })
  }
}
