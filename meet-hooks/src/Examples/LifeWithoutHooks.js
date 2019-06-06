import React from 'react';
import usePrintOnce from './usePrintOnce'
import '../App.css';

/** Example00: Life Without Hooks
 *  Demonstrates what happens when a functional component
 *  mutates a variable defined in its function.
 */

 const description = `*😢 LifeWithoutHooks*
 Demonstrates what happens when a functional component\
 mutates a variable defined in its function.`

const LifeWithoutHooks = () => {
  usePrintOnce(description);
  console.log("Render")
  let theNumber = 0
  const makeNumbaGoUp = () => {
    theNumber += 1
    console.log(`TheNumber was incremented to ${theNumber}`)
  }
  return <button onClick={makeNumbaGoUp} >{theNumber}</button>
}

/** This only exists as an easy way to rerender the child
 *  I didn't want to use hooks in an example yet because
 *  spoilers so enjoy this class component for now.
 */
class Rerenderer extends React.Component {
  constructor() {
    // heck yeah, boilerplate!
    super()
    this.onClick = this.onClick.bind(this)
  }
  onClick() {
    this.forceUpdate()
  }
  render() {
    return <>
      <button onClick={this.onClick} >Rerender</button>
      <LifeWithoutHooks />
    </>
  }
}

export default Rerenderer