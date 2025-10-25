import React from 'react'
import { Metadata } from 'next'
import NotFound from '@/components/ui/NotFound'

export const metadata: Metadata = {
    title: "Page not Found"
}

export default function Error() {
    return (
        <section className=''>
            <NotFound />
        </section>
    )
}