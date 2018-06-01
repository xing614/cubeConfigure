import Vue from 'vue'
import Router from 'vue-router'
import Whole from '@/components/page/whole'
import CubeTypeChoose from '@/components/page/cubeTypeChoose'
import CubeArchitecturalDisplay from '@/components/page/cubeArchitecturalDisplay.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'whole',
      component:Whole,
      children: [
        {
          path:'/',
          redirect: '/cubeTypeChoose'
        },
        {
          path: '/cubeTypeChoose',
          name: 'CubeTypeChoose',
          component: CubeTypeChoose
        },
        {
          path: '/cubeArchitecturalDisplay',
          name: 'CubeArchitecturalDisplay',
          component: CubeArchitecturalDisplay
        }
      ]
    }
  ]
})
