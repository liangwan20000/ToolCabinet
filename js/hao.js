// 获取当前时间
function getTime () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var d1 = date.getDate();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();
    var time_str = year + '-' + month + '-' + d1 + ' '+h + ':'+ m + ':' + s;
    return time_str;
}
// 获取单个元素
function queryE (element) {
	return document.querySelector(element);
}
// 获取多个元素
function queryA (element) {
	return document.querySelectorAll(element);
}
// 创建元素
function creatE (element) {
	return document.createElement(element);
}
// 元素注册事件
function addE () {
	return a.addEventListenner(arguments[0],arguments[1],arguments[2]);
}
// 解除元素注册事件
function removeE () {
	return arguments[0].removeEventListener(arguments[1],arguments[2]);
}