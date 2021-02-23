/**
 * 处理时间
 * @param {(Object|string|number)} time 时间
 * @param {string} cFormat 格式
 * @returns {string | null}
 */
function parseTime(time, cFormat) {
	if (arguments.length === 0 || !time) {
		return null;
	}
  
	const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';

	let datetime;

	if (typeof time === 'object') {
		datetime = time
	} else {
		if ((typeof time === 'string') && time.includes('GMT')) {
			if ((/^[0-9]+$/.test(time))) {
				// support "1548221490638"
				time = parseInt(time)
			} else if ((typeof time === 'string') && !time.includes('GMT')) {
        // 转为正常的时间格式 年-月-日 时:分:秒
        let T_pos = time.indexOf('T');
        let Z_pos = time.indexOf('Z');
        let year_month_day = time.substr(0, T_pos);
        let hour_minute_second = time.substr(T_pos + 1, Z_pos-T_pos - 1);
        let new_datetime = year_month_day + " " + hour_minute_second; // 2017-03-31 08:02:06
        // 处理成为时间戳
        let timestamp = new Date(Date.parse(new_datetime));
        let new_timestamp = timestamp.getTime();
        timestamp = new_timestamp/1000;
        /**计算当前偏离UTC的小时数 */
        let disparityDate = new Date().getTimezoneOffset() / 60
        // 增加时差
        timestamp = timestamp - disparityDate * 60 * 60;
        // 时间戳转为时间
        time = parseInt(timestamp) * 1000;
      } else {
				// support safari
				// https://stackoverflow.com/questions/4310953/invalid-date-in-safari
				time = time.replace(new RegExp(/-/gm), '/')
			}
		}

		if ((typeof time === 'number') && (time.toString().length === 10)) {
			time = time * 1000
		}
		datetime = new Date(time)
	}

	const formatObj = {
		y: datetime.getFullYear(),
		m: datetime.getMonth() + 1,
		d: datetime.getDate(),
		h: datetime.getHours(),
		i: datetime.getMinutes(),
		s: datetime.getSeconds(),
		a: datetime.getDay()
	}
	const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
		const value = formatObj[key]
		// Note: getDay() returns 0 on Sunday
		if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
		return value.toString().padStart(2, '0')
	})
	return time_str
}
// 获取当前月的最后一天
function getLastDay () {
	// 现在的时间
	var date = new Date();
	// 获取当前月份
	var currentMonth = date.getMonth();
	// 获取下一个月
	var nextMonth = ++currentMonth;
	// 获取下个月的1号
	var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth , 1);
	// 设置一天的时间
	var oneDay = 1000 * 60 * 60 * 24;
	// 上个月的第一天减去一天得到当前月的最后一天的时间
	var lastTime = new Date(nextMonthFirstDay - oneDay);
	// console.log(lastTime.getMonth())
	// 得到当前月
	var month = parseInt(lastTime.getMonth() + 1);
	// 得到当前月最后一天
	var day = lastTime.getDate();
	if (month < 10) {
		month = '0' + month
	}
	if (day < 10) {
		day = '0' + day
	}
	return date.getFullYear() + '-' + month + '-' + day
}

/**
 * json数据导出为exsl表格
 * 
 * @param {json} jsonData json数据
 * @param {string} str 表头
 * @param {string} surfaceName 表名字
 * @returns {string | null}
 */
function tableToExcel(jsonData, str, surfaceName) {
  //要导出的json数据
  // const jsonData = [
  //     {
  //         name: '张先生',
  //         phone: '123456789',
  //         email: '000@123456.com'
  //     },
  //     {
  //         name: '王先生',
  //         phone: '123456789',
  //         email: '000@123456.com'
  //     },
  //     {
  //         name: '李先生',
  //         phone: '123456789',
  //         email: '000@123456.com'
  //     },
  //     {
  //         name: '赵先生',
  //         phone: '123456789',
  //         email: '000@123456.com'
  //     },
  // ]
  //列标题，逗号隔开，每一个逗号就是隔开一个单元格
  // let str = `姓名,电话,邮箱\n`;
  //增加\t为了不让表格显示科学计数法或者其他格式
  for (let i = 0; i < jsonData.length; i++) {
      for (let item in jsonData[i]) {
          str += `${jsonData[i][item] + '\t'},`;
      }
      str += '\n';
  }
  //encodeURIComponent解决中文乱码
  let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
  //通过创建a标签实现
  let link = document.createElement("a");
  link.href = uri;
  link.innerHTML = 'json数据表.csv下载';
  //对下载的文件命名
  link.download = surfaceName;
  document.body.appendChild(link);
  link.click()
  document.body.removeChild(link)
}

/**
 *根据指定的分割数，将数组（字符串）分割成块，剩余数量不足以达到分割数的亦形成一个数组
 *
 * @param {Array} array 获取的数组
 * @param {number} size 每一块的数量
 * @example
 *
 * _.chunk([1,2,3,4,5],2);
 * //=>[[1,2],[3,4],[5]]
 */
function chunk(array, size) {
	// 获取数组长度
	let length = array == null ? 0 : array.length
	// 如果为空返回空数组
	if (!length || size < 1) {
		return []
	}
	// 初始化
	let index = 0, resIndex = 0, result = Array(Math.ceil(length / size)) // 向上取整,得到一个已知 length 大小的数组

	// while (index < length) {
	//  result[resIndex] = array.slice(index, index + size)
	//  index = index + size
	//  resIndex++
	// }

	// 循环
	while (index < length) {
		result[resIndex++] = array.slice(index, (index += size))
	}
	return result
}

/**
 * animate动画
 * 
 * @param {Object} element DOM元素
 * @param {Number} up 起始位置
 * @param {Number} down 目标位置
 * @param {Number} juli 移动距离
 * @param {Date} time 时间
 * @returns {string | null}
 */
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

// 非堆叠可切换折线图
function initialization (echartsData, newLegend, data) {
	var myChart = echarts.init(document.getElementById(this.main))
	// 清空数据
	myChart.clear()
	// 指定图表的配置项和数据
	let option = {
		tooltip: {
			trigger: 'axis',
			axisPointer: {    // 坐标轴指示器，坐标轴触发有效
				type: 'line'  // 默认为直线，可选为：'line' | 'shadow'
			}
		},
		toolbox: {
			show: true,
			feature: {
				magicType: {show: true, type: ['line', 'bar']}
			}
		},
		// 控制图标区域位置
		grid: {
			top: '26%',
			left: '3%',
			bottom: '10%',
			containLabel: true
		},
		// 是否可缩放
		dataZoom: [
			{
				type: 'slider',
				show: true,
				xAxisIndex: 0,
				filterMode: 'empty' // empty 或 filter
			},
			{
				type: 'slider',
				show: true,
				yAxisIndex: 0,
				filterMode: 'empty' // empty 或 filter
			},
			{
				type: 'inside',
				show: true,
				xAxisIndex: 0,
				filterMode: 'empty' // empty 或 filter
			},
			{
				type: 'inside',
				show: true,
				yAxisIndex: 0,
				filterMode: 'empty' // empty 或 filter
			}
		],
		// 共多少种数据
		legend: {
			data: newLegend
		},
		// 横坐标显示的值
		xAxis: {
			type: 'category',
			data: echartsData.xAxis
		},
		// 纵坐标显示的数据形式
		yAxis: {
			type: 'value'
		},
		// 配置每一种数据如何显示
		series: data.map(item => {
			return {
				name: item.name,
				data: item.data,
				type: 'bar',
				stack: '总量' // 值为总量是堆叠图
			}
		})
	}
	// 使用刚指定的配置项和数据显示图表
	myChart.setOption(option)
}