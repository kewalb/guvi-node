
const sum = (...args) => {
    let sum = 0
    for(let i=2; i<args.length; i++){
        sum = sum + Number(args[i])
    }
    return sum
}

console.log(sum(...process.argv))