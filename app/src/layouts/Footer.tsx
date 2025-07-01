// app/src/layouts/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-blue-100 text-blue-800 py-8">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl mb-4">Meet the Robots</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* map robots to links */}
        </div>
        <p className="mt-8 text-xs">
          This is a fictitious company created … purely coincidental.
        </p>
      </div>
    </footer>
  )
}