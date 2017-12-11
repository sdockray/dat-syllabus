import syllabus from 'lib/syllabus'

const init = (url = window.location.origin) => state => async actions => {
  actions.update({ isLoading: true })
  if (state.isBeaker) {
    await syllabus.init(url)
    await syllabus.loadStyle()
    const content = await syllabus.preloadContent()
    const { title, ...info } = await syllabus.loadInfo()
    actions.update({ content, info, title })
  }
  actions.update({ isLoading: false })

  actions.navigateByHash()
  window.onhashchange = () => actions.navigateByHash()
}

const navigateByHash = page => {
  page = window.location.hash.slice(1)
  window.scrollTo(0, 0)
  return { page }
}

const fork = params => state => async actions => {
  const url = await syllabus.fork(params)
  window.location = url
}

export default {
  fork,
  init,
  navigateByHash,
  update: newState => newState,
}
