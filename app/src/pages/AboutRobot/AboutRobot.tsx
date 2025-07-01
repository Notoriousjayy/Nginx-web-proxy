// app/src/pages/AboutRobot.tsx
import React from 'react'
import { useParams } from 'react-router-dom'
import { robots } from '../../data/robots'
import NotFound from '../NotFound'

export default function AboutRobot() {
  const { slug } = useParams<{ slug: string }>()
  const robot = robots.find(r => r.slug === slug)
  if (!robot) return <NotFound />

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{robot.name}</h1>
      <img
        src={robot.image}
        alt={robot.name}
        className="mx-auto mb-6 max-h-64"
      />
      <p className="prose">{robot.description}</p>
    </main>
  )
}
