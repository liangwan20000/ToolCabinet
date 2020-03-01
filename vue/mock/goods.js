import Mock from 'mockjs'

// 模拟一个获取商品列表的API数据接口
// 注意：一定要和后台开发人员，约定好数据类型和字段名称
Mock.mock('/api/goodslist', 'get', {
  'data|5-10': [
    {
      'id|+1': 0, // Id 自增+1
      name: '@cword(6, 10)', // 生成中文的字符串
      price: '@natural(2, 20)', // 生成自然数
      img: '@dataImage(70x70)' // 生成图片（指定宽高）
    }
  ],
  message: '获取商品列表成功',
  status: 200
})

// 添加商品
Mock.mock('/api/addgoods', 'post', function(option) {
  console.log(option)
  return Mock.mock({
    status: 200,
    message: '@cword(10, 20)'
  })
})

// 根据Id获取商品的详情
Mock.mock(/\/api\/goods/, 'get', {
  data: {
    id: '@natural(0, 10)', // Id 自增+1
    name: '@goodsname()', // 调用自定义的 Mock 函数
    price: '@natural(2, 20)', // 生成自然数
    img: '@dataImage(70x70)' // 生成图片（指定宽高）
  },
  status: 200,
  message: '获取商品成功！'
})
