'use client'

import { ReactNode } from 'react'

interface PreviewProviderProps {
  children: ReactNode
}

export default function PreviewProvider({ children }: PreviewProviderProps) {
  return (
    <div>
      <div style={{ background: '#fbbf24', padding: '8px', textAlign: 'center' }}>
        Preview Mode Active -{' '}
        <a href="/api/disable-draft" style={{ textDecoration: 'underline' }}>
          Exit Preview
        </a>
      </div>
      {children}
    </div>
  )
}
