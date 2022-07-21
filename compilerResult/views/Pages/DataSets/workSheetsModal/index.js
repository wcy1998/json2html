
import {
    mapState,
    mapMutations
} from "vuex";
export default {
    name: "workSheetsModal",
    components: {
        lqTable
    }, //fastCode缓存中没有
    mixins: [lqTable],
    props: {
        test1: {
            type: String,
            default () {
                return 'gfdgfd'
            }
        },
        fff: {
            type: Array,
            default () {
                return []
            }
        },
        test2: {
            type: [String, Number, Function, Object],
            default () {
                return () => 9
            }
        }
    },
    data() {
        return {
            data1: 'fdfds',
            data2: 321321,
            data3: true,
            data4: ['fdsf', 4324, {},
                []
            ],
            data5: {
                fdsf: [],
                fdf: {},
                fdfd: '',
                fwe: 323
            },
            data6: new Map(),
            data7: new Set(),
            data8: () => 6,
            data9: function() {},
            controlledFiledListLoading: false,
            controlledFiledList3Loading: false,
        }
    },
    computed: {
        ...mapState('dataCollection', ['controlledFiledList2', 'store2']),
        collections() {
            console.log(1111111);
        },
        fdhskjfh: {
            set() {},
            get() {}
        },
    },
    watch: {
        'data1': {
            handler() {
                this.getDataList('controlledFiledList');
                this.getDataList('controlledFiledList2');
                console.log(333333333);
                let c = 'fdfdf';
                let v = c + 3434;
                console.log(v);
            },
            deep: true,
            immediate: false
        },
        'data5.fdf'() {
            this.getDataList('controlledFiledList3');
        },
        collectionId() {
            console.log(1111111);
        },
    },
    beforeCreate() {
        this.fdfsf = false
        let a = 890;
        console.log(a);
    },
    created() {
        return __awaiter(this, void 0, void 0, function*() {
            yield console.log(899);
        });
    },

    mounted() {
        console.log(333333);
    },




    methods: {
        ...mapMutations('dataCollection', ['updateControlledFiledList2', 'updateStore2', 'updateStore3', 'updateStore4', 'updateStore5']),
        async getDataList(type) {
            let action, params;
            switch (type) {
                case 'controlledFiledList':
                    this.controlledFiledListLoading = true
                    action = $http.columnDimList;
                    params = {
                        collectionId: this.collectionId
                    }
                    break;
                case 'controlledFiledList2':

                    action = $http.columnDimList2;
                    params = {
                        collectionId: this.collectionId3
                    }
                    break;
                case 'controlledFiledList3':
                    this.controlledFiledList3Loading = true
                    action = $http.columnDimList3;
                    params = {
                        collectionId: this.collectionId3
                    }
                    break;
                default:
                    break;
            }
            try {
                let res = await action(params);
                if (res.success) {
                    switch (type) {
                        case 'controlledFiledList':

                            this.controlledFiledListLoading = false;


                            break;
                        case 'controlledFiledList2':




                            break;
                        case 'controlledFiledList3':

                            this.controlledFiledList3Loading = false;


                            break;
                        default:
                            break;
                    }
                }
            } catch (e) {
                console.log(e); //eslint-disable-line
            }
        },
        pageChange({
            pageNo,
            pageSize
        }) {
            this.searchParam.pageNo = pageNo;
            this.searchParam.pageSize = pageSize;
            this.getDataList("controlledFiledList");
            this.getDataList("controlledFiledList2")
        },
        aaa() {
            console.log(675765765);
        },
    }
}