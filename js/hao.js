function PageObj (value) {
    this.obj = {
        ...value
    };
}
// 设置本页数据
PageObj.prototype.storageSetHandle = function (data) {
    let storage = this.obj,
        thisArr = Object.keys(storage),
        ary = Object.keys(data),
        i = 0, j = 0, len = ary.length;

    for (i; i < len; i++) {
        // 检查this中是否有要更新的键
        if (thisArr.includes(ary[i])) {
            storage[ary[i]] = data[ary[i]];
        };
    };
}

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
// 验证TOKEN是否过期
async function getLoginCheck(name) {
    // 获取token
    let data = null, tokenItem = JSON.parse(window.localStorage.getItem(name));
    // 如果token存在
    if (tokenItem) {
        // 验证TOKEN是否过期
        let response = await userRequest('loginCheck', { sessionId: tokenItem });
        if (response.status === 'success') {
            // 没有过期携带token
            data = tokenItem;
        } else {
            // 过期token
            // 删除token
            removeStorage(name);
            // 删除用户信息
            removeStorage('userinfo');
            // 设置返回值
            data = false
        }
    } else {
        // 如果token不存在
        // 删除用户信息
        removeStorage('userinfo');
        // 设置返回值
        data = false
    }
    return data
}
// 查询本地数据
function getStorage(name) {
    return JSON.parse(window.localStorage.getItem(name));
}
// 设置本地数据
function setStorage(name, data) {
    return window.localStorage.setItem(name, JSON.stringify(data));
}
// 删除本地数据
function removeStorage(name) {
    window.localStorage.removeItem(name);
}
// 提示框
function message (content, time, status) {
    let div = document.createElement('div');
    if (status === 'success') {
        div.classList.add('alertSuccessMessage');
    } else if (status === 'error') {
        div.classList.add('alertErrorMessage');
    } else if (status === 'warning') {
        div.classList.add('alertWarningMessage');
    }
    
    div.innerText = content;
    document.body.appendChild(div);
    let timeId = null;
    timeId = setTimeout(() => {
        deletMessage(div, timeId);
    }, time);
}
// 清除提示框
function deletMessage (element, id) {
    document.body.removeChild(element);
    clearTimeout(id);
}
// 根据url参数生成对象
function getLoction (url) {
    if (!url) { return false };
    let index = 0, value = '', ary = [], i = 0, len = 0, obj = {}, list = [];
    // 找到问号索引
    index = url.indexOf('?');
    // 截取所有参数
    value = url.slice(index + 1);
    // 分割不同参数
    ary = value.split('&');
    len = ary.length;

    for (i = 0; i < len; i++) {
        list = ary[i].split('=');
        obj[list[0]] = decodeURIComponent(list[1]);
    };

    return obj;
}
// 根据对象生成URL参数
function mergeObj (data) {
    let ary = Object.keys(data), i = 0, str = '';
    for (i; i < ary.length; i++) {
        if (i === ary.length - 1) {
            str += ary[i] + '=' + encodeURIComponent(data[ary[i]]);
        } else {
            str += ary[i] + '=' + encodeURIComponent(data[ary[i]]) + '&';
        }
    };
    return str;
}
/**
 * [aLinkDownload 下载文件，并设置文件名称]
 * @AuthorHTL 
 * @DateTime  2021-05-31T14:20:15+0800
 * @param     {[type]}                 value    [其他参数]
 * @param     {[type]}                 fileName [设置下载文件的名称]
 * @param     {[type]}                 hrefUrl  [下载地址，文件地址]
 * @return    {[type]}                          [description]
 */
function aLinkDownload (value, fileName, hrefUrl) {
    try {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", hrefUrl, true);
        xhr.responseType = "blob";
        xhr.onload = function() {
            if (xhr.status === 200) {
                if (window.navigator.msSaveOrOpenBlob) {
                    navigator.msSaveBlob(blob, filename);
                } else {
                    let link = document.createElement("a");
                    let body = document.querySelector("body");

                    link.style.display = "none";
                    link.href = window.URL.createObjectURL(xhr.response);
                    link.download = fileName;

                    body.appendChild(link);

                    link.click();
                    body.removeChild(link);

                    window.URL.revokeObjectURL(link.href);
                }
            }
        };
        xhr.send();
    } catch (error) {
        console.lo(error);
    }
}

//开始loading
function openLoading(date) {
    // <div class="loadingboxer">
    //     <div class="loadingbg"></div>
    //     <div class="loadingmask"></div>
    // </div>
    let div = creatE('div'), divTwo = creatE('div'), divThree = creatE('div'), fragment = document.createDocumentFragment(), loadingTime = null;
    div.classList.add('loadingboxer');
    divTwo.classList.add('loadingbg');
    divThree.classList.add('loadingmask');
    div.appendChild(divTwo);
    div.appendChild(divThree);
    fragment.appendChild(div);
    document.body.appendChild(fragment);
    if (typeof date === 'number') {
        loadingTime = setTimeout(function() {
            closeLoading(div, loadingTime);
        }, date * 1000);
    };
}

//关闭loading
function closeLoading(element = false, loadingTime = false) {
    if (!element) {
        element = queryE('.loadingboxer');
    };
    element.remove();
    if (loadingTime) {
        clearTimeout(loadingTime);
    };
}

// 求两个值和的精确值
function accAdd(arg1, arg2){
    let r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m ) / m
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
            // show: true, // 控制坐标轴指示器显示隐藏
			trigger: 'axis',
            // triggerOn: 'none', // 控制坐标轴指示器显示隐藏
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
    let num = 0
    setInterval(() => {
        // 自动设置选中项  
        myChart.dispatchAction({
            type: 'showTip',
            // 可选，系列 index，可以是一个数组指定多个系列
            seriesIndex: 0,
            // 可选，系列名称，可以是一个数组指定多个系列
            // seriesName: '衬衫',
            // 可选，数据的 index
            dataIndex: num,
            // 可选，数据的 名称
            // name: '衬衫'
        })
        num++
    }, 2000)
}