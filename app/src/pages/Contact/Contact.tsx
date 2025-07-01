// app/src/pages/Contact.tsx
import React, { useState } from 'react'
import { contactStyles } from './ContactStyles'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Thanks, ${form.name}! Your message has been received.`)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <main style={contactStyles} className="container mx-auto px-4 py-8 max-w-lg">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span>Name</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full border rounded p-2"
          />
        </label>
        <label className="block">
          <span>Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full border rounded p-2"
          />
        </label>
        <label className="block">
          <span>Message</span>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            rows={5}
            className="mt-1 block w-full border rounded p-2"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded"
        >
          Send Message
        </button>
      </form>
    </main>
  )
}
