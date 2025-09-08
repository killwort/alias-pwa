const lists = {}
populateLists(require.context('raw-loader!../dicts/', false, /\.txt/))
populateLists(require.context('raw-loader!../my_dicts/', false, /\.txt/))
function populateLists (files) {
  files.keys().forEach((key) => {
    const locale = key.substring(2, 4)
    const name = key.substring(6)

    if (!lists[locale]) lists[locale] = {}
    lists[locale][name.split('.')[0]] = Promise.resolve(files(key).default.split('\n').map(line => line.trim()).filter(line => line.length > 0))
  })
}
export default lists
