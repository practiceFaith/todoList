let vm = new Vue({
    el: '#root',
    data: {
        arr: [],
        val: '',
        current: '',
        hash:''
    },
    computed: {
        all(){
          if (this.hash=='finish') return this.arr.filter(item=>item.select);
          if (this.hash=='unfinish')return this.arr.filter(item=>!item.select);
            if (this.hash=='all'|| true) return this.arr;
        },
        allwork() {
            return this.arr.length;
        },
        done() {
            return this.arr.filter(item => item.select).length;
        },
        working() {
            return this.arr.filter(item => !item.select).length;
        }
    },
    methods: {
        addVal() {
            if (this.val.length === 0) return;
            this.arr.push({select: true, hobby: this.val});
            this.val = '';
        },
        removeVal(index) {
            this.arr = this.arr.filter((item, i) => i !== index);
        },
        textInput(para) {
            this.current = para;
        },
        cancel() {
            this.current = null;
        }
    },
    watch: {
        arr: {
            handler() { //localStorage,操作的都是字符串
                localStorage.setItem('data', JSON.stringify(this.arr));
            }, deep: true
        }
    },
    directives: {
        focus(ele, bindings) {
            bindings.value ? ele.focus() : null;
        }
    },
    created() {
        axios.get('./hobby.json').then((res, err) => {
            this.arr = JSON.parse(localStorage.getItem('data')) || res.data;
        });
        this.hash=window.location.hash.slice(2) || 'all';
        window.addEventListener('hashchange',()=>{
            this.hash=window.location.hash.slice(2);
        },false);
    }
});