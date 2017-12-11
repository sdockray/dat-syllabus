import { h } from 'hyperapp'
import { setInnerHtml } from 'lib/helpers'

const Display = ({ display }) =>
  display
    ? <div class='container'><div class="row"><img src={display} /></div></div>
    : null

export default ({ content, info, title }) => {
  return (
    <article>
      <header>
        {Display(info)}
      </header>
      <div class='container'>
        <div class='row'>
          <h1>
            <a href="#" name='title'>
            {title}
            </a>
          </h1>
          <div
            class='body'
            oncreate={setInnerHtml(content.body)}
            onupdate={setInnerHtml(content.body)}
          />
        </div>
      </div>
    </article>
  )
}
