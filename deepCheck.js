/**
 * An asyncronous and recursive way of checking that one object has all the properties that exsit on 
 * another object.
 * @params {Object} a - Object that needs to be checked.
 * @params {Object} b - Object that a should be compared to / checked against.
 */
function deepCheck(a, b) {
    return new Promise(async res => {
        const aKeys   = Object.keys(a);
        const bKeys   = Object.keys(b);
        
        for (const propA of aKeys) {
            if (typeof b[propA] === 'object') {
                if (!a[propA]) a[propA] = {};
                await deepCheck(a[propA], b[propA]);
            }
            
            else if (aKeys.indexOf(propA) === -1) {
                let response = await new Promise( res => res()  ); // Any value / function that needs waiting for here.
                a[propA]     = response || b[propA];
            }
        }
        res();
    });
}


// Usage: 
// await deepCheck({}, {});

