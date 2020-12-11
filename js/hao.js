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
    console.log(lastTime.getMonth())
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
    console.log(date.getFullYear() + '-' + month + '-' + day)
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