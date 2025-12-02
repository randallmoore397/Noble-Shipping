'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import MainLayout from '@/components/layouts/MainLayout'
import { contactSchema, ContactFormData } from '@/lib/validations'
import { showSuccess, showError } from '@/components/ui/Toast'

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (result.success) {
        showSuccess('Message sent successfully!')
        reset()
      } else {
        showError(result.message || 'Failed to send message')
      }
    } catch (error) {
      showError('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <MainLayout>
      <style jsx>{`
        .support-bg {
          background-image: unset !important;
          background-position: center !important;
          background-size: cover;
          background-color: aliceblue !important;
        }
      `}</style>

      {/* Support Area - Contact Form */}
      <div className="support-area support-bg pt-110 pb-120" style={{ backgroundColor: 'aliceblue' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-10">
              <div className="s-section-title text-center mb-60">
                <h2>Get In Touch</h2>
                <p>Express delivery is an innovative service is effective logistics solution for the delivery of small cargo. This service is useful for companies various.</p>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="support-form text-center">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        {...register('first_name')}
                        type="text"
                        className="form-control"
                        placeholder="First Name *"
                      />
                      {errors.first_name && (
                        <span className="text-danger d-block text-left mt-1">{errors.first_name.message}</span>
                      )}
                    </div>
                    <div className="col-md-6">
                      <input
                        {...register('last_name')}
                        type="text"
                        className="form-control"
                        placeholder="Last Name *"
                      />
                      {errors.last_name && (
                        <span className="text-danger d-block text-left mt-1">{errors.last_name.message}</span>
                      )}
                    </div>
                    <div className="col-md-6">
                      <input
                        {...register('email')}
                        type="email"
                        className="form-control"
                        placeholder="Your E-mail *"
                      />
                      {errors.email && (
                        <span className="text-danger d-block text-left mt-1">{errors.email.message}</span>
                      )}
                    </div>
                    <div className="col-md-6">
                      <input
                        {...register('website')}
                        type="text"
                        className="form-control"
                        placeholder="Website"
                      />
                    </div>
                  </div>
                  <textarea
                    {...register('message')}
                    className="form-control"
                    placeholder="Message"
                    rows={6}
                  ></textarea>
                  {errors.message && (
                    <span className="text-danger d-block text-left mt-1">{errors.message.message}</span>
                  )}
                  <button className="btn red-btn" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Submit Now'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Area - Contact Info Boxes */}
      <section className="contact-area primary-bg pt-70 pb-15">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-sm-6">
              <div className="single-contact-box mb-50">
                <div className="contact-icon mb-30">
                  <img src="/img/icon/contact_box_icon01.png" alt="img" />
                </div>
                <div className="contact-content">
                  <h5>Find Location</h5>
                  <span>Head Office: ELWA Paynesville City, Liberia West Africa</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="single-contact-box mb-50">
                <div className="contact-icon mb-30">
                  <img src="/img/icon/contact_box_icon02.png" alt="img" />
                </div>
                <div className="contact-content">
                  <h5>Phone Number</h5>
                  <span>+231-770-961-810</span>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="single-contact-box mb-50">
                <div className="contact-icon mb-30">
                  <img src="/img/icon/contact_box_icon04.png" alt="img" />
                </div>
                <div className="contact-content">
                  <h5>email informing</h5>
                  <span>info@nobleshipping.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}