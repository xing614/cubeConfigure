<template>
  <div class="whole">
    <Header></Header>
    <article>
      <router-view></router-view>
    </article>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from '@/components/page/header.vue'
import Footer from '@/components/page/footer.vue'
import CubeTypeChoose from '@/components/page/cubeTypeChoose.vue'
export default {
	components: { Header, Footer, CubeTypeChoose},
  data () {
    return {
    }
  },
  mounted(){

  }
}
</script>
<style scoped>
.whole{
  width:1100px; margin: auto; overflow: hidden ;
}
</style>
