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
            resolve({ name: 'get', resResult: event.target.result});
        };
        request.onupgradeneeded = function (event) {
            console.log("新建的数据库")
            resolve({ name: 'change', resResult: event.target.result});
        }
    })
}

/**
参数1：数据库名称；
参数2：对象存储空间名称；
*/
function getData (dbName, storageName) {
    return new Promise(async (resolve, reject) => {
        let main = await created(dbName);
        if (main.name === 'change') {
            // 创建数据库分支
            if(!main.resResult.objectStoreNames.contains(storageName)){
                let store = main.resResult.createObjectStore(storageName, { keyPath: 'userName'});
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
            // 增删改查分支
            // 统一浏览器接口
            // let IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction;
            // 这个事务能够读写存储空间
            let transaction = main.resResult.transaction(storageName, "readwrite");
            // 事务的错误事件
            transaction.onerror = function (event) {
                console.log(event.target);
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

async function getDataTwo () {
    let obj = await getData("demoUsers", 'usersTwo');
    console.log(obj)
    if (obj.name === 'search') {
        let newObj = {
            userName: '赵六',
            age: 20
        };
        let request = obj.response.objectStore("usersTwo").add(newObj)
        
        request.onsuccess = function (event) {
            console.log(event.target.result)
        }
    } else if (obj.name === "created") {
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

getDataTwo()
