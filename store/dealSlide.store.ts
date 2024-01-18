import {defineStore} from "pinia";
import type {ICard} from "~/components/kanban/kanban.types";

const defaultValue: {card: ICard | null, isOpen: boolean} = {
    card: null,
    isOpen: false
}
export const useDealSlideStore = defineStore('dealSlide', {
    state: () => defaultValue,
    getters: {
        isToggle: state => state.isOpen
    },
    actions: {
        clear(card:ICard) {
            this.$patch(defaultValue)
        },
        set(card:ICard ) {
            this.$patch({card, isOpen: true})
        },
        toggle() {
            this.isOpen = !this.isOpen
        }
    },
})