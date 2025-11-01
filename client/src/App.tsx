import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { QuestionForm } from './components/QuestionForm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-full bg-slate-50">
      <div className="mx-auto max-w-2xl p-6">
        <h1 className="text-2xl font-bold mb-4">Új kérdés felvétele</h1>
        <QuestionForm />
      </div>
    </div>
    </>
  )
}

export default App
