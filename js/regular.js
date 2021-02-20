/*
 * 验证封装
 */
import _ from 'lodash'
import { duplicateCheck } from '@/api/api'
import store from '@/store'
const strategies = {
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
  // 只能输入数字和字母
  isNumberLetter(val, errMsg) {
    let noChinese = /^[0-9a-zA-Z]{1,}$/
    if (!noChinese.test(val)) {
      return errMsg
    }
  },
  // 只能输入数字母下划线
  isNumberLetterLine(val, errMsg) {
    let noChinese = /\w/
    if (!noChinese.test(val)) {
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
  // 只能输入数字和一个点
  isNumber (val, errMsg) {
    let ary = val.match(/[.]/g)
    let noChinese = /^[0-9.]{1,}$/
    if (!noChinese.test(val) && ary.length > 1) {
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
  // 验证重复
  async isRepeat (val, errMsg) {
    if (!val) { return }
    let ary
    if (store.getters.editStatus.status) {
      ary = [
        { key: errMsg.key, value: val, operation: 0, sequence: 0 },
        { key: 'id', value: store.getters.editStatus.id, operation: 1, relationship: 0, sequence: 1 },
      ]
    } else {
      ary = [
        { key: errMsg.key, value: val, operation: 0 },
      ]
    }
    let result = await duplicateCheck(errMsg.url, 'POST', ary)
    if (result.code === 200) {
      if (result.data.exists) {
        return errMsg.value
      }
    }
  },
  // 验证
  isCompareSize(standard, value, errMsg) {
      if (parseFloat(value.start) < parseFloat(standard.start) || parseFloat(value.end) < parseFloat(standard.end)) {
          return { flag: false, message: errMsg }
      }
  },
  /**
   * 唯一性校验
   *
   * @example
   * { rule: 'isUnique:user/unique:val', msg: '手机号已被使用' }
   * @param {string} val - 需要验证的值，element自动传入
   * @param {string} apiPath - user/unique: 接口地址
   * @param {string} key - val: 接口传参的参数名
   * @param {string} errMsg - msg: 返回的错误信息。“手机号已被使用”
   * @returns {Object} - 例如：{value: "xxx", status: false, msg: "手机号已被使用"}
   */
  async isUnique(val, apiPath, key, errMsg) {
    try {
      const formData = {}
      formData[key] = val
      await api[apiPath](formData)
    } catch (err) {
      return err.message ? err.message : errMsg
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
