import { axios } from '@archser/layout-ui'
import myaxios from 'axios'

const SERVICE_URL = '/archser'
//Liu
export const getDatabyid = (tableId,dataId) => {
  return axios.request({
    url: SERVICE_URL + '/transManag/Transferopinions',
    params: {
      tableId,
      dataId
    },
    method: 'get'
  })
}

/**
 * 获取默认值的id
 * @param {*} type
 * @param {*} defaultValue
 */
export const getDefaultValueCode = (type, defaultValue) => {
  return axios.request({
    url: SERVICE_URL + '/table/getDefaultValueCode',
    data: {
      type: type,
      defaultValue: defaultValue
    },
    method: 'post'
  })
}
/**
 * 获取指定表的列定义
 * @param {*} tableId 表ID
 */
export const getColumns = params => {
  return axios.request({
    url: SERVICE_URL + '/table/columns',
    params: params,
    method: 'get'
  })
}

export const insertCopyModal = params => {
  return axios.request({
    url: SERVICE_URL + '/table/insertCopyModal',
    params: params,
    method: 'get'
  })
}
/**
 * 获取指定表的数据
 * @param {*} tableId 表ID
 */
export const getData = params => {
  return axios.request({
    url: SERVICE_URL + '/table/data',
    params: params,
    method: 'get',
    timeout:  (1000*60*2)
  })
}

/**
 * 文件接收搜索框功能：
 * 所有字段查询功能
 */
export const findDataByAll = (libId,tableId, page, size, findData, businessId,rulesCond,parentId,dataFields,istransfercond,isAjAndJn) => {
  return axios.request({
    url: SERVICE_URL + '/table/findDataByAll',
    params: {
      libId,
      tableId,
      page,
      size,
      findData,
      businessId,
	    rulesCond,
      parentId,
      dataFields,
      istransfercond,
      isAjAndJn
    },
    method: 'post'
  })
}

/**
 * 文件接收撤销功能
 */
export const updateTableArchIved = (tableId, tableJn, ids) => {
  return axios.request({
    url: SERVICE_URL + '/table/updateTableArchIved',
    params: {
      tableId,
      tableJn,
      ids: ids.join(',')
    },
    method: 'post'
  })
}

/**
 * 获取不归档原因
 */
export const selectNoArchReason = (tableId, dataId) => {
  return axios.request({
    url: SERVICE_URL + '/table/selectNoArchReason',
    params: {
      tableId,
      dataId
    },
    method: 'get'
  })
}

/**
 * 保存数据
 * @param {*} data 数据
 * @return 返回保存后的数据
 */
export const saveData = isData => {
  return axios.request({
    url: SERVICE_URL + '/table/save',
    data: isData,
    method: 'post'
  })
}
export const saveTable = isData => {
  return axios.request({
    url: SERVICE_URL + '/table/saveTable',
    data: isData,
    method: 'post',
    timeout: 60000
  })
}

/**
 * 案卷级下卷内级的保存数据的方法。
 * liuxujiang  2021.4.25
 * @param isData
 * @returns {*}
 */
export const jnsaveTable = isData => {
  return axios.request({
    url: SERVICE_URL + '/table/jnsaveTable',
    data: isData,
    method: 'post',
    timeout: 60000
  })
}

/**
 * 目录打印
 */
export const catalogPrinting = (
  tableId,
  businessId,
  ids,
  checkData,
  condStr
) => {
  return axios.request({
    url: SERVICE_URL + '/table/catalogPrinting',
    params: {
      ids: ids.join(','),
      checkData: checkData.join(','),
      condStr,
      tableId,
      businessId
    },
    method: 'post'
  })
}

/**
 * 删除数据
 * @param {*} data 数据
 * @return 返回保存后的数据
 */
export const removeData = ({ tableId, ids, libId, businessId, conditions }) => {
  return axios.request({
    url: SERVICE_URL + '/table/remove',
    data: {
      tableId,
      ids: ids.join(','),
      libId,
      businessId,
      conditions
    },
    method: 'post',
    timeout:  (1000*60*5)
  })
}

/**
 * 根据条件查询表的ID
 * @param {*} data 数据
 * @return 返回表的ID
 */
export const queryId = ({ tableId, ids, libId, businessId, conditions }) => {
  return axios.request({
    url: SERVICE_URL + '/table/queryId',
    data: {
      tableId,
      ids: ids.join(','),
      libId,
      businessId,
      conditions
    },
    method: 'post'
  })
}

export const checkField = params => {
  return axios.request({
    url: SERVICE_URL + '/table/checkField',
    data: params,
    method: 'post'
  })
}

/**
 * 保存列定义
 * @param {*} column 列定义
 */
export const saveColumn = column => {
  return axios.request({
    url: SERVICE_URL + '/table/saveColumn',
    data: {
      column
    },
    method: 'post'
  })
}
/**
 * 删除列定义
 * @param {*} ids
 */
export const dropColumns = data => {
  return axios.request({
    url: SERVICE_URL + '/table/dropColumn',
    data: {
      tableId: data.tableId,
      ids: data.ids.join(',')
    },
    method: 'post'
  })
}
/**
 * 获取字段名
 * @param {*}  params
 */
export const getEditColumns = params => {
  return axios.request({
    url: SERVICE_URL + '/table/getEditColumns',
    data: params,
    method: 'post'
  })
}
/**
 * 根据条件更新字段的值(批量修改)
 */
export const updateEditField = params => {
  return axios.request({
    url: SERVICE_URL + '/table/updateEditField',
    data: params,
    method: 'post',
    timeout: 60000
  })
}
/**
 * 根据条件更新组合字段的值
 */
export const updateComposeField = params => {
  return axios.request({
    url: SERVICE_URL + '/table/updateComposeField',
    data: params,
    method: 'post'
  })
}
/**
 * 根据条件查询所选字段的重复数据
 */
export const dataRecheck = params => {
  return axios.request({
    url: SERVICE_URL + '/table/dataRecheck',
    data: params,
    method: 'post'
  })
}
/**
 * 获取指定表的列定义(带有规则的)
 * @param {*}
 */
export const getColumnsWithRules = params => {
  return axios.request({
    url: SERVICE_URL + '/table/columnsWithRules',
    params: params,
    method: 'get'
  })
}
export const getColumnsLableTag = params => {
  return axios
      .request({
        url: SERVICE_URL + '/table/getColumnsLableTag',
        params: params,
        method: 'get'
      })
}
// 插入节点标签
export const insertCustom = (params) => {
  return axios.request({
    url: SERVICE_URL + '/table/insertCustom',
    params: params,
    method: 'post'
  })
}
// 点击节点后查到的标签数据
export const checkFiledNode = (params) => {
  return axios.request({
    url: SERVICE_URL + '/table/checkFiledNode',
    params: params,
    method: 'post',
    timeout:  (1000*60*5)
  })
}
/**
 *  查询用户对应table权限
 * @param {*}
 */
export const findTablePowerByUserId = params => {
  return axios.request({
    url: SERVICE_URL + '/table/findTablePowerByUserId',
    params: params,
    method: 'get'
  })
}

/**
 * 根据tableId以及Id查询数据
 * @param {*}
 */
export const getDataByTableIdAndId = (tableId, id) => {
  return axios.request({
    url: SERVICE_URL + '/table/getDataByTableIdAndId',
    params: {
      tableId,
      id
    },
    method: 'get'
  })
}

/**
 * 上传Excel
 */

export const handleAjImprotExcel = (e, dataType, id) => {
  let param = new FormData() // 创建form对象
  param.append('file', e.target.files[0]) // 通过append向form对象添加数据
  param.append('libraryId', id)
  param.append('dataType', dataType)
  return myaxios({
    method: 'post',
    url: SERVICE_URL + '/table/importExcel',
    data: param,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

/**
 * 上传模板
 * @param {*} e
 * @param {*} dataType
 * @param {*} id
 */
export const handleAjImprotTempalte = (e, dataType, id) => {
  let param = new FormData() // 创建form对象
  param.append('file', e.target.files[0]) // 通过append向form对象添加数据
  param.append('libraryId', id)
  param.append('dataType', dataType)
  return myaxios({
    method: 'post',
    url: SERVICE_URL + '/table/uploadTemplateFile',
    data: param,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
/**
 * 删除电子文件条目
 * @param {*} param0
 */
export const removeFilesData = ({ tableId, ids, libId, businessId }) => {
  return axios.request({
    url: SERVICE_URL + '/table/removeFilesData',
    data: {
      tableId,
      ids: ids.join(','),
      libId,
      businessId
    },
    method: 'post'
  })
}
/**
 * 文件归档或退回
 * @param {*} params
 */
export const fileFilingOrReturn = params => {
  return axios.request({
    url: SERVICE_URL + '/table/fileFilingOrReturn',
    data: params,
    method: 'post'
  })
}
/**
 * 文件不归档
 * @param {*} params
 */
export const fileNoArchived = params => {
  return axios.request({
    url: SERVICE_URL + '/table/fileNoArchived',
    data: params,
    method: 'post'
  })
}
/**
 * 得到上传的文件服务和上传的路径
 * @param {*} tableId
 * @param {*} id
 */
export const getUploadFserverAndBasePath = (tableId, id,businessId,appform) => {
  return axios.request({
    url: SERVICE_URL + '/table/getUploadFserverAndBasePath',
    params: {
      tableId,
      id,
      businessId,
      appform
    },
    method: 'get'
  })
}

/**
 * 得到所有的文件服务
 */
export const getFserverList = () => {
  return axios.request({
    url: SERVICE_URL + '/table/getFserverList',
    method: 'get'
  })
}
/**
 * 得到每一个路径下的文件夹和文件
 * @param {*} params
 */
export const getFoldersAndFiles = params => {
  return axios.request({
    url: SERVICE_URL + '/table/getFoldersAndFiles',
    params: params,
    method: 'get'
  })
}
/**
 * 手动挂接文件
 * @param {*} params
 */
export const mountFiles = params => {
  return axios.request({
    url: SERVICE_URL + '/table/mountFiles',
    data: params,
    method: 'post',
    timeout:  (1000*60*5)
  })
}
/**
 * 文件服务情况
 * @param {*} tableId
 */
export const testFserverByTableId = params => {
  return axios.request({
    url: SERVICE_URL + '/table/testFserverByTableId',
    data: params,
    method: 'post'
  })
}
/**
 * 批量挂接
 */
export const batchMount = params => {
  return axios.request({
    url: SERVICE_URL + '/table/batchMount',
    data: params,
    method: 'post'
  })
}


//zhanglongfa 20200326 YZJ-2239:档案著录-数据导出-勾选 电子文件 文件类型出现 OFD
export const outputData = params => {
  return axios.request({
    url: SERVICE_URL + '/table/outputData',
    data: params,
    timeout: ( 1000*60*5 ),
    method: 'post'
  })
}

export const fileEntry = params => {
  return axios.request({
    url: SERVICE_URL + '/table/fileEntry',
    data: params,
    method: 'post'
  })
}
/**
 * 挂接检查
 */
export const mountCheck = params => {
  return axios.request({
    url: SERVICE_URL + '/table/mountCheck',
    params: params,
    method: 'get'
  })
}

/**
 * 下载文件
 * @param {*} params
 */
export const handleDownload = (
  tableId,
  libraryId,
  name,
  parentId,
  businessId
) => {
  return axios.request({
    url: SERVICE_URL + '/table/downLoadFile',
    params: {
      tableId,
      libraryId,
      name,
      parentId,
      businessId
    },
    method: 'post'
  })
}

/**
 * 获取所有模板列表
 */
export const getTemplateFiles = tableId => {
  return axios.request({
    url: SERVICE_URL + '/table/getTemplateFiles?tableId=' + tableId,
    method: 'get'
  })
}

export const deleteCode = () => {
  return axios.request({
    url: SERVICE_URL + '/table/deleteCode',
    method: 'get'
  })
}

export const deleteType = param => {
  return axios.request({
    url: SERVICE_URL + '/table/deleteType',
    params: param,
    method: 'get'
  })
}

export const fieldsIsExistRoles = (tableId, ids) => {
  let finalIds = Object.assign([], ids)
  return axios.request({
    url: SERVICE_URL + '/table/fieldsIsExistRoles',
    params: {
      tableId: tableId,
      ids: finalIds.join(',')
    },
    method: 'get'
  })
}

export const fieldsIsExistRule = (tableId, ids) => {
  let finalIds = Object.assign([], ids)
  return axios.request({
    url: SERVICE_URL + '/table/fieldsIsExistRule',
    params: {
      tableId: tableId,
      ids: finalIds.join(',')
    },
    method: 'post'
  })
}

/**
 * 检测元数据下是否存在数据
 * 李德才
 * @param {表ID} tableId
 * @param {元数据Id} ids
 */
export const fieldsIsHaveData = (tableId, ids) => {
  let finalIds = Object.assign([], ids)
  return axios.request({
    url: SERVICE_URL + '/table/fieldsIsHaveData',
    params: {
      tableId: tableId,
      ids: finalIds.join(',')
    },
    method: 'post'
  })
}

/**
 * 检测当前档案类别是否存在数据
 * 李德才 20200312
 * @param {档案类别Id} id
 */
export const checkLibraryIsHaveData = id => {
  return axios.request({
    url: SERVICE_URL + '/table/checkLibraryIsHaveData',
    params: {
      libraryId: id
    },
    method: 'post'
  })
}

/**
 * 检测档案类别与角色的关联
 * 李德才 20200312
 * @param {档案类别Id} id
 */
export const checkLibraryIsHaveRole = id => {
  return axios.request({
    url: SERVICE_URL + '/table/checkLibraryIsHaveRole',
    params: {
      libraryId: id
    },
    method: 'post'
  })
}

export const uploadFiles = params => {
  return myaxios({
    method: 'post',
    url: SERVICE_URL + '/table/uploadFile',
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    //zhanglongfa 20200325 YZJ-1995:文件接收-卷内-文件-上传-有一个文件一上传就没反应了,点击取消上传之后,多了一条空数据
    timeout:  (1000*60*5)
  })
}

export const checkArchives = params => {
  return axios.request({
    url: SERVICE_URL + '/table/checkArchives',
    params: params,
    method: 'post'
  })
}

/**
 * 获取方案
 * @param {*} params
 */
export const getSolution = params => {
  return axios.request({
    url: SERVICE_URL + '/table/getSolution',
    params: params,
    method: 'post'
  })
}

/**
 * 选择方案获取配置信息
 * @param {*} params
 */
export const changeSoultion = params => {
  return axios.request({
    url: SERVICE_URL + '/table/changeSoultion',
    params: params,
    method: 'post'
  })
}

/**
 * 得到组合字段
 */
export const getComposeFileds = params => {
  return axios.request({
    url: SERVICE_URL + '/table/getComposeFileds',
    params: params,
    method: 'get'
  })
}

/**
 * 根据tableid和rulename 查询rule
 * @param {} params
 */
export const getRuleByTbIdAndRuleName = params => {
  return axios.request({
    url: SERVICE_URL + '/table/getRuleByTbIdAndRuleName',
    params: params,
    method: 'get'
  })
}

/**
 * 根据tableid和rulename 查询rule
 * @param {} params
 */
export const docNumInsert = params => {
  return axios.request({
    url: SERVICE_URL + '/table/docNumInsert',
    params: params,
    method: 'post'
  })
}

/**
 * 档号删除
 * @param {*} id
 * @param {*} table
 */
export const docNumDelete = (id, table) => {
  return axios.request({
    url: SERVICE_URL + '/table/docNumDelete',
    data: {
      id: id,
      table: table
    },
    method: 'post'
  })
}

export const docNumMake = row => {
  return axios.request({
    url: SERVICE_URL + '/table/docNumMake',
    data: row,
    method: 'post'
  })
}

/**
 *   根据搜索内容查询
 */
export const searchData = (libraryId, pageSize, pageNumber, inputData) => {
  return axios.request({
    url: SERVICE_URL + '/table/searchData',
    data: {
      libraryId,
      pageSize,
      pageNumber,
      inputData
    },
    method: 'post'
  })
}
/**
 * 查询装盒的table数据
 * @param {} params
 */
export const getBoxReceiveData = params => {
  return axios.request({
    url: SERVICE_URL + '/table/getBoxReceiveData',
    params: params,
    method: 'get'
  })
}
/**
 * 判断角色名称是否存在
 * @param {*} params
 */
export const getIdSeqByUserName = params => {
  return axios.request({
    url: SERVICE_URL + '/table/getIdSeqByUserName',
    params: params,
    method: 'get'
  })
}
/**
 * 获取文件元数据
 * @param {*} serverName
 * @param {*} filePath
 */

export const getFileMetadata = para => {
  return axios.request({
    url: SERVICE_URL + '/table/getFileMetadata',
    data: para,
    method: 'post'
  })
}

/**
 * 引入元数据
 * @param {*} params
 */
export const introduceMeta = params => {
  return axios.request({
    url: SERVICE_URL + '/table/introduceMeta',
    data: params,
    method: 'post',
    timeout:  (1000*60*2)
  })
}

/**
 * 验证验证码
 * @param {*} code
 */
export const validateCaptcha = code => {
  return axios.request({
    url: SERVICE_URL + '/table/validateCaptcha',
    data: {
      code: code
    },
    method: 'post'
  })
}

/**
 * 通过设置的条件获取数据id
 * @param {*} code
 */
export const findIdsByCondition = params => {
  return axios.request({
    url: SERVICE_URL + '/table/findIdsByCondition',
    data: params,
    method: 'post'
  })
}

/**
 * 获取携带字段
 *  yangchengwu 2020年3月22日
 * @param {*} table_id
 */
export const getCarryFields = (table_id) => {
  return axios.request({
    url: SERVICE_URL + '/table/getCarryFields',
    data: {
      table_id:table_id
    },
    method: 'post'
  })
}

/**
 * 获取全宗列表
 * 2020年3月27日 yangchegnwu
 */
export const getSuperiorFond = () => {
  return axios.request({
    url: SERVICE_URL + '/table/getSuperiorFond',
    method: 'post'
  })
}
// 报表打印
export const printDatadown = params => {
  return axios.request({
    url: SERVICE_URL + '/btable/btable',
    params: params,
    method: 'post'
  })
}
// 报表打印
export const exportFileTable = params => {
  return axios.request({
    url: SERVICE_URL + '/btable/exportFileTable',
    params: params,
    method: 'post'
  })
}
/**
 * 得到filing服务端的url
 */
export const getFilingUrl = () => {
  return axios.request({
    url: SERVICE_URL + '/table/getFilingUrl',
    method: 'get'
  })
}
/**
 * 自定义节点获取指定表的数据
 * @param {*} tableId 表ID
 */
export const getNodeData = params => {
  return axios.request({
    url: SERVICE_URL + '/table/getNodeData',
    params: params,
    method: 'get',
    timeout:  (1000*60*2)
  })
}
/**
 * 文件接收搜索框功能：
 * 在节点分页时
 * 所有字段查询功能
 */
export const findNodeDataByAll = (libId,tableId, page, size, findData, businessId,rulesCond,parentId, dataFields,istransfercond,nodeid,isAjAndJn,labelTag) => {
  return axios.request({
    url: SERVICE_URL + '/table/findNodeDataByAll',
    params: {
      libId,
      tableId,
      page,
      size,
      findData,
      businessId,
      rulesCond,
      parentId,
      dataFields,
      istransfercond,
      nodeid,
      isAjAndJn,
      labelTag
    },
    method: 'post',
    timeout:  (1000*60*5)
  })
}
/**
 * 查询选中的数据，并且根据字段值规则，对字段值设置的列名，查询最大值并自动累加1。
 * liuxujiang  2021.3.24
 * @param {*} tableId 表ID
 */
export const getFieldvalueByselectData = params => {
  return axios.request({
    url: SERVICE_URL + '/table/getFieldvalueByselectData',
    params: params,
    method: 'get',
    timeout:  (1000*60*2)
  })
}
/**
 * 保存完数据后，根据字段值规则自动累加1，组合字段实时更新。
 * liuxujiang  2021.3.29
 * @param {*} tableId 表ID
 */
export const saveAndAddData = params => {
  return axios.request({
    url: SERVICE_URL + '/table/saveAndAddData',
    params: params,
    method: 'get',
    timeout:  (1000*60*2)
  })
}
/**
 * 卷内级，不勾选数据时，点击添加按钮，
 * 字段值规则(例如：卷内顺序号)自动累加1，
 * 组合字段规则(例如：档号)跟着实时更新。
 * liuxujiang  2021.3.29
 * @param {*} tableId 表ID
 */
export const jngetFieldvalueandcompose = params => {
  return axios.request({
    url: SERVICE_URL + '/table/jngetFieldvalueandcompose',
    params: params,
    method: 'get',
    timeout:  (1000*60*2)
  })
}
/**
 * 卷内级，勾选数据时，点击添加按钮，
 * 字段值规则(例如：卷内顺序号)自动累加1，
 * 组合字段规则(例如：档号)跟着实时更新。
 * 题名、人物名单、文件形成时间、页数这4个字段除外，别的都携带到表单中。
 * liuxujiang  2021.3.29
 * @param {*} tableId 表ID
 */
export const jnCheckFormData = params => {
  return axios.request({
    url: SERVICE_URL + '/table/jnCheckFormData',
    params: params,
    method: 'get',
    timeout:  (1000*60*2)
  })
}
/**
 * 卷内级，保存完数据后，根据字段值规则自动累加1，组合字段实时更新。
 * liuxujiang  2021.3.29
 * @param {*} tableId 表ID
 */
export const jnsaveAndAddData = params => {
  return axios.request({
    url: SERVICE_URL + '/table/jnsaveAndAddData',
    params: params,
    method: 'get',
    timeout:  (1000*60*2)
  })
}

/**
 * 获取下载的文件
 */
export const getFlie = () => {
  return axios.request({
    url: SERVICE_URL + '/down/getFlie',
    method: 'get'
  })
}

/**
 * 中途关闭删除上传文件
 */
export const deleteUploadFile = (params) => {
  return axios.request({
    params: params,
    url: SERVICE_URL + '/table/deleteUploadFile',
    method: 'get'
  })
}

/**
 * 查询归档部门，所具有的机构名称。
 * liuxujiang
 * 20211013
 */
export const getDepartmentData = params => {
  return axios.request({
    url: SERVICE_URL + '/table/getDepartmentData',
    params: params,
    method: 'get',
    timeout:  (1000*60*2)
  })
}

/**
 * lzx
 * 20211209
 * 获取下拉框字段数据，从数据库数据表中对数据的对应字段进行去重返回
 */
export const getColumnData = params => {
  return axios.request({
    url: SERVICE_URL + '/table/getColumnData',
    params: params,
    method: 'get',
    timeout:  (1000*60*2)
  })
}

/**
 * 查询重复门类的名字
 * @param {*} tableId 表ID
 */
export const getlibrary = params => {
  return axios.request({
    url: SERVICE_URL + '/table/getLibrary',
    params: params,
    method: 'get',
    timeout:  (1000*60*2)
  })
}

/**
 * 编目著录上传单机版zip包
 */
export const importZipData = (fileName, ip /*, dataType, id*/) => {
  let param = new FormData() // 创建form对象
  param.append('file', fileName.target.files[0]) // 通过append向form对象添加数据
  param.append('ip', ip)
  /*  param.append('tableId', id)
    param.append('dataType', dataType)*/
  return myaxios({
    method: 'post',
    url: SERVICE_URL + '/table/importZipData',
    data: param,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}