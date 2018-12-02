import { Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
import { TaskGroup } from '../model/TaskGroup';
import { ActionTypes, TaskGroupAction } from './task-group.action';

export interface TaskGroupState extends EntityState<TaskGroup> {}

export const taskGroupAdapter: EntityAdapter<TaskGroup> = createEntityAdapter<TaskGroup>();

const intialTaskGroupState = taskGroupAdapter.getInitialState({}); 

export function taskGroupReducer(state = intialTaskGroupState, action: TaskGroupAction) {
  switch (action.type) {
    case ActionTypes.AddTaskGroup:
      let newId: number = 0;

      for (let id of state.ids) {
        const index: number = Number(id);
        if (index >= newId) {
          newId = index + 1;
        }
      }

      const newTaskGroup: TaskGroup = {
        id: newId,
        name: `Column ${newId}`
      };

      return taskGroupAdapter.addOne(newTaskGroup, state);

    case ActionTypes.DeleteTaskGroup:
      return taskGroupAdapter.removeOne(action.payload.id, state);

    case ActionTypes.UpdateGroupName:
      const update: Update<TaskGroup> = {
        id: action.payload.groupId,
        changes: {
          name: action.payload.newName
        }
      };

      return taskGroupAdapter.updateOne(update, state);

    default:
      return state;
  }
};

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = taskGroupAdapter.getSelectors();

