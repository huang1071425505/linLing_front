/**
 * 更改为toTree(数据,第一层的pid值,id名,label名,pid名) 
 * 
 * 例:toTree(data,0,menuId,menuName,menuPid)
 */
export function toTree(data, id, idName, labelName, pidName) {
    var result = [],
      temp;
    for (var i in data) {
      data[i].id = data[i][idName];
      data[i].label = data[i][labelName];
      if (data[i][pidName] == id) {
        result.push(data[i]);
        temp = toTree(data, data[i][idName], idName, labelName, pidName);
        if (temp.length > 0) {
          data[i].children = temp;
        }
      }
    }
    return result;
  }