import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'


// define your typings for the store state
export interface State {
  token: string
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    token: ""
  },
  mutations: {
    setToken(state, token: string) {
      state.token = token;
    }
  },
  actions: {
    setToken(context, token: string) {
      context.commit('setToken', token);
    }
  }
})

// define your own `useStore` composition function
export function useStore() {
  return baseUseStore(key)
}