import { Random } from 'mockjs'

Random.extend({
  // 自定义 Mock 函数   @goodsname()
  goodsname: function() {
    const arr = ['苹果', '香蕉', '车厘子', '李子']
    return this.pick(arr)
  }
})
