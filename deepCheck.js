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
        
        for (const propB of bKeys) {
            if (typeof b[propB] === 'object') {
                if (!a[propB]) a[propB] = {};
                await deepCheck(a[propB], b[propB]);
            }
            
            else if (aKeys.indexOf(propB) === -1) {
                let response = await new Promise( res => res()  ); // Any value / function that needs waiting for here.
                a[propB]     = response || b[propB];
            }
        }
        res();
    });
}


// Usage: 
// await deepCheck({}, {});

