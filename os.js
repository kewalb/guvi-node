const os = require("os")
console.log("version", os.version()) //version Windows 10 Pro
console.log("CPU", os.cpus())
console.log("Architecture", os.arch()) //Architecture x64
console.log(os.constants)
console.log(os.hostname()) //DESKTOP-2I441AI
console.log(os.networkInterfaces())