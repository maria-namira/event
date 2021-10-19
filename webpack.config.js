var ProgressPlugin = require('progress-webpack-plugin')

module.exports = {
    ...
    plugins:[
        new ProgressPlugin(true)
    ]
}