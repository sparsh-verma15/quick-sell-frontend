export function groupByHelper(data,idToName, property) {
    let array = data["tickets"];
    let ans = {};
    for(let itr in array) {
        let curr = array[itr];
        let key = curr[property];
        if( property === 'userId' ) {
            key = idToName[key];
        }
        if(!ans[key]) {
            ans[key] = [];
        }
        ans[key].push(curr);
    }
    return ans;
};
