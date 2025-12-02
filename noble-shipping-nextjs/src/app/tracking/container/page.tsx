'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import MainLayout from '@/components/layouts/MainLayout'
import { trackingSchema, TrackingFormData } from '@/lib/validations'
import { showError } from '@/components/ui/Toast'

export default function ContainerTrackingPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<TrackingFormData>({
    resolver: zodResolver(trackingSchema)
  })

  const onSubmit = async (data: TrackingFormData) => {
    setIsSubmitting(true)
    try {
      router.push(`/tracking/container/${data.tracking_number}`)
    } catch (error) {
      showError('Please enter a valid tracking number')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <MainLayout>
      <style jsx>{`
        .s-breadcrumb-bg {
          background-image: url(/img/1380.jpg);
        }
      `}</style>

      {/* Breadcrumb Area */}
      <div className="breadcrumb-area breadcrumb-bg s-breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumb-content">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="dots"></li>
                    <li className="breadcrumb-item"><Link href="/">Container</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Tracking</li>
                    <li className="dots2"></li>
                  </ol>
                </nav>
                <h2>Container Tracking</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Area */}
      <section className="category-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="category-list s-category-list">
                <ul>
                  <li>
                    <Link href="/services/container">
                      <div className="category-icon">
                        <i className="flaticon-cruise"></i>
                      </div>
                      <h5>Sea Freight</h5>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/aircargo">
                      <div className="category-icon">
                        <i className="flaticon-air-freight"></i>
                      </div>
                      <h5>Air Freight</h5>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/bullion-vault">
                      <div className="category-icon">
                        <i className="flaticon-delivery-1"></i>
                      </div>
                      <h5>Insurance</h5>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/logistics">
                      <div className="category-icon">
                        <i className="flaticon-warehouse"></i>
                      </div>
                      <h5>Warehousing</h5>
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/parcel">
                      <div className="category-icon">
                        <i className="flaticon-package"></i>
                      </div>
                      <h5>Forwarding</h5>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tracking Area */}
      <div className="tracking-area pt-95 pb-115">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-8 col-lg-10">
              <div className="tracking-id-info text-center">
                <p>Enter Tracking Code for Container <Link href="#">Tracking Number.</Link></p>
                <form onSubmit={handleSubmit(onSubmit)} className="tracking-id-form">
                  <input
                    {...register('tracking_number')}
                    type="text"
                    className="form-control"
                    placeholder="Tracking Number"
                  />
                  <button className="btn red-btn" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Tracking...' : 'Tracking'}
                  </button>
                  {errors.tracking_number && (
                    <div className="text-danger mt-2">{errors.tracking_number.message}</div>
                  )}
                </form>
                <div className="tracking-list">
                  <ul>
                    <li>
                      <div className="tracking-list-icon">
                        <i className="flaticon-box"></i>
                      </div>
                      <div className="tracking-list-content">
                        <p>Dispatch</p>
                      </div>
                    </li>
                    <li className="active">
                      <div className="tracking-list-icon">
                        <i className="flaticon-warehouse"></i>
                      </div>
                      <div className="tracking-list-content">
                        <p>departed country</p>
                      </div>
                    </li>
                    <li>
                      <div className="tracking-list-icon">
                        <i className="flaticon-placeholder"></i>
                      </div>
                      <div className="tracking-list-content">
                        <p>Destination</p>
                      </div>
                    </li>
                    <li>
                      <div className="tracking-list-icon">
                        <i className="flaticon-audit"></i>
                      </div>
                      <div className="tracking-list-content">
                        <p>Successful</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="tracking-help">
                  <p>MULTIPLE TRACKING NUMBERS | <Link href="/contact">NEED HELP?</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="services-area delivery-bg inner-help-bg pt-110 pb-70">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-10">
              <div className="s-section-title text-center mb-60">
                <h2>Why Choose Us?</h2>
                <p>
                  Our dedication to quality, security, and customer satisfaction sets us apart. We leverage our expertise and advanced technology to provide solutions that meet the highest standards.
                </p>
              </div>
            </div>
          </div>
          <div className="services-wrapper">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="s-single-services mb-50">
                  <div className="services-thumb mb-25">
                    <Link href="#"><img src="/img/images/91.jpg" alt="img" style={{ height: '250px' }} /></Link>
                  </div>
                  <div className="s-services-content">
                    <h3><span>Can I track my cargo in real-time?</span></h3>
                    <p>
                      Yes, Noble Services provides real-time tracking for your cargo using the tracking number provided at the time of booking. Our tracking system offers up-to-date information on the status and location of your shipment.
                    </p>
                    <Link href="/contact" className="btn red-btn">LET US HELP</Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="s-single-services mb-50">
                  <div className="services-thumb mb-25">
                    <Link href="#"><img src="/img/slider/blog_thumb01.jpg" alt="img" style={{ height: '250px' }} /></Link>
                  </div>
                  <div className="s-services-content">
                    <h3><span>Do you offer international shipping services?</span></h3>
                    <p>
                      Yes, Noble Services provides international shipping services for air cargo, container cargo, and parcels. We handle shipments to and from various countries, ensuring compliance with international shipping regulations and customs requirements.
                    </p>
                    <Link href="/contact" className="btn red-btn">LET US HELP</Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="s-single-services mb-50">
                  <div className="services-thumb mb-25">
                    <Link href="#"><img src="/img/images/s_services_img03.jpg" alt="img" style={{ height: '250px' }} /></Link>
                  </div>
                  <div className="s-services-content">
                    <h3><span>How do I prepare my cargo for shipping?</span></h3>
                    <p>
                      Proper preparation is key to ensuring that your cargo arrives safely. Noble Services provides guidelines for packaging and labeling your goods. For container and air cargo, ensure that items are securely packed, labeled correctly, and meet any specific requirements for the mode of transport.
                    </p>
                    <Link href="/contact" className="btn red-btn">LET US HELP</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}