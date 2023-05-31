import React from "react";

function removeEmptyData(data: Record<string,any>) {
    return Object.fromEntries(Object.entries(data).filter(([k,v]) => v != null));
}

const FeatureTest: React.FC = () => {
    const obj = {key1: "value1", key2: "Value2"};
    const obj_res = Object.fromEntries(Object.entries(obj).map(([k,v]) => [k, `${v}/${v}`]));
    const arr = [1, 2, [3, 4, [5, 6]]];
    return (
        <div>
            The following Features are available:
            <div>ES2018: ...
                {JSON.stringify({...obj, extra: 1})}
                {JSON.stringify([...arr, "extra"])}
            </div>
            <div>ES2019: Array.flat():
                {JSON.stringify(arr)} to {JSON.stringify(arr.flat())}
            </div>
            <div>ES2017: Object.entries, ES219: Object.fromEntries():
                {JSON.stringify(obj)} to {JSON.stringify(obj_res)}
            </div>
            <div>ES2020 (?? operator):
                value of key1={obj.key1 ?? "(null)"}
                value of test={obj['test'] ?? "(null)"}
            </div>
        </div>
    );
};

export default FeatureTest;