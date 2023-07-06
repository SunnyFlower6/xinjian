// 手机号验证
export function isTelphone(rule, value, callback) {
  const reg = /^1[34578]\d{9}$/
  if (value === null || value.trim() === '') {
    //callback()
  } else if (!value) {
    return callback(new Error('请输入手机号'))
  } else {
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('手机号格式不正确！'))
    }
  }
}

// 身份证号码验证
export function issfId(rule, value, callback) {
  const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
  if (value === null || value.trim() === '') {
    callback()
  } else if (!value) {
    return callback(new Error('请输入身份证号码'))
  } else {
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的身份证号码！'))
    }
  }
}

// email验证
export function isEmail(rule, value, callback) {
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  if (value === null || value.trim() === '') {
    callback()
  } else if (!value) {
    return callback(new Error('请输入Email'))
  } else {
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('Email格式不正确！'))
    }
  }
}

// 固定电话验证
export function isFixedTelephone(rule, value, callback) {
  const reg = /^(0\d{2,3}-\d{7,8})$/
  if (value === null || value.trim() === '') {
    callback()
  } else if (!value) {
    return callback(new Error('请输入电话号码'))
  } else {
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('电话号码格式不正确！'))
    }
  }
}

export function isName(rule, value, callback) {
  if (value === null || value.trim() === '') {
    return callback(new Error('姓名不能为空或空格!'))
  } else {
    callback()
  }
}


// 密码验证
export function isPwd(rule, value, callback) {
    const reg =/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{6,}$/
    if (value === '' || value.trim() === '') {
      return callback(new Error('密码不能为空'))
    }else {
      callback()
    }
}
