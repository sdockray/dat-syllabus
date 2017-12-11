import { h } from 'hyperapp'
import { version } from '../../package.json'

export default () =>
  <footer>
    <div class="container">
      <div class="row">
        <p>Powered by <a href="https://github.com/sdockray/dat-syllabus">dat-syllabus</a> v.{ version }</p>
      </div>
    </div>
  </footer>
