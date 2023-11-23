'use client'

import { useQuery } from '@tanstack/react-query'

const ThemeProvider = ({ children }) => {
  // change color loader and theme
  const changeColors = () => {
    document.documentElement.style.setProperty('--loader-color', process.env.NEXT_PUBLIC_COLOR)
    document.documentElement.style.setProperty('--secondary-color', process.env.NEXT_PUBLIC_SECONDARY_COLOR)
  }

  const {} = useQuery({
    queryKey: ['colors'],
    queryFn: changeColors
  })
  return <div>{children}</div>
}

export default ThemeProvider
