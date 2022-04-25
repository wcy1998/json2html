export default {
    name: "test1",
    props: {
        type: {
            type: String,
            default () {
                return "all"
            }
        },
        arr: {
            type: Array,
            default () {
                return ["1", "2", 2, {
                    "s": 22
                }]
            }
        },
        obj: {
            type: Object,
            default () {
                return {
                    "a": 2,
                    "f": "dd",
                    "aee": [1, 2, "444"]
                }
            }
        },
        func: {
            type: Function,
            default () {
                return () => {}
            }
        },
        num: {
            type: Number,
            default () {
                return 111
            }
        }
    },
    data() {
        return {
            "aee": "333"
        }
    },
    computed: {},
    watch: {},
    beforeCreate() {},
    created() {},
    mounted() {},
    methods: {}
}