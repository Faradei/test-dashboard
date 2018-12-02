import { Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Task } from '../model/Task';
import { ActionTypes, TaskAction } from './task.action';

export interface TaskState extends EntityState<Task> {}

export const taskAdapter: EntityAdapter<Task> = createEntityAdapter<Task>();

const initialTaskState = taskAdapter.getInitialState({});

export function taskReducer(state = initialTaskState, action: TaskAction) {
  switch (action.type) {
    case ActionTypes.AddTask:
      let newId: number = 0;

      for (let id of state.ids) {
        const index: number = Number(id);
        if (index >= newId) {
          newId = index + 1;
        }
      }

      const newTaskGroup: Task = {
        id: newId,
        title: action.payload.title,
        description: action.payload.description,
        taskGroupId: action.payload.groupId
      };

      return taskAdapter.addOne(newTaskGroup, state);

    case ActionTypes.DeleteTask:
      return taskAdapter.removeOne(action.payload.id, state);

    case ActionTypes.DeleteTasksFromGroup:
      const ids: string[] = [];
      for (let id of state.ids) {
        if (state.entities[id].taskGroupId === action.payload) {
          ids.push(id.toString());
        }
      }

      return taskAdapter.removeMany(ids, state);

    default:
      return state;
  }
};

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = taskAdapter.getSelectors();

