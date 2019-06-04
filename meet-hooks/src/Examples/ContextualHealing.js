import React, { useState, useContext } from 'react'
import ContextualHealing from './MarvinContext'

import '../index.css'

const WhenIGetThatFeeling = () => {
  const need = useContext(ContextualHealing)
  return <div>{need}</div>
}

const WrapperPurgatory = () => 
  <div className="borderDiv">
    <div className="borderDiv">
      <WhenIGetThatFeeling />
    </div>
  </div>

const TopmostContext = () => {
  const [value, setValue] = useState('')
  return <ContextualHealing.Provider value={value}>
    <input onChange={e => setValue(e.target.value)} value={value} />
    <WrapperPurgatory />
  </ContextualHealing.Provider>
}
