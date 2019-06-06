import React, {useEffect} from 'react'

const CheekyMonkey = ({thing = '🍌'}) => {
  useEffect(() => {
    const monkeyTime = setInterval(() => alert(`${thing}🐒`), 5000)
    return () => clearInterval(monkeyTime)
  }, [thing])
  return <p>🐒</p>
}

export default CheekyMonkey