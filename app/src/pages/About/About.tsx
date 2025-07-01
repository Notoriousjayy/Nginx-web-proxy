// src/pages/About.tsx
import React from 'react'

import { aboutStyles } from './AboutStyles'
import { H2 }       from '../../components/H2'
import Header       from '../../layouts/Header'
import { Footer }   from '../../layouts/Footer'

const AboutPage: React.FC = () => {
  return (
    <>
      <Header />

      <main style={aboutStyles} className="px-8 py-12 max-w-container mx-auto">
        {/* Page title */}
        <H2 heading="Our Story"/>

        {/* Your existing content */}
        <p className="mb-4 leading-relaxed">
          On the edge of the world stands the progressive town of Binaryville, where
          technology is a way of life. The robots who live, work, and play in Binaryville
          learn from an early age that magic is made simply by combining 0’s and 1’s.
          For the Binaryville robots, every waking thought and every sleeping dream is
          consumed with unique permutations… and endless possibilities.
        </p>
        <p className="leading-relaxed">
          This is our happy place, and we invite the dreamers, thinkers, and inventors of
          the world to unite in our passion for building something out of nothing.
          (Well, nothing plus 1.) Visit Binaryville and let your imagination soar!
        </p>
      </main>

      <Footer />
    </>
  )
}

export default AboutPage
