<template>
  <div>
    <footer id="footer-wrapper">
      <div id="footer" class="container">
        <div class="row">
          <div class="span3">
            <section class="widget">
              <h3 class="title">如何使用</h3>
              <div class="textwidget">
                <p>本网站是千锋互联科技有限公司对外开放的面试题搜索引擎网站。</p>
                <p>网站收集了各大公司的面试题与解题思路和答案，可供开发者学习使用/。</p>
                <p>学习上查猪，高薪指日可待</p>
              </div>
            </section>
          </div>

          <div class="span3">
            <section class="widget"><h3 class="title">分类</h3>
              <ul>
                <li><a>暂无</a></li>
                <!--<li><a href="#" title="Lorem ipsum dolor sit amet,">Designing in WordPress</a></li>-->
                <!--<li><a href="#" title="Lorem ipsum dolor sit amet,">Server &amp; Database</a></li>-->
                <!--<li><a href="#" title="Lorem ipsum dolor sit amet, ">Theme Development</a></li>-->
                <!--<li><a href="#" title="Lorem ipsum dolor sit amet,">Website Dev</a></li>-->
                <!--<li><a href="#" title="Lorem ipsum dolor sit amet,">WordPress for Beginners</a></li>-->
                <!--<li><a href="#" title="Lorem ipsum dolor sit amet, ">WordPress Plugins</a></li>-->
              </ul>
            </section>
          </div>

          <div class="span3">
            <section class="widget">
              <h3 class="title">作者</h3>
              <div id="twitter_update_list">
                <ul>
                  <li>
                    <router-link to="/contact/">关于我!</router-link>
                  </li>
                </ul>
              </div>
            </section>
          </div>

          <div class="span3">
            <section class="widget">
              <h3 class="title">二维码</h3>
              <div class="flickr-photos" id="basicuse">
                <img src="../../static/images/my_wehcat.png" width="60%" height="60%">
              </div>
            </section>
          </div>

        </div>
      </div>
      <!-- Footer Bottom -->
      <div id="footer-bottom-wrapper">
        <div id="footer-bottom" class="container">
          <div class="row">
            <div class="span6">
              <p class="copyright">
              </p>
            </div>
            <div class="span6">
            </div>
          </div>
        </div>
      </div>
      <!-- End of Footer Bottom -->

    </footer>
  </div>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style>
@import '../../static/css/bootstrap5152.css';
@import '../../static/css/responsive5152.css';
@import '../../static/css/main5152.css';

.search_btn {width:50px; margin-top:10px;}
</style>
