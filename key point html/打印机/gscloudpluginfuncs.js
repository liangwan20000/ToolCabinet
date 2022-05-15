var objhead = document.head || document.getElementsByTagName('head')[0] || document.documentElement
var objscript = document.createElement('script')
objscript.src = 'http://127.0.0.1:8365/GSCloudPlugin.js'
objhead.insertBefore(objscript, objhead.firstChild)

 // 为了防止端口被占用，增加一个备用
objscript = document.createElement('script')
objscript.src = 'http://127.0.0.1:18365/GSCloudPlugin.js'
objhead.insertBefore(objscript, objhead.firstChild)

export function getGSCloudPlugin() {
    return window.GSCloudPlugin
}
