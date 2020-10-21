import React, { StrictMode } from 'react'
import { render } from 'react-dom'
import './index.module.scss'

import Root from 'components/Root/Root'
import auth from 'utils/auth'

const rootElement = document.getElementById('root')

auth.init()

render(
  <StrictMode>
    <Root />
  </StrictMode>,
  rootElement
)
