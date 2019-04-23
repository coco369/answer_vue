<template>
</template>

<script>
export default {
  name: 'blank',
  data () {
    const page = this.$route.query.page
    this.$router.replace({'path': '/back/article/', query: {'page': page}})
    return {
    }
  }
}
</script>

<style scoped>

</style>
