
function animate (element, up, down, juli, time) {
	var timeID = null;
	// 设置只存在一个定时器,就是重置一下定时器的值
	if (element.timeID) {
		// 先清除一下定时器的值
		clearInterval(element.timeID);
		// 再创建一下
		element.timeID = null;
	}
	
	// 设置定时器
	element.timeID = setInterval(function () {
		// 往返运动判断元素起始位置是否大于目标位置
		if (up > down) {
			// 大于的话让每次移动的距离都是负数,如果不加绝对值,会出现负负得正,加绝对值相当于重置一下
			juli = -(Math.abs(juli))
		}
		// 判断元素位置是否等于目标位置/极值法
		if (Math.abs(up - down) <= Math.abs(juli)) {
			// 到了之后就不走了,需要给元素赋值
			up = down;
			// 清楚定时器
			clearInterval(element.timeID);
		}else {
			// 没到位置的时候让距离累加,并给元素赋值
			up += juli;
		}
		// 给元素设置最后样式
		element.style.left = up + 'px';
	}, time);
}