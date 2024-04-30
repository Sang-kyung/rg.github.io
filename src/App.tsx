import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [random, setRandom] = useState<number | undefined>();
  const [min, setMin] = useState<number>(1);
  const [max, setMax] = useState<number>(1000000000);

  const handleClickRandom = () => {
    if (min > max) {
      alert('Min value should be less than or equal to Max value.');
      return;
    }

    const randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    setRandom(randomInt);
  };

  const formatCurrency = (value: number, locale: string = 'en-US', currency: string = 'USD'): string => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'decimal',
    currency,
  });

  return formatter.format(value);
}


const handleClickEnter = (ev: KeyboardEvent) => {
  ev.key === "Enter" && handleClickRandom();
}

  useEffect(() => {
    window.addEventListener('keypress', handleClickEnter);

    return () => {
      window.removeEventListener('keypress', handleClickEnter);
    }

  }, [])

  return (
    <div>
      <h1>Random Number Generator</h1>
      <div>
        <label>Min:</label>
        <input
          type="number"
          value={min}
          onChange={(e) => setMin(parseInt(e.target.value))}
        />
      </div>
      <div>
        <label>Max:</label>
        <input
          type="number"
          value={max}
          onChange={(e) => setMax(parseInt(e.target.value))}
        />
      </div>
      <br/>
      <button onClick={handleClickRandom}
       >Generate Random Number</button>
      {random && (
        <div>
          <h2>Random Number: {formatCurrency(random)}</h2>
        </div>
      )}
    </div>
  )
}

export default App
