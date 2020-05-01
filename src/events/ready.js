module.exports = client => {
  let toogle = true
  setInterval(() => {
    if (toogle) {
      client.user.setPresence({
        status: 'online',
        activity: {
          name: 'Pokemon!',
          type: 'PLAYING'
        }
      })
    } else {
      client.user.setPresence({
        status: 'online',
        activity: {
          name: 'Yu-Gi-Oh!',
          type: 'WATCHING'
        }
      })
    }
    toogle = !toogle
  }, 10 * 1000)
}
