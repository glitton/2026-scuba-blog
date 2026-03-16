'use client'

import { useEffect, useState } from 'react'

export default function FormattedDate({
  date,
  options,
  fallback,
}: {
  date: string
  options?: Intl.DateTimeFormatOptions
  fallback?: string
}) {
  const [formatted, setFormatted] = useState<string | null>(null)

  useEffect(() => {
    try {
      setFormatted(new Date(date).toLocaleDateString(undefined, options))
    } catch {
      setFormatted(fallback ?? new Date(date).toISOString().split('T')[0])
    }
  }, [date, options, fallback])

  return <>{formatted ?? fallback ?? new Date(date).toISOString().split('T')[0]}</>
}
