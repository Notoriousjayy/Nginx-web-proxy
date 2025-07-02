// src/pages/Contact/Contact.tsx
import React, { useState, FormEvent, ChangeEvent } from 'react'
import { H2 } from '../../components/H2'
import { Button } from '../../components/Button'
import { BorderedPanel } from '../../components/BorderedPanel'
import logoUrl from '../../assets/images/logo.svg?url'
import fredUrl from '../../assets/images/contact/fred-standing.png'

// form primitives
import { FormTextInput } from '../../components/FormTextInput'
import { FormLabel } from '../../components/FormLabel'
import { FormSuccessMessage } from '../../components/FormSuccessMessage'
import { FormTitle } from '../../components/FormTitle'

interface FormState {
  firstName: string
  lastName: string
  phone: string
  email: string
  message: string
}

const initialForm: FormState = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  message: '',
}

const Contact: React.FC = () => {
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [form, setForm] = useState<FormState>(initialForm)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // → send `form` to your API…
    setHasSubmitted(true)
  }

  return (
    <main>
      {/* Hero */}
      <section className="py-24 bg-yellow-f0c808">
        <div className="container mx-auto px-8 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <H2 heading="Contact" />
            <p className="text-lg leading-tight">
              We’re available 24-7 via our contact form below, or by emailing{' '}
              <a href="mailto:info@binaryville.com" className="underline">
                info@binaryville.com
              </a>
              . We’re happy to answer any questions you may have.
            </p>
          </div>
          <img
            src={logoUrl}
            alt="Binaryville logo"
            width={423}
            height={219}
            className="mx-auto max-w-full"
          />
        </div>
      </section>

      {/* Form Section */}
      <section className="container mx-auto px-8 py-12">
        <BorderedPanel as="div" borderColor="blue-00bff3" backgroundColor="white">
          {hasSubmitted ? (
            <FormSuccessMessage />
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Accessible legend + visible title */}
              <fieldset className="space-y-6">
                <FormTitle legend="Contact Us" />

                <div className="flex flex-wrap -mx-2">
                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <FormTextInput
                      label="First name"
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <FormTextInput
                      label="Last name"
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-2 mb-4">
                    <FormTextInput
                      label="Daytime Phone #"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="w-full px-2 mb-4">
                    <FormTextInput
                      label="E-mail"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="w-full px-2 mb-4">
                    {/* no textarea component yet, so use FormLabel + raw textarea */}
                    <FormLabel label="Message" htmlFor="message" />
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      required
                      className="
                        w-full
                        border
                        border-gray-300
                        rounded
                        p-3
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-500
                      "
                    />
                  </div>
                </div>

                <div className="text-center">
                  <Button type="primary" label="Submit Inquiry" />
                </div>
              </fieldset>
            </form>
          )}
        </BorderedPanel>
      </section>
    </main>
  )
}

export default Contact
