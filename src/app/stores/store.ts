import { createContext, useContext } from 'react';
import CommonStore from './commonStore';
import ModalStore from './modalStore';
import ProfileStore from './profileStore';
import UserStore from './userStore';


interface Store {
  commonStore: CommonStore;
  userStore: UserStore;
  profileStore: ProfileStore;
  modalStore: ModalStore;
}

export const store: Store = {
  commonStore: new CommonStore(),
  userStore: new UserStore(),
  profileStore: new ProfileStore(),
  modalStore: new ModalStore()
};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
