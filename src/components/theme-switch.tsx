"use client"
import React from 'react'
import { MoonIcon, SunIcon } from 'lucide-react'
import { Button } from './ui/button'


export default function ThemeSwitch() {
    const [dark, setDark] = React.useState(false)

    React.useEffect(() => {
        const theme = localStorage.getItem("theme")
        if (theme?.toLowerCase() === "dark") setDark(true)
    }, [])

    React.useEffect(() => {
        if (dark) {
            localStorage.setItem("theme", "dark")
        } else {
            localStorage.setItem("theme", "light")
        }
    }, [dark])

    const toggleCallback = () => {
        setDark(!dark)
        document.documentElement.classList.toggle('dark')
    }

    return (
        <Button
            className='size-fit p-2 rounded-full text-foreground'
            variant='ghost'
            aria-label="Toggle theme"
            onClick={toggleCallback}>
            {dark ? <MoonIcon /> : <SunIcon />}
        </Button>
    )
}