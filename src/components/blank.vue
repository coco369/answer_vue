<template>
</template>

<script>
export default {
  name: 'blank',
  data () {
    const wd = this.$route.query.wd
    const page = this.$route.query.page
    this.$router.replace({'path': '/article_list/', query: {'wd': wd, 'page': page}})
    return {
    }
  }
}
</script>

<style scoped>

</style>
