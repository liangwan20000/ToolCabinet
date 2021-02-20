// 跨浏览器的事件处理对象
var EventUtil = {
	// 添加事件处理程序
	addHandler: function (element, type, handler) {
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
	},
	// 获取事件对象
	getEvent: function (event) {
		return event ? event : window.event;
	},
	// 获取事件目标
	getTarget: function (event) {
		return event.target || event.srcElement;
	},
	// 阻止默认行为
	preventDefault: function (event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	},
	// 清理事件处理程序
	removeHandler: function (element, type, handler) {
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
	},
	// 取消默认行为
	stopPropagation: function (event) {
		if (event.stopPropagation) {
			event.stopPropagation();
		} else {
			event.cancelBubble = true;
		}
	}
};