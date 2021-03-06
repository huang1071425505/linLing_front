import Cookies from 'js-cookie'

const token = 'token'

export function getToken() {
    return Cookies.get(token);
}
export function setToken(data) {
    return Cookies.set(token,data);
}
export function removeToken() {
    return Cookies.remove(token)
}

export function getUserInfo() {
    return Cookies.get('userInfo');
}
export function setUserInfo(data) {
    return Cookies.set('userInfo',data);
}