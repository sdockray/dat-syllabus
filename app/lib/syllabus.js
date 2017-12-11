import moment from 'moment'
import { parse } from 'lib/parser'
import { appendStyle, byDate, isMarkdown, logAndReturn } from 'lib/helpers'

class Syllabus {
  constructor () {
    if (!Syllabus._) Syllabus._ = this
    return Syllabus._
  }

  async init (url) {
    this.dat = await new window.DatArchive(url)
  }

  async preloadContent () {
    const body = await this.dat.readFile('syllabus.md')
    const parsed = parse(body)
    if (!parsed.date) {
      const stat = await this.dat.stat('syllabus.md')
      parsed.date = moment(stat.ctime)
    }
    return { ...parsed }
  }

  async loadInfo () {
    this.info = await this.dat.getInfo()
    this.meta = await this.dat.readFile('/dat-syllabus.json')
      .then(
        config => JSON.parse(config),
        () => { console.error('/dat-syllabus.json not found') }
      )
    return { ...this.info, ...this.meta }
  }

  async loadStyle () {
    return this.dat.readFile('/style.css')
      .then(appendStyle)
      .catch(() => { console.error('/style.css not found') })
  }

  async fork ({ author, description, photo, title }) {
    const fork = await window.DatArchive.fork(this.dat.url, { title, description })
    let display = this.meta.display
    if (photo.data && photo.ext) {
      display = `/photo.${photo.ext}`
      await fork.unlink(this.meta.display)
      await fork.writeFile(display, photo.data, { encoding: 'base64' })
    }
    const forkOf = { title: this.meta.title, url: this.dat.url }
    const forks = (this.meta.forks) ? this.meta.forks.push(forkOf) : [ forkOf ]
    await fork.writeFile('/dat-syllabus.json', JSON.stringify({ author, display, forks }))
    const date = (new Date()).toISOString().slice(0, 10)
    await fork.commit()
    return fork.url
  }
}

const instance = new Syllabus()

export default instance
