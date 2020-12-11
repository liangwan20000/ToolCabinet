var fn = {
  ajax: function(type, url, data, fn, load) {
    var domainName = onlineApi;
    // var domainName= onlineApi;
    data.miniAppKey = "ADMIN_SYSTEM";
		if (!data.projectInfo) {
			data.projectId = data.projectId ? data.projectId : parent.getUserInfo().projectId;
		}
    if (type == "GET") {
      if (typeof(load) == "undefined" || !load) {
        openLoading();
      }
      $.ajax({
        type: type,
        headers: {
          uid: parent.getUserInfo().id,
          token: parent.getUserInfo().token,
          loginName: parent.getUserInfo().loginName,
          realName: encodeURI(parent.getUserInfo().realName)
        },
        url: domainName + url,
        contentType: "application/json",
        data: data,
        success: function(res) {
          if (res.code == 40001) {
            if(localStorage.getItem("fromType") == 1){
              top.location.href = "login.html";
            }else if(localStorage.getItem("fromType") == 2){
              top.location.href = "login_merchant.html";
            }
            return;
          }
          if (typeof(load) == "undefined" || !load) {
            closeLoading()
          }
          fn(res);
        },
        error: function() {
          win.confirm('提示', '操作失败，请重试！', function (r) {
            if(r){
              location.reload();
            }
          });
        }
      })
    } else if (type == "POST") {
      if (typeof(load) == "undefined" || !load) {
        openLoading();
      }
      $.ajax({
        type: type,
        headers: {
          uid: parent.getUserInfo().id,
          token: parent.getUserInfo().token,
          loginName: parent.getUserInfo().loginName,
          realName: encodeURI(parent.getUserInfo().realName)
        },
        url: domainName + url,
        datType: "JSON",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(res) {
          if (res.code == 40001) {
            if(localStorage.getItem("fromType") == 1){
              top.location.href = "login.html";
            }else if(localStorage.getItem("fromType") == 2){
              top.location.href = "login_merchant.html";
            }
            return;
          }
          if (typeof(load) == "undefined" || !load) {
            closeLoading()
          }
          fn(res);
        },
        error: function() {
          win.confirm('提示', '操作失败，请重试！', function (r) {
            if(r){
              location.reload();
            }
          });
        }
      })
    } else {
      win.alert('提示',"类型错误");
    }
  },
  ajaxWithProjectId: function(type, url, data, fn, load) {
    var domainName = onlineApi;
    // var domainName= onlineApi;
    data.miniAppKey = "ADMIN_SYSTEM";
    if (type == "GET") {
      if (typeof(load) == "undefined" || !load) {
        openLoading();
      }
      $.ajax({
        type: type,
        headers: {
          uid: parent.getUserInfo().id,
          token: parent.getUserInfo().token,
          loginName: parent.getUserInfo().loginName,
          realName: encodeURI(parent.getUserInfo().realName)
        },
        url: domainName + url,
        contentType: "application/json",
        data: data,
        success: function(res) {
          if (res.code == 40001) {
            if(localStorage.getItem("fromType") == 1){
              top.location.href = "login.html";
            }else if(localStorage.getItem("fromType") == 2){
              top.location.href = "login_merchant.html";
            }
            return;
          }
          if (typeof(load) == "undefined" || !load) {
            closeLoading()
          }
          fn(res);
        },
        error: function() {
          win.confirm('提示', '操作失败，请重试！', function (r) {
            if(r){
              location.reload();
            }
          });
        }
      })
    } else if (type == "POST") {
      if (typeof(load) == "undefined" || !load) {
        openLoading();
      }
      $.ajax({
        type: type,
        headers: {
          uid: parent.getUserInfo().id,
          token: parent.getUserInfo().token,
          loginName: parent.getUserInfo().loginName,
          realName: encodeURI(parent.getUserInfo().realName)
        },
        url: domainName + url,
        datType: "JSON",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function(res) {
          if (res.code == 40001) {
            if(localStorage.getItem("fromType") == 1){
              top.location.href = "login.html";
            }else if(localStorage.getItem("fromType") == 2){
              top.location.href = "login_merchant.html";
            }
            return;
          }
          if (typeof(load) == "undefined" || !load) {
            closeLoading()
          }
          fn(res);
        },
        error: function() {
          win.confirm('提示', '操作失败，请重试！', function (r) {
            if(r){
              location.reload();
            }
          });
        }
      })
    } else {
      win.alert('提示',"类型错误");
    }
  },
  ajaxS: function(transformParams) {
    const domainName = onlineApi
    const defaultParams = $.extend(true, {
      type: 'GET',
      url: '',
      data: {},
      fn: () => {},
      load: undefined,
      isMiniAppKey: true
    }, transformParams)
    const uInfo = parent.getUserInfo()
    const generalFnc = () => {
      if (typeof(defaultParams.load) === "undefined" || !defaultParams.load) {
        openLoading()
      }
      if (defaultParams.isMiniAppKey) {
        defaultParams.data.miniAppKey = "ADMIN_SYSTEM"
      }
      $.ajax({
        type: defaultParams.type,
        headers: {
          uid: uInfo.id,
          token: uInfo.token,
          loginName: uInfo.loginName,
          realName: encodeURI(uInfo.realName)
        },
        url: domainName + defaultParams.url,
        contentType: "application/json",
        data: defaultParams.type === 'POST' ? JSON.stringify(defaultParams.data) : defaultParams.data,
        success: function(res) {
          if (res.code == 40001) {
            if(localStorage.getItem("fromType") == 1){
              top.location.href = "login.html";
            }else if(localStorage.getItem("fromType") == 2){
              top.location.href = "login_merchant.html";
            }
            return;
          }
          if (typeof(defaultParams.load) === "undefined" || !defaultParams.load) {
            closeLoading()
          }
          defaultParams.fn(res)
        },
        error: function() {
          win.confirm('提示', '操作失败，请重试！', function (r) {
            if(r){
              location.reload();
            }
          });
        }
      })
    }
    generalFnc()
  },
  req: function(transformParams) {
    const _this = this
    const domainName = onlineApi
    const defaultParams = $.extend(true, {
      type: 'GET',
      url: '',
      data: {},
      load: undefined,
      isMiniAppKey: true,
      outSiteApi: false,
      errorSmp: false,
    }, transformParams)
    const uInfo = parent.getUserInfo()
    return new Promise((resolve, reject) => {
      if (typeof(defaultParams.load) === "undefined" || !defaultParams.load) {
        openLoading()
      }
      if (defaultParams.isMiniAppKey) {
        defaultParams.data.miniAppKey = "ADMIN_SYSTEM"
      }
      let newApiUrl = domainName + defaultParams.url
      if (defaultParams.outSiteApi) {
        newApiUrl = defaultParams.url
        $.ajax({
          el: defaultParams.type,
          url: newApiUrl,
          data: defaultParams.type === 'POST' ? JSON.stringify(defaultParams.data) : defaultParams.data,
          success: function(res) {
            if (typeof(defaultParams.load) === "undefined" || !defaultParams.load) {
              closeLoading()
            }
            resolve(res)
          },
          error(err) {
            win.alert('提示',err)
            reject(err)
          }
        })
      } else {
        $.ajax({
          type: defaultParams.type,
          headers: {
            uid: uInfo.id,
            token: uInfo.token,
            loginName: uInfo.loginName,
            realName: encodeURI(uInfo.realName)
          },
          url: newApiUrl,
          contentType: "application/json",
          data: defaultParams.type === 'POST' ? JSON.stringify(defaultParams.data) : defaultParams.data,
          success: function(res) {
            if (res.code == 40001) {
              if(localStorage.getItem("fromType") == 1){
                top.location.href = "login.html";
              }else if(localStorage.getItem("fromType") == 2){
                top.location.href = "login_merchant.html";
              }
              return;
            }
            if (typeof(defaultParams.load) === "undefined" || !defaultParams.load) {
              closeLoading()
            }
            if (res.code === 200) {
              resolve(res)
            } else {
              if (defaultParams.errorSmp) {
                win.alert('提示',res.messageToUser)
              } else {
                win.alert('提示','错误代码：' + res.code + '；错误信息：' + res.messageToUser)
              }
              reject(res)
            }
          },
          error: function() {
            win.confirm('提示', '操作失败，请重试！', function (r) {
              if(r){
                location.reload();
              }
            });
          }
        })
      }
    })
  },
  fileupload: function(file, imgFile, fn) {
    var url = "https://proservice.powerlong.com/file/uploadMulti_tengxun";
    var formData = new FormData();
    formData.append(file, imgFile);
    $.ajax({
      type: "post",
      url: url,
      data: formData,
      cache: false,
      processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
      contentType: false,
      success: function(res) {
        fn(res);
      },
      error: function() {
        win.confirm('提示', '操作失败，请重试！', function (r) {
          if(r){
            location.reload();
          }
        });
      }
    })
  },
  fileuploadWithTencent: function(file, imgFile, fn) {
    var url = common_upload_url_tencent;
    var formData = new FormData();
    formData.append(file, imgFile);
    $.ajax({
      type: "post",
      url: url,
      data: formData,
      cache: false,
      processData: false, // 不处理发送的数据，因为data值是Formdata对象，不需要对数据做处理
      contentType: false,
      success: function(res) {
        fn(res);
      },
      error: function() {
        win.confirm('提示', '操作失败，请重试！', function (r) {
          if(r){
            location.reload();
          }
        });
      }
    })
  },
  buttonPermissionVerification: function(url){
    // debugger
    // console.log(url)
    //按钮权限验证
    var buttonPermissionList = JSON.parse(localStorage.getItem('loginData')).buttonPermissionList;
    // console.log(buttonPermissionList)
    buttonPermissionList.forEach(function(e,i){
      // console.log(e,i)
      //url
      var getUrl = e.substring(0,e.lastIndexOf('_'))
      //btn
      var btnName = e.substring(e.lastIndexOf('_')+1)
      if(url == getUrl){
        // console.log(btnName)
        $('[showtype='+btnName+']').css("display","inline-block")
      }
    })
  },
  getDate: function(timestamp) {
    var date = new Date(timestamp * 1); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '/';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
    //var D = date.getDate() + ' ';
    //var h = date.getHours() + ':';
    //var m = date.getMinutes() + ':';
    //var s = date.getSeconds();
    return Y + M + D + h + m + s;
  },
  getDate2: function(timestamp) {
    var date = new Date(timestamp * 1); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '/';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    //var D = date.getDate() + ' ';
    //var h = date.getHours() + ':';
    //var m = date.getMinutes() + ':';
    //var s = date.getSeconds();
    return Y + M + D;
  },
  getParam: function(paramName) {
    var paramValue = "",
      isFound = !1;
    if (window.location.search.indexOf("?") == 0 && window.location.search.indexOf("=") > 1) {
      arrSource = unescape(window.location.search).substring(1, window.location.search.length).split("&"), i = 0;
      while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() ==
      paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
    }
    return paramValue == "" && (paramValue = null), paramValue
  },
  getParamURI: function(paramName) {
    var paramValue = "",
      isFound = !1;
    if (window.location.search.indexOf("?") == 0 && window.location.search.indexOf("=") > 1) {
      arrSource = decodeURIComponent(window.location.search).substring(1, window.location.search.length).split("&"), i = 0;
      while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() ==
      paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
    }
    return paramValue == "" && (paramValue = null), paramValue
  },
  copyObject: function(obj) {
    var newobj = {};
    for (var attr in obj) {
      newobj[attr] = obj[attr];
    }
    return newobj;
  },
  alert(msg) {
    win.alert('提示',msg)
  },
  formatDate(params) {
    /*
     * params.timestamp 需要格式化的日期，时间戳格式
     * params.separator 日期分隔符(数组)，默认输出 yyyy-mm-dd hh:mm:ss
     * * params.separatorYMD = ['年', '月', '日', '时', '分', '秒']
     * params.plusZero 时间日期是否补0
     * params.outFormat 输出格式，支持值：0 | 1 | 2 | 3 。0：年月日时分秒；1：年月日；2：时分秒，3. 年/月/日
     * params.separatorYMD 输出格式为1（年月日）时的分隔符，参数：数组，默认：yyyy-mm-dd
     * * params.separatorYMD = ['年', '月', '日']
     * params.separatorHMS 输出格式为1（时分秒）时的分隔符，参数：数组，默认：hh:mm:ss
     * * params.separatorYMD = ['时', '分', '秒']
     */
    const defParams = $.extend(true, {
      timestamp: new Date().getTime(),
      separator: ['-', '-', ' ', ':', ':', ''],
      separatorYMD: ['-', '-', ''],
      separatorYMD1: ['/', '/', ''],
      separatorHMS: [':', ':', ''],
      plusZero: true,
      outFormat: 0
    }, params)
    const addZero = el => el < 10 ? '0' + el : el
    const isPlusZero = el => defParams.plusZero ? addZero(el) : el
    const originDate = new Date(defParams.timestamp)
    const nYY = originDate.getFullYear()
    const nMM = isPlusZero(originDate.getMonth() + 1)
    const nDD = isPlusZero(originDate.getDate())
    const nhh = isPlusZero(originDate.getHours())
    const nmm = isPlusZero(originDate.getMinutes())
    const nss = isPlusZero(originDate.getSeconds())
		
    let bkDate = ''
    const isReal = el => el ? el : ''
    switch (defParams.outFormat) {
      case 0:
      {
        const sep = defParams.separator
        bkDate = nYY + sep[0] + nMM + sep[1] + nDD + sep[2] + nhh + sep[3] + nmm + sep[4] + nss + sep[5]
        break
      }
      case 1:
      {
        const sep = defParams.separatorYMD
        bkDate = nYY + sep[0] + nMM + sep[1] + nDD + isReal(sep[2])
        break
      }
      case 2:
      {
        const sep = defParams.separatorHMS
        bkDate = nhh + sep[0] + nmm + sep[1] + nss + isReal(sep[2])
        break
      }
			case 3:
			{
			  const sep = defParams.separatorYMD1
				// console.log(sep)
			  bkDate = nYY + sep[0] + nMM + sep[1] + nDD + isReal(sep[2])
			  break
			}
			case 4:
			{
			  // const sep = defParams.separatorYMD1
				const sep = defParams.separator
				bkDate = nYY + sep[0] + nMM + sep[1] + nDD + sep[2] + "00" + sep[3] + "00" + sep[4] + "01" + sep[5]
				break
			}
			case 5:
			{
			  // const sep = defParams.separatorYMD1
				// console.log(sep)
			  const sep = defParams.separator
			  bkDate = nYY + sep[0] + nMM + sep[1] + nDD + sep[2] + "23" + sep[3] + "59" + sep[4] + "59" + sep[5]
			  break
			}
      default:
      {
        console.error(`fn.formatDate："defParams.outFormat=${defParams.outFormat}"属性不被支持，请检查`)
        const sep = defParams.separator
        bkDate = nYY + sep[0] + nMM + sep[1] + nDD + sep[2] + nhh + sep[3] + nmm + sep[4] + nss + sep[5]
        break
      }
    }
    return bkDate
  },
  calcTimeInterval(fromTime, interval, type, after) {
    /*
     * 计算距离 fromTime 多少时间前的日期，返回时间戳
     * after为真时 计算距离多少时间后的日期，返回时间戳
     * fromTime 计算开始时间
     * interval 时间间隔
     * type 单位： day | week | month | year 。默认不填单位是毫秒 ms
     */
    let targetTime = new Date(fromTime)
    let bkTime = targetTime.getTime()
    switch (type) {
      case 'day':
      {
        if (after) { bkTime = targetTime.getTime() + 24 * 60 * 60 * 1000 * interval } else { bkTime = targetTime.getTime() - 24 * 60 * 60 * 1000 * interval }
        break
      }
      case 'week':
      {
        if (after) { bkTime = targetTime.getTime() + 24 * 60 * 60 * 1000 * interval * 7 } else { bkTime = targetTime.getTime() - 24 * 60 * 60 * 1000 * interval * 7 }
        break
      }
      case 'month':
      {
        if (after) { targetTime.setMonth(targetTime.getMonth() + interval) } else { targetTime.setMonth(targetTime.getMonth() - interval) }
        bkTime = targetTime.getTime()
        break
      }
      case 'year':
      {
        if (after) { targetTime.setFullYear(targetTime.getFullYear() + interval) } else { targetTime.setFullYear(targetTime.getFullYear() - interval) }
        bkTime = targetTime.getTime()
        break
      }
      default:
      {
        if (after) { bkTime = targetTime.getTime() + interval } else { bkTime = targetTime.getTime() - interval }
      }
    }
    return bkTime
  },
  isValid(val) {
    return val !== null && val !== 'null' && val !== undefined && val !== 'undefined'
  },
  formatObjectToQuery(query) {
    /*
     * 把对象转为get参数
     * query 类型为 Object
     * 例如 {aa:1,bb:2} 返回 ?aa=1&bb=2
     */
    const queryStr = Object.keys(query)
      .reduce((ary, key) => {
        if (query[key] || query[key] === 0) {
          ary.push(encodeURIComponent(key) + '=' + encodeURIComponent(query[key]));
        }
        return ary;
      }, [])
      .join('&');
    return `?${queryStr}`
  },
  formatParamsDelNull(obj) {
    /*
     * 删除空值参数
     * obj 类型为 Object
     * 例如 {aa:1,bb: ''} 返回 {aa:1}
     */
    const newTransData = {}
    for (let i in obj) {
      const propData = obj[i]
      if (propData !== '' && this.isValid(obj)) {
        newTransData[i] = propData
      }
    }
    return newTransData
  },
  getProjectInfo(pid) {
    const bkObj = {}
    if (localStorage.getItem('loginData')) {
      const bkRes = JSON.parse(localStorage.getItem('loginData'))
      const projectArr = bkRes.userInfo.projectInfo
      const findArr = projectArr.find(item => item.projectId === pid)
      bkObj.projectId = pid
      bkObj.projectName = findArr.projectName
      bkObj.regionId = findArr.regionId
      bkObj.regionName = findArr.regionName
    } else {
      bkObj.projectId = pid
    }
    return bkObj
  },
  numToChineseNum(num) {
    // 中文转数字
    // 例如： fn.numToChineseNum(65) ===> 六十五
    const changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    const unit = ["", "十", "百", "千", "万"]
    num = parseInt(num)
    let getWan = (temp) => {
      const strArr = temp.toString().split("").reverse()
      let newNum = ""
      for (let i = 0; i < strArr.length; i++) {
        newNum = (i == 0 && strArr[i] == 0 ? "" : (i > 0 && strArr[i] == 0 && strArr[i - 1] == 0 ? "" : ((strArr.length == 2 && i == 1 && strArr[i] == 1) ? '' : changeNum[strArr[i]]) + (strArr[i] == 0 ? unit[0] : unit[i]))) + newNum
      }
      return newNum
    }
    const overWan = Math.floor(num / 10000)
    let noWan = num % 10000
    if (noWan.toString().length < 4) noWan = "0" + noWan
    return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num)
  },
  exportPDF(id, name, noPage) {
    //需要调用以下JS
    // {url: 'js/plugins/print/html2canvas.min.js', cache: true},
    // {url: 'js/plugins/print/jspdf.min.js', cache: true},
    const $printArea = document.querySelector(`#${id}`)
    const aW = $printArea.offsetWidth
    const aH = $printArea.offsetHeight
    const aScale = 2
    const myCanvas = document.createElement("canvas")
    myCanvas.width = aW * aScale
    myCanvas.height  = aH * aScale
    const ctx = myCanvas.getContext("2d")
    ctx.scale(aScale, aScale)
    const rect = $printArea.getBoundingClientRect()
    ctx.translate( -rect.left, -rect.top)
    html2canvas($printArea, {
      scale: aScale,
      canvas: myCanvas
    }).then(canvas => {
      const context = canvas.getContext('2d')
      // 关闭抗锯齿
      context.mozImageSmoothingEnabled = false
      context.webkitImageSmoothingEnabled = false
      context.msImageSmoothingEnabled = false
      context.imageSmoothingEnabled = false

      // pdf时候自动分页
      const isNoPage = noPage
      const a4Width = 595.28
      const a4Height = 841.89
      const pW = canvas.width
      const pH = canvas.height
      const pageHeight = pW / a4Width * a4Height
      let leftHeight = pH

      let position = 0
      const imgWidth = a4Width
      const imgHeight = a4Width / pW * pH
      const pdf = new jsPDF({
        orientation: 'p',
        unit: 'pt',
        format: isNoPage ? [imgWidth, imgHeight < a4Height ? a4Height : imgHeight] : 'a4'
      })

      pdf.internal.scaleFactor = 2
      if (isNoPage === true) {
        pdf.addImage(canvas, 'JPEG', 0, 0, imgWidth, imgHeight)
      } else {
        if (leftHeight < pageHeight) {
          pdf.addImage(canvas, 'PNG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            pdf.addImage(canvas, 'PNG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -=  a4Height
            if (leftHeight > 0) {
              pdf.addPage()
            }
          }
        }
      }
      pdf.save(`${name}.pdf`)
    })
  },
  commonExport(url, params, callback) {
    const realUrl = `${api_path + url + this.formatObjectToQuery(params)}`
    let domA = document.createElement('a')
    domA.href = realUrl
    domA.click()
    typeof callback === 'function' && callback()
  },
  vueMixins() {
    return {
      mounted() {
        $('#vueContent').addClass('cur')
        // console.log('vue mixins loaded')
      }
    }
  },
  setHTML5History(name, val) {
    var searchInfo = JSON.stringify(val); //转化为JSON字符串
    localStorage.setItem(name, searchInfo);
  },
  getHTML5History(name) {
    if (localStorage.getItem(name)) {
      return JSON.parse(localStorage.getItem(name))
    } else {
      return false
    }
  },
  clearHTML5History(name) {
    localStorage.removeItem(name)
  }
}
//深度克隆
function deepClone(obj) {
  var result, oClass = isClass(obj);
  //确定result的类型
  if (oClass === "Object") {
    result = {};
  } else if (oClass === "Array") {
    result = [];
  } else {
    return obj;
  }
  for (key in obj) {
    var copy = obj[key];
    if (isClass(copy) == "Object") {
      result[key] = deepClone(copy); //递归调用
    } else if (isClass(copy) == "Array") {
      result[key] = deepClone(copy);
    } else {
      result[key] = obj[key];
    }
  }
  return result;
}
//返回传递给他的任意对象的类
function isClass(o) {
  if (o === null) return "Null";
  if (o === undefined) return "Undefined";
  return Object.prototype.toString.call(o).slice(8, -1);
}

var loadingTime = setTimeout(function() {
  $('.loadingboxer').remove();
}, 15000)

//开始loading
function openLoading(load) {
  $(document.body).append('<div class="loadingboxer"><div class="loadingbg"></div><div class="loadingmask"></div></div>');
  if (typeof(load) == "undefined") {
    loadingTime
  }
}

//关闭loading
function closeLoading() {
  $('.loadingboxer').remove();
  clearTimeout(loadingTime);
}
//时间转化
function timeformat(Date) {
  //时间转换
  var Y = Date.getFullYear();
  var M = Date.getMonth() + 1;
  M = M < 10 ? '0' + M : M; // 不够两位补充0
  var D = Date.getDate();
  D = D < 10 ? '0' + D : D;
  var H = Date.getHours();
  H = H < 10 ? '0' + H : H;
  var Mi = Date.getMinutes();
  Mi = Mi < 10 ? '0' + Mi : Mi;
  var S = Date.getSeconds();
  S = S < 10 ? '0' + S : S;
  return Y + '年' + M + '月' + D + '日 ' + H + ':' + Mi + ':' + S;
};
