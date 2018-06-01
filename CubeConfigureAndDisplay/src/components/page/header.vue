<template>
  <header>
    <ul class="pull-left">
      <li>
        <router-link to="/cubeTypeChoose">
          <span>cube</span>
        </router-link>
      </li>
      <li>
          <router-link to="/cubeTypeChoose">
            <span>cube类型配置</span>
          </router-link>
      </li>
      <li>
        <router-link to="/cubeArchitecturalDisplay">
          <span>cube整体架构</span>
        </router-link>
      </li>
      <li>
        <router-link to="/cubeTypeChoose">
          <span>xxxxx</span>
        </router-link>
      </li>
      <li>
        <router-link to="/cubeTypeChoose">
          <span>xxxxxx</span>
        </router-link>
      </li>
      <li>
        <router-link to="/cubeTypeChoose">
          <span>xxxxxxx</span>
        </router-link>
      </li>
      <li>
        <router-link to="/cubeTypeChoose">
          <span>xxxxxxx</span>
        </router-link>
      </li>
    </ul>
  </header>

</template>
<script>
export default {
  data () {
    return {

    }
  },
  created :function() {
  },
  mounted(){

  },
  methods:{
  }
}
</script>
<style scoped>
header{
  font-family: 'PingFang SC','Microsoft YaHei',SimHei,Arial,SimSun;
    font-size: .75em;
    color: #333;
    line-height: 1.5em;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.05);
    min-width: 1010px;
    height: 50px;
    padding: 0 24px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    width:100%;
    margin: 0;
    padding: 0;
    line-height: 1.5em;
    text-align: left;
}
header ul{
  margin: 0;
  padding: 0;
}
header li{
  list-style: none;
  float: left;
  height: 34px;
  width: 140px;
  /* border: 1px solid #eee; */
  border-width: 0 1px;
  border-right-color: #fff;
  position: relative;
  background: 0 0;
}
header ul a{
  display: block;
    padding-left: 12px;
    padding-right: 12px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 14px;
    color: #3f3f3f;
}
header ul a:hover{
  color: #e80f40;
  text-decoration: none;
}

</style>
