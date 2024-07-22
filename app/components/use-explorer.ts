import { createContext, useContext } from 'react'

type ExplorerCtx = {
  feedSelection: string,
}

export const ExplorerContext = createContext<ExplorerCtx | null>(null)

export const useExplorer = () => {
  const explorerContext = useContext(ExplorerContext)
  if (!explorerContext)
    throw new Error('useExplorer must be used within <ExplorerContext.Provider>')
  return explorerContext
}

