import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, useState } from 'react'
import { toast } from 'sonner'

interface NewNodeCardProps {
  onNoteCreated: (content: string) => void
}

let speechRecognition: SpeechRecognition | null = null

export function NewNodeCard({ onNoteCreated }: NewNodeCardProps) {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
  const [content, setContent] = useState('')
  const [isRecording, setIsRecording] = useState(false)

  function handleStartEditor() {
    setShouldShowOnboarding(false)
  }

  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value)
    if (event.target.value === '') setShouldShowOnboarding(true)
  }

  function handleSaveNote() {
    onNoteCreated(content)
    setContent('')
    setShouldShowOnboarding(true)
    toast.success('Nota criada com sucesso!')
  }

  function handleStartRecording() {
    const isSpeechRecognitionAPIAvailable =
      'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

    if (!isSpeechRecognitionAPIAvailable) {
      alert('Infelizmente seu navegador não suporta a API de gravação')
      return
    }

    console.log('Gravando 🎙️🔴')
    setIsRecording(true)
    setShouldShowOnboarding(false)

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition

    speechRecognition = new SpeechRecognitionAPI()

    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true
    speechRecognition.maxAlternatives = 1
    speechRecognition.interimResults = true

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')

      setContent(transcription)
    }
    speechRecognition.onerror = (event) => {
      console.error(event)
    }

    speechRecognition.start()
  }

  function handleStopRecording() {
    console.log('Stop!')
    setIsRecording(false)
    speechRecognition?.stop()
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex flex-col gap-3 rounded-md bg-slate-700 p-5 text-left outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">
          Adicionar nota
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto
          automaticamente.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60">
          <Dialog.Content className="fixed inset-0 flex w-full max-w-[640px] flex-col overflow-hidden bg-slate-700 outline-none md:inset-auto md:left-1/2 md:top-1/2 md:h-[60vh] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-md">
            <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400">
              <X className="size-5 hover:text-slate-100" />
            </Dialog.Close>
            <form className="flex flex-1 flex-col">
              <div className="flex flex-1 flex-col gap-3 p-5">
                <span className="text-sm font-medium text-slate-300">
                  Adicionar nota
                </span>
                {shouldShowOnboarding ? (
                  <p className="text-sm leading-6 text-slate-400">
                    Comece{' '}
                    <button
                      type="button"
                      onClick={handleStartRecording}
                      className="text-lime-400 hover:underline"
                    >
                      gravando uma nota
                    </button>{' '}
                    em áudio ou se preferir{' '}
                    <button
                      type="button"
                      className="text-lime-400 hover:underline"
                      onClick={handleStartEditor}
                    >
                      utilize apenas texto
                    </button>
                    .
                  </p>
                ) : (
                  <textarea
                    autoFocus
                    className="flex-1 resize-none bg-transparent text-sm leading-6 text-slate-400 outline-none"
                    onChange={handleContentChanged}
                    value={content}
                  />
                )}
              </div>

              {isRecording ? (
                <button
                  type="button"
                  className="group flex w-full items-center justify-center gap-2 bg-slate-900 py-4 text-center font-medium text-slate-300 outline-none hover:text-slate-100"
                  onClick={handleStopRecording}
                >
                  <div className="size-5 animate-pulse rounded-full bg-red-500" />
                  Gravando... (clique p/ interromper)
                </button>
              ) : (
                <button
                  type="button"
                  className="group w-full bg-lime-400 py-4 text-center font-medium text-slate-950 outline-none hover:bg-lime-500"
                  onClick={handleSaveNote}
                >
                  Salvar nota
                </button>
              )}
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
