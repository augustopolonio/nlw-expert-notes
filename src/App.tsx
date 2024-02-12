import logo from './assets/logo-nlw-expert.svg'
import { NewNodeCard } from './components/new-node-card'
import { NoteCard } from './components/node-card'

export function App() {
  return (
    <div className="mx-auto my-12 max-w-6xl space-y-6">
      <img src={logo} alt="" />

      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid auto-rows-[250px] grid-cols-3 gap-6">
        <NewNodeCard />
        <NoteCard
          note={{
            date: new Date(),
            content: 'Hello World',
          }}
        />
      </div>
    </div>
  )
}