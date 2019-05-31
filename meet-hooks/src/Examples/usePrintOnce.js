import {useEffect} from 'react';


const usePrintOnce = (description) => {
  useEffect(() => console.info(description), [])
}

export default usePrintOnce