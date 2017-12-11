import { h } from 'hyperapp'

import Syllabus from 'components/Syllabus'
import Footer from 'components/Footer'
import Header from 'components/Header'
import Fork from 'components/Fork/Form.jsx'

export default state => actions =>
  <main>
    <Header {...state} />
    { (state.page === 'fork') && <Fork {...actions} /> }
    <Syllabus {...state} />
    <Footer />
  </main>
