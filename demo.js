function spa (value) {
	this.originDom = value.originDom ? document.querySelector(value.originDom) : document.body;
    this.data = value.data || {};
    this.handlers = value.domBindingHandle || {};
    this.monitorHandle = value.monitorHandle || {};
    this.template = value.template || {};
    this.proxy();
};

// 监听template改变事件,更新template必须用这个方法
spa.prototype.proxy = function(call = () => {}) {
	call();
	let fragment = document.createDocumentFragment();
    this.createdDom(this.template, fragment).then(() => {
        this.originDom.innerHTML = '';
    	this.originDom.appendChild(fragment);
        this.setHandle(this.handlers, 'handlers');
        this.setHandle(this.monitorHandle, 'monitorHandle');
    });
};

// 更新本页数据
spa.prototype.storageSetHandle = function(data) {
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
spa.prototype.createdDom = function (template, parent) {
    return new Promise((resolve, reject) => {
    	let parentNameList = Object.keys(template),
    		i = 0;
        if (!parentNameList.length) { return };
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
                this.createdDom(template[name].template, element);
            }
            parent.appendChild(element);
        }
        resolve();
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
        	this.createdDom(template[edit], newNode);
        }
    }
	parent.replaceChild(newNode, usedNode)
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
        dom['on' + type] = handler;
    }
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
