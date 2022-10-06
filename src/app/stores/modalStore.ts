import { makeAutoObservable } from 'mobx';
import { ModalSize } from '../common/modals/modalSize';

interface Modal {
    open: boolean;
    body: JSX.Element | null;
    size: ModalSize;
}

export default class ModalStore {
    modal: Modal = {
        open: false,
        body: null,
        size: 'mini'
    };

    constructor() {
        makeAutoObservable(this);
    }

    openModal = (content: JSX.Element, size: ModalSize = 'mini') => {
        this.modal.size = size;
        this.modal.open = true;
        this.modal.body = content;
    };

    closeModal = () => {
        this.modal.open = false;
        this.modal.body = null;
    };
}
