//验证手机号
export function isPhone(rule, value, callback) {
    if (!value) {
        return callback(new Error('输入不可以为空'));
    }
    var pattern = /^1[34578]\d{9}$/;
    if(pattern.test(value)){
        return callback()
    }
    return callback(new Error('输入的手机号错误'))
}

// 验证邮箱
export function checkEmail(rule, value, callback) {
    if (!value) {
        return callback();
    }
    var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if (!reg.test(value)) {
        callback(new Error('请输入有效的电子邮箱！'));
    } else {
        callback();
    }
          
}

//是否身份证号码
export function isSfz(rule, value,callback) {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(value==''||value==undefined||value==null){
    callback(new Error('输入不能为空'));
    }else {
    if ((!reg.test(value)) && value != '') {
    callback(new Error('请输入正确的身份证号码'));
    } else {
    callback();
    }
    }
}