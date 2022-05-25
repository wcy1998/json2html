export default {
    namespaced: true,
    state: {
        controlledFiledList2: [],
        store2: '',
        store3: new Map(),
        store4: [],
        store5: {},
    },

    mutations: {
        updateControlledFiledList2 (state, controlledFiledList2) {
            state.controlledFiledList2 = controlledFiledList2;
        },
        updateStore2 (state, store2) {
            state.store2 = store2;
        },
        updateStore3 (state, store3) {
            state.store3 = store3;
        },
        updateStore4 (state, store4) {
            state.store4 = store4;
        },
        updateStore5 (state, store5) {
            state.store5 = store5;
        },
    },
};
