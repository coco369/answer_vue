<template>
  <div>
    <common></common>
    <div class="page-container">
      <div class="container">
        <div class="row">

          <!-- start of page content -->
          <div class="span8 page-content">

            <article class="type-page hentry clearfix">
              <h1 class="post-title">
                <a href="#">关于我</a>
              </h1>
              <hr>
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;王海飞，男，一个90后程序员！14年入行。先后经历过几家大型的公司，主要做Python后端研发工作。 经历过O2O商城，大型ERP系统，
                全国最大的车辆网项目等
              </p>
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;目前就职于千锋互联教育机构，主要培训Python相关的课程。开发该个人博客网站主要是给学生参考，也是用于记录每天的学习笔记和心得等。
                好记性不如烂笔头，这句话，在教学的生涯中让我深刻的领会到其中的奥义。该博客网站每天都会有新的文章分享，尽情期待！
              </p>
            </article>
          </div>
          <!-- end of page content -->

          <!-- start of sidebar -->
          <aside class="span4 page-sidebar">

            <section class="widget">
              <div class="support-widget">
                <h3 class="title">技术支持</h3>
                <p class="intro">需要更多面试题? 如果不能搜索到相关面试题，可以联系项目负责人.</p>
              </div>
            </section>

            <!--<section class="widget">-->
              <!--<h3 class="title">Latest Articles</h3>-->
              <!--<ul class="articles">-->
                <!--<li class="article-entry standard">-->
                  <!--<h4><a href="single.html">Integrating WordPress with Your Website</a></h4>-->
                  <!--<span class="article-meta">25 Feb, 2013 in <a href="#" title="View all posts in Server &amp; Database">Server &amp; Database</a></span>-->
                  <!--<span class="like-count">66</span>-->
                <!--</li>-->
              <!--</ul>-->
            <!--</section>-->
          </aside>
          <!-- end of sidebar -->
        </div>
      </div>
    </div>
    <footers></footers>
  </div>
</template>

<script>
import common from './Common.vue'
import footers from './Footer.vue'
export default {
  name: 'Contact',
  components: {
    common,
    footers
  }
}
</script>

<style>

</style>
