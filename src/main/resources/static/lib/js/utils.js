/**
 * Created by yangyt on 2017/2/12.
 */
/**
 * 检查某个值是否在数组里面
 * @param obj
 * @returns {boolean}
 */
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}
/**
 * 根据元素值查询出下标
 * @param val
 * @returns {number}
 */
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
/**
 * 通过元素值删除元素
 * @param val
 */
Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
/**
 * 是否为数字
 * @param str
 * @returns {boolean}
 */
function isDigital(str) {
    var reg = /^[1-9]\d*(\.\d+)?$/;
    if(!reg.test(str)){
        return false;
    }
    return true;
}

/**日期格式化*/
Date.prototype.format = function(format){
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(), //day
        "h+" : this.getHours(), //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3), //quarter
        "S" : this.getMilliseconds() //millisecond
    }

    if(/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }

    for(var k in o) {
        if(new RegExp("("+ k +")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        }
    }
    return format;
}

//使用方法
//var now = new Date();
//var nowStr = now.format("yyyy-MM-dd hh:mm:ss");
//使用方法2:
//var testDate = new Date();
//var testStr = testDate.format("YYYY年MM月dd日hh小时mm分ss秒");
//alert(testStr);
//示例：
//alert(new Date().Format("yyyy年MM月dd日"));
//alert(new Date().Format("MM/dd/yyyy"));
//alert(new Date().Format("yyyyMMdd"));
//alert(new Date().Format("yyyy-MM-dd hh:mm:ss"));