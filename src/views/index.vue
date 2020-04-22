<template>
  <div class="page-content">
    <div style="font-size: 18px;">
      <div class="animated swing" style="text-align: center;">
        <p style="font-size: 1.2em;font-weight: 500;">欢迎来到 <span>首页！</span></p>
        <p><span style="color: #409EFF">{{roles[0]}}</span> <span style="font-size: 1.1em;"> ➠ </span> <span style="font-size: 1.2em;"></span> <i style="font-size: 14px;color: #aaa;margin-left: 10px;"></i></p>
      </div>
      <div style="text-align: center;padding: 50px 0;">
        <img class="animated rubberBand" src="../assets/imgs/index_img.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
	import {mapGetters} from 'vuex'

	export default {
    computed:{
			...mapGetters([
				'roles'
			]),
    },
		data() {
			return {
			}
    },
    created() {
      console.log('roles', this.roles);
      
    },
	}
</script>
<style lang="scss" scoped>

</style>


