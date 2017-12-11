import { h } from 'hyperapp'

const Author = ({ author, link }) => {
  if (author && link) {
    return (
      <span class='author'>
        <a href={link} target='_blank'>{author}</a>
      </span>
    )
  } else if (author) {
    return <span class='author'>{author}</span>
  } else return null
}

const Date = ({ date }) =>
  date
    ? <span class='date'>{date.format('MMMM Do, Y')}</span>
    : null

const Forks = ({ forks }) =>
  forks
    ? forks.map(f => (
      <li><a href={f.url}>{f.title}</a></li>
    ))
    : null

export default ({ content, info, title }) =>
  <header>
    <div class='container wide'>
      <a href='#title'>
          {title}
      </a>
      <span class='meta'>{Author(info)} (last updated: {Date(content)})</span>
      { (info) && <a href='#fork' class='button small'>Fork</a> }
    </div>
    <ul class='container wide forks'>
      {Forks(info)}
    </ul>
  </header>
