export default {
    namespaced: true,
    state: {
        controlledFiledList2: [],
        store2: '',
        store3: new Map(),
        store4: [],
        store5: {},
        store6: {},
    },
    getters: {},
    mutations: {
        updateControlledFiledList2 (state: any, controlledFiledList2: any) {
            state.controlledFiledList2 = controlledFiledList2;
        },
        updateStore2 (state: any, store2: any) {
            state.store2 = store2;
        },
        updateStore3 (state: any, store3: any) {
            state.store3 = store3;
        },
        updateStore4 (state: any, store4: any) {
            state.store4 = store4;
        },
        updateStore5 (state: any, store5: any) {
            state.store5 = store5;
        },
        fhdskjfhdjsfh () {
            console.log(3423423);
        },
    },
};
