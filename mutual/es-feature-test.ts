function shallowEqual(obj1: Record<string,number>, obj2: Record<string,number>): boolean {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length) {
        return false;
    }
    for (const key of keys1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }
     return true;
}

function arrayShallowEqual(arr1: number[], arr2: number[]): boolean {
    return arr1.length == arr2.length && arr1.findIndex((x, i) => x !== arr2[i]) < 0;
}

function testES2017(obj1: Record<string,number>, obj2: Record<string,number>): boolean {
    const result = Object.fromEntries(Object.entries(obj1).map(([k,v]) => [k, v*v]));
    return shallowEqual(result, obj2);
}

function testES2018(obj1: Record<string,number>, obj2: Record<string,number>): boolean {
    return shallowEqual({c: 3, ...obj1}, obj2);
}

function testES2019(arr1: number[], arr2: number[]): boolean {
    return arrayShallowEqual(arr1.flat(2), arr2);
}

function testES2020(arr1: boolean[], arr2: boolean[]): boolean {
    return arrayShallowEqual(arr1.map(x => x ?? "other"), arr2);
}

type TestDataDTO = {
    ES2017: [Record<string,number>,Record<string,number>];
    ES2018: [Record<string,number>,Record<string,number>];
    ES2019: [(number|(nunber|number[])[])[],number[]];
    ES2020: [(null|boolean|string)[],boolean[]];
};

export const test_data: TestDataDTO = {
    ES2017: [{x: 1, y: 2}, {x: 1, y: 4}],
    ES2018: [{a: 1, b: 2}, {a: 1, b: 2, c: 3}],
    ES2019: [[1, 2, [3, 4, [5, 6]]], [1, 2, 3, 4, 5, 6]],
    ES2020: [[null, false, true, "x"], ["other", false, true, "x"]],
};

export function test_func(data: TestDataDTO): boolean[] {
    return [
        testES2017(...data.ES2017),
        testES2018(...data.ES2018),
        testES2019(...data.ES2019),
        testES2020(...data.ES2020),
    ];
}
