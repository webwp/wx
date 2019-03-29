Component({
    externalClasses: ['i-class', 'i-class-alone'],

    properties: {
        count: {
            type: Number,
            value: 0,
            observer: 'finalCount'
        },
        overflowCount: {
            type: Number,
            value: 99
        },
        dot: {
            type: Boolean,
            value: false
        },
        top: {
            type: String,
            value: '-6'
        },
        right: {
            type: String,
            value: '0'
        },
        text: {
            type: String,
            value: ''
        }, 
        bg: {
            type: String,
            balue: ''
        }
    },
    data: {
        finalCount: 0
    },
    methods: {
        finalCount() {
            this.setData({
                finalCount: parseInt(this.data.count) >= parseInt(this.data.overflowCount) ? `${this.data.overflowCount}+` : this.data.count
            });
        },
    }
});
