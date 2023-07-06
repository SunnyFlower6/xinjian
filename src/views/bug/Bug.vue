<template>
  <div class="bug-container" >
      <div class="bug-content">
         <Row style="height:100%" ref="tableRef">
             <iCol span="24">
          <div> 
             <Row class="bug-headClass">
          <RadioGroup v-model="timeRange" type="button" @on-change="handleRangeChange">
            <Radio v-for="(range, key) of ranges" :key="key" :label="key"></Radio>
          </RadioGroup>
          <Divider type="vertical" />
          <Input search clearable placeholder="输入内容或用户" class="search-inline" @on-search="handleSearch" @on-clear="handleClearSearch"/>
            </Row>
          <Table
          border 
          tooltip="true"
          :columns="fields" 
          :data="bugs" 
          :loading="loading" 
          :height="tableHeight"
          />
            <Page  
            style="float:left;margin:10px;" 
            :current="current" 
            :total="total" 
            @on-change="handlePageChange" 
            @on-page-size-change="handlePageSize"
            :page-size="pageSize"
            :page-size-opts="[10, 20, 30, 40, 50]"
             size="small"
              show-elevator
              show-total
              show-sizer
            />
       </div>
        </iCol>
      </Row>
    </div>
  </div>
</template>
<script>
import { page } from '@/api/bug'
export default {
  data () {
    return {
      ranges: {
        '近1个月': '1M',
        '近3个月': '3M',
        '近半年': '6M'
      },
      timeRange: '近1个月',
      q: '',
      fields: [
        { key: 'id', title: 'ID', align: 'left', width: 100 },
        { key: 'username', title: '登录用户', align: 'left', width: 120 },      
        { key: 'content', title: '内容', align: 'left', width: 600 },
        { key: 'time', title: '操作时间', align: 'left', width: 180 },
        { key: 'code', title: '代码', align: 'left', width: 120 },       
        { key: 'url', title: 'URL', align: 'left' }
      ],
      bugs: [],
      loading: false,
      total: 0,
      current: 1,
      pageSize: 20,
      tableHeight:0
    }
  },
  methods: {
    fetchBugs () {
      this.loading = true
      const { current: pageNumber, pageSize, q } = this
      page({ pageNumber, pageSize, range: this.ranges[this.timeRange], q }).then(res => {
        if (res.data.state === 'ok') {
          this.bugs = res.data.list
          this.total = res.data.totalRow
        }
        this.loading = false
      })
    },
    handleRangeChange () {
      this.current = 1
      this.fetchBugs()
    },
    handleSearch (q) {
      this.q = q
      this.current = 1
      this.fetchBugs()
    },
    handleClearSearch () {
      this.q = ''
      this.current = 1
      this.fetchBugs()
    },
    handlePageChange (page) {
      this.current = page
      this.fetchBugs()
    },
      handlePageSize(value) {
      this.pageSize = value
     this.fetchBugs()
    },
  },
  mounted () {
      this.tableHeight =   document.body.clientHeight - 200
      this.fetchBugs() 
  }
}
</script>

<style>
.bug-container {
   height: 100%;
  padding: 24px;
  position: relative;
}
.bug-content {
  height: 100%;
  background: white;
  text-align: left;
}
.bug-headClass {
  padding: 5px 10px;
  border-top: 1px solid #d7dde4;
  background: #e9e9e9;
}

</style>
<style>
.search-inline {
  width: 300px;
  display: inline-block;
}
.search-inline .ivu-input-search {
  display: inline-block;
  height: 32px;
  width: auto;
}
.search-inline .ivu-input-search {
  line-height: 32px;
}
</style>
