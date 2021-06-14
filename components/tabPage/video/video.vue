<template>
	<div class="page" :style="{ height: height }">
		<swiper
			class="swiper"
			:vertical="true"
			@change="changeCurrent"
			@animationfinish="animationFinish"
			:current="index">
			<swiper-item v-for="(item, idx) in videoList" :key="idx" class="swiper-item">
					<!-- 视频渲染数预加载数影响性能 -->
					{{index-idx}}
					<div v-if="Math.abs(index-idx)<=1" class="video-box">
						<block v-if="item.src">
							<chunlei-video class="video" :src="item.src"  :height="height" :width="width"
								:play="item.flag" v-if="Math.abs(index-idx)<=1" :gDuration="item.duration"
								:initialTime="item.initialTime" @pause="pauseVideo" :objectFit="item.objectFit"
								@playEnd="playEnd" :danmuList="danmuList"
							>
							</chunlei-video>
							
							<view class="cover-view-left">
								<view class="left-view">
									<!-- #ifdef APP-PLUS-NVUE -->
									<text class="left-text">@{{item.at}}</text>
									<!-- #endif -->
									<!-- #ifndef APP-PLUS-NVUE -->
									<view class="left-text">@{{item.at}}</view>
									<!-- #endif -->
								</view>
								<view class="left-view">
									<!-- #ifdef APP-PLUS-NVUE -->
									<text class="left-text">{{item.content}}</text>
									<!-- #endif -->
									<!-- #ifndef APP-PLUS-NVUE -->
									<view class="left-text">{{item.content}}</view>
									<!-- #endif -->
								</view>
							</view>
							<cover-view class="cover-view-right">
								<cover-image :src="item.avater" class="avater img" @click.stop="tapAvater"></cover-image>
								<!-- #ifdef APP-PLUS-NVUE -->
								<text class="right-text-avater">+</text>
								<text class="right-text"></text>
								<!-- #endif -->
								<!-- #ifndef APP-PLUS-NVUE -->
								<view class="right-text-avater">+</view>
								<view class="right-text"></view>
								<!-- #endif -->
								<view class="cuIcon-likefill operate-icon" :class="{ active: item.check }" @click.stop="tapLove"></view>
								<!-- #ifdef APP-PLUS-NVUE -->
								<text class="right-text">{{item.like}}</text>
								<!-- #endif -->
								<!-- #ifndef APP-PLUS-NVUE -->
								<cover-view class="right-text">{{item.like}}</cover-view>
								<!-- #endif -->
								<view class="cuIcon-messagefill operate-icon" @click.stop="tapMsg(item)"></view>
								
								<!-- #ifdef APP-PLUS-NVUE -->
								<text class="right-text">{{item.comment}}</text>
								<!-- #endif -->
								<!-- #ifndef APP-PLUS-NVUE -->
								<cover-view class="right-text">{{item.comment}}</cover-view>
								<!-- #endif -->
								<view class="cuIcon-forwardfill operate-icon" @click.stop="tapShare"></view>
								<!-- #ifdef APP-PLUS-NVUE -->
								<text class="right-text">分享</text>
								<!-- #endif -->
								<!-- #ifndef APP-PLUS-NVUE -->
								<cover-view class="right-text">分享</cover-view>
								<!-- #endif -->
								
							</cover-view>
						</block>
						<image src="/static/video/logo.png" :style="{ height: height }" v-else  class="video-box"></image>
					</div>
	
			</swiper-item>
		</swiper>
	</div>
</template>

<script>
	import ChunleiVideo from '@/components/chunlei-video/chunlei-video.nvue'
	import { getVideoList } from '@/request/interface/video'
	export default {
		components:{
			ChunleiVideo
		},
	    data() {
	        return {
				sysheight:0,
				playCount:2,//剩余多少视频加载视频列表
				videoList:[
					
				],
				height:'667px',
				index:0,
				width:'',
				oldIndex:0,
				danmuList:[
					{text: '发条弹幕0',color: '#fff',time: 2,avatar:'../../static/avatar.png'},
					{text: '发条弹幕1',color: '#fff',time: 3,avatar:'../../static/avatar.png'},
					{text: '发条弹幕2',color: '#fff',time: 4,avatar:'../../static/avatar.png'},
					{text: '发条弹幕3',color: '#fff',time: 5,avatar:'../../static/avatar.png'},
				],
			}
	    },
		created(){
			//#ifdef APP-PLUS
			plus.screen.lockOrientation("portrait-primary")
			//隐藏subnvue
			uni.getSubNVueById('comment').hide()
			uni.getSubNVueById('input-box').hide()
			//#endif
			this.sysheight = uni.getSystemInfoSync().windowHeight
			this.height = `${this.sysheight}px` 
			let width = uni.getSystemInfoSync().windowWidth 
			this.width = `${width}px` 
			this.videoList.length = 300
			this.videoList.fill({src:''})
			
		
			
		},
		async mounted() {
			//设置id 通过id轮到相应位置
			let id = "http://img.kaiyanapp.com/255365dbfc2622930eb0cdb33e43abf0.jpeg?imageMogr2/quality/60/format/jpg"
			await this.pushVideoList()
			
			this.index = this.videoList.reduce((total,item)=>{
				if(id==''||id==item.id){
					id = ''
				}else{
					total++
				}
				
				return total
			},0)
			
			if(!this.index){
				this.$nextTick(()=>{
					this.videoPlay(this.index)
				})
			}
		},
		onHide(){
			for (let item of this.videoList) {
				item.flag = false
			}
		},
	    methods: {
			animationFinish(e){
				//#ifdef APP-PLUS
				this.changeCurrent(e)
				//#endif
			},
			changeCurrent(e){
				this.index = e.detail.current; 
				
				this.$nextTick(()=>{
					
					for (let item of this.videoList) {
						item.flag = false
					}   
					
					this.videoList[this.index].flag = true
					
				}) 
				
			},
			pushVideoList(){
				return getVideoList({
					page: 1,
					pageNum: 10
				}).then(res => {
					let videoGroup = []
					if (res.code === 200) {
						for (let item of res.result.data) {
							videoGroup.push({
								src: item.video_source,
								content: item.video_content,
								flag: false,
								check: false,
								like: item.like_num,
								comment: item.comment_num,
								at: '小团团',
								id: 'http://img.kaiyanapp.com/255365dbfc2622930eb0cdb33e43abf0.jpeg?imageMogr2/quality/60/format/jpg',
								avater: 'http://img.kaiyanapp.com/255365dbfc2622930eb0cdb33e43abf0.jpeg?imageMogr2/quality/60/format/jpg',
								initialTime:0,
								duration: item.duration
							})
						}
						
						let len = this.videoList.filter(item=>item.src).length
						console.log('len', len, this.videoList, videoGroup.length)
						for(let i = len;i<len+videoGroup.length;i++){
							this.$set(this.videoList,i,videoGroup[i-len])
							
						}
					}
				})
			},
			tapLove(){
				this.videoList[this.index].check = !this.videoList[this.index].check
				this.videoList = [...this.videoList]
				
			},
			tapAvater(){
				uni.showToast({
					icon:'none',
					title:`点击索引为${this.index}的头像`
				})
			},
			tapMsg(item){
				//#ifndef APP-NVUE
				uni.showToast({
					icon:'none',
					title:`查看索引为${this.index}的评论`
				})
				//#endif
				//#ifdef APP-NVUE
				uni.getSubNVueById('comment').show('none',0,()=>{
					uni.$emit('showComment',item.content)
				});
				//#endif
			},
			tapShare(){
				uni.showToast({
					icon:'none',
					title:`分享索引为${this.index}的视频`
				})
			},
			videoPlay(index){
				let promise = new Promise((resolve,reject)=>{
					resolve()
				})
				promise.then(res=>{
					this.$set(this.videoList[index],'flag',!this.videoList[index].flag)
		
				})
			},
			pauseVideo(val){
				if(typeof this.videoList[this.oldIndex].initialTime !='undefined') this.videoList[this.oldIndex].initialTime = val
			},
			clickVideo(){
				this.videoList[this.index].flag = !this.videoList[this.index].flag
			}
	    },
		watch:{
			index(newVal,oldVal){
				let len = this.videoList.filter(item=>item.src).length
				//加载视频
				if(len - this.index - 1 <= this.playCount){
					this.pushVideoList()
				}
				this.oldIndex = oldVal
			}
		}
	}
</script>

<style lang="scss">
	.swiper{
		flex: 1;  
		background-color: #000;
	}
	.swiper-item {
	    flex: 1;
	}
	.video {
		flex: 1;
	}
	.video-box{
		flex: 1;
		width: 750rpx;
	}
	.cover-view-center{
		position: absolute;
		justify-content: center;
		align-items: center;
		opacity: 0.1;
		z-index: 999;
	}
	.cover-view-left{
		position: absolute;
		margin-left: 10upx;
		width: 500upx;
		bottom: 160upx;
		z-index: 9999;
		font-size: 16px;
		color: #FFFFFF;
		/* #ifndef APP-PLUS */
		white-space: pre-wrap;
		text-overflow:ellipsis;
		overflow:hidden;
		/* #endif */
	}
	.left-view{
		white-space: normal;
		margin-bottom: 20upx;
	}
	.left-text{
		width: 100%;
		font-size: 16px;
		color: #FFFFFF;
		word-wrap: anywhere
	}
	.avater{
		border-radius: 50upx;
		border-color: #fff;
		border-style: solid;
		border-width: 2px;
	}
	
	.cover-view-right{
		position: absolute;
		bottom: 160upx;
		right: 20upx;
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		z-index: 9999;
	}
	
	.right-text-avater{
		position: absolute;
		font-size: 14px;
		top: 80upx;
		left: 30upx;
		height: 40upx;
		width: 40upx;
		background-color: #DD524D;
		color: #FFFFFF;
		border-radius: 50%;
		text-align: center;
		line-height: 40upx;
		z-index: 999;
	}
	.avater-icon{
		height: 40upx;
		width: 40upx;
		
		color: #fff;
		background-color: #DD524D;
		border-radius: 50%;
		position: absolute;
		left: 30upx;
		top:-20upx;
	}
	
	.right-text{
		text-align: center;
		font-size: 14px;
		color: #FFFFFF;
		margin-bottom: 50upx;
		height: 20px;
	}
	.img{
		height: 100upx;
		width: 100upx;
		opacity: 0.9;
	}
	.page{
		/* #ifndef APP-PLUS-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		flex: 1; 
	}
	.operate-icon {
		color: #fff;
		font-size: 80rpx;
		text-align: center;
		&.active {
			color: rgb(253,53,91);
		}
	}
</style>
