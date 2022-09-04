import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { todoItem } from '../../types/item';

export interface TodosState {
    value: Array<todoItem>;
}

const initialState: TodosState = {
    value: JSON.parse(localStorage.getItem('todos')) ?? [],
}

export interface statusAction {
    value: boolean;
    idx: number;
}

export interface addAction {
    value: todoItem;
}

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    changeStatus: (state, action: PayloadAction<statusAction>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value[action.payload.idx].isFinished = action.payload.value;
      localStorage.setItem('todos', JSON.stringify(state.value));
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    add: (state, action: PayloadAction<addAction>) => {
      state.value.push(action.payload.value);
      localStorage.setItem('todos', JSON.stringify(state.value));
    },
  },
});

export const selectTodos = (state: RootState) => state.todos.value;

export const { changeStatus, add } = todoSlice.actions;

export default todoSlice.reducer;
