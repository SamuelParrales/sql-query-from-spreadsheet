
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Toaster } from "@/components/ui/sonner"
import './index.css'
import { Dialog } from './components/global/AlertDialog/Dialog.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <>
    <Dialog />
    <App />
    <Toaster richColors position="top-right" closeButton />
  </>
  // </React.StrictMode>,
)
