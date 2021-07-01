<template>
    <view class="content">
        <view class="form-wrap">
            <view class="form-item">
                <view class="form-content">
                    <textarea v-model="title" placeholder="给作品添加合适的标题，能获得更多推荐哦…" style="height: 160rpx; color: #333333; font-size: 30rpx;"></textarea>
                </view>
            </view>
            <view class="form-item">
                <view class="form-content">
                    <view class="upload-wrap">
                        <image :src="coverUrl ? coverUrl : './upload_img.png'" mode="widthFix" @click="uploadCover"></image>
                    </view>
                </view>
            </view>
            <view class="form-item">
                <view class="form-content">
                    <view class="upload-wrap video-wrap">
                        <view class="video-cover-wrap video" @click="showVideoEvt">
                            <view class="play-icon"></view>
                        </view>
                        <img v-if="tempFilePath==''" class="video" mode="widthFix" src="./upload_video.png" @click="upload" /> 
                        <view class="video-cover" @click="upload">
                            <text class="cuIcon-refresh"></text><text class="refresh">重新上传</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="btn" @click="submit">发布</view>
    </view>
</template>

<script>
  // import url from '@/common/request/url'
  // const mergeVideoAndMusicUtil = uni.requireNativePlugin('XXX-MergeVideoAndMusicUtil');
  export default {
    data() {
      return {
        tempFilePath: '',
        audioInfo: '',
        title: '',
        coverUrl: '',
        timeList: [15, 60, 300],
        device: '',
        uploadVideoItem: false,
        showFullVideo: false
      }
    },
    onReady() {
      let self = this
      self.device = uni.getSystemInfoSync()
      self.device.safeAreaInsets = uni.getSystemInfoSync().safeAreaInsets ? uni.getSystemInfoSync().safeAreaInsets : {
        bottom: 0
      }
      this.videoContext = uni.createVideoContext('video')
      this.fullVideoContext = uni.createVideoContext('fullVideo')
    },
    onLoad() {
        const self = this
      uni.getStorage({
        key: 'uploadVideoItem',
        success({data}) {
          self.uploadVideoItem = JSON.parse(data)
          self.videoWidth = self.uploadVideoItem.width
          self.videoHeight = self.uploadVideoItem.height
          self.videoAbsolutePath = plus.io.convertLocalFileSystemURL(self.uploadVideoItem.tempFilePath)
          if (self.audioAbsolutePath) {
            mergeVideoAndMusicUtil.merge({
              audioPath: self.audioAbsolutePath,
              videoPath: self.videoAbsolutePath,
              audioRepet: '1'
            }, result => {
              self.tempFilePath = 'file://' + result
            });
          } else {
            self.tempFilePath = self.uploadVideoItem.tempFilePath
          }
        }
      })

      if (uni.getStorageSync('uploadTreaty')) {
        return
      }
      this.alert.showModal({
        title: '温馨提示',
        content: '小鹿云播尊重并保护知识产权，支持原创。希望您遵守知识产权相关法律，确保您制作、上传的视频及其中的内容不侵犯他人的知识产权及其它合法权益',
        confirmText: '我知道了',
        showCancel: false,
        call() {
          uni.setStorageSync('uploadTreaty', true)
        }
      })
    },
    components: {
    },
    methods: {
      showVideoEvt() {
        uni.setStorageSync('previewVideo', this.uploadVideoItem)
        uni.navigateTo({
          animationType: "zoom-out",
          url: '/pages/previewVideo/previewVideo?src='+this.tempFilePath
        })
      },
      playFullVideo() {
        // this.showFullVideo = true
        // this.videoContext.play()
      },
      submit() {
        uni.showLoading({
          title: '正在发布,请稍后...',
          mask: true
        })
        this.$release(videoId => {
          this.$setUpVideoContent(videoId)
        })
      },
      reChooseVideo() {

      },
      uploadCover() {
          const self = this
        uni.chooseImage({
            count: 1,
            success({
                      tempFilePaths
                    }) {
              uni.showLoading({
                title: '正在上传...',
                mask: true
              })
              uni.uploadFile({
                url: url + 'vod/uploadImg',
                filePath: tempFilePaths[0],
                name: 'file',
                header: {
                  'Authorization': uni.getStorageSync('token')
                },
                success(result) {
                  uni.hideLoading()
                  if (result.statusCode == 200) {
                   /*self.$release(videoId => {
                      self.$setUpVideoContent(videoId, JSON.parse(result.data).imageURL)
                    })*/
                    self.coverUrl = JSON.parse(result.data).imageURL
                  } else {
                    self.alert.showToast({
                      title: '上传失败！',
                      icon: 'none',
                      image: '/static/error.png'
                    })
                  }
                }
              })
            }
          })
      },
      initAudio(item) {
        const self = this
        self.audioInfo = item
        uni.downloadFile({
          url: item.playUrl,
          success({
                    tempFilePath
                  }) {
            self.audioAbsolutePath = plus.io.convertLocalFileSystemURL(tempFilePath);
            if (self.tempFilePath) {
              mergeVideoAndMusicUtil.merge({
                audioPath: self.audioAbsolutePath,
                videoPath: self.videoAbsolutePath,
                audioRepet: '1'
              }, result => {
                self.tempFilePath = 'file://' + result
              });
            }
          }
        })
      },
      $release(callback) {
        let self = this
        uni.uploadFile({
          url: url + 'vod/uploadVideo',
          filePath: self.tempFilePath,
          name: 'file',
          header: {
            'Authorization': uni.getStorageSync('token')
          },
          complete() {
            uni.hideLoading()
          },
          success(result) {
            if (result.statusCode == 200) {
              callback(JSON.parse(result.data).videoId)
            } else {
              self.alert.showToast({
                title: '上传失败！',
                icon: 'none',
                image: '/static/error.png'
              })
            }
          }
        })
      },
      $setUpVideoContent(videoId, coverUrl = '') {
        let self = this
        self.$http.request({
          url: 'vod/updateVideo',
          data: {
            title: self.title,
            coverUrl: coverUrl,
            videoId: videoId,
            width: self.videoWidth,
            height: self.videoHeight 
          },
          options: {
            'Authorization': uni.getStorageSync('token')
          }
        }).then(({
                   message
                 }) => {
          self.alert.showToast({
            title: '发布成功！'
          })

          setTimeout(() => {
            uni.navigateBack()
          }, 1500)

/*          self.methods.$beforePageDrive($page => {
            $page.loadUploadVideo(() => {
              uni.navigateBack()
            })
          })*/
        })
      },
      upload() {
        let self = this
        uni.chooseVideo({
          success(result) {
            /*                    if (result.duration > 60) {
                                  self.alert.showModal({
                                    content: '您的视频时长超出了已选视频时长，请重新选择',
                                    showCancel: false
                                  })
                                  return
                                } */
            // 缓存已选择视频
            self.videoWidth = result.width
            self.videoHeight = result.height
            self.tempFilePath = result.tempFilePath
          }
        })
      }
    }
  }
</script>

<style lang="scss">
    .choice-music {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 $uni-spacing-row-base;
        margin-top: $uni-spacing-col-lg;

        text {
            color: $uni-theme-color;
        }
    }

    .btn {
        position: fixed;
        bottom: $uni-spacing-col-base;
        left: 0;
        width: 100%;
        padding-left: $uni-spacing-row-base;
        padding-right: $uni-spacing-row-base;
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);

        button {
            margin: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .tip {
        margin-top: $uni-spacing-col-lg;
        padding: 0 $uni-spacing-row-base;
        font-size: $uni-font-size-sm;
        color: grey;

        .tip-title {
            margin-bottom: $uni-spacing-col-sm;
            font-weight: bold;
        }

        text {
            line-height: 35rpx;
        }
    }
    .form-wrap {
        padding: 20rpx;
        line-height: 80rpx;
        .form-item {
            display: flex;
            padding: 20rpx;
            input {
                height: 100%;
            }
            image {
                width: 200rpx;
            }
        }
        .label {
            width: 140rpx;
        }
        .form-content {
            flex: 1;
        }
    }
    .video {
        width: 100%!important;
    }
    .upload-wrap {
        position: relative;
    }
    .upload-wrap .video {
        width: 500rpx !important;
        height: 240rpx;
    }
    .video-wrap {
        display: flex;
    }
    .video-cover {
        margin-left: 20rpx;
        margin-top: 190rpx;
        .uni-icons {
            margin-right: 10rpx;
        }
    }
    .btn {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        line-height: 88rpx;
        color: #fff;
        text-align: center;
        font-size: 32rpx;
        background-color: $uni-color-primary;
    }
    .fullVideo {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 9999;
    }
    .video-cover-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #000;
        .play-icon {
            width: 80rpx;
            height: 80rpx;
            background: url("./play.png") no-repeat;
            background-size: 100% 100%;
        }
    }
</style>
