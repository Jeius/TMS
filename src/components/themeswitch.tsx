"use client"
import React from 'react'
import { Toggle } from './ui/toggle'
import { LightbulbIcon, LightbulbOffIcon, MoonIcon, SunIcon } from 'lucide-react'
import { Button } from './ui/button'


const ThemeSwitch = () => {
    const [dark, setDark] = React.useState(false)

    React.useEffect(() => {
        const theme = localStorage.getItem("theme")
        if (theme?.toLowerCase() === "dark") setDark(true)
    }, [])

    React.useEffect(() => {
        if (dark) {
            // document.documentElement.classList.add('dark')
            localStorage.setItem("theme", "dark")
        } else {
            // document.documentElement.classList.remove('dark')
            localStorage.setItem("theme", "light")
        }
    }, [dark])

    const toggleCallback = () => {
        setDark(!dark)
        document.documentElement.classList.toggle('dark')
    }

    return (
        <Button
            className='size-fit p-2 rounded-full hover:bg-zinc-300 dark:hover:bg-zinc-700'
            variant='ghost'
            aria-label="Toggle theme"
            onClick={toggleCallback}>
            {dark ? <MoonIcon /> : <SunIcon />}
        </Button>
    )
}

export default ThemeSwitch