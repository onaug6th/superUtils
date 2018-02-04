/**
 * description:"utils.js"
 * author:"onaug6th"
 * createTime:"2017-11-16"
 * dependencies:jquery
 */

(function (win, $) {
    // if (typeof Array.prototype.forEach != 'function') {
    Array.prototype.forEach = function (callback) {
        for (var i = 0; i < this.length; i++) {
            callback.apply(this, [this[i], i, this]);
        }
    };
    // }

    /**
     * 超级工具
     * @type { method }
     */
    var superUtils = {
        /**
         * 版本号
         * @type { string }
         */
        version: "0.1",
        /**
         * 大数相加
         * javascript能表示的最大数值是Number.MAX_VALUE，即1.7976931348623157e+308，这个数值虽然能够正确表示出来，但是存在一个精度丢失的问题。
         * 避免精度丢失或者就要实现大数的相加，解决方法的思路是以字符串的形式来相加
         * @param {String|Number} a 
         * @param {String|Number} b
         * @returns {String } 
         */
        addBigTreeNumber: function (a, b) {
            var aList = typeof a === "string" ? a.split("").reverse() : String(a).split("").reverse();
            var bList = typeof b === "string" ? b.split("").reverse() : String(b).split("").reverse();
            //  max长度最大的数据
            var max = Math.max(aList.length, bList.length);
            //  cList用于存储返回的数据数组
            var cList = [];
            //  flag,是否进十位
            var flag = 0;

            //  以最大长度开始循环
            for (var i = 0; i < max; i++) {
                /**
                 * aList[i] 与 bList[i]相加 与flag相加
                 * 如果存在flag，则说明上次相加时大于10进了一位
                 * 如果aList[i] 与 bList[i]相加大于9，即进10。tmp减去10然后添加flag进十位标记
                 */
                var tmp = (+aList[i] || 0) + (+bList[i] || 0) + flag;
                flag = 0;
                if (tmp > 9) {
                    tmp -= 10;
                    flag = 1;
                }
                cList.push(tmp);
            }
            //  循环结束后，如果还存在进十标记，往数组推进1
            if (flag === 1) {
                cList.push(flag);
            }

            return cList.reverse().join("");
        },
        /**
         * 深拷贝
         * @type { method }
         * @param { object } p 拷贝对象
         * @param { object } c 复制对象
         */
        deepCopy:function(p,c){
            c = c || {};
            
            for(var i in p){
                if(typeof p[i] === 'object'){
                    c[i] = (p[i].constructor === Array) ? [] : {};
                    deepCopy(p[i],c[i]);
                }else{
                    c[i] = p[i];
                }
            }
            return c;
        },
        /**
         * 根据参数生成特定长度的随机数
         * @type { method }
         * @param { string } len 长度
         * @param { string } minus 负数
         * 16 => 16 ; 8 , -1 => -16
         */
        customRandomNumber: function (len, minus) {
            len = len ? len : 10;
            var randomNumber = Math.random().toString();
            randomNumber = randomNumber.substr(randomNumber.indexOf(".") + 1, minus ? len * 2 : len);
            minus ? randomNumber = -randomNumber : "";
            return randomNumber;
        },
        /**
         * 获取最大公共字符串
         * @type { method }
         * @param {string} str1 字符串1
         * @param {string} str2 字符串2
         * abaababbb,ababa => abab
         */
        getBigCommonStr: function (str1, str2) {
            str1 = str1.split("");
            str2 = str2.split("");

            var nowStr = "";
            var longgestStr = "";

            for (var i = 0; i < str1.length; i++) {
                for (var j = 0; j < str2.length; j++) {
                    if (str1[i] == str2[j]) {
                        nowStr = "";
                        eachStr(i, j);
                    }
                }
            }

            function eachStr(i, j) {
                if (str1[i] == str2[j] && str1[i] !== undefined) {
                    nowStr += str1[i];
                    if(nowStr.length > longgestStr.length){
                        longgestStr = nowStr;
                    }
                    eachStr(i + 1, j + 1);
                }
            }
            return longgestStr;
        },
        /**
         * 计算数组中最大值与最小值的差值
         * @type { method }
         * @param { Array } arr 数组
         */
        getMaxMinusMin: function (arr) {
            //  预定义最小值
            var minPrice = arr[0];
            //  预定义最大差距
            var maxProfit = 0;

            for (var i = 0; i < arr.length; i++) {
                //  当前数值
                var currentPrice = arr[i];
                //  Math方法比较，重新赋值最小值
                minPrice = Math.min(minPrice, currentPrice);
                //  当前金额与最小值的差距
                var potentialProfit = currentPrice - minPrice;
                //  Math方法比较当前差距和预定义最大差距
                maxProfit = Math.max(maxProfit, potentialProfit);
            }
            //  返回差距
            return maxProfit

            //  方法2
            // if (arr.length <= 1) {
            //     return console.log("you array is not enough long,please at least two");
            // }
            // var maxNumber;
            // var minNumber;
            // for (var i = 0; i < arr.length; i++) {
            //     if (!maxNumber) {
            //         maxNumber = arr[i];
            //     }
            //     if (!minNumber) {
            //         minNumber = arr[i];
            //     }
            //     if (arr[i] > maxNumber) {
            //         maxNumber = arr[i];
            //     }
            //     if (arr[i] < minNumber) {
            //         minNumber = arr[i];
            //     }
            // }
            // return maxNumber - minNumber;
        },
        /**
         * 生成长度为n的斐波那契数列数组
         * @type { method }
         * @param { number } n 长度
         * [0,1,1,2,3,5,8,13,21,34,55,89,144]
         */
        getFibonacci: function (n) {
            var fibarr = [];
            // 方法1
            // var i = 0;
            // while (i < n) {
            //     if (i <= 1) {
            //         fibarr.push(i);
            //     } else {
            //         fibarr.push(fibarr[i - 1] + fibarr[i - 2])
            //     }
            //     i++;
            // }
            // 方法2
            for (var i = 0; i < n.length; i++) {
                if (i <= 1) {
                    fibarr.push(i);
                } else {
                    fibarr.push(fibarr[i - 1] + fibarr[i - 2]);
                }
            }
            return fibarr;
        },
        /**
         * 不借助临时变量，对两个整数进行交换
         * @type { method }
         * @param { string } var1 变量1
         * @param { string } var2 变量2
         */
        exchangeVar: function (var1, var2) {
            //  var1 = var1 + (var2 - var1)
            var2 = var2 - var1;
            var1 = var1 + var2;
            var2 = var1 - var2;
            // var1 = var1 ^ var2;
            // var2 = var1 ^ var2;
            // var1 = var1 ^ var2;
            return (var1 + ',' + var2);
        },
        /**
         * 快速排序
         * 1.先取数组中的第一位，作标准来和数组内的值判断。 比标准大的放在大数组中，比标准小的放在小数组中。
         * 2.筛选完毕后递归调用快速排序方法，对已经分组的两个大小数组再次排序
         * @type { method }
         * @param { Array } arr 数组
         */

        /**
         *                                                quickSort([3,1,5,8,2,4]);
         *                                                           |
         *                                                           |
         *                                                           V
         *                         concat( quickSort([1,2])       , [3] ,      quickSort([5,8,4]) )
         *                                     |                                           |
         *                                     |                                           |
         *                                     V                                           V
         *      concat( quickSort([])  , [1] , quickSort([2]) )        concat( quickSort([4])  , [5] , quickSort([8]) )
         *                                             |                           |                       |
         *                                             |                           |                       |
         *                                             V                           V                       V
         *                                          return [2]                 return [4]               return [8]
         * 
         */
        quickSort: function (arr) {
            //  长度为1 说明只有一个值了，不用排序直接返回
            if (arr.length <= 1) {
                return arr;
            }

            let leftArr = [];
            let rightArr = [];
            let q = arr[0];
            for (let i = 1; i < arr.length; i++) {
                if (arr[i] > q) {
                    rightArr.push(arr[i]);
                } else {
                    leftArr.push(arr[i]);
                }
            }

            return [].concat(this.quickSort(leftArr), [q], this.quickSort(rightArr));
        },
        /**
         * 对一个数组进行冒泡排序
         * @type { method }
         * @param { Array } arr 排序的数组
         * @param { boolean } desc 倒序
         */
        sortArray: function (arr, desc) {
            if (!arr || arr.constructor != Array) {
                return console.log("first param must be a array type param");
            }
            for (let i = 0; i < arr.length - 1; i++) {
                for (let j = i + 1; j < arr.length; j++) {
                    if (arr[i] > arr[j]) {
                        let tem = arr[i];
                        arr[i] = arr[j];
                        arr[j] = tem
                    }
                }
            }
            if (desc) {
                arr = arr.reverse();
            }
            return arr;
        },
        /**
         * 判断一条数据是否为回文
         * @type { method }
         * @param { string } str
         */
        judegIsBackStr: function (str) {
            if (str.constructor == Array) {
                str = str.join("");
            } else {
                str = str.toString();
            }

            if (str == str.split("").reverse().join("")) {
                return true;
            } else {
                return false;
            }
        },
        /**
         * 计算在数组中或字符串出现次数最多的的值
         * [1,2,3,1,2,1] =>1     "122114" => 1
         * @type { method } 
         * @param { string,array } 数组或字符串
         */
        countTheMostString: function (data) {
            if (!data) {
                return "";
            }
            var returnData,
                hashTable = {},
                mostStr;
            if (data.constructor == Array) {
                data.forEach(function (item, index) {
                    if (!hashTable[item]) {
                        hashTable[item] = 1;
                    } else {
                        hashTable[item] = hashTable[item] + 1;
                    }
                });
            }
            if (data.constructor == String) {
                data.split("").forEach(function (item, index) {
                    if (!hashTable[item]) {
                        hashTable[item] = 1;
                    } else {
                        hashTable[item] = hashTable[item] + 1;
                    }
                });
            }
            for (var i in hashTable) {
                if (!mostStr) {
                    mostStr = i;
                } else if (hashTable[mostStr] < hashTable[i]) {
                    mostStr = i;
                }
            }
            return mostStr;
        },
        /**
         * 互相转换大小写
         * 例如 "AAbb" => "aaBB"
         * @type { method }
         * @param { string } str 转换的字符
         */
        convertLowerCaseAndUpperCase: function (str) {
            if (!str) {
                return console.log("please give me a str param,thank you");
            }
            if (str.constructor != String) {
                return console.log("please give me a str param,thank you");
            }
            var strArr = str.split("");
            strArr.forEach(function (item, index) {
                if (item == item.toUpperCase()) {
                    strArr[index] = item.toLowerCase();
                } else {
                    strArr[index] = item.toUpperCase();
                }
            });
            return strArr.join("");
        },
        /**
         * 解析url参数转为对象
         * @type { method }
         * @param { string } url 地址
         */
        handleUrlQueryToObject: function (url) {
            url = url ? url : location.href;
            var returnObject = {};
            if (url.indexOf("?") != -1) {
                url.substr(url.indexOf("?") + 1).split("&").forEach(function (item, index) {
                    var queryArr = item.split("=");
                    returnObject[queryArr[0]] = queryArr[1]
                });
            } else {
                return console.info('your url have not any query param');
            }
            return returnObject
        },
        /**
         * 将一个数组重复的内容去除
         * @type { method }
         */
        unique: function (arr) {
            if (!arr) {
                return console.info("please give me a array param,thank you")
            }
            if (arr.constructor != Array) {
                return console.info("please give me a array param,thank you")
            }
            var hashTable = {};
            var returnData = [];
            for (var i = 0; i < arr.length; i++) {
                if (!hashTable[arr[i]]) {
                    hashTable[arr[i]] = true;
                    returnData.push(arr[i]);
                }
            }
            return returnData;
        },
        /**
         * 将两个长度相同的数组融合为一个对象
         * @type { method }
         * @param { Array } array1 数组1
         * @param { Array } array2 数组2
         */
        mergeArrayToObject: function (array1, array2) {
            if (!array1 || !array2) {
                return console.log("plese give me tow array param,thank you");
            }
            if (array1.length !== array2.length) {
                return console.log("you tow param length is not same,please keep same length");
            }
            var object = {};
            for (var i = 0; i < array1.length; i++) {
                object[array1[i]] = array2[i]
            }
            return object;
        },
        /**
         * 对数字金额作中文金额转义
         * @type { method }
         * @param { string } money 转换的金额
         */
        convertMoney: function (money) {
            //	汉字的数字
            var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
            //  基本单位
            var cnIntRadice = new Array('', '拾', '佰', '仟');
            //  对应整数部分扩展单位
            var cnIntUnits = new Array('', '万', '亿', '兆');
            //  对应小数部分单位
            var cnDecUnits = new Array('角', '分', '毫', '厘');
            //  整型完以后的单位
            var cnIntLast = '元';
            //  金额整数部分
            var integerNum;
            //	金额小数部分
            var decimalNum;
            //  返回值
            var returnStr = "";

            //  开始处理数字
            if (!money) {
                return console.log("plese give me a number param,thank you");
            }
            //  如果金额为空字符串，返回信息
            if (money == "") {
                return console.log("plese give me a number param,thank you");
            }
            //  对金额做转数字处理，判断
            money = parseFloat(money);
            if (money == 0) {
                return 0;
            }
            //  如果金额超出计算范围
            if (money > Number.MAX_VALUE) {
                return console.log("you number is so big,please small");
            }
            //  字符串化金额
            money = money.toString();
            //  如果金额中包含小数点 ，说明带有小数
            //  这里判断是否带了两个小数以上
            if (money.indexOf('.', money.indexOf('.') + 1) !== -1) {
                return console.log("you number has most than tow point,that is not right.please take one point");
            }
            //  如果没有小数点
            if (money.indexOf('.') == -1) {
                integerNum = money;
                decimalNum = '';
            } else {
                //  切割金额，分别赋值
                integerNum = money.split(".")[0];
                decimalNum = money.split(".")[1].substr(0, 4);
            }

            //  处理整数金额
            if (parseInt(integerNum, 10) > 0) {
                //  零计数
                var zeroCount = 0;
                //  金额字符串长度
                var intLen = integerNum.length;
                for (var i = 0; i < intLen; i++) {
                    //  从第i个字开始抽取
                    var n = integerNum.substr(i, 1);
                    //  剩余长度
                    var p = intLen - i - 1;
                    //  如果剩余长度可以整除4，例如'10000' - '1' / 4 = 1 ,说明到达万位
                    var q = p / 4;
                    //  十百千判断
                    var m = p % 4;
                    //  如果当前数字为0，直接零计数加一
                    if (n == '0') {
                        zeroCount++;
                    } else {
                        //  如果零计数大于0，往返回的字符串追加零
                        if (zeroCount > 0) {
                            returnStr += cnNums[0];
                        }
                        zeroCount = 0;
                        //  往返回字符串中追加个单位和十百千单位
                        returnStr += cnNums[n] + cnIntRadice[m];
                    }
                    //  如果剩余字符长度取余4 等于 0 且 零计数小于4，追加万亿单位
                    if (m == 0 && zeroCount < 4) {
                        returnStr += cnIntUnits[q];
                    }
                }
                returnStr += cnIntLast
            }
            //  小数部分
            if (decimalNum != '') {
                var decLen = decimalNum.length;
                for (var i = 0; i < decLen; i++) {
                    var n = decimalNum.substr(i, 1);
                    if (n != '0') {
                        returnStr += cnNums[Number(n)] + cnDecUnits[i];
                    }
                }
            }
            if (returnStr !== "") {
                return returnStr;
            }
        }
    }
    window.superUtils = superUtils;
})(window, $);
