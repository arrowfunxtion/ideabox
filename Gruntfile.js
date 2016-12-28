var grunt = require('grunt')

module.exports = grunt.initConfig({
  watch: {
    crx_auto_reload: {
      files: ['./extension/scripts/{,*/}*.js'],
      tasks: ['crx_auto_reload']
    }
  },
  crx_auto_reload: {
    options: {
      extensionDir: './extension'
    },
    default:{}
  }
})

grunt.loadNpmTasks('grunt-contrib-watch')
grunt.loadNpmTasks('grunt-crx-auto-reload')
