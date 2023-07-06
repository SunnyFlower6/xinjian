<template>
  <Card :bordered="false" :dis-hover="true" class="message-card">
    <CellGroup>
      <Cell
        class="my-ivu-cell"
        :title="'发送人：' + rowData.sender"
        :label="'接收人：' + rowData.receive"
        :extra="rowData.send_time"
      ></Cell>
      <p style="padding: 7px 16px;">
        {{ rowData.content }}
      </p>
      <Cell v-if="rowData.rpfilepath != null "  class="mynew-ivu-cell">
        <div v-if="rowData.rpfilepath != null && rowData.rpfilepath != '' && rowData.filetype == 'html' ">
          点击此处下载→
          <a @click.stop="rpexportData">数据导入报告</a>
          <!--          电子文件下载后，不再显示文件是否下载状态。  liuxujiang  20211201  start-->
          <!--          <span v-if="rowData.rpfilepath == 'N' && rowData.rpfilepath != null " > 【数据导入报告已下载】</span>-->
          <!--          <span v-if="rowData.rpfilepath != 'N' && rowData.rpfilepath != null " > 【数据导入报告未下载】</span>-->
          <!--          电子文件下载后，不再显示文件是否下载状态。  liuxujiang  20211201  end-->
        </div>
        <div v-if="rowData.rpfilepath != null && rowData.rpfilepath != '' && rowData.filetype == 'txt-gj' ">
          点击此处下载→
          <a @click.stop="rpexportData">批量挂接报告</a>
          <!--          电子文件下载后，不再显示文件是否下载状态。  liuxujiang  20211201  start-->
          <!--          <span v-if="rowData.rpfilepath == 'N' && rowData.rpfilepath != null " > 【批量挂接报告已下载】</span>-->
          <!--          <span v-if="rowData.rpfilepath != 'N' && rowData.rpfilepath != null " > 【批量挂接报告未下载】</span>-->
          <!--          电子文件下载后，不再显示文件是否下载状态。  liuxujiang  20211201  end-->
        </div>
        <div v-if="rowData.rpfilepath != null && rowData.rpfilepath != '' && rowData.filetype == 'pdf' ">
          点击此处下载→
          <a @click.stop="rpexportData">单机版数据包导入报告</a>
          <!--          电子文件下载后，不再显示文件是否下载状态。  liuxujiang  20211201  start-->
          <!--          <span v-if="rowData.rpfilepath == 'N' && rowData.rpfilepath != null " > 【单机版数据包导入报告报告已下载】</span>-->
          <!--          <span v-if="rowData.rpfilepath != 'N' && rowData.rpfilepath != null " > 【单机版数据包导入报告报告未下载】</span>-->
          <!--          电子文件下载后，不再显示文件是否下载状态。  liuxujiang  20211201  end-->
        </div>
      </Cell>
      <Cell v-if="rowData.filepath != null "  class="mynew-ivu-cell">

        <div v-if="rowData.ajfilepath != null && rowData.ajfilepath != 'NO' && rowData.filepath != 'NO' && rowData.filetype == 'xlsx' ">
          点击此处下载→
          <a @click.stop="ajexportData" v-if="rowData.ajfilepath != null && rowData.filetype == 'xlsx' ">案卷数据导出</a>
          <span v-if="rowData.ajfilepath == 'N' && rowData.ajfilepath != 'NO' " > 【数据导出已执行】</span>
          <span v-if="rowData.ajfilepath != 'N' && rowData.ajfilepath != 'NO' " > 【数据导出未执行】</span>
          <br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a @click.stop="exportData" v-if="rowData.filepath != 'NO' ">卷内数据导出</a>
          <span v-if="rowData.filepath == 'N' && rowData.filepath != 'NO' " > 【数据导出已执行】</span>
          <span v-if="rowData.filepath != 'N' && rowData.filepath != 'NO' " > 【数据导出未执行】</span>
        </div>
        <div v-if="rowData.ajfilepath != null && rowData.filepath == 'NO' && rowData.filetype == 'xlsx' ">
          点击此处下载→
          <a @click.stop="ajexportData" v-if="rowData.ajfilepath != null && rowData.filetype == 'xlsx' ">案卷数据导出</a>
          <span v-if="rowData.ajfilepath == 'N' && rowData.ajfilepath != 'NO' " > 【数据导出已执行】</span>
          <span v-if="rowData.ajfilepath != 'N' && rowData.ajfilepath != 'NO' " > 【数据导出未执行】</span>
        </div>
        <div v-if="rowData.filepath != null && rowData.ajfilepath == 'NO' && rowData.filetype == 'xlsx' ">
          点击此处下载→
          <a @click.stop="exportData" v-if="rowData.filepath != null && rowData.filetype == 'xlsx' ">卷内数据导出</a>
          <span v-if="rowData.filepath == 'N' && rowData.filepath != 'NO' " > 【数据导出已执行】</span>
          <span v-if="rowData.filepath != 'N' && rowData.filepath != 'NO' " > 【数据导出未执行】</span>
        </div>
        <div v-else-if="rowData.filetype == 'zip' ">
          点击此处下载→
          <a @click.stop="exportData" v-if="rowData.filepath != '' ">数据导出</a>
          <span v-if="rowData.filepath == 'N' && rowData.filepath != '' " > 【数据导出已执行】</span>
          <span v-if="rowData.filepath != 'N' && rowData.filepath != '' " > 【数据导出未执行】</span>
        </div>
        <div v-else-if="rowData.filetype == 'xml' ">
          点击此处下载→
          <a @click.stop="xmlexportData" v-if="rowData.filepath != '' ">数据导出</a>
          <span v-if="rowData.filepath == 'N' && rowData.filepath != '' " > 【数据导出已执行】</span>
          <span v-if="rowData.filepath != 'N' && rowData.filepath != '' " > 【数据导出未执行】</span>
        </div>
        {{rowData}}
      </Cell>
      <Cell v-if="rowData.path != null">
        <a @click.stop="transferClick">跳转</a>
      </Cell>
    </CellGroup>
  </Card>
</template>

<script>
import message from '@/api/message'
import { updateFilepath, updateAjFilepath, updateRpFilepath } from '@/api/message'
import { getSystemById } from '@/api/menu'
export default {
  mixins: [message],
  inject: ['refreshMessage'],
  props: {
    rowData: {
      require: true
    },
    showSide: {
      require: true
    },
    pageHeight: {
      require: false
    }
  },
  data() {
    return {}
  },
  watch: {
    rowData() {
      this.markRead()
    }
  },
  computed: {
    apps() {
      return this.$store.state.apps || []
    }
  },
  methods: {
    markRead() {
      if (this.rowData.id && (this.rowData.read == null || this.rowData.read == undefined || this.rowData.read == '')) {
        let params = {
          id: this.rowData.id
        }
        this.handleMarkRead(params)
      }
    },
    transferClick() {
      // 跳转
      let menu = this.getApp(this.rowData.path)
      if (menu != null) {
        this.handleApp(menu, this.rowData.params)
      } else {
        this.handleInterfaceUrl(this.rowData)
      }
    },
    getApp(path) {
      var reg = /^#.+/
      let searchMenu = null
      this.apps.forEach(group => {
        if (group.menus) {
          return group.menus.find(menu => {
            if (menu.path == path) {
              searchMenu = Object.assign({}, menu)
            } else if (!reg.test(path)) {
              if (menu.path == '#' + path) {
                searchMenu = Object.assign({}, menu)
              }
            }
          })
        }
      })
      return searchMenu
    },
    handleApp(app, params) {
      if (!app) {
        return
      }
      let path = app.path
      const token = this.$store.state.token
      const target = app.target ? app.target : '_self'
      const [firstChar] = path
      if (app.system === this.$config.app) {
        if (firstChar === '#') {
          path = path.substring(1)
        }
        /** 修改路由跳转的参数设置。区分参数是json还是拼接的字符串 huwenbin 2020/3/19 start */
        if (params) {
           if (this.isJSON(params)) {
            this.$router.push({
              path: path,
              query: JSON.parse(params)
            })
          } else {
            params = params.charAt(0) == '?' ? params : '?' + params
            window.open(`${app.url}/#${path}${params}`, target)
          }
        } else {
          this.$router.push({ path })
        }
       /** 修改路由跳转的参数设置。区分参数是json还是拼接的字符串 huwenbin 2020/3/19 end */
      } else {
        /** 修改路径跳转携带参数 huwenbin 2020/3/18 start */
        path = firstChar === '#' ? path : '#' + path
        if (params) {
          params = params.charAt(0) == '?' ? params : '?' + params
          window.open(`${app.url}/${path}${params}`, target)
        } else {
          window.open(`${app.url}/${path}`, target)
        }
        /** 修改路径跳转携带参数 end*/
      }
    },
    isJSON(str) {
      if (typeof str == 'string') {
        try {
          var obj=JSON.parse(str);
          if(typeof obj == 'object' && obj ){
              return true;
          }else{
              return false;
          }
        } catch(e) {
            return false;
        }
      }
      return false;
    },
    handleInterfaceUrl(rowData) {
      let params = {
        id: rowData.system_id
      }
      getSystemById(params)
        .then(res => {
          if (res.data && res.data.state === 'ok') {
            if (res.data.system) {
              this.redirectInterface(rowData, res.data.system)
            } else {
              this.$Notice.error({ title: '跳转路径参数错误' })
            }
          }
        })
        .catch(() => {
          this.$Notice.error({ title: '系统后台出错，请联系管理员解决！' })
        })
    },
    redirectInterface(rowData, system) {
      let interfacePath = rowData.path.charAt(0) == '/' ? rowData.path : '/' + rowData.path
      let interfaceParams = rowData.params.charAt(0) == '?' ? rowData.params : '?' + rowData.params
      window.open(system.url + interfacePath + interfaceParams + '&token=' + this.$store.state.token)
    },
    exportData() {
      if(this.rowData.filepath == 'N'){
        this.$Notice.success({ title: '提示', desc: "数据导出已执行,请重新导出数据。"})
        return
      }
      let url = this.rowData.ip
/*      if(url.indexOf('?token')!=-1){
        url=url.replace('?token','')
      }*/
      let path = '/archser/table/downExcel?filePath=' +
              this.rowData.filepath +
              '&fileType=' +
              this.rowData.filetype +
              '&libId=' +
              this.rowData.libid +
              '&id=' +
              this.rowData.id
      //数据导出下载在本页面
      //let target = "_self"
      //数据导出下载打开新页面
      let target = "featrues"
      window.open(`${url}${path}`, target)
      updateFilepath({
        id: this.rowData.id
      }).then(res=>{
        if(res.data && res.data.state === 'ok'){
          this.rowData.filepath = res.data.filepath
        }
      })
    },
    ajexportData() {
      if(this.rowData.ajfilepath == 'N'){
        this.$Notice.success({ title: '提示', desc: "数据导出已执行,请重新导出数据。"})
        return
      }
      let url = this.rowData.ip
/*      if(url.indexOf('?token')!=-1){
        url=url.replace('?token','')
      }*/
      let path = '/archser/table/downExcel?filePath=' +
              this.rowData.ajfilepath +
              '&fileType=' +
              this.rowData.filetype +
              '&libId=' +
              this.rowData.libid +
              '&id=' +
              this.rowData.id
      //数据导出下载在本页面
      //let target = "_self"
      //数据导出下载打开新页面
      let target = "featrues"
      window.open(`${url}${path}`, target)
      updateAjFilepath({
        id: this.rowData.id
      }).then(res=>{
        if(res.data && res.data.state === 'ok'){
          this.rowData.ajfilepath = res.data.ajfilepath
        }
      })
    },
    rpexportData() {

      //电子文件下载后，不再确认文件是否下载状态。  liuxujiang  20211201  start
      /*if(this.rowData.rpfilepath == 'N'){
        this.$Notice.success({ title: '提示', desc: "数据导入报告已下载。"})
        return
      }*/
      //电子文件下载后，不再确认文件是否下载状态。  liuxujiang  20211201  end

      let url = this.rowData.ip
      /*处理生产环境下，url中携带  ?token  的问题。  liuxujiang  2021.6.7
      if(url.indexOf('?token')!=-1){
        url=url.replace('?token','')
      }*/
      if(url.indexOf('11027') != -1){
        url=url.replace('11027','21022')
      }
      let path = '/archser/table/downExcel?filePath=' +
              this.rowData.rpfilepath +
              '&fileType=' +
              this.rowData.filetype +
              '&libId=' +
              this.rowData.libid +
              '&id=' +
              this.rowData.id
      //数据导出下载在本页面
      //let target = "_self"
      //数据导出下载打开新页面
      let target = "featrues"
      window.open(`${url}${path}`, target)

      //电子文件下载后，不再修改文件是否下载状态。  liuxujiang  20211201  start
      /*updateRpFilepath({
        id: this.rowData.id
      }).then(res=>{
        if(res.data && res.data.state === 'ok'){
          this.rowData.rpfilepath = res.data.rpfilepath
        }
      })*/
      //电子文件下载后，不再修改文件是否下载状态。  liuxujiang  20211201  end

    },
    xmlexportData() {
      if (this.rowData.filepath == 'N') {
        this.$Notice.success({title: '提示', desc: "数据导入报告已下载。"})
        return
      }
      let url = this.rowData.ip
      if (this.rowData.filepath != 'NO') {
        let path = '/archser/table/downExcel?filePath=' +
            this.rowData.filepath +
            '&fileType=' +
            this.rowData.filetype +
            '&libId' +
            this.rowData.libid +
            '&id=' +
            this.rowData.id

        let target = 'featrues'
        window.open(`${url}${path}`, target)
      }
      if (this.rowData.ajfilepath != 'NO') {
        let path = '/archser/table/downExcel?filePath=' +
            this.rowData.ajfilepath +
            '&fileType=' +
            this.rowData.filetype +
            '&libId=' +
            this.rowData.libid +
            '&id=' +
            this.rowData.id

        let target = 'featrues'
        window.open(`${url}${path}`, target)
      }
      updateFilepath({
        id: this.rowData.id
      }).then(res => {
        if (res.data && res.data.state === 'ok') {
          this.rowData.filepath = res.data.filepath
        }
      })
    }
  },
  components: {},
  mounted() {
    this.markRead()
  }
}
</script>

<style scoped>
.data-row {
  border-top: 1px solid #e9e9e9;
  padding: 8px 16px;
}
.my-ivu-cell:hover {
  background: #ffffff !important;
}
.my-ivu-cell:focus {
  background: #ffffff !important;
}
.my-ivu-cell {
  border-bottom: 1px solid #e9e9e9;
  cursor: default;
}
.message-card {
  height: 95%;
}
.ivu-card-body {
  height: 100%;
}
</style>
