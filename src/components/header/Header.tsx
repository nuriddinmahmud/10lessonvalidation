import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/react.svg'
import { Moon, Sun } from 'lucide-react'

function getInitialDark(): boolean {
  const ls = localStorage.getItem('theme')
  if (ls === 'dark') return true
  if (ls === 'light') return false
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
}

const Header = () => {
  const [dark, setDark] = useState<boolean>(getInitialDark)

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  const toggleTheme = () => {
    setDark(prev => {
      const next = !prev
      console.log('theme ->', next ? 'dark' : 'light')
      return next
    })
  }

  return (
    <header className="h-16 flex items-center shadow-sm bg-gradient-to-r from-[#AC4D39] to-[#CCAA66] dark:bg-gray-900">
      <nav className="max-w-6xl mx-auto w-full flex items-center justify-between px-4">
        <NavLink to="/" className="flex items-center gap-2 shrink-0">
          <img src={logo} alt="logo" className="h-8 w-8 drop-shadow" />
          <span className="text-white font-semibold tracking-wide dark:text-[#CCAA66]">nima deb yozishni bilmadim</span>
        </NavLink>

        <ul className="flex items-center gap-8">
          <li>
            <NavLink
              to="/users"
              className={({ isActive }) =>
                `inline-block py-2 text-white transition dark:text-gray-200
                 ${isActive ? 'font-semibold border-b-2 border-white' : 'hover:opacity-90'}`
              }
            >
              Users
            </NavLink>
          </li>
        </ul>

        {/* Toggle + Register button */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Toggle dark mode"
            aria-pressed={dark}
            onClick={toggleTheme}
            title="Toggle theme"
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition
                       focus:outline-none focus:ring-2 focus:ring-white/60 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `px-4 py-2 rounded-md font-semibold transition
               bg-white text-[#AC4D39] hover:opacity-90 ring-2 ring-white/50
               ${isActive ? 'shadow-md' : ''}
               dark:bg-[#CCAA66] dark:text-gray-900 dark:ring-0`
            }
          >
            Register
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default React.memo(Header)
