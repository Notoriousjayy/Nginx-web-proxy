// AboutList.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { robots } from '../../data/robots';
import { aboutListStyles } from './AboutListStyles';

export default function AboutList() {
  return (
    <main style={aboutListStyles} className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Robots</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {robots.map(robot => (
          <Link
            key={robot.slug}
            to={`/about/${robot.slug}`}
            className="block text-center hover:shadow-lg p-4 border rounded"
          >
            <img
              src={robot.image}
              alt={robot.name}
              className="mx-auto mb-2 h-32 w-auto"
            />
            <h2 className="text-xl font-semibold">{robot.name}</h2>
          </Link>
        ))}
      </div>
    </main>
  )
}
