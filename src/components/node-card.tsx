export function NoteCard() {
  return (
    <button className="relative flex flex-col space-y-3 overflow-hidden rounded-md bg-slate-800 p-5 text-left outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
      <span className="text-sm font-medium text-slate-300">há 4 dias</span>
      <p className="text-sm leading-6 text-slate-400">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit
        nesciunt eligendi in id ullam omnis, ipsa ab natus numquam itaque dolore
        at corrupti. Quae neque possimus officia dicta rem nesciunt.
      </p>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0" />
    </button>
  )
}
