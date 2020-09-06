<template>
  <div id="aaa" class="page-list-live">
    <!-- <div id = "panel" style="background-color: brown; width: 300px;height:200px"></div> -->
    <canvas ref="canvas" width="640" height="360"></canvas>
    <!--真正的播放摄像头排到的影像-->
    <div class="outcontent">
      <video autoplay width="100%" height="100%"></video>
      <div id="takePhoto" @click="takePhoto">
        <i class="fa fa-camera fa-3x"></i>
      </div>
      <img id="willshow" width="640" height="360" @click="showPhoto" />
      <img id="showPhoto" width="100%" height="100%" @click="showPhoto" />
    </div>
  </div>
</template>
<script>
    import { remote, ipcRenderer } from 'electron'
    import fs from 'fs'
    export default {
        data() {
            return {
                dialog: {},
                Menu: {},

                photoData: '',
                urlData: '',
                video: '@/assets/big1000.png',

            }
        },
        mounted () {
            this.dialog = remote.dialog
            this.Menu = remote.Menu
            //监听与主进程的通信
            // ipcRenderer.on('action', (event, arg) => {
            //     switch (arg) {
            //         case 'exiting':
            //             eventQuit()
            //             break
            //     }
            // })
            this.initialize()
        },
        methods: {
            // 用来解释主进程和渲染进程的实例
            // 流程：先在主进程中监听窗口的close事件，然后当发生点击时，将消息从主进程发送到渲染进程。渲染进程收到消息后执行某些操作后，将消息发回主进程，由主进程执行剩下的操作
            // eventQuit () {
            //     var options = {}
            //     options.title = '信息对话框'
            //     options.message = '确定退出吗？'
            //     options.type = 'none'
            //     options.buttons = ['Yes', 'No']
            //     dialog.showMessageBox(options, (response) => {
            //         console.log('当前被单击的按钮索引是' + response)
            //         if (response == 0) {
            //             ipcRenderer.send('reqaction', 'exit')
            //         }
            //     })
            // },
            //弹出对话框保存图像
            savePhoto (filePath) {
                if (filePath) {
                    //向文件写入 base 64 格式的图像数据
                    fs.writeFile(filePath, this.photoData, 'base64', (err) => {
                        if (err) alert(`保存图像有问题: ${err.message}`)
                        this.photoData = null
                    })
                }
            },
            //用于初始化视频流
            initialize () {
                const that = this
                // document.getElementsById('aaa')[0].style.height = window.innerHeight+'px'
                this.video = window.document.querySelector('video')
                console.log(window.navigator.mediaDevices)
                window.navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "user", width: 640, height: 360 } // 调用前置摄像头并设置尺寸大小 后置摄像头使用video: { facingMode: { exact: "environment" }
                }).then(function(stream) {
                    console.log(stream)
                    that.video.srcObject = stream
                    that.video.play()
                }).catch(function(err) {
                    console.log(`连接视频流错误: ${err}`)
                })
            },
            //拍照
            takePhoto () {
                let that = this
                var now_time = new Date().getTime()
                var file_path = '123' + '.jpg'
                let canvas = window.document.querySelector('canvas')
                //将当前的视频图像绘制在 canvas 上 
                canvas.getContext('2d').drawImage(this.video, 0, 0, 640, 360)
                //获取  base64 格式的图像数据
                that.photoData = canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg|jpeg);base64,/, '')
                // // 将照片以base64的方式生成缩略图
                const willshow = document.getElementById('willshow')
                
                willshow.src = 'data:image/png;base64,' + that.photoData
                
                //显示保存对话框保存图像
                this.dialog.showSaveDialog({
                    title: "保存照片",
                    defaultPath: file_path,
                    buttonLabel: '保存'
                }, that.savePhoto)
                console.log(this.photoData)
            },
            // 查看照片
            showPhoto () {
                const showPhoto = document.getElementById('showPhoto')
                showPhoto.src = 'data:image/png;base64,' + this.photoData
                if (showPhoto.style.display === "none" || showPhoto.style.display === "") {
                    showPhoto.style.display = "block"
                } else {
                    showPhoto.style.display = "none"
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    #aaa {
        margin: 0;
        padding: 0;
        width: 100%;
    }
    .outcontent {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
    }

    .video {
        width: 400px;
        height: 400px;
        background-color: lime;
        // position: absolute;
        // left: 0;
        // top: 0;
        // margin: 0;
        // padding: 0;
    }

    #takePhoto {
        width: 100px;
        height: 100px;
        background-color: lime;
        position: absolute;
        left: 90%;
        top: 50%;
        margin: 0;
        padding: 0;
    }

    #willshow {
        // position: absolute;
        // left: 90%;
        // top: 80%;
        // margin: 0;
        // padding: 0;
        /* border: solid 1px black; */
    }

    #showPhoto {
        // position: absolute;
        // left: 0;
        // top: 0;
        // display: none;
    }

    #takePhoto:hover {
        cursor: pointer;
    }
    #willshow:hover {
        cursor: pointer;
    }
</style>
