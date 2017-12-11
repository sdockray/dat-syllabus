import moment from 'moment'
import markdownIt from 'markdown-it'

export const md = markdownIt({
  html: true,
  linkify: true,
})

const parseHeaders = header =>
  header
    .split('\n')
    .reduce((acc, field) => {
      const [ key, ...values ] = field.split(':')
      return { ...acc, [key]: values.join('').trim() }
    }, {})

export const parse = article => {
  let date, fields, header, text
  const hasHeaders = article.match(/^\w+:/)
  if (hasHeaders) {
    [ header, ...text ] = article.split('\n\n')
    fields = parseHeaders(header)
    date = fields.date && moment(fields.date)
    text = text.join('\n\n')
  } else text = article
  const body = md.render(text)

  return { ...fields, body, date }
}
