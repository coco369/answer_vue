import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/Index'
import contact from '@/components/Contact'
import backIndex from '@/components/back/BackIndex'
import articleList from '@/components/ArticleList'
import articleDetail from '@/components/ArticleDetail'
import backarticleList from '@/components/back/BackArticleList'
import backarticleAdd from '@/components/back/BackArticleAdd'
import backLogin from '@/components/back/BackLogin'
import blank from '@/components/blank'
import backBlank from '@/components/back/blank'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index
    },
    {
      path: '/contact/',
      component: contact
    },
    {
      path: '/article_list/',
      component: articleList
    },
    {
      path: '/article_detail/:id',
      name: 'article_detail',
      component: articleDetail
    },
    {
      path: '/back/index/',
      component: backIndex
    },
    {
      path: '/back/article/',
      name: 'back_article',
      component: backarticleList
    },
    {
      path: '/back/article/add/',
      component: backarticleAdd
    },
    {
      path: '/back/article/update/:id',
      name: 'back_article_update',
      component: backarticleAdd
    },
    {
      path: '/back/login/',
      component: backLogin
    },
    // 解决前端的面试列表页面中无刷新页面效果
    // 解决办法是：跳转到一个空到vue界面，然后再跳转会列表页面
    {
      path: '/blank/',
      component: blank
    },
    // 解决后端面试列表页面中无刷新页面效果
    {
      path: '/back_blank/',
      component: backBlank
    }
  ]
})
