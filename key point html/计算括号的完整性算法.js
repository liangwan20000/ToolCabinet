var aaa = "{[()]}";
var str1 = "(abcd)eftgsf(s(d)f)()";
var str2 = "(sfd(sf)d )ff)(sdasdf)(";
var oneStr = [];
var lastStr = [];
var strList = [];

function a (str) {
    for (let i = 0; i < str.length; i++) {
        // 有一个左边括号
        if (str[i] === '(') {
            oneStr.push(i);
            // 去找一个右边括号
            for (let j = i + 1; j < str.length; j++) {
                // 记录右边括号的位置，不去比较这个位置
                if (str[j] === ')') {
                    if (!(lastStr.includes(j))) {
                        lastStr.push(j);
                        break;
                    }
                }
            }
        } else if (str[i] === ')' && !(lastStr.includes(i))) {
            strList.push(i);
        }
    }
    if (oneStr.length === lastStr.length && strList.length === 0) {
        alert('通过');
    } else {
        console.log(oneStr.length)
        console.log(lastStr.length)
        console.log(strList.length)
    }
}
a(str2);