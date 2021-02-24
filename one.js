function generateHandle (value1, value2, fn) {
    let num = value1 + value2
    return function (vale3, value4) {
        let obj = {
            num: num,
            name: vale3,
            age: value4
        }
        fn(obj)
    }
}