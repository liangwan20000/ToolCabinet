// 创建数据库
function created (indexedDBName) {
    return new Promise((resolve, reject) => {
        // 获取数据库对象
        let indexedDB = window.indexedDB || window.msIndexedDB || window.mozIndexedDB || window.webkitIndexedDB;

        // 创建并打开数据库
        let request = indexedDB.open(indexedDBName, 2);
        // 错误事件
        request.onerror = function (event) {
            reject("Something bad happened while trying to open: " + event.target.errorCode);
        };
        // 响应
        request.onsuccess = function (event) {
            console.log("存在的数据库")
            datebase = event.target.result;
            datebase.onversionchange = function () {
                datebase.console();
            };
            resolve({ name: 'get', resResult: event.target.result});
        };
        request.onupgradeneeded = function (event) {
            console.log("新建的数据库")
            resolve({ name: 'change', resResult: event.target.result});
        }
    })
}
/**
查询数据库和存储空间
参数1：数据库名称；
参数2：对象存储空间名称；
*/
function getData (dbName, storageName) {
    return new Promise(async (resolve, reject) => {
        let main = await created(dbName);
        if (main.name === 'change') {
            // 查询数据库对象存储空间是否存在
            if(!main.resResult.objectStoreNames.contains(storageName)){
                // 创建数据库对象存储空间
                let store = main.resResult.createObjectStore(storageName, { keyPath: 'userName'});
                // 创建索引
                // let index = store.createIndex('ix_userName', 'userName', { unique: false });
                resolve({ name: 'created', response: store })
                // let user = {
                //     userName: "李四",
                //     age: "18"
                // };
                // let one = store.add(user);
                // one.onsuccess = function (event) {
                //     console.log('成功', event.target.result);
                // };
                // one.onerror = function (event) {
                //     console.log('错误');
                // };
            }
        } else if (main.name === 'get') {
            // 增删改查事物
            // 统一浏览器接口
            // let IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
            // 这个事务能够读写存储空间
            let transaction = main.resResult.transaction(storageName, "readwrite");
            // 事务的错误事件
            transaction.onerror = function (event) {
                console.error(event.target);
            };
            // 事务的状态信息
            transaction.oncomplete = function (event) {
                console.log('整个事务都成功完成');
            };
            resolve({ name: 'search', response: transaction })
            // // 访问特定的存储空间
            // let request = transaction.objectStore(storageName).get("李四");
            // // console.log(request)
            // request.onerror = function (event) {
            //     reject(event.target.result)
            // };
            // request.onsuccess = function (event) {
            //     resolve(event.target.result)
            //     console.log(event.target.result);
            // };
        }
    })
}
// 查询数据库的存储空间
async function getDataTwo () {
    let obj = await getData("demoUser", 'usersTwo');
    if (obj.name === 'search') {
        let newObj = {
            userName: '小明',
            age: 20
        };
        let request = obj.response.objectStore("usersTwo").add(newObj)
        
        request.onsuccess = function (event) {
            console.log(event.target.result)
        }
        request.onerror = function (event) {
            console.log('错误');
        };
    } else if (obj.name === "created") {
        let newObj = {
            userName: '赵六',
            age: 20
        };
        let index = obj.response.createIndex('ix_userName', 'userName', { unique: false });
        let one = obj.response.add(newObj);
        one.onsuccess = function (event) {
            console.log('成功', event.target.result);
        };
        one.onerror = function (event) {
            console.log('错误');
        };
    }
}
// getDataTwo()
// 创建游标
async function getDataThree () {
    try {
        // 查看或创建数据库和对象存储空间
        let result = await getData("demoUsersOne", 'usersTwo');
        if (result.name === 'search') {
            // 获取指定的对象存储空间 objectStore
            let store = result.response.objectStore("usersTwo");
            // 创建游标
            let request = store.openCursor();
            request.onsuccess = function (event) {
                let cursor = event.target.result;
                if (cursor) {
                    console.log(cursor)
                    // 移动到下一项
                    cursor.continue()
                }
            }
        }
    } catch (error) {
        console.error(error)
    }
}
// getDataThree()
/**
键范围
*/
async function getRange () {
    try {
        let result = await getData("demoUsers", 'usersTwo');
        if (result.name === 'search') {
            let store = result.response.objectStore("usersTwo")

            let IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange;
            // 查询想要的对象的键
            let value = IDBKeyRange.only('赵六');
            // 结果集的下界，从这个键开始，往前查找所有；第二个参数是忽略传入的键，从下一个键开始
            // let value = IDBKeyRange.lowerBound('李四', true)
            // 结果集的上界，从结果集的第一个对象开始，到该键的对象为止；第二个参数为true，表示不包括指定对象
            // let value = IDBKeyRange.upperBound('小明', true)
            // 先指定下界，再指定上界; 4个参数，对应填写；
            // let value = IDBKeyRange.bound('小明', '李四', true, true)
            // let value = IDBKeyRange.bound('小明', '李四', false, true)
            // 把键范围传给 openCursor 方法，得到一个符合条件的游标
            // let value = IDBKeyRange.bound('小明', '李四')

            // 取得游标对象
            let IDBCursor = window.IDBCursor || window.webkitIDBCutsor
            // IDBCursor.NEXT_NO_DUPLICATE // 从开始到结束，跳过重复的对象
            // IDBCursor.PREV // 从结束到开始
            // IDBCursor.PREV_N0_DUPLICATE // 从结束到开始

            // 设置键范围和游标方向
            // 第一个参数是键范围，如果为null对象表示查询所有
            let request = store.openCursor(null, 'prev');

            request.onsuccess = function (event) {
                
                let cursor = event.target.result;
                if (cursor) {
                    console.log(event.target.result.value)  
                    // 移动到下一项
                    cursor.continue()
                }
            }
        }
    } catch (err) {
        console.log(err)
    }
}
// getRange()

// 索引
async function getIndex () {
    let obj = await getData("demoUser1", 'usersTwo');
    if (obj.name === 'search') {
        let store = obj.response.objectStore("usersTwo"),

            index = store.index('ix_userName'),
            request = index.openKeyCursor(null, 'prev');
            request = index.getKey("小明")
            // 删除索引
            // store.deleteIndex("ix_userName");

        request.onsuccess = function (event) {
            let cursor = event.target.result;
            if (cursor) {
                console.log(event.target.result)  
                // 移动到下一项
                // cursor.continue()
            }
        }
        request.onerror = function (event) {
            console.log('错误');
        };
    } else if (obj.name === "created") {
        let index = obj.response.createIndex('ix_userName', 'userName', { unique: false });
        let newObj = {
            userName: '赵六',
            age: 20
        };
        let one = obj.response.add(newObj);
        one.onsuccess = function (event) {
            console.log('成功', event.target.result);
        };
        one.onerror = function (event) {
            console.log('错误');
        };
    }
}

getIndex()
