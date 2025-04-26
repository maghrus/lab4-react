import { useEffect, useState } from 'react'
import './App.css'
import { Game } from './components/Game'
import { GameStart } from './components/GameStart'

function App() {
  const [config, setConfig] = useState(null)
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.body.classList.remove('light-theme', 'dark-theme'); 
    document.body.classList.add(`${theme}-theme`); 
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="appWrapper">
      <button className="butonTheme" onClick={toggleTheme}>
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>
      {!config ? 
        (<GameStart onStartGame={setConfig} />)
        :
        (<Game config={config} onRestart={() => setConfig(null)} />)
      }
    </div>
  )  
}

export default App
