import Vue from 'vue'
import Router from 'vue-router'

const MatchSett = (resolve) => {
  import('@/components/matchSett/matchSett').then((module) => {
    resolve(module)
  })
}
const Standard = (resolve) => {
  import('@/components/standard/standard').then((module) => {
    resolve(module)
  })
}
const Major = (resolve) => {
  import('@/components/major/major').then((module) => {
    resolve(module)
  })
}
const MajorRec = (resolve) => {
  import('@/components/major/majorRec').then((module) => {
    resolve(module)
  })
}
const OperRec = (resolve) => {
  import('@/components/standard/operRec').then((module) => {
    resolve(module)
  })
}
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/matchSett'
    },
    {
      path: '/matchSett',
      component: MatchSett,
      children: [
        {
          path: 'standard',
          component: Standard,
          children:[
            {
              path:'operRec',
              component:OperRec
            }
          ]
        },
        {
          path: 'major',
          component: Major,
          children:[
            {
              path:'majorRec',
              component:MajorRec
            }
          ]
        },
      ]
    }
  ]
})
