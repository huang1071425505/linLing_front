//验证手机号
export function isPhone(rule, value, callback) {
    if (!value) {
        return callback(new Error('输入不可以为空'));
    }
    var pattern = /^1[34578]\d{9}$/
    if(pattern.test(value)){
        return callback()
    }
    return callback(new Error('输入的手机号错误'))
}

//是否身份证号码
export function isSfz(rule, value,callback) {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(value==''||value==undefined||value==null){
    callback();
    }else {
    if ((!reg.test(value)) && value != '') {
    callback(new Error('请输入正确的身份证号码'));
    } else {
    callback();
    }
    }
}