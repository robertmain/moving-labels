import { GetterTree } from 'vuex';
import { RootState } from '../state';
import { State } from './state';

export const getters: GetterTree<State, RootState> = {
  boxes: ({ boxes }: State) => boxes,
  currentBox: ({ boxes, currentBoxId }: State) => boxes
    .find(({ id }) => id === currentBoxId) ?? ({
    id: null,
    name: '',
    description: '',
  }),
};
