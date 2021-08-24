function spa (value) {
    this.originDom = value.originDom ? document.querySelector(value.originDom) : document.body;
    this.data = value.data || {}; // 本页数据

    this.methods = value.methods || {}; // 所有方法

    this.created = value.created.bind(this); // dom创建前；不使用对象描述创建dom时，就是页面加载后执行

    this.template = value.template || {}; // 对象描述生成dom

    this.mounted = value.mounted.bind(this); // dom创建后

    this.domHandle = value.domHandle || {}; // dom挂载事件

    this.monitorHandle = value.monitorHandle || {}; // 事件委托
    
    this.proxy();
};

// 监听template改变事件,更新template必须用这个方法
spa.prototype.proxy = function() {
    // 加载方法
    this.setHandle(this.methods, 'methods');
    // dom创建前；不使用对象描述创建dom时，就是页面加载后执行
    this.created();
    let fragment = document.createDocumentFragment();
    // 对象描述生成dom
    this.addDom(this.template, fragment).then((flag) => {
        if (!flag) {
            // 如果不是对象描述生成结构，就不执行这里
            this.originDom.innerHTML = '';
            this.originDom.appendChild(fragment);
        }
        // 创建完dom后加载的方法
        this.mounted();
        // 给dom加载事件
        this.setHandle(this.domHandle, 'domHandle');
        // 事件委托
        this.setHandle(this.monitorHandle, 'monitorHandle');
    });
};

// 更新本页数据
spa.prototype.setHandle = function(data) {
    let thisArr = Object.keys(this.data),
        ary = Object.keys(data),
        i = 0,
        j = 0,
        len = ary.length;
    if (!ary.length) { return };
    for (i; i < len; i++) {
        // 检查this中是否有要更新的键
        if (thisArr.includes(ary[i])) {
            this.data[ary[i]] = data[ary[i]];
        };
    };
};

// 初始化dom
spa.prototype.addDom = function (template, parent) {
    return new Promise((resolve, reject) => {
        let parentNameList = Object.keys(template),
            i = 0, flag = false;
        if (!parentNameList.length) {
            flag = true;
            resolve(flag);
            return
        };
        for (i; i < parentNameList.length; i++) {
            let name = parentNameList[i];
            let element = creatE(template[name].nodeName);

            let attr = Object.keys(template[name]);
            if (!attr.length) { return };

            for (let edit in template[name]) {
                element.setAttribute('id', name)
                if (edit !== 'template' && edit !== 'innerText') {
                    element.setAttribute(edit, template[name][edit])
                } else if (edit === 'innerText') {
                    element.innerText = template[name][edit]
                }
            }
            if (template[name].template) {
                this.addDom(template[name].template, element);
            }
            parent.appendChild(element);
        }
        resolve(flag);
    })
};

// 替换节点
spa.prototype.replace = function (id, template) {
    let newNode = creatE(template.nodeName),
        usedNode = document.querySelector(id);
    let parent = usedNode.parentNode;
    let attr = Object.keys(template);
    if (!attr.length) { return };
    for (let edit in template) {
        if (edit !== 'template' && edit !== 'innerText') {
            newNode.setAttribute(edit, template[edit])
        } else if (edit === 'innerText') {
            newNode.innerText = template[edit]
        } else if (edit === 'template') {
            this.addDom(template[edit], newNode);
        }
    }
    parent.replaceChild(newNode, usedNode)
};

// 初始化方法
spa.prototype.setHandle = function (list, type) {
    let handleList = Object.keys(list), i = handleList.length - 1;
    if (!handleList.length) { return };
    for (i; i >=0; i--) {
        if (type === 'domHandle') {
            this.domBindingHandle(handleList[i], list[handleList[i]].eventType, list[handleList[i]].handle.bind(this));
        } else if (type === 'monitorHandle') {
            this.addHandler(handleList[i], list[handleList[i]].eventType, list[handleList[i]].handle.bind(this));
        } else if (type === 'methods') {
            this.setMethods(handleList[i], list[handleList[i]]);
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
        dom['on' + type] = handler;
    }
};

// 添加事件
spa.prototype.setMethods = function (name, handle) {
    this[name] = handle;
};

// 清理事件处理程序
spa.prototype.removeHandler = function (dom, type, handler) {
    let element = document.querySelector(dom);
    if (element.addEventListener) {
        // 判断是否支持DOM二级
        element.removeEventListener(type, handler);
    } else if (element.attachEvent) {
        // 判断是否是IE
        element.detachEvent('on' + type, handler);
    } else {
        // 这里使用DOM0级
        element['on' + type] = null;
    }
}
