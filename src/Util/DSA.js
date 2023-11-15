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
