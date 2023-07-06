import axios from '@/axios'

const SERVICE_URL = "/aserver"
/**
 * 从应用管理子系统获取未读消息数量
 */
export const getMessageCount = () => {
  return axios.get('/aserver/message/count')
}

export const getMessagePageData = params => {
  return axios.request({
    url: SERVICE_URL + "/message/getMessagePageData",
    params: params,
    method: "get",
    timeout:  (1000 * 60)
  });
}

export const markReadHttp = params => {
  return axios.request({
    url: SERVICE_URL + "/message/markRead",
    params: params,
    method: "post"
  });
}
export const deleteMessage = params => {
  return axios.request({
    url: SERVICE_URL + "/message/deleteMessage",
    params: params,
    method: "post"
  });
}

export default {
  methods: {
    getPageData(params) {
      this.loading = true
      getMessagePageData(params)
        .then(res => {
          this.page.list = []
          this.loading = false;
          if (res.data && res.data.state === "ok") {
            this.handlePageDataSuccess(res.data)
          } else {
            this.$Notice.error({ desc: res.data.msg });
          }
        })
        .catch(error => {
          this.loading = false;
          return this.dealError(error);
        });
    },
    handleMarkRead(params) {
      markReadHttp(params).then(res => {
        if (res.data && res.data.state === "ok") {
          this.handleMarkReadSuccess(params,res.data)
          // this.$emit("on-success",params)
          this.refreshMessage()
        } else {
          this.$Notice.error({ desc: res.data.msg });
        }
      })
        .catch(error => {
          return this.dealError(error);
        });
    },
    handleDelete(params) {
      deleteMessage(params).then(res => {
        if (res.data && res.data.state === "ok") {
          this.handleDeleteSuccess(params,res.data)
        } else {
          this.$Notice.error({ desc: res.data.msg });
        }
      })
        .catch(error => {
          return this.dealError(error);
        });
    },
    handlePageDataSuccess(data) {
      this.page = Object.assign({}, this.page, data.page)
      // Object.assign(this.page, data.page); //
    },
    handleMarkReadSuccess() {
      this.$set(this.rowData,'read','1')
    },
    handleDeleteSuccess(params) {
      let idArray = params.ids.split(",")
      if (idArray.length === this.page.list.length && this.page.pageNumber > 1) {
        this.page.pageNumber = this.page.pageNumber - 1
        this.initPageTable(this.selectedMenu)
      } else if (idArray.length === this.page.list.length && this.page.pageNumber == 1) {
        this.page.pageNumber =  1
        this.initPageTable(this.selectedMenu)
      } else {
        idArray.forEach(id => {
          let index = this.page.list.findIndex(item => item.id == id)
          if (index != -1) {
            this.page.list.splice(index, 1)
          }
        })
        this.page.totalRow = --this.page.totalRow
      }
      this.$Modal.remove()
      this.selection = []
      this.$Notice.success({ title: "删除成功" });
    },
    showConfirmModal(content) {
      return new Promise((resolve,rejected) => {
        this.$Modal.confirm({
          title: '警告',
          content: content,
          loading: true,
          onOk: () => {
            event.stopPropagation()
            resolve()
          },
          onCancel: () => {
            rejected()
            event.stopPropagation()
          }
        })
      })
    },
    // 统一处理错误
    dealError(error) {
      if (error.response && error.response.status === 401) {
        this.$router.push("login");
      } else {
        this.$Notice.error({ title: "系统后台出错，请联系管理员解决！" });
      }
      return Promise.reject(error);
    },

  }
}

//将已经导出的数据文件路径修改为N,表示数据文件已经导出过了
export const updateFilepath = params => {
  return axios.request({
    url: SERVICE_URL + "/message/updateFilepath",
    params: params,
    method: "post"
  });
}

//将已经导出的案卷级数据文件路径修改为N,表示数据文件已经导出过了
export const updateAjFilepath = params => {
  return axios.request({
    url: SERVICE_URL + "/message/updateAjFilepath",
    params: params,
    method: "post"
  });
}

//将已经下载的数据导入报告文件路径修改为N,表示数据文件已经下载。
export const updateRpFilepath = params => {
  return axios.request({
    url: SERVICE_URL + "/message/updateRpFilepath",
    params: params,
    method: "post"
  });
}