function generateHandle (value1, value2, fn) {
    let num = value1 + value2
    return function (vale3, value4) {
        let obj = {
            num: num,
            name: vale3,
            age: value4
        }
        fn(obj)
    }
}

function spa (value) {
    this.originDom = value.originDom ? document.querySelector(value.originDom) : document.body;
    this.data = value.data || {};
    this.handlers = value.domBindingHandle || {};
    this.monitorHandle = value.monitorHandle || {};
    this.template = value.template || {};

    this.createdDom(this.template, this.originDom).then(() => {
        this.setHandle(this.handlers, 'handlers');
        this.setHandle(this.monitorHandle, 'monitorHandle');
    });

    let tem = new Proxy(this.template, {
        get(target, prop) {
            return target[prop]
        },
        set (target, prop, value) {
            console.log(value)
            target[prop] = value
        }
    })
};

// 监听template改变事件
spa.prototype.proxy = function(data) {

};

// 初始化本页数据
spa.prototype.storageSetHandle = function(data) {
    let storage = this.data,
        thisArr = Object.keys(storage),
        ary = Object.keys(data),
        i = 0,
        j = 0,
        len = ary.length;
    if (!ary.length) { return };
    for (i; i < len; i++) {
        // 检查this中是否有要更新的键
        if (thisArr.includes(ary[i])) {
            storage[ary[i]] = data[ary[i]];
        };
    };
};

// 初始化dom
spa.prototype.createdDom = function (template, parent) {
    return new Promise((resolve, reject) => {
        for (let item in template) {
            let element = creatE(item);


            let attr = Object.keys(template[item]);
            if (!attr.length) { return };

            for (let edit in template[item]) {
                if (edit !== 'template' && edit !== 'innerText') {
                    element.setAttribute(edit, template[item][edit])
                } else if (edit === 'innerText') {
                    element.innerText = template[item][edit]
                }
            }

            if (template[item].template) {
                this.createdDom(template[item].template, element);
            }
            parent.appendChild(element);
        }
        resolve();
    })
};

// 初始化方法
spa.prototype.setHandle = function (list, type) {
    let handleList = Object.keys(list), i = handleList.length - 1;
    if (!handleList.length) { return };
    for (i; i >=0; i--) {
        if (type === 'handlers') {
            this.domBindingHandle(handleList[i], list[handleList[i]].eventType, list[handleList[i]].handle.bind(this));
        } else if (type === 'monitorHandle') {
            this.addHandler(handleList[i], list[handleList[i]].eventType, list[handleList[i]].handle.bind(this));
        }
    }
};
// dom 绑定事件
spa.prototype.domBindingHandle = function (element, eventType, handle) {
    let dom = document.querySelector(element);
    dom[eventType] = handle;
};
// 添加事件处理程序
spa.prototype.addHandler = function (element, type, handler) {
    let dom = document.querySelector(element);
    if (dom.addEventListener) {
        // 判断是否支持DOM二级
        dom.addEventListener(type, handler, false);
    } else if (dom.attachEvent) {
        // 判断是否是IE
        dom.attachEvent('on' + type, handler);
    } else {
        // 这里使用DOM0级
        dom['on' + type] = null;
    }
};
// 清理事件处理程序
spa.prototype.removeHandler = function (element, type, handler) {
    if (element.addEventListener) {
        // 判断是否支持DOM二级
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
        // 判断是否是IE
        element.attachEvent('on' + type, handler);
    } else {
        // 这里使用DOM0级
        element['on' + type] = null;
    }
}
