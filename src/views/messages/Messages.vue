<template>
  <LayoutLR title="消息中心" >
    <div class="function-menu" slot="left">
      <div>{{this.rowData}}</div>
      <div
        class="function-menu-item"
        :class="isSelected(menu.key)"
        v-for="menu of menus"
        :key="menu.key"
        @click="handleSelectMenu(menu.key)"
      >{{menu.label}}</div>
    </div>
    <div class="right-content" slot="right" ref="orginRef">
      <div class="selected-menu">
        <span>{{selectedMenuLabel}}</span>
      </div>
      <Row class="buttonClass" ref="buttonRow">
            <Button @click="handleDeleteClick">
              <Icon custom="fa fa-fw fa-close fa-fw" style="color:red"></Icon>删除
            </Button>&nbsp;
      </Row>
      <Row class="message-list">
          <Spin fix v-if="spinShow">
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>获取数据中...</div>
          </Spin>
          <Table
            border
            size="small"
            :columns="columns"
            :height="tableheight"
            :data="page.list"
            @on-selection-change="dataSelectionChange"
            :loading="loading"
          ></Table>
        </Row>
        <Row class="message-footer">
          <Page
            style="float:left;margin:10px;"
            :total="page.totalRow"
            :current="page.pageNumber"
            :page-size="page.pageSize"
             size="small"
            placement="top"
            show-elevator
            show-sizer
            show-total
            @on-change="handelPageChange"
            @on-page-size-change="handelPageSizeChange"
          />
        </Row>
           <Side :width="sideComponentWidth" v-model="showSide">
              <template>
                <Card class="side-card" style="height:100%" :bordered="false">
                <!--   <span slot="title">
                    <Icon :custom="'fa fa-list-ul'"></Icon>
                    {{sideComponentTitle}}
                  </span> -->
                    <MessageInfoView
                      v-model="showSide"
                      :rowData="rowData"
                      :showSide="showSide"
                      :selection="selection"
                      ref="sideComponent"
                    ></MessageInfoView>
                </Card>
             </template>
          </Side> 
    </div>
  </LayoutLR>
</template>
<script>
import LayoutLR from "@/views/components/LayoutLR.vue";
import message from "@/api/message";
import Side from '@/views/components/side/side'
import MessageInfoView from "@/views/messages/message-info.vue";
export default {
  name:'MessageInfo',
  mixins: [message],
  components: {
    LayoutLR,
    Side,
    MessageInfoView
  },
  data() {
    return {
      spinShow: false,
      rowData: {},
      showSide: false,
      sideComponentWidth: 0,
      sideComponentTitle:'',
      sideComponent:null,
      loading: false,
      menus: [
        { key: "all", label: "所有消息" },
        { key: "unread", label: "未读消息" },
        { key: "readed", label: "已读消息" }
      ],
      selectedMenu: "unread",
      columns: [
        { type: "selection", width: 80, align: "center" },
        { key: "title", title: "标题",render: (h, params) => {
          return h('a',{
            domProps: {
              innerHTML: params.row.title
            },
            on: {
              click : () => {
               this.handleViewMessage(params.row)
                event.stopPropagation()
              }
              
            }
          })
        }},
        { key: "sender", title: "发送人", width: 100 },
        { key: "receive", title: "接收人", width: 100 },
        { key: "system", title: "系统名称", width: 200 },
        { key: "send_time", title: "发送时间", width: 200 },
        { key: "operate", title: "操作"},
      ],
      page: {
        totalRow: 0,
        pageNumber: 1,
        pageSize: 20,
        totalPage: 0,
        list: []
      },
      selection: [],
      tableheight: 0,
      orginWidth: 0
    };
  },
  computed: {
    selectedMenuLabel() {
      return this.menus.find(menu => menu.key === this.selectedMenu).label;
    }
  },
  methods: {
    handleDeleteClick() {
      if (this.selection.length === 0) {
          this.$Notice.error({ title: '请选择要删除的数据' });
      } else {
        let content = "<p>确定要删除这"+this.selection.length+"项吗？</p>";
        this.showConfirmModal(content).then(() => {
          let params = {
            ids : this.selection.map(item => item.id).join()
          }
          this.handleDelete(params)
        })
      }
    },
    isSelected(key) {
      return { "function-menu-item-selected": this.selectedMenu === key };
    },
    initPageTable(menu) {
      let params = {
        menu: menu,
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      };
      this.getPageData(params);
    },
    handleSelectMenu(menu) {
      this.selectedMenu = menu;
      this.page.pageNumber = 1
      this.initPageTable(menu);
    },
    dataSelectionChange(selection) {
      this.selection = selection;
    },
    handelPageChange(pageNumber) {
      this.page.pageNumber = pageNumber;
      this.initPageTable(this.selectedMenu);
    },
    handelPageSizeChange(pageSize) {
      this.page.pageSize = pageSize;
      this.page.pageNumber = 1;
      this.initPageTable(this.selectedMenu);
    },
    handleViewMessage(row) {
      this.sideComponentTitle = '查看消息'
      this.sideComponentWidth = this.orginWidth * 0.5
      this.showSide = true
      this.rowData = row
      // import('./message-info.vue').then(comp => {
      //   this.sideComponent = comp.default
      // })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.tableheight = document.body.clientHeight - 240 - this.$refs.buttonRow.$el.offsetHeight ;
      this.orginWidth = this.$refs.orginRef.offsetWidth;
      if (this.$route.query && this.$route.query.menu) {
        this.selectedMenu = this.$route.query.menu
      } 
      this.initPageTable(this.selectedMenu)
    });
  }
};
</script>

<style scoped>
.function-menu-item {
  overflow-y : hidden;
  padding: 0px 20px;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
}
.function-menu-item:hover {
  background-color: white;
}
.function-menu-item-selected,
.function-menu-item-selected:hover {
  background-color: white;
}
.selected-menu {
  height: 70px;
  padding: 25px 0px;
}
.selected-menu span {
  display: inline-block;
  line-height: 20px;
  height: 20px;
  padding-left: 10px;
  border-left: 2px solid #3d65d4;
}
.right-content {
  height: 100%;
  padding-left: 16px;
}
/* .message-list {
  border-top: 1px solid #dddddd;
  padding-top: 16px;
  padding-right: 16px;
} */
.message-footer {
  padding: 10px 0px;
}
.buttonClass {
  border: 1px solid #D7DDE4;
  background-color: #E9E9E9;
  width: 100%;
  height: 42px;
  line-height: 40px;
  padding-left: 15px;
}
.ivu-card-head {
  border: 0px
}
</style>

