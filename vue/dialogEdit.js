/*
 * 弹框 编辑mixin
 */
import commonMixin from '@/mixins/common'
import request from '@/utils/request'
const mixin = {
  mixins: [commonMixin],
  data() {
    return {
      row: {},
      // 编辑模式
      isEdit: false,
      // 人员管理查看详情状态
      lookSee: false,
      // 模态窗状态
      dialogVisible: false,
      // 确定按钮loading
      loadingSubmit: false,
      // 接口
      apiKey: {
        search: '', // 查询
        add: '', // 添加
        put: '' // 修改
      },
      // 表单数据
      formData: {},
      pagerData: {
        pageIndex: 1,
        count: 0,
        pageSize: 10
      },
      // 保存请求过来的数据
      searchValue: {},
      timeData: {}
    }
  },
  methods: {
    // 设置表单对象的值
    // resetFormData() {
    //   this.formData = {}
    // },
    // 查询单条数据
    async getSearch(bln, date) {
      try {
        if (bln) {
          if (date) {
            let ary = []
            if (this.timeData.end && this.timeData.start) {
              ary = [{
                key: 'employeeId',
                value: this.row.employeeId,
                operation: 0,
                sequence: 0,
                relationship: 0
              }, {
                key: 'enterTime', value: this.timeData.start,
                operation: 4,
                sequence: 1,
                relationship: 0
              }, {
                key: 'leaveTime', value: this.timeData.end,
                operation: 5,
                sequence: 2,
                relationship: 0
              }]
            } else if (!this.timeData.end && this.timeData.start) {
              ary = [{
                key: 'employeeId',
                value: this.row.employeeId,
                operation: 0,
                sequence: 0,
                relationship: 0
              }, {
                key: 'enterTime', value: this.timeData.start,
                operation: 4,
                sequence: 1,
                relationship: 0
              }]
            } else {
              this.$message.error('无进场时间无法查询！')
            }
            let postData = { pageIndex: this.pagerData.pageIndex, pageSize: this.pagerData.pageSize, search: ary }
            // 调用接口
            let res = await request({ url: this.apiKey.search, method: 'POST', data: postData})
            this.searchValue = res
          } else {
            // 调用接口
            const res = await request(this.apiKey.search, 'post', { pageIndex: 1, pageSize: 10, rfid: this.row.employee.rfid })
            // 详情会用到
            this.searchValue = res
          }
        } else {
          // 调用接口
          const res = await request(this.apiKey.search + this.row.id, 'GET', null)
          this.searchValue = res.data
          // 这里展示的是表单数据
          const formKeys = Object.keys(this.formData)
          formKeys.forEach((item) => {
            this.formData[item] = res.data[item]
          })
          // 编辑时保存ID
          this.formData.id = res.data.id
        }
      } catch (err) {
        let one = err
      }
      this.$_loadingPageClose()
    },
    // 打开模态窗
    async open(row, bln = false, see = false, date = false) {
      this.pagerData = {
        pageIndex: 1,
        count: 0,
        pageSize: 10
      }
      // 改变模态窗状态
      this.dialogVisible = true
      this.resetFormData()
      // 是否有数据
      if (row) {
        // 开启编辑模式
        this.isEdit = true
        // 人员管理查看详情状态
        this.lookSee = see
        // 保存数据
        this.row = row
        // 开启背景
        this.$_loadingPageOpen()
        if (typeof date !== 'boolean') {
          this.timeData = date
        }
        // 查询编辑的数据
        await this.getSearch(bln, date)
        // 设置编辑模式
        await this.$store.dispatch('user/setEdit', {
          status: true,
          id: row.id
        })
      } else {
        // 关闭编辑模式
        this.isEdit = false
        // 人员管理查看详情状态
        this.lookSee = see
        // 不是编辑模式时不保存数据
        this.row = {}
        // 设置编辑模式
        await this.$store.dispatch('user/setEdit', { status: false, id: null })
      }

      this.$nextTick(() => {
        if (this.$refs.RefForm) {
          this.$refs.RefForm.clearValidate()
        }
      })
    },
    // 应用程序
    openOne(obj) {
      let that = this
      let objData = {
        status: 'edit',
        row: obj,
        searchData: searchData,
        id: obj.id,
      }
      switch (obj.status) {
        case 'add':

          break
        case 'edit':
          that.editHandleProgram(obj)
          break
        case 'see':

          break
        case 'details':

          break
        default:

          break
      }
    },
    // 编辑处理程序
    async editHandleProgram (obj) {
      // 重置表单
      this.resetFormData()
      // 改变模态窗状态
      this.dialogVisible = true
      // 开启编辑模式
      this.isEdit = true
      // 保存数据
      this.row = obj.row
      // 开启背景
      // this.$_loadingPageOpen()
      // 设置编辑模式
      await this.$store.dispatch('user/setEdit', {
        status: true,
        id: row.id
      })
      // 查询参数处理
      // let postData = await this.searchDataHandleProgram(obj.row)
      // 查询编辑的数据
      await this.searchEditData(obj.row, obj.searchData)

      this.$nextTick(() => {
        if (this.$refs.RefForm) {
          // 移除表单项的校验结果
          this.$refs.RefForm.clearValidate()
        }
      })
    },
    // 查询编辑的数据
    async searchEditData(row, postData) {
      try {
        let res = await request({ url: row.url, method: row.method, [row.key]: postData})

        await this.responseDataHandleProgram(res)
      } catch (err) {
        let one = err
      }
      
      this.$_loadingPageClose()
    },
    
    // 详情处理程序
    async detailsHandleProgram (obj) {
      this.pagerData = {
        pageIndex: 1,
        count: 0,
        pageSize: 10
      }
      // 改变模态窗状态
      this.dialogVisible = true
      // 保存数据
      this.row = obj.row
      // 开启背景
      // this.$_loadingPageOpen()
      // 查询参数处理
      // let postData = await this.searchDataHandleProgram(obj.row)
      // 查询详情的数据
      await this.searchdetailsData(obj.row, obj.searchData)

      this.$nextTick(() => {
        if (this.$refs.RefForm) {
          // 移除表单项的校验结果
          this.$refs.RefForm.clearValidate()
        }
      })
    },
    // 查询详情的数据
    async searchdetailsData(row, postData) {
      try {
        let res = await request({ url: row.url, method: row.method, [row.key]: postData})

        await this.responseDataHandleProgram(res)
      } catch (err) {
        let one = err
      }
      
      this.$_loadingPageClose()
    },
    // 查询参数处理
    searchDataHandleProgram (row) {
      // 处理查询参数
      let searchData = {
        pageIndex: this.pagerData.pageIndex,
        pageSize: this.pagerData.pageSize,
      }
      return searchData
    },
    // 应用程序
    applicationProgram() {

    },
    // 关闭模态窗
    close() {
      this.row = {}
      this.searchValue = {}
      if (this.imgUrl) {
        this.imgUrl = ''
      }
      this.formData = {}
      if (this.$refs.RefForm) {
        this.$refs.RefForm.resetFields()
      }
      // Object.assign(this.$data, this.$options.data.call(this))
      // 变为添加模式
      this.isEdit = false
      // 关闭模态窗
      this.dialogVisible = false
    },
    // 格式化提交的数据
    formatFormData() {
      return this.formData
    },
    // 提交数据
    async reqFromData() {
      try {
        let msg = '新增'
        if (this.isEdit) {
          // 修改接口
          msg = '修改'
          await request(this.apiKey.put + this.row.id, 'PUT', this.formData)
        } else {
          // 添加接口
          if (this.apiKey.add === '/Attendance') {
            this.formData = {
              EmployeeId: this.formData.id,
              AttendanceType: this.formData.AttendanceType,
              EnterTime: this.formData.EnterTime,
              LeaveTime: this.formData.LeaveTime
            }
          }

          await request(this.apiKey.add, 'post', this.formData)
        }
        // 关闭loading
        this.loadingSubmit = false
        // 成功提示
        this.$message({
          type: 'success',
          message: `${msg}成功`
        })
        // 关闭弹窗
        this.close()
        // 调用父组件查询列表函数
        this.$emit('success')
      } catch (err) {
        this.loadingSubmit = false
        if (this.isEdit) {
          this.$message.error('修改失败！')
        } else {
          this.$message.error('新增失败！')
        }
        console.error('reqFromData err: ', err)
      }
    },
    // 点击提交
    handleSubmit() {
      this.loadingSubmit = true
      // 验证表单
      this.$refs.RefForm.validate((valid) => {
        if (valid) {
          this.reqFromData()
        } else {
          console.log(123123)
          this.loadingSubmit = false
        }
      })
    }
  }
}
export default mixin
