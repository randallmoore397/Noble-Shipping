'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'
import { useLayoutScripts } from '@/hooks/useLayoutScripts'
import { useEffect } from 'react'

interface MainLayoutProps {
  children: React.ReactNode
  title?: string
}

export default function MainLayout({ children, title }: MainLayoutProps) {
  const pathname = usePathname()
  useLayoutScripts()

  // Handle data-background attributes (Flask compatibility)
  useEffect(() => {
    const elements = document.querySelectorAll('[data-background]')
    elements.forEach((element) => {
      const bg = element.getAttribute('data-background')
      if (bg && element instanceof HTMLElement) {
        element.style.backgroundImage = `url(${bg})`
      }
    })
  }, [pathname])

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true
    if (path !== '/' && pathname.startsWith(path)) return true
    return false
  }

  return (
    <>
      <header>
        <div className="header-top-wrap purple-bg d-none d-md-block">
          <div className="container-fluid header-container-p">
            <div className="row">
              <div className="col-xl-6 col-lg-7 col-md-6">
                <div className="header-contact">
                  <ul>
                    <li><i className="fas fa-headphones"></i>Call us +231-770-961-810</li>
                    <li><i className="far fa-envelope"></i> info@nobleshippingandsecurity.com</li>
                    <li><i className="fas fa-map-marker"></i>ELWA Paynesville City, Liberia</li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-6 col-lg-5 col-md-6">
                <div className="header-top-right d-flex justify-content-end align-items-center">
                  <div className="header-country">
                    <form>
                      <select name="name" className="selected">
                        <option value="">USA</option>
                        <option value="">South Africa</option>
                        <option value="">Nigeria</option>
                        <option value="">UK</option>
                        <option value="">China</option>
                      </select>
                    </form>
                  </div>
                  <div className="header-social">
                    <ul>
                      <li>Follow us :</li>
                      <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                      <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                      <li><a href="#"><i className="fab fa-pinterest-p"></i></a></li>
                      <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="header-sticky" className="main-header">
          <div className="container-fluid header-container-p">
            <div className="row align-items-center">
              <div className="col-lg-3 col-md-6">
                <div className="logo">
                  <Link href="/">
                    <Image
                      src="/img/Noble-Shipping-logo.png"
                      alt="Logo"
                      width={250}
                      height={80}
                      className="mobile-logo"
                    />
                  </Link>
                </div>
              </div>
              <div className="col-lg-9 col-md-6 d-none d-md-block">
                <div className="menu-area">
                  <div className="main-menu">
                    <nav id="mobile-menu">
                      <ul>
                        <li className={isActive('/') ? 'active' : ''}>
                          <Link href="/">Home</Link>
                        </li>
                        <li className={isActive('/tracking/aircargo') ? 'active' : ''}>
                          <Link href="/tracking/aircargo">Aircargo Tracking</Link>
                        </li>
                        <li className={isActive('/tracking/container') ? 'active' : ''}>
                          <Link href="/tracking/container">Container Tracking</Link>
                        </li>
                        <li className={isActive('/services') ? 'active' : ''}>
                          <Link href="/services">Our Services</Link>
                        </li>
                        <li className={isActive('/about') ? 'active' : ''}>
                          <Link href="/about">About Us</Link>
                        </li>
                        <li className={isActive('/contact') ? 'active' : ''}>
                          <Link href="/contact">Contact Us</Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <div className="header-search">
                    <a href="#" data-bs-toggle="modal" data-bs-target="#search-modal">
                      <i className="flaticon-magnifying-glass"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="mobile-menu"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <div className="modal fade" id="search-modal" tabIndex={-1} aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <form onSubmit={(e) => {
              e.preventDefault()
              const query = (e.target as any).search.value
              if (query.trim()) {
                window.location.href = `/search?q=${encodeURIComponent(query)}`
              }
            }}>
              <input type="text" name="search" placeholder="Search here..." />
              <button type="submit"><i className="fa fa-search"></i></button>
            </form>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
        </div>
      </div>

      {children}

      <footer>
        <div className="footer-wrap pt-190 pb-40" data-background="/img/bg/footer_bg.jpg">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="footer-widget mb-50">
                  <div className="footer-logo mb-35">
                    <Link href="/">
                      <Image
                        src="/img/Noble-Shipping-logo-white.png"
                        alt="img"
                        width={200}
                        height={60}
                      />
                    </Link>
                  </div>
                  <div className="footer-text">
                    <p>
                      Established with a commitment to excellence, our company specializes in Container Cargo, Air Cargo, Parcel Delivery, and Security Services.
                    </p>
                  </div>
                  <div className="footer-social">
                    <ul>
                      <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                      <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                      <li><a href="#"><i className="fab fa-pinterest-p"></i></a></li>
                      <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="footer-widget mb-50">
                  <div className="fw-title mb-30">
                    <h5>SECURITY SERVICES</h5>
                  </div>
                  <div className="fw-link">
                    <ul>
                      <li><Link href="/services/security-guard"><i className="fas fa-caret-right"></i>Provision of Security guard</Link></li>
                      <li><Link href="/services/logistics"><i className="fas fa-caret-right"></i> Safekeeping of goods & logistics</Link></li>
                      <li><Link href="/services/bullion-vault"><i className="fas fa-caret-right"></i> Provision of bullion Vault</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="footer-widget mb-50">
                  <div className="fw-title mb-30">
                    <h5>USEFUL LINKS</h5>
                  </div>
                  <div className="fw-link">
                    <ul>
                      <li><Link href="/about"><i className="fas fa-caret-right"></i> About us</Link></li>
                      <li><Link href="/services"><i className="fas fa-caret-right"></i> Our Services</Link></li>
                      <li><Link href="/tracking/aircargo"><i className="fas fa-caret-right"></i> Aircargo Tracking</Link></li>
                      <li><Link href="/tracking/container"><i className="fas fa-caret-right"></i> Container Tracking</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="footer-widget mb-50">
                  <div className="fw-title mb-30">
                    <h5>Address / Contact</h5>
                  </div>
                  <div className="f-support-content">
                    <p>Head Office: ELWA Paynesville City, Liberia West Africa</p>
                    <p>Telephone: +231-770-961-810 <br /> Email: info@nobleshipping.com</p>
                    <Link href="#" className="f-download-btn">
                      <img
                        src="/img/Google_Play_Store_badge_EN.svg"
                        alt="img"
                        width={140}
                        height={50}
                        loading="lazy"
                        onError={(e) => { e.currentTarget.style.display = 'none' }}
                      />
                    </Link>
                    <Link href="#" className="f-download-btn">
                      <img
                        src="/img/badge-pre-order-on-the-app-store.svg"
                        alt="img"
                        width={140}
                        height={50}
                        loading="lazy"
                        onError={(e) => { e.currentTarget.style.display = 'none' }}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-wrap">
          <div className="container">
            <div className="copyright-text text-center">
              <p>Copyright© <span>Noble Shipping Company </span> | All Rights Reserved</p>
            </div>
          </div>
        </div>
      </footer>

      <Script
        src="/Scripts/jquery-1-12-4/jquery-1.12.4.js"
        strategy="beforeInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && window.jQuery) {
            window.$ = window.jQuery;
          }
        }}
      />
      <Script src="/Scripts/popper/popper.min.js" strategy="afterInteractive" />
      <Script src="/Scripts/jquery-meanmenu/jquery.meanmenu.min.js" strategy="afterInteractive" />
      <Script src="https://unpkg.com/aos@2.3.1/dist/aos.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/jquery-nice-select@1.1.0/js/jquery.nice-select.min.js" strategy="afterInteractive" />
      <Script src="/Scripts/ajax-form/ajax-form.js" strategy="afterInteractive" />
      <Script src="/Scripts/paroller/paroller.js" strategy="afterInteractive" />
      <Script src="/Scripts/jquery-scrollUp/jquery.scrollUp.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/waypoints@4.0.1/lib/jquery.waypoints.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/jquery.counterup@2.1.0/jquery.counterup.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/magnific-popup@1.1.0/dist/jquery.magnific-popup.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/wow.js@1.2.2/dist/wow.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/isotope-layout@3.0.6/dist/isotope.pkgd.min.js" strategy="afterInteractive" />
      <Script src="https://cdn.jsdelivr.net/npm/imagesloaded@5.0.0/imagesloaded.pkgd.min.js" strategy="afterInteractive" />
      <Script src="/Scripts/plugins/plugins.js" strategy="afterInteractive" />
      <Script src="/Scripts/main/main.js" strategy="afterInteractive" />
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/sweetalert2@11.12.4/dist/sweetalert2.all.min.js"
        strategy="afterInteractive"
      />
    </>
  )
}