export default {
  search: async function (vueobjects, wd, page) {
    let post = () => {
      return new Promise(resolve => {
        vueobjects.axios.get('/api/web/questions/search/?wd=' + wd + '&page=' + page).then(
          res => {
            const resp = res.data.data
            resolve(resp)
          }
        ).catch(
          err => {
            alert(err)
          }
        )
      })
    }
    const data = await post()
    return data
  }
}
