<template>
  <div class="layout">
    <div class="header">
      <div class="header-bar">
        <div
          class="header-apps"
          @click="handleHeaderApps"
          @mouseenter="handleHeaderAppsEnter"
          @mouseleave="handleHeaderAppsLeave"
        >
          <span class="fa fa-bars"></span>
          <TransitionEx
            :before="maskHiddenStyle"
            :show="maskShowStyle"
            :hidden="maskHiddenStyle"
          >
            <div
              class="apps-mask"
              v-show="showCommonApps"
              @click.stop="handleMask"
            ></div>
          </TransitionEx>
          <TransitionEx
            :before="appsPanelHiddenStyle"
            :show="appsPanelShowStyle"
            :hidden="appsPanelHiddenStyle"
          >
            <div class="apps-panel" v-show="showAppsPanel">
              <div class="apps-panel-inner">
                <div class="apps-search">
                  <div class="apps-searchbar">
                    <span class="apps-search-icon fa fa-search"></span>
                    <span class="apps-search-input">
                      <input
                        v-model="appSearchText"
                        type="text"
                        placeholder="请输入关键词"
                        @click.stop
                      />
                    </span>
                  </div>
                </div>
                <div class="apps-map">
                  <div
                    v-for="app of apps"
                    :key="app.name"
                    v-show="app.menus && app.menus.length > 0"
                    class="apps-group"
                  >
                    <div class="apps-group-name">{{ app.title }}</div>
                    <div class="apps-list">
                      <div
                        v-for="item of app.menus"
                        :key="item.name"
                        v-show="item.hidden !== 1"
                        class="apps-item"
                        @click.stop="handleApp(item)"
                      >
                        <span class="apps-item-title">{{ item.title }}</span>
                        <span
                          class="apps-item-right"
                          :class="itemRightClass(item)"
                          @click.stop="handleFavorite(item)"
                        ></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TransitionEx>
          <TransitionEx
            :before="appsHiddenStyle"
            :show="appsShowStyle"
            :hidden="appsHiddenStyle"
          >
            <div class="apps-container" v-show="showCommonApps">
              <div class="apps-container-inner">
                <div class="apps-all">
                  <div
                    class="common-item"
                    @click.stop="handleAppsAll"
                    @mouseenter="handleAppsAllEnter"
                    @mouseleave="handleAppsAllLeave"
                  >
                    <span class="common-item-icon fa fa-th"></span>
                    <span class="common-item-title">产品和服务</span>
                    <span class="common-item-right fa fa-chevron-right"></span>
                  </div>
                </div>
                <div class="apps-common">
                  <div
                    v-for="app of commonApps"
                    :key="app.id"
                    class="common-item"
                    @click.stop="handleApp(app)"
                  >
                    <span
                      class="common-item-icon fa-fw"
                      :class="app.icon ? app.icon : 'fa fa-circle'"
                    ></span>
                    <span class="common-item-title">{{ app.title }}</span>
                    <span
                      class="common-item-right fa fa-star"
                      @click.stop="handleCancelFavorite(app)"
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          </TransitionEx>
        </div>
        <div class="header-logo">
          <div class="header-app-logo">
            <img :src="appLogo" @click="toHome" alt="Logo" />
          </div>
          <div class="header-app-name" @click="toHome">{{ appName }}</div>
        </div>
        <!-- <div v-if="showSearch" class="header-search">
          <input
            class="header-search-text"
            type="text"
            v-model="searchText"
            placeholder="请输入关键词"
            @keyup.enter="handleInputEnter"
          />
          <span class="header-search-icon fa fa-fw fa-search"></span>
        </div>-->
        <div class="header-nav">
          <!-- <div class="nav-item">
            <Fullscreen v-model="isFullscreen"></Fullscreen>
          </div>
          <div class="nav-item" @click="handleBug">
            <span class="fa fa-bug"></span>
          </div>-->
          <div
            class="nav-item"
            @mouseenter="handleMessageOver"
            @mouseleave="handleMessageLeave"
          >
            <Badge dot :offset="[20, 15]" :count="messagePage.totalRow">
              <span class="fa fa-bell-o"></span>
            </Badge>
            <TransitionEx
              show="slideDown"
              hidden="slideUp"
              v-show="showMessageDropdown"
            >
              <div class="nav-item-dropdown message-dropdown">
                <div class="dropdown-title">我的消息</div>
                <div
                  class="dropdown-item"
                  v-for="item in messagePage.list"
                  v-bind:key="item.id"
                  @click="handleShowMessageInfo(item)"
                >
                  <div class="message-title">{{ item.title }}</div>
                  <div class="message-time">{{ item.send_time }}</div>
                </div>
                <div class="dropdown-item" v-if="messagePage.totalRow === 0">
                  <div class="message-title">暂无未读消息</div>
                </div>
                <div
                  class="dropdown-item dropdown-footer"
                  @click.stop="handleMessage"
                >
                  查看全部消息
                </div>
              </div>
            </TransitionEx>
          </div>
          <!-- 消息查看 -->
          <Modal
            v-model="showMessage"
            draggable
            scrollable
            footer-hide
            :mask-closable="true"
            :width="650"
          >
            <template>
              <MessageInfoView
                :rowData="currentMsgInfo"
                :showSide="showMessage"
                ref="messageComponent"
                style="min-height:300px"
                @on-success="refreshMessage"
              ></MessageInfoView>
            </template>
          </Modal>

          <div
            class="nav-item"
            @mouseover="handlePersonalOver"
            @mouseleave="handlePersonalLeave"
          >
            <div class="user-avatar">
              <img src="../assets/avatar.png" alt="用户头像" />
            </div>
            <span class="fa fa-fw fa-angle-down"></span>
            <TransitionEx show="slideDown" hidden="slideUp">
              <div
                class="nav-item-dropdown user-dropdown"
                v-show="showPersonalDropdown"
              >
                <div class="dropdown-item" @click.stop="handlePersonal">
                  个人信息
                </div>
                <div class="dropdown-item" @click="showUpdatePsw">密码修改</div>
                <div class="dropdown-item" @click.stop="handleLogout">退出</div>
              </div>
            </TransitionEx>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <router-view />
    </div>
    <Modal
      id="rightbuttom"
      v-model="archmessage"
      title="待处理信息"
      :mask="false"
      :styles="mdstyle"
    >
      <Card
        dis-hover
        style="cursor:pointer;margin-top:5px"
        v-for="item in archmessagedata.list"
        v-bind:key="item.id"
      >
        <div @click="handleShowMessageInfo(item)">
          <p style="margin-right: 12px">
            {{ item.title }}
          </p>
          <p style="padding-right: 1px">
            {{ item.send_time }}
          </p>
        </div>

        <!-- <Button @click="handleTransfer(archTransferinfo.id)" type="info" size="small" ghost>前往</Button> -->
      </Card>
      <div slot="footer">
        <div slot="footer">
          <div
            class="dropdown-item dropdown-footer"
            style="cursor:pointer"
            @click.stop="handleMessage"
          >
            查看全部消息
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
<script>
// import { getMessageCount } from "@/api/message";
import { getSearchUrl, getLogoUrl } from "@/api/setting";
import { star, cancelStar } from "@/api/menu";
import Fullscreen from "@/views/components/Fullscreen.vue";
import TransitionEx from "@/views/components/TransitionEx.vue";
import { getUserInfo } from "@/api/user";
import manageWebSocket from "@/api/main-message";
import MessageInfoView from "@/views/messages/message-info.vue";
/**lidecai 20200325 YZJ-2103 解决无法退出问题 start */
import Cookies from "js-cookie";
/**lidecai 20200325 YZJ-2103 解决无法退出问题 end */
import {getMessagePageData} from "@/api/message"
export default {
  mixins: [manageWebSocket],
  components: {
    Fullscreen,
    TransitionEx,
    MessageInfoView
  },
  data() {
    return {
      archmessagedata:[],
      archmessage: false,
      logoUrl: "",
      showCommonApps: false,
      showAppsPanel: false,
      messageCount: 0,
      showSearch: false,
      searchText: "",
      appSearchText: "",
      appsTimer: null,
      appsAllTimer: null,
      showMessageDropdown: false,
      showPersonalDropdown: false,
      maskShowStyle: { opacity: 0.3 },
      maskHiddenStyle: { opacity: 0 },
      appsPanelShowStyle: { opacity: 1, left: "212px" },
      appsPanelHiddenStyle: { opacity: 0, left: "-570px" },
      appsShowStyle: { opacity: 1, left: "0px" },
      appsHiddenStyle: { opacity: 0, left: "-212px" },
      messageTimeout: null,
      user: {
        id: "",
        name: "",
        email: "",
        office_phone: "",
        mobile_phone: "",
        home_phone: "",
        address: "",
        postcode: "",
        description: ""
      },
      username: "",
      messagePage: {
        totalRow: 0,
        pageNumber: 1,
        pageSize: 10,
        totalPage: 0,
        list: []
      },
      currentMsgInfo: {},
      showMessage: false,
      messageComponent: null,
      webSocket: null,
      messageSocketUrl: null,
      windowheight: 0,  //当前屏幕的高度
      mdstyle:{position: 'fixed',
               top: '566px',
               right: '26px',
              },  //待处理弹窗的样式
    };
  },
  computed: {
    apps() {
      const all = this.$store.state.apps || [];
      if (this.appSearchText) {
        let filters = [];
        all.forEach(item => {
          if (item.menus) {
            let menus = item.menus.filter(
              menu => menu.title.indexOf(this.appSearchText) !== -1
            );
            if (menus && menus.length > 0) {
              let newItem = Object.assign({}, item);
              newItem.menus = menus;
              filters.push(newItem);
            }
          }
        });
        return filters;
      } else {
        let newAll = new Array();
        newAll.push({
          description: "收集管理",
          title: "收集管理",
          menus: new Array()
        });
        newAll.push({
          description: "系统管理",
          title: "系统管理",
          menus: new Array()
        });
        all.forEach(item => {
          if (
            item.title != "检索服务" &&
            item.title != "流程服务" 
            //item.title != "归档服务"
          ) {
            if (item.name == "archser") {
              newAll[0].id = item.id;
              newAll[0].name = item.name + "SJ";
              newAll[0].type = item.type + "SJ";
              newAll[0].url = item.url;
              newAll[0].id = item.id;
              newAll[0].name = item.name + "GL";
              newAll[0].type = item.type + "GL";
              newAll[0].url = item.url;
            }
            newAll.push({
              description: item.description,
              id: item.id,
              name: item.name,
              title: item.title,
              type: item.type,
              url: item.url,
              menus: new Array()
            });
            if (item.menus) {
              item.menus.forEach(menu => {
                if (
                  menu.description != "数据库备份" &&
                  menu.description != "字典配置" &&
                  menu.description != "分词测试" &&
                  menu.description != "主动接口" &&
                  menu.description != "被动接口" &&
                  //menu.description != "兼容性数据导入" &&
                  menu.description != "问题反馈" &&
                  menu.description != "档案信息订阅" &&
                  menu.description != "图档互查" &&
                  menu.description != "申请中心" &&
                  menu.description != "协同管理" &&
                  menu.description != "浏览文件" &&
                  menu.description != "首页" &&
                  menu.title != "公开文件目录" &&
                  menu.title != "流程监控" &&
                  menu.title != "全宗管理" &&
                  menu.title != "介质预警" &&
                  menu.title != "光盘制作" &&
                  menu.title != "保管期限表管理" &&
                  menu.title != "索引文档" &&
                  menu.title != "索引消息"
                ) {
                  if (
                    menu.description == "收集整编" ||
                    menu.description == "文件接收"
                  ) {
                    newAll[0].menus.push(menu);
                  } else if (
                    menu.description == "日志" ||
                    menu.description == "回收站" ||
                    menu.description == "机构用户" ||
                    menu.description == "角色权限" ||
                    menu.description == "报表管理" ||
                    menu.description == "索引管理" ||
                    menu.description == "搜索模板" ||
                    menu.description == "数据迁移" ||
                    menu.description == "应用管理" ||
                    menu.description == "应用配置" ||
                    menu.description == "字典配置" ||
                    menu.title == "索引管理"||
                    menu.description == "工具下载"||
                    menu.title =="工具下载"
                  ) {
                    newAll[1].menus.push(menu);
                  } else {
                    newAll[newAll.length - 1].menus.push(menu);
                  }
                }
              });
            }
          }
        });
        //调整菜单tabs标签顺序，并且屏蔽掉部分系统
        for (let index in newAll) {
          if (newAll[index] != undefined && newAll[index].title == "收集管理") {
            let temp = newAll[0];
            newAll[0] = newAll[index];
            newAll[index] = temp;
          }
          if (newAll[index] != undefined && newAll[index].title == "档案管理") {
            let temp = newAll[1];
            newAll[1] = newAll[index];
            newAll[index] = temp;
          }
          if (newAll[index] != undefined && newAll[index].title == "档案利用") {
            let temp = newAll[2];
            newAll[2] = newAll[index];
            newAll[index] = temp;
          }
          if (newAll[index] != undefined && newAll[index].title == "系统管理") {
            let temp = newAll[3];
            newAll[3] = newAll[index];
            newAll[index] = temp;
          }
        }
        return newAll;
      }
    },
    appLogo() {
      return this.$config.logo;
    },
    appName() {
      return this.$config.name;
    },
    commonApps() {
      let all = this.$store.state.apps || [];
      let apps = [];
      all.forEach(group => {
        if (group.menus) {
          apps.push(
            ...group.menus.filter(menu => {
              return menu.star > 0 && menu.hidden !== 1;
            })
          );
        }
      });
      return apps;
    }
  },
  methods: {
    /** 获取未读消息*/
    getMessageData(){
      let params = {
        menu: "unread",
        pageNumber: 1,
        pageSize: 4
      };
      getMessagePageData(params).then(res=>{
        this.archmessagedata=res.data.page
        if (this.archmessagedata.list.length>0 ) {
          this.archmessage=true
        } else {
          this.archmessage=false
        }
      })
    },
    itemRightClass(item) {
      return {
        "apps-item-right-unvisible": !(item.star > 0),
        "fa fa-star": item.star > 0,
        "fa fa-star-o": !(item.star > 0)
      };
    },
    handleHeaderApps() {
      this.showApps();
    },
    toHome() {
      window.location.href = "http://" + document.domain + ":21022";
    },
    handleHeaderAppsEnter() {
      if (!this.showCommonApps) {
        this.appsTimer = setTimeout(() => {
          this.showApps();
        }, 300);
      }
    },
    handleHeaderAppsLeave() {
      if (this.appsTimer) {
        clearTimeout(this.appsTimer);
        this.appsTimer = null;
      }
    },
    handleAppsAllEnter() {
      if (!this.showAppsPanel) {
        this.appsAllTimer = setTimeout(() => {
          this.showAppsAll();
        }, 300);
      }
    },
    handleAppsAllLeave() {
      if (this.appsAllTimer) {
        clearTimeout(this.appsAllTimer);
        this.appsAllTimer = null;
      }
    },
    handleAppsAll() {
      this.showAppsAll();
    },
    handleMask() {
      this.hideApps();
    },
    handleFavorite(menu) {
      star({ menuId: menu.id }).then(res => {
        if (res.data.state === "ok") {
          this.$set(menu, "star", res.data.star);
        }
      });
    },
    handleCancelFavorite(menu) {
      cancelStar({ menuId: menu.id }).then(res => {
        if (res.data.state === "ok") {
          this.$set(menu, "star", 0);
        }
      });
    },
    handleApp(app) {
      let path = app.path;
      const [firstChar] = path;
      // if (app.system === this.$config.app) {
      //   if (firstChar === "#") {
      //     path = path.substring(1);
      //   }
      //   this.$router.push({ path, query: {} });
      //   this.hideApps();
      // } else {

      // }
      const token = this.$store.state.token;
      //      const target = app.target ? app.target : "_self";//当前窗口打开
      if (firstChar === "#") {
        //window.open(`${app.url}/?token=${token}${path}`, target);
        window.open(`${app.url}/?token=${token}${path}`, "_blank");
      } else {
        //window.open(`${app.url}${path}?token=${token}`, target);
        window.open(`${app.url}/?token=${token}${path}`, "_blank");
      }
    },
    handleInputEnter() {
      if (this.searchText) {
        window.open(`${this.searchUrl}?q=${this.searchText}`, "_blank");
      }
    },
    handleMessage() {
      this.hideApps();
      this.$router.push({ path: "/messages/index", query: { menu: "all" } });
    },
    handlePersonal() {
      this.hideApps();
      if (window.location.hash != "#/personal/index") {
        this.$router.push("/personal/index");
      }
      this.$set(this.$store.state, "selectedMenu", "personalInfo");
    },
    showUpdatePsw() {
      this.hideApps();
      if (window.location.hash != "#/personal/index") {
        this.$router.push("/personal/index");
      }
      this.$set(this.$store.state, "selectedMenu", "modifyPassword");
    },
    handleBug() {
      this.hideApps();
      this.$router.push("/bug/index");
    },
    handleLogout() {
      this.$store.commit("setToken", "");
      Cookies.remove("myToken");
      document.location.href = "/";
    },
    handleMessageOver() {
      clearTimeout(this.messageTimeout);
      this.showMessageDropdown = true;
    },
    handleMessageLeave() {
      this.messageTimeout = setTimeout(() => {
        this.showMessageDropdown = false;
      }, 300);
    },
    handlePersonalOver() {
      this.showPersonalDropdown = true;
    },
    handlePersonalLeave() {
      this.showPersonalDropdown = false;
    },
    showApps() {
      this.showCommonApps = true;
      this.showAppsPanel = false;
    },
    showAppsAll() {
      this.showAppsPanel = true;
      this.appSearchText = "";
    },
    hideApps() {
      this.showCommonApps = false;
      this.showAppsPanel = false;
    },
    initUserInfo() {
      getUserInfo().then(res => {
        if (res.data.state == "ok") {
          this.username = res.data.userInfo.username;
          this.user = res.data.userInfo;
          this.handleMessageWs(res.request.responseURL);
        } else {
          this.$Notice.error({ title: "获取用户信息失败" });
        }
      });
    }
  },
  mounted() {
    this.initUserInfo();
    this.$Notice.config({
      top: 88
    });
    /* getMessageCount().then(res => {
      this.messageCount = res.data.count;
    }); */
    getSearchUrl().then(res => {
      if (res.data.state === "ok") {
        this.searchUrl = res.data.search;
        this.showSearch = true;
      } else {
        this.showSearch = false;
      }
    });
    getLogoUrl().then(res => {
      if (res.data.state === "ok") {
        this.logoUrl = res.data.logoUrl;
      }
    });
    //  let ivuModal=  document.getElementsByClassName('ivu-modal');
		//  let clientHeight= document.body.clientHeight
		// 			  ivuModal[1].style.top=(clientHeight-330)+'px'
    this.getMessageData()

    //当前屏幕的高度
    this.windowheight = window.screen.height
    this.mdstyle = {position: 'fixed',
                    top: (this.windowheight - 500) + 'px',
                    right: '26px',
                    }
  }
};
</script>
<style scoped lang="less">
@deep: ~">>>";
//#rightbuttom @{deep} .ivu-modal {
//  position: fixed;
//  top: 566px;
//  right: 26px;
//}

#rightbuttom @{deep} .ivu-modal-body {
  height: 238px;
  overflow: auto;
}
.layout {
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
  height: 100%;
  padding-top: 64px !important;
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  height: 64px;
  width: 100%;
  background-color: white;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.08);
  background-color: #5a8bff;
  z-index: 10000;
}
.header-bar {
  position: relative;
}
.header-apps {
  position: relative;
  float: left;
  width: 200px;
  height: 64px;
  background: #4877e6;
  color: #fff;
  font-size: 24px;
  line-height: 64px;
  position: relative;
  top: 0px;
  left: 0px;
  cursor: pointer;
}
.apps-mask,
.apps-container {
  position: fixed;
  top: 64px;
  left: 0;
  height: 100%;
  cursor: default;
}
.apps-mask {
  width: 100%;
  background: #404040;
  opacity: 0.3;
}
.apps-container {
  width: 200px;
  background: #fff;
  font-size: 14px;
  color: #5b6270;
  padding: 0px 0px 64px 0px;
}
.apps-container-inner {
  height: 100%;
  overflow-y: auto;
}
.apps-all {
  text-align: left;
  line-height: 40px;
  padding: 5px 0px;
  border-bottom: 1px solid #dcdee2;
}
.apps-panel {
  position: fixed;
  top: 64px;
  margin-left: -12px;
  left: 212px;
  width: 810px;
  height: 100%;
  text-align: left;
  font-size: 14px;
  color: #5b6270;
  background-color: #f8f8f9;
  padding: 0px 0px 64px 0px;
}
.apps-panel-inner {
  height: 100%;
  overflow-y: auto;
  padding: 30px;
}
.apps-panel-inner::-webkit-scrollbar,
.apps-container-inner::-webkit-scrollbar {
  width: 8px;
}

.apps-panel-inner::-webkit-scrollbar-track,
.apps-container-inner::-webkit-scrollbar-track {
  border-radius: 4px;
  background-color: #eee;
}

.apps-panel-inner::-webkit-scrollbar-thumb,
.apps-container-inner::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background: #808080;
}

.apps-search {
  padding: 10px;
  line-height: 40px;
}
.apps-searchbar {
  border-bottom: 1px solid #dcdee2;
  padding: 0px 10px;
}
.apps-search-icon {
  font-size: 24px;
  color: silver;
}
.apps-search-input input {
  margin-left: 16px;
  width: 600px;
  background-color: #f8f8f9;
  padding: 0px 10px;
  border: none;
}
.apps-search-input input:focus {
  outline: 0;
}
.apps-map {
  width: 100%;
  column-count: 3;
  column-width: 230px;
  column-gap: 20px;
}
.apps-group {
  break-inside: avoid;
  margin-bottom: 10px;
}
.apps-group-name {
  font-weight: bold;
  color: #17233d;
  padding: 0px 10px;
  line-height: 40px;
}
.apps-item {
  line-height: 32px;
  cursor: pointer;
  padding: 0px 10px;
  position: relative;
}
.apps-item-right {
  float: right;
  line-height: 32px;
  color: #2b85e4;
}
.apps-item-right-unvisible {
  display: none;
}
.apps-item:hover {
  background-color: #e8eaec;
}
.apps-item:hover .apps-item-right {
  display: inline;
}
.apps-common {
  text-align: left;
  line-height: 40px;
}
.common-item {
  padding: 0px 18px;
  cursor: pointer;
}
.common-item:hover {
  background-color: #e8eaec;
}
.common-item-title {
  padding-left: 10px;
}
.common-item-right {
  float: right;
  line-height: 40px;
  color: #2b85e4;
  display: none;
}
.apps-common .common-item:hover .common-item-right {
  display: inline;
}
.apps-all .common-item-right {
  display: inline;
  color: #5b6270;
}
.header-logo {
  width: 600px;
  height: 64px;
  float: left;
  position: relative;
  left: 20px;
  text-align: left;
  cursor: pointer;
}
.header-app-logo,
.header-app-name {
  float: left;
  height: 64px;
}
.header-app-logo img {
  height: 64px;
}
.header-app-name {
  padding: 0px 10px;
  color: #ffffff;
  border-radius: 3px;
  font-size: 24px;
  line-height: 64px;
}
.header-search {
  margin-left: -200px;
  width: 400px;
  height: 64px;
  position: absolute;
  left: 50%;
  padding: 15px 0px;
}
.header-search-text {
  width: 400px;
  line-height: 20px;
  height: 30px;
  border: 0px;
  padding: 5px 5px 5px 25px;
  border-bottom: 1px solid white;
}
.header-search-text:focus {
  outline: 0;
  border-bottom: 1px solid #2c63d8;
}
.header-search-icon {
  position: absolute;
  left: 5px;
  top: 23px;
}
.header-search:hover .header-search-icon {
  color: #2c63d8;
}
.header-nav {
  position: absolute;
  width: 180px;
  margin: 0 auto;
  margin-right: 20px;
  right: 0;
}
.header-nav .nav-item {
  position: relative;
  font-size: 14px;
  display: inline-block;
  padding: 0px 10px;
  line-height: 64px;
  vertical-align: top;
  height: 64px;
  cursor: pointer;
  color: #ffffff;
}
.header-nav .nav-item:hover {
  color: #2b85e4;
}
.header-nav .nav-item-dropdown {
  border: 1px solid #dcdee2;
  border-radius: 5px;
  position: absolute;
  top: 64px;
  right: 0px;
  color: #5b6270;
  background-color: #ffffff;
  padding: 5px 0px;
  box-shadow: 0 1px 4px 2px rgba(0, 0, 0, 0.08);
}
.header-nav .user-dropdown .dropdown-item {
  height: 40px;
  line-height: 40px;
  padding: 0px 16px;
  width: 90px;
  text-align: left;
}
.header-nav .message-dropdown {
  right: -40px;
  background: #f7f7f7;
}
.header-nav .dropdown-title {
  text-align: left;
  line-height: 40px;
  height: 40px;
  padding: 0px 16px;
}
.header-nav .message-dropdown .dropdown-item {
  line-height: 40px;
  padding: 8px 16px;
  width: 360px;
  text-align: left;
  background: #ffffff;
  border-bottom: 1px solid #dcdee2;
}
.header-nav .dropdown-item .message-title {
  line-height: 20px;
}
.header-nav .dropdown-item .message-time {
  line-height: 20px;
  font-size: 10px;
}
.header-nav .message-dropdown .dropdown-item.dropdown-footer {
  background: #f7f7f7;
  line-height: 26px;
  height: 40px;
  border: 0;
}
.header-nav .dropdown-item:hover {
  background-color: #e8eaec;
  color: #2b85e4;
}
.user-avatar {
  margin-top: 12px;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  background-color: #5b6270;
  display: inline-block;
  vertical-align: top;
}
.user-avatar img {
  height: 40px;
  width: 40px;
  border-radius: 20px;
}
.content {
  padding: 0;
  height: 100%;
  background-color: #f0f2f5;
  background-image: url(../assets/content_bg.png);
  overflow: auto;
}
.ivu-badge {
  width: 64px;
  height: 64px;
  border: 1px solid rgb(201, 201, 201);
  margin-left: 15px;
}
.nav-item {
  width: 90px;
  height: 64px;
}
.fa-fw {
  margin-left: 10px;
}
</style>
