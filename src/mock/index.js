import Mock from 'mockjs'
import { getSsoUrl, getSearchUrl, getLogoUrl } from './setting'
import { getMenu } from './menu'
import { getMessageCount } from './message'
import { getUserInfo } from './user'

Mock.setup({
  timeout: 1000
})

Mock.mock(/\/aserver\/menu/, getMenu)
Mock.mock(/\/aserver\/setting\/sso/, getSsoUrl)
Mock.mock(/\/aserver\/setting\/search/, getSearchUrl)
Mock.mock(/\/aserver\/setting\/logoUrl/, getLogoUrl)
Mock.mock(/\/aserver\/user\/info/, getUserInfo)
Mock.mock(/\/aserver\/message\/count/, getMessageCount)
