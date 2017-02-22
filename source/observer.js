/**
 * Observer:能够对数据对象的所有熟悉进行监听，如果有变动可以拿到最新的值并通知订阅者
 */
function Observer(data) {
    this.data = data;
    this.walk(data);
}

Observer.prototype = {
    walk: function(data) {
        var _this = this;
        //遍历所有的属性进行监听
        Object.keys(data).forEach(function(key) {
            _this.convert(key, data[key]);
        });
    },
    //使用Object.defineProperty对属性和属性的子元素进行监听
    convert: function(key, val) {
        this.defineReactive(this.data, key, val);
    },

    defineReactive: function(data, key, val) {
        //通过该对象添加订阅者
        var dep = new Dep();
        //监听子元素的属性
        var childObj = observe(val);

        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function() {
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set: function(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 新的值是object的话，进行监听
                childObj = observe(newVal);
                // 通知订阅者
                dep.notify();
            }
        });
    }
};

function observe(value, vm) {
    if (!value || typeof value !== 'object') {
        return;
    }

    return new Observer(value);
};


var uuid = 0;

//订阅者
function Dep() {
    this.id = uuid++;
    this.subs = [];
}

Dep.prototype = {
    //添加订阅者
    addSub: function(sub) {
        this.subs.push(sub);
    },
    //
    depend: function() {
        Dep.target.addDep(this);
    },
    //移除订阅者
    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },
    //通知订阅者
    notify: function() {
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};
//暂存Watcher
Dep.target = null;