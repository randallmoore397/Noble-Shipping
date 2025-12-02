'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import MainLayout from '@/components/layouts/MainLayout'
import { quoteSchema } from '@/lib/validations'
import { QuoteFormData } from '@/types'
import { showSuccess, showError } from '@/components/ui/Toast'
import Slider from '@/components/ui/Slider'
import Image from 'next/image'
import Link from 'next/link'
import { useScriptInit } from '@/hooks/useScriptInit'
import DatabaseKeepAlive from '@/components/DatabaseKeepAlive'

export default function HomePage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  useScriptInit()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema)
  })

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()

      if (result.success) {
        showSuccess('Quote request submitted successfully!')
        reset()
      } else {
        showError(result.message || 'Failed to submit quote request')
      }
    } catch (error) {
      showError('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <MainLayout title="home">
      <main>
        <DatabaseKeepAlive />
        {/* Hero Slider */}
        <Slider slides={[
          {
            image: '/img/slider/index.jpg',
            title: 'Global Shipping Excellence',
            description: 'Experience seamless and reliable shipping solutions tailored to your needs. Whether it\'s air cargo or sea freight, we ensure timely delivery with top-notch security and efficiency.'
          },
          {
            image: '/img/slider/container-cargo.jpg',
            title: 'Comprehensive Security Solutions',
            description: 'Protect your assets with our expert security services. From on-site security guards to advanced surveillance systems, we offer unparalleled safety and peace of mind for your business and personal needs.'
          }
        ]} />

        {/* Category Area */}
        <section className="category-area">
          <div className="container">
            <div className="category-bg">
              <div className="row">
                <div className="col-12">
                  <div className="category-list">
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
                          <h5>Parcel</h5>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Area */}
        <section className="about-area about-bg">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="about-active">
                  {/* Slide 1: Cargo Delivery */}
                  <div className="single-about-wrap">
                    <div className="row align-items-center">
                      <div className="col-lg-6">
                        <div className="about-img">
                          <Image
                            src="/services/chuttersnap.jpg"
                            alt="img"
                            width={500}
                            height={400}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="about-content">
                          <div className="section-title about-title mb-25">
                            <h2>About Our Cargo Delivery</h2>
                            <h6>Noble Cargo delivery is an innovative service</h6>
                          </div>
                          <p>
                            At Noble Services, we are dedicated to delivering solutions that not only meet but exceed our clients' expectations. Our comprehensive approach to logistics and security ensures that we provide the best possible service for each unique situation.
                          </p>
                          <a href="#" className="btn">comparison</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Slide 2: Air Cargo Tracking */}
                  <div className="single-about-wrap">
                    <div className="row align-items-center">
                      <div className="col-lg-6">
                        <div className="about-img">
                          <Image
                            src="/img/close-up-delivery.jpg"
                            alt="img"
                            width={500}
                            height={400}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="about-content">
                          <div className="section-title about-title mb-25">
                            <h2>Air Cargo Tracking</h2>
                            <h6>Real-time tracking for your air shipments</h6>
                          </div>
                          <p>
                            Our advanced air cargo tracking system allows you to monitor your shipments in real-time. With state-of-the-art technology and a global network, we ensure your cargo reaches its destination safely and on time.
                          </p>
                          <a href="/tracking/aircargo" className="btn">Track Now</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Slide 3: Security Services */}
                  <div className="single-about-wrap">
                    <div className="row align-items-center">
                      <div className="col-lg-6">
                        <div className="about-img">
                          <Image
                            src="/img/images/services_img03.jpg"
                            alt="img"
                            width={500}
                            height={400}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="about-content">
                          <div className="section-title about-title mb-25">
                            <h2>Security Services</h2>
                            <h6>Professional security solutions for your business</h6>
                          </div>
                          <p>
                            From security guards to bullion vault services, we provide comprehensive security solutions tailored to your needs. Our trained professionals ensure the safety of your assets and personnel around the clock.
                          </p>
                          <a href="/services/security-guard" className="btn">Learn More</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Area */}
        <section className="services-area pt-115 pb-90">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-8 col-lg-10">
                <div className="section-title text-center mb-60">
                  <h6>Delivery innovative service</h6>
                  <h2>About Cargo Delivery</h2>
                  <p>Noble Cargo delivery is an innovative service is effective logistics solution for the delivery of small cargo. This service is useful for companies of various effective logistics scale.</p>
                </div>
              </div>
            </div>
            <div className="services-wrapper">
              <div className="row">
                <div className="col-lg-4 col-md-6">
                  <div className="single-services mb-30">
                    <div className="services-thumb">
                      <Link href="/services/aircargo">
                        <Image
                          src="/img/close-up-delivery.jpg"
                          alt="img"
                          width={400}
                          height={250}
                        />
                      </Link>
                    </div>
                    <div className="services-content">
                      <div className="services-icon">
                        <i className="flaticon-shipping-and-delivery"></i>
                      </div>
                      <h3><Link href="/services/aircargo">Aircargo Delivery</Link></h3>
                      <span>Excellent Delivery Service</span>
                      <p>
                        Air cargo tracking is a service that allows customers to monitor the status and location of their shipments transported by air. This service is crucial for ensuring that goods reach their destination on time and in good condition.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="single-services mb-30">
                    <div className="services-thumb">
                      <Link href="/services/container">
                        <Image
                          src="/img/african-woman-package-delivery.jpg"
                          alt="img"
                          width={400}
                          height={250}
                        />
                      </Link>
                    </div>
                    <div className="services-content">
                      <div className="services-icon">
                        <i className="flaticon-shipping"></i>
                      </div>
                      <h3><Link href="/services/container">Shipping Cargo Delivery</Link></h3>
                      <span>Excellent Delivery Service</span>
                      <p>
                        Container cargo tracking allows businesses and individuals to track their shipments that are transported in large containers via sea or land. This service is vital for international trade.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-6">
                  <div className="single-services mb-30">
                    <div className="services-thumb">
                      <Link href="/services/security-guard">
                        <Image
                          src="/img/images/services_img03.jpg"
                          alt="img"
                          width={400}
                          height={250}
                        />
                      </Link>
                    </div>
                    <div className="services-content">
                      <div className="services-icon">
                        <i className="flaticon-location"></i>
                      </div>
                      <h3><Link href="/services/security-guard">Security Services</Link></h3>
                      <span>Excellent Delivery Service</span>
                      <p>
                        Security guard services are essential for protecting property, goods, and personnel. These guards are trained professionals who provide on-site security.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials and Quote Form */}
        <section className="area-wrapper black-bg position-relative pt-115 pb-120">
          <div className="area-wrap-bg"></div>
          <div className="testimonial-map-bg"></div>
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="testimonial-area">
                  <div className="section-title white-title mb-55">
                    <h6>Happy Customer Quotes</h6>
                    <h2>Our Top Reviews</h2>
                  </div>
                  <div className="testimonial-active">
                    {/* Testimonial 1 */}
                    <div className="single-testimonial">
                      <div className="testimonial-cat mb-30">
                        <h5>Shipping Cargo</h5>
                        <div className="testimonial-rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                        </div>
                      </div>
                      <div className="testimonial-content mb-45">
                        <p>" Noble Services has been a game-changer for our logistics needs. Their air cargo tracking system is incredibly reliable, and their customer service is top-notch. We always know where our shipments are and when they will arrive. We couldn't be happier! "</p>
                      </div>
                      <div className="testimonial-avatar">
                        <div className="testi-avatar-img">
                          <Image
                            src="/img/images/testi_avatar01.png"
                            alt="img"
                            width={60}
                            height={60}
                          />
                        </div>
                        <div className="testi-avatar-info">
                          <h6>Kelvin L. Harris</h6>
                          <span>Logistics Manager</span>
                        </div>
                      </div>
                    </div>

                    {/* Testimonial 2 */}
                    <div className="single-testimonial">
                      <div className="testimonial-cat mb-30">
                        <h5>Container Shipping</h5>
                        <div className="testimonial-rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                        </div>
                      </div>
                      <div className="testimonial-content mb-45">
                        <p>" We've been using Noble Shipping for our container cargo needs for over two years now. Their professionalism and attention to detail are unmatched. The tracking system gives us complete visibility, and deliveries are always on schedule. Highly recommended! "</p>
                      </div>
                      <div className="testimonial-avatar">
                        <div className="testi-avatar-img">
                          <Image
                            src="/img/images/testi_avatar01.png"
                            alt="img"
                            width={60}
                            height={60}
                          />
                        </div>
                        <div className="testi-avatar-info">
                          <h6>Sarah M. Johnson</h6>
                          <span>Import/Export Director</span>
                        </div>
                      </div>
                    </div>

                    {/* Testimonial 3 */}
                    <div className="single-testimonial">
                      <div className="testimonial-cat mb-30">
                        <h5>Security Services</h5>
                        <div className="testimonial-rating">
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                          <i className="fas fa-star"></i>
                        </div>
                      </div>
                      <div className="testimonial-content mb-45">
                        <p>" The security services provided by Noble are exceptional. Their guards are professional, well-trained, and always vigilant. We feel completely secure knowing our facilities are protected by their team. The bullion vault service is also top-tier. "</p>
                      </div>
                      <div className="testimonial-avatar">
                        <div className="testi-avatar-img">
                          <Image
                            src="/img/images/testi_avatar01.png"
                            alt="img"
                            width={60}
                            height={60}
                          />
                        </div>
                        <div className="testi-avatar-info">
                          <h6>Michael T. Brown</h6>
                          <span>Security Director</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="cta-area cta-pl">
                  <div className="section-title white-title mb-60">
                    <h6>Clients Trust Us</h6>
                    <h2>Cargo Request Quote</h2>
                  </div>
                  <div className="cta-from">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="cta-form-col d-flex justify-content-between">
                        <select
                          {...register('service')}
                          className="custom-select"
                        >
                          <option value="">Select Service</option>
                          <option value="Air Freight">Air Freight</option>
                          <option value="Sea Freight">Sea Freight</option>
                          <option value="Parcel Delivery">Parcel Delivery</option>
                          <option value="Security Services">Security Services</option>
                        </select>
                        <input
                          {...register('length')}
                          className="custom-control"
                          placeholder="Length"
                          type="text"
                        />
                        <input
                          {...register('height')}
                          className="custom-control"
                          placeholder="Height"
                          type="text"
                        />
                      </div>
                      <div className="cta-form-col d-flex justify-content-between">
                        <select
                          {...register('from_country')}
                          className="custom-select"
                        >
                          <option value="">From Country</option>
                          <option value="USA">USA</option>
                          <option value="UK">UK</option>
                          <option value="China">China</option>
                          <option value="Liberia">Liberia</option>
                        </select>
                        <select
                          {...register('to_country')}
                          className="custom-select"
                        >
                          <option value="">To Country</option>
                          <option value="USA">USA</option>
                          <option value="UK">UK</option>
                          <option value="China">China</option>
                          <option value="Liberia">Liberia</option>
                        </select>
                      </div>
                      <div className="cta-form-col d-flex justify-content-between">
                        <input
                          {...register('weight')}
                          className="custom-control cta-email"
                          placeholder="Weight"
                          type="text"
                        />
                        <input
                          {...register('email_address')}
                          className="cta-email"
                          placeholder="Email"
                          type="email"
                        />
                      </div>
                      <button
                        className="btn"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Quote'}
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="fact-area position-relative pt-115">
          <div className="fact-bg"></div>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="section-title text-center mb-70">
                  <h6>Delivery Anything</h6>
                  <h2>Our Achievements</h2>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="single-fact mb-50">
                  <div className="fact-icon mb-25">
                    <i className="flaticon-package"></i>
                  </div>
                  <div className="fact-content">
                    <h4><span className="count">3,560</span> km</h4>
                    <h6>Package Delivered</h6>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="single-fact mb-50">
                  <div className="fact-icon mb-25">
                    <i className="flaticon-placeholder"></i>
                  </div>
                  <div className="fact-content">
                    <h4><span className="count">195</span></h4>
                    <h6>Countries Covered</h6>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="single-fact mb-50">
                  <div className="fact-icon mb-25">
                    <i className="flaticon-user"></i>
                  </div>
                  <div className="fact-content">
                    <h4><span className="count">456</span> k</h4>
                    <h6>Happy Customer</h6>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-sm-6">
                <div className="single-fact mb-50">
                  <div className="fact-icon mb-25">
                    <i className="flaticon-like"></i>
                  </div>
                  <div className="fact-content">
                    <h4><span className="count">23</span> Yr</h4>
                    <h6>Year Experience</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="gallery-area gallery-bg pt-115 pb-120">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="section-title text-center mb-70">
                  <h6>Delivery Anything</h6>
                  <h2>Exclusive Cargo Gallery</h2>
                </div>
              </div>
            </div>
            <div className="row gallery-active">
              <div className="col-lg-8 col-md-12 grid-item grid-sizer">
                <div className="single-gallery-img mb-30">
                  <Link href="#">
                    <Image
                      src="/services/Tracking-p-1080.png"
                      alt="gallery"
                      width={800}
                      height={600}
                    />
                  </Link>
                  <div className="gallery-overlay">
                    <h5 className="gallery-overlay-title">
                      <Link href="#">Cargo Truck</Link>
                    </h5>
                    <span>Blanding , Digital</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 grid-item grid-sizer">
                <div className="single-gallery-img mb-30">
                  <Link href="#">
                    <Image
                      src="/services/pavan-kumar.jpg"
                      alt="gallery"
                      width={400}
                      height={300}
                    />
                  </Link>
                  <div className="gallery-overlay">
                    <h5 className="gallery-overlay-title">
                      <Link href="#">Cargo Truck</Link>
                    </h5>
                    <span>Blanding , Digital</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 grid-item grid-sizer">
                <div className="single-gallery-img mb-30">
                  <Link href="#">
                    <Image
                      src="/services/chris-leipelt-HqKfLgBFVF4-unsplash.jpg"
                      alt="gallery"
                      width={400}
                      height={300}
                    />
                  </Link>
                  <div className="gallery-overlay">
                    <h5 className="gallery-overlay-title">
                      <Link href="#">Cargo Truck</Link>
                    </h5>
                    <span>Blanding , Digital</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 grid-item grid-sizer">
                <div className="single-gallery-img mb-30">
                  <Link href="#">
                    <Image
                      src="/services/maarten-van.jpg"
                      alt="gallery"
                      width={400}
                      height={300}
                    />
                  </Link>
                  <div className="gallery-overlay">
                    <h5 className="gallery-overlay-title">
                      <Link href="#">Cargo Truck</Link>
                    </h5>
                    <span>Blanding , Digital</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="gallery-btn text-center mt-30">
                  <Link href="/gallery" className="btn">view gallery</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Extra Features Section */}
        <section className="extra-features-area ef-md-padding pt-115 pb-120">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="extra-features-img wow fadeInLeft" data-wow-delay=".2s">
                  <Image
                    src="/img/images/extra_features_img.png"
                    alt="img"
                    width={600}
                    height={500}
                  />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="extra-features-content">
                  <div className="section-title mb-30">
                    <h6>Why Choose Us</h6>
                    <h2>Extra Features We Offer</h2>
                  </div>
                  <p>We provide comprehensive shipping and security solutions with advanced tracking systems, 24/7 customer support, and guaranteed on-time delivery. Our experienced team ensures your cargo reaches its destination safely and efficiently.</p>
                  <div className="extra-features-list">
                    <ul>
                      <li><i className="fas fa-check"></i> Real-time tracking system</li>
                      <li><i className="fas fa-check"></i> 24/7 customer support</li>
                      <li><i className="fas fa-check"></i> Secure packaging and handling</li>
                      <li><i className="fas fa-check"></i> Insurance coverage available</li>
                      <li><i className="fas fa-check"></i> Global network coverage</li>
                    </ul>
                  </div>
                  <Link href="/about" className="btn mt-30">Learn More</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Section */}
        <section className="brand-area">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="brand-active">
                  <div className="single-brand">
                    <Image
                      src="/img/brand/brand_logo01.png"
                      alt="brand"
                      width={150}
                      height={80}
                    />
                  </div>
                  <div className="single-brand">
                    <Image
                      src="/img/brand/brand_logo02.png"
                      alt="brand"
                      width={150}
                      height={80}
                    />
                  </div>
                  <div className="single-brand">
                    <Image
                      src="/img/brand/brand_logo03.png"
                      alt="brand"
                      width={150}
                      height={80}
                    />
                  </div>
                  <div className="single-brand">
                    <Image
                      src="/img/brand/brand_logo04.png"
                      alt="brand"
                      width={150}
                      height={80}
                    />
                  </div>
                  <div className="single-brand">
                    <Image
                      src="/img/brand/brand_logo05.png"
                      alt="brand"
                      width={150}
                      height={80}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="newsletter-area">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="newsletter-wrap">
                  <div className="row">
                    <div className="col-lg-5">
                      <div className="newsletter-content">
                        <h4>Newsletter Sign Up</h4>
                        <span>Notifications our best deals...</span>
                      </div>
                    </div>
                    <div className="col-lg-7">
                      <div className="newsletter-form">
                        <form onSubmit={async (e) => {
                          e.preventDefault()
                          const email = (e.target as any).email.value
                          if (email) {
                            try {
                              const res = await fetch('/api/newsletter', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ email })
                              })
                              const data = await res.json()
                              if (data.success) {
                                alert('Successfully subscribed!')
                                  ; (e.target as any).reset()
                              } else {
                                alert(data.message)
                              }
                            } catch {
                              alert('Subscription failed')
                            }
                          }
                        }}>
                          <input type="email" name="email" placeholder="Enter your email..." required />
                          <button className="btn" type="submit">subscribe</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  )
}