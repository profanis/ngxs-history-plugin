import { getActionTypeFromInstance } from '@ngxs/store';

export const actionsToHandle = new Set<string>()

export function Undoable(ctr: Function) {
  const actionType = getActionTypeFromInstance(ctr);
  actionsToHandle.add(actionType)
}

