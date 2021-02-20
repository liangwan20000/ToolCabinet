/*
 * 验证封装
 */
const strategies = {
  // 必填校验
  required(val, errMsg) {
    if (val === '' || typeof val === 'undefined') {
      return errMsg
    }
  },
  // 电话号码
  isMobile: function (val, errMsg) {
    // let isMobile = /^0?(13[0-9]|15[012356789]|18[0123456789]|14[57]|17[0-9])[0-9]{8}$/g;
    let isMobile = /^((0\d{2,3}-\d{7,8})|(\d{8}|\d{11}))$/
    if (!isMobile.test(val)) {
      return errMsg
    }
  },
  // 手机号
  isNormalMobile: function (val, errMsg) {
    let normalMobileReg = /^1[23456789][0-9]{9}$/
    if (!normalMobileReg.test(val)) {
      return errMsg
    }
  },
  // 验证手机号和电话号码
  isPhone (val, errMsg) {
    var tel = /^0\d{2,3}-?\d{7,8}$/
    var phone = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
    if(val.length == 11){//手机号码
      if(phone.test(val)) {
        return
      }
    }else if(val.length == 12 && val.indexOf("-") != -1 ){//电话号码
      if(tel.test(val)) {
        return
      }
    }
    return errMsg
  },
  isLineNumber: function (val, errMsg) {
    let isMobile = /^\s*\d+-?\d+\s*$/
    if (!isMobile.test(val)) {
      return errMsg
    }
  },
  // 验证是否为空
  isEmpty(val, errMsg) {
    if (_.trim(val) === '') {
      return errMsg
    }
  },
  // 不能输入中文
  isChinese(val, errMsg) {
    let noChinese = /^[\u4e00-\u9fa5]{1,}$/
    if (noChinese.test(val)) {
      return errMsg
    }
  },
  // ip
  isIp(val, errMsg) {
    let noChinese = /^[0-9\.]{1,}$/
    if (!noChinese.test(val)) {
      return errMsg
    }
  },
  // 密码：只能输入数字字母下划线
  isPassword(val, errMsg) {
    // 匹配不能是中文
    let noChinese = /^[^\u4e00-\u9fa5]{10,}$/
    // 匹配必须包含数字字母和特殊字符
    let patrn = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、])/
    // 匹配三位相同数字
    let two = /(\d)\1{2}/
    // 匹配三位连续数字
    let one = /\d((?<=0)1|(?<=1)2|(?<=2)3|(?<=3)4|(?<=4)5|(?<=5)6|(?<=6)7|(?<=7)8|(?<=8)9){2}/
    if (!noChinese.test(val) || one.test(val) || two.test(val) || !patrn.test(val)) {
      return errMsg
    }
  },
  // 验证现在的值是否在目标值范围内
  isCompareSize(standard, value, errMsg) {
      if ((parseFloat(value.start) < parseFloat(standard.start)) || (parseFloat(value.end) < parseFloat(standard.end))) {
          return { flag: false, message: errMsg }
      }
  }
}
const validate = async arr => {
  let obj = {
    status: true
  }
  for (let i = 0, l1 = arr.length; i < l1; i++) {
    let item = arr[i]
    let stop = false
    for (let k = 0, l2 = item.rules.length; k < l2; k++) {
      let r = item.rules[k]
      let arg = r.rule.split(':')
      let rule = arg.shift()
      
      if (r.type) {
        arg.unshift(r.type)
      }
      arg.unshift(item.value)
      arg.push(r.msg)
      let status = await strategies[rule].apply(null, arg)
      if (status) {
        obj = {
          value: item.value,
          status: false,
          msg: status
        }
        stop = true
        break
      }
    }
    if (stop) break
  }
  return obj
}
export default validate
