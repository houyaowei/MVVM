# MVVM
实现思路：
 1、实现一个数据监听器Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者 </br>
 2、实现一个指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数 </br>
 3、实现一个Watcher，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图 </br>
 4、mvvm入口函数，整合以上三者</br>
 
 图例说明：
 <img src="2.png" />
 例子：
 
<div id="mvvm-app">
    <input type="text" v-model="word">
    <p>{{word}}</p>
    <button v-on:click="sayHi">change</button>
</div>

<script src="./source/observer.js"></script>
<script src="./source/watcher.js"></script>
<script src="./source/compile.js"></script>
<script src="./source/mvvm.js"></script>
<script>
    var vm = new MVVM({
        el: '#mvvm-app',
        data: {
            word: 'Hello，mvvm!'
        },
        methods: {
            sayHi: function() {
                this.word = 'Hi, everybody!';
            }
        }
    });
</script>

```
代码：
<div id="mvvm-app">
    <input type="text" v-model="word">
    <p>{{word}}</p>
    <button v-on:click="sayHi">change</button>
</div>

<script src="./source/observer.js"></script>
<script src="./source/watcher.js"></script>
<script src="./source/compile.js"></script>
<script src="./source/mvvm.js"></script>
<script>
    var vm = new MVVM({
        el: '#mvvm-app',
        data: {
            word: 'Hello，mvvm!'
        },
        methods: {
            sayHi: function() {
                this.word = 'Hi, everybody!';
            }
        }
    });
</script>

 
 