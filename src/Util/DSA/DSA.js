exports.MapToArray=(Map,type='pair') =>
{
    let array;
    switch (type)
    {
        case 'pair': array = [...Map];
            break;
        case 'row': {
            array=[[],[]]
            Array.from(Map).map(([key, value]) =>
            {
                array[0].push(key),
                array[1].push(value)
            });
        }
            break;
        default: array = [];
    }
    return array;
}

exports.arrayToMap = (array,type=1) =>
{
    const map = new Map();
    if(type===1)
        array.map((value, index) => map.set(index, value))
    if (type === 2)
    {
        const [a1, a2] = array;
        a1.forEach((element,index) => {
            map.set(element,a2[index])
        });
    }
    return map
}
exports.arrayAddition = (...args) =>
{
try {
    const length = args[Math.floor(Math.random() * args.length)].length;
     if (args.every(ele => !Array.isArray(ele)))
         throw new TypeError("Arrays are allowed this function");
    if (args.every(ele => ele.length !== length))
        throw new Error('all Array must same length');
    const sum = [];
    for (let index = 0; index < length; index++) {
        const value=args.reduce((total, ele) => total + ele[index], 0);
        sum.push(value)

    }
    return sum;

} catch (error) {
    throw error;
}

}
