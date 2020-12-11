<template>
  <div class="page-list-live">
    <PageList>
      <template #header>
        车辆管理
      </template>
      <template #filter>
        <ListFilter
          :form="topFilter"
          :key-list="keyList"
          @search="handleSearch"
          @reset="handleReset"
        ></ListFilter>
      </template>
      <template #tips>
        <el-button
          icon="el-icon-document-add"
          type="primary"
          @click="handleAdd"
        >新增</el-button>
      </template>
      <template #table>
        <ListTable
          ref="RefListTable"
          :loading="tableLoading"
          :table-data="tableData"
          :table-col="tableCol"
        >
          <template slot="col1" slot-scope="scope">
            <el-button
              icon="el-icon-edit"
              :loading="scope.row.loadingEdit"
              size="mini"
              type="text"
              @click="handleRowEdit(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              :loading="scope.row.loadingDel"
              size="mini"
              icon="el-icon-delete"
              style="color: red;"
              type="text"
              @click="handleRowDel(scope.row)"
            >
              删除
            </el-button>
          </template>
        </ListTable>
      </template>
    </PageList>
    <!-- 新增车辆组件 -->
    <VehicleManagement ref="VehicleManagement"></VehicleManagement>
  </div>
</template>
<script>
  import listMixin from '@/mixins/list'
  import VehicleManagement from './components/VehicleManagement'
  import ListFilter from '@/components/ListFilter'
  import { car } from '@/api/api'
  export default {
    components: {
      ListFilter,
      VehicleManagement
    },
    mixins: [listMixin],
    data() {
      return {
        // 在职状态
        statusList: [],
        deleteList: {
          id: ''
        },
        // 查询字段
        topFilter: {
          rfid: { label: 'RFID卡', placeholder: '请输入' },
          responsibleMan: { label: '负责人', placeholder: '请输入' },
          carStatus: { label: '车辆类型', placeholder: '请输入' },
          plateNumber: { label: '车牌号', placeholder: '请输入' }
        },
        // 列表数据
        tableData: [],
        // 列表表头
        tableCol: [
          { type: 'index', label: '序号', width: '60px' },
          { prop: 'rfid', label: 'RFID' },
          { prop: 'carStatus', label: '车辆类型' },
          { prop: 'plateNumber', label: '车牌号' },
          { prop: 'responsibleMan', label: '负责人' },
          { prop: 'responsiblePhone', label: '负责人电话' },
          { label: '操作', custom: 'col1' }
        ]
      }
    },
    methods: {
      // 请求列表数据
      async getList(query) {
        console.log('123')
        this.tableLoading = true
        try {
          let obj = query || { pageIndex: 1, pageSize: 10 }
          const { data: { items: resData, count, pageIndex } } = await car('post', obj, false)
          this.tableData = resData.map(item => {
            item.loadingEdit = false
            item.loadingDel = false
            return item
          })
          this.$nextTick(() => {
            this.$refs['RefListTable'].update({ page: pageIndex, count })
            this.tableLoading = false
          })
        } catch (err) {
          this.tableLoading = false
          console.error('getList err: ', err)
        }
      },
      afterEditSuccess() {
        this.getList()
      },
      handleAdd() {
        this.$refs['VehicleManagement'].open()
      },
      handleRowEdit(row) {
        this.$refs['VehicleManagement'].open(row)
      },
      async delRowReq(row) {
        try {
          const obj = { id: row.id, value: null }
          await employee('delete', obj, true)
          row.loadingDel = false
          await this.getList()
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        } catch (err) {
          row.loadingDel = false
          console.error('handleRowDel err: ', err)
        }
      },
      handleRowDel(row) {
        row.loadingDel = true
        this.$_delConfirm('车辆', () => {
          this.delRowReq(row)
        }, () => {
          row.loadingDel = false
        })
      }
    }
  }
</script>

<style lang="scss" scoped></style>
