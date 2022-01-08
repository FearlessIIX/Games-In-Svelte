// Location: routes/utils/functions.ts

// Reverses an array
export function reverse_array(arr: any[]) {
    let ret = []
    // Uses index based reverse method
    for (let i = arr.length - 1; i >= 0; i--) 
        ret.push(arr[i])
    
        return ret
}