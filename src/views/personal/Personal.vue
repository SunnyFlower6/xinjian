<template>
  <LayoutLR class="personal-container">
    <div slot="title">
      <div class="user-avatar">
        <div class="avatar-img">
          <img src="../../assets/avatar.png" alt="用户头像">
        </div>
      </div>
      <div class="user-info">
        <div class="user-name">{{username}}</div>
      </div>
    </div>
    <div class="function-menu" slot="left">
      <div class="function-menu-item" :class="isSelected(menu.key)" v-for="menu of menus" :key="menu.key" @click="updateMenu(menu.key)">{{menu.label}}</div>
    </div>
    <div class="right-content" slot="right" style="overflow-y: scroll">
      <div class="personal-content" v-show="this.$store.state.selectedMenu=='personalInfo'">
				<Form label-position="right" :label-width="80" :model="user" class="fromClass" :rules="userValidate" ref="userForm"> 
				<Row>
              <iCol span="15">
                <FormItem label="名称：" prop="name">
                  <iInput v-model="user.name" type="text" placeholder="请输入名称"></iInput>
                </FormItem>
              </iCol>
        </Row>
                    <!-- <Row>
                        <iCol span="15">
                            <FormItem label="身份证号：" prop="sfid">
                                <iInput v-model="user.sfid" type="text" placeholder="请输入身份证号码"></iInput>
                            </FormItem>
                        </iCol>
                    </Row> -->
				<Row>
              <iCol span="15">
                <FormItem label="Email：" prop="email">
                  <iInput v-model="user.email" type="text" placeholder="请输入Email"></iInput>
                </FormItem>
              </iCol>
        </Row>
				<Row>
              <iCol span="15">
                <FormItem label="办公电话：" prop="office_phone">
                  <iInput v-model="user.office_phone" type="text" placeholder="请输入办公电话"></iInput>
                </FormItem>
              </iCol>
        </Row>
				<Row>
              <iCol span="15">
                <FormItem label="手机号：" prop="mobile_phone">
                  <iInput v-model="user.mobile_phone" type="text" placeholder="请输入手机号"></iInput>
                </FormItem>
              </iCol>
        </Row>
				<Row>
              <iCol span="15">
                <FormItem label="家庭电话：" prop="home_phone">
                  <iInput v-model="user.home_phone" type="text" placeholder="请输入家庭电话"></iInput>
                </FormItem>
              </iCol>
        </Row>
				<Row>
              <iCol span="15">
                <FormItem label="联系住址：" prop="address">
                  <iInput v-model="user.address" type="text" placeholder="请输入联系住址"></iInput>
                </FormItem>
              </iCol>
        </Row>
				<Row>
              <iCol span="15">
                <FormItem label="邮编：" prop="postcode">
                  <iInput v-model="user.postcode" type="text" placeholder="请输入邮编"></iInput>
                </FormItem>
              </iCol>
        </Row>
				<Row>
              <iCol span="15">
                <FormItem label="描述：" prop="description">
                  <iInput v-model="user.description" type="text" placeholder="请输入描述"></iInput>
                </FormItem>
              </iCol>
        </Row>
				<FormItem style="margin-left: 8px;">
						<Button type="primary" @click="editcommmit">修改</Button>
				</FormItem>
				</Form>
			</div>
      <div class="roles-content" v-show="this.$store.state.selectedMenu==='roles'">
        <Row>
          <Table
            border
            size="small"
            :height="tableHeight"
            :columns="columns"
            :data="list"
            style="border-left:0;"
          >
          </Table>
        </Row>
      </div>
      <div class="pwdClass" v-show="this.$store.state.selectedMenu=='modifyPassword'">
        <Form
          label-position="right"
          :label-width="80"
          :model="pwdData"
					:rules="pwdDataValidate"
					ref="pwdForm"
        >
          <Row>
              <iCol span="14">
                <FormItem label="原密码" prop="oldPwd">
                  <iInput v-model.trim="pwdData.oldPwd" placeholder="请输入原密码" type="password"></iInput>
                </FormItem>
              </iCol>
          </Row>
          <Row>
              <iCol span="14">
                <FormItem label="新密码" prop="newPwd">
                  <iInput v-model.trim="pwdData.newPwd" placeholder="请输入新密码" type="password"></iInput>
                </FormItem>
              </iCol>
          </Row>
					<Row>
              <iCol span="14">
                <FormItem label="确认密码" prop="confirmPwd">
                  <iInput v-model.trim="pwdData.confirmPwd" placeholder="请再次输入密码" type="password"></iInput>
                </FormItem>
              </iCol>
          </Row>
						<FormItem style="margin-left: 8px;">
							<Button type="primary" @click="save">修改</Button>
							<Button @click="reset" style="margin-left: 8px">重置</Button>
						</FormItem>
        </Form>
      </div>
    </div>
  </LayoutLR>
</template>
<script>
import LayoutLR from '@/views/components/LayoutLR.vue'
import { getUserInfo, updatePassword, updateUser, getRole, validateOldPassword } from '@/api/user'
import {
  isTelphone,
  isEmail,
  isName,
	isFixedTelephone,
	isPwd
  //  issfId
} from '../common/validate.js'
export default {
  components: {
    LayoutLR
  },
  watch:{
  },
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入原密码!'))
      } else {
        let params = {
          oldPwd: value
        }
        validateOldPassword(params).then(res => {
          if (res.data && res.data.state === 'ok') {
            callback()
          } else {
            callback(new Error('输入的密码错误！'))
          }
        })
      }
    }
		const isConfirmPwd = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('确认密码不能为空'))
      } else if (this.pwdData.newPwd!= value) {
        callback(new Error('两次输入的密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      selectedMenu: this.$store.state.selectedMenu,
      tableHeight : 0,
      list : [],
      columns: [
        {
          title: "角色名",
          width: 250,
          key: "name"
        },
        {
          title: "锁定",
          width: 100,
          key: "locked",
          render(h, params) {
            return h('span', [params.row.locked === 'Y' ? '是' : '否'])
          }
        },
        {
          title: "描述",
          key: "description"
        }
      ],
			user : {
				name : '',
        //sfid:'',
				email : '',
				office_phone : '',
				mobile_phone : '',
				home_phone : '',
				address : '',
				postcode : '',
				description : ''
			},
			username : '',
      menus: [
        { key: 'personalInfo', label: '账号信息' },
        { key: 'roles', label: '角色' },
        { key: 'modifyPassword', label: '密码修改' }
			],
			pwdData : {
        oldPwd : '',
				newPwd :'',
				confirmPwd : ''
			},
			pwdDataValidate : {
        oldPwd : [{
					required: true,
          message: '旧密码不能为空',
          trigger: 'blur'},
          { validator: validatePass, trigger: 'blur' }
					],
				newPwd : [{
					required: true,
          message: '新密码不能为空',
					trigger: 'blur'},
					{ 
						validator: isPwd, trigger: "blur" 
				}],
				confirmPwd : [{
				required: true,
        message: '确认密码不能为空',
				trigger: 'blur'},
				{ 	
					validator: isConfirmPwd, trigger: "blur" 
				}]
			},
			userValidate : {
				name: [
          {
            required: true,
            message: '姓名不能为空',
            trigger: 'blur',
            validator: isName
          }
				],
                // sfid: [
                //     { message: '请输入正确身份证号码', trigger: 'blur', validator: issfId }
                // ],
				email: [
          { message: '请输入正确Email', trigger: 'blur', validator: isEmail }
				],
				office_phone: [
          {
            message: '办公电话格式不正确',
            trigger: 'blur',
            validator: isFixedTelephone
          }
				],
				mobile_phone: [
          {
            message: '手机号格式不正确',
            trigger: 'blur',
            validator: isTelphone
          }
        ],
        home_phone: [
          {
            message: '家庭电话格式不正确',
            trigger: 'blur',
            validator: isFixedTelephone
          }
				]
			}
    }
  },
  computed: {
  },
  methods: {
    updateMenu(key){
      this.$set(this.$store.state, 'selectedMenu', key)
    },
		save () {
			this.$refs.pwdForm.validate(valid => {
				if (valid) {
					updatePassword(this.pwdData.newPwd).then(res =>{
            let data = res.data
            if (data && data.state == 'ok') {
              this.$Notice.success({title:data.msg})
              this.reset()
            }else {
              this.$Notice.error({title:data.msg})
            }
					})
        }else {
					return false
				}
			})
		},
		editcommmit () {
			this.$refs.userForm.validate(valid => {
				if(!valid) {
					return false
				}else {
					updateUser(this.user).then(res => {
						let data = res.data
						this.$Notice[data.state === 'ok' ? 'success' : 'error']({ title : data.msg})
					})
				}
			})
		},
		reset () {
			this.pwdData = Object.assign({}, '')
		},
    isSelected (key) {
      return { 'function-menu-item-selected': this.$store.state.selectedMenu == key }
    },
    init() {
      getUserInfo().then(res =>{
        if (res.data.state == 'ok'){
          this.username = res.data.userInfo.username
          this.user = res.data.userInfo
        }
      }),
      getRole().then(res => {
        if (res.data && res.data.state === 'ok') {
            this.list = res.data.list
        } else {
            this.$Notice.error({
              title:
                res.data && res.data.msg
                  ? res.data.msg
                  : '未知错误，请联系管理员解决'
            })
        }
      })
      this.$store.state.selectedMenu=='personalInfo';
    }
  },
  mounted()  {
    this.$nextTick(() => {
      this.tableHeight = document.body.clientHeight - 156
    }),
    this.init()
  }
}
</script>

<style scoped>
.personal-container {
  text-align: left;
  width: 1000px;
  margin-left: auto;
  margin-right: auto;
}
.function-menu-item {
  padding: 0px 20px;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
}
.function-menu-item:hover {
  background-color: #f4f6f8;
}
.function-menu-item-selected,
.function-menu-item-selected:hover {
  background-color: white;
}
.user-avatar {
  text-align: center;
  padding: 20px 0px;
}
.avatar-img {
  margin-left: auto; 
  margin-right: auto; 
  height: 80px;
  width: 80px;
  border-radius: 40px;
  background-color: #5b6270;
}
.avatar-img img {
  height: 80px;
  width: 80px;
  border-radius: 40px;
}
.user-info,
.user-name {
  text-align: center;
  line-height: 20px;
  padding-bottom: 10px; 
}
.right-content {
  height: 100%;
  padding: 20px;
}
.pwdClass {
	padding-top: 10px;
}
</style>
