'use client'

import MainLayout from '@/components/layouts/MainLayout'
import Link from 'next/link'
import { useScriptInit } from '@/hooks/useScriptInit'

export default function AboutPage() {
  useScriptInit()

  return (
    <MainLayout>
      <style jsx>{`
        .breadcrumb-bg {
          background-image: url(/img/close-up-delivery-person-with-parcels_23-2149095947.jpg);
        }

        .video-bg {
          background-image: url(/img/1380.jpg);
        }
      `}</style>

      {/* Breadcrumb Area */}
      <div className="breadcrumb-area breadcrumb-bg">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumb-content">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="dots"></li>
                    <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">About Us</li>
                    <li className="dots2"></li>
                  </ol>
                </nav>
                <h2>About Us</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Area - Company Overview */}
      <section className="services-area delivery-bg pt-110 pb-90">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-10 col-lg-10">
              <div className="s-section-title text-center mb-60">
                <h4>About Our Company</h4>
                <h2>We Provide Services All Over The World</h2>
                <p>
                  Noble Shipping and Security was established in 1945, and has developed into one of the largest, leading carriers in the global container shipping industry. At SCC, we are committed to providing our clients around the world with reliable, flexible shipping solutions based on expertise gained from over half a century of experience. We cultivate long-term partnerships with our customers to delivering a range of services adapted to meet their specific needs with the SCC seal of quality. For SCC's highly skilled and professional staff, there is no cargo challenge that cannot be met. SCC's customers enjoy the peace of mind that comes from working with a carrier that offers proven shipping solutions, including out-of-gauge cargo, perishable goods, or hazardous cargo. SCC remains at the forefront of the carrier industry by rapidly adapting to commercial developments and emerging markets. This approach is an integral part of SCC's working philosophy, and drives the expansion of our operations in established East-West trade routes, while we pursue the development of our carrier services in the world's newest, most dynamic markets.
                </p>
              </div>
            </div>
          </div>
          <div className="services-wrapper">
            <div className="row">
              <div className="col-lg-4 col-md-6">
                <div className="single-services mb-30">
                  <div className="services-thumb">
                    <Link href="#"><img src="/img/images/91.jpg" alt="img" /></Link>
                  </div>
                  <div className="services-content">
                    <div className="services-icon">
                      <i className="flaticon-shipping-and-delivery"></i>
                    </div>
                    <h3><Link href="#">Our Expertise</Link></h3>
                    <span>Excellent Service</span>
                    <p>
                      Our team is dedicated to ensuring that every shipment, whether large or small, is handled with the highest level of care and professionalism. We offer a range of logistics services, including the management and tracking of container cargo, air cargo, and parcels. Our state-of-the-art tracking system provides real-time updates, giving you peace of mind as your goods move through the supply chain.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="single-services mb-30">
                  <div className="services-thumb">
                    <Link href="#"><img src="/img/images/security.jpg" alt="img" /></Link>
                  </div>
                  <div className="services-content">
                    <div className="services-icon">
                      <i className="flaticon-shipping"></i>
                    </div>
                    <h3><Link href="#">Our Commitment</Link></h3>
                    <span>Excellent Service</span>
                    <p>
                      At Noble Services, we are committed to delivering exceptional service and support. Our experienced team works diligently to ensure that all your needs are met with efficiency and professionalism. We understand the importance of timely deliveries and secure handling, and we strive to exceed your expectations in every aspect of our service.
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="single-services mb-30">
                  <div className="services-thumb">
                    <Link href="#"><img src="/img/images/services_img03.jpg" alt="img" /></Link>
                  </div>
                  <div className="services-content">
                    <div className="services-icon">
                      <i className="flaticon-location"></i>
                    </div>
                    <h3><Link href="#">Why Choose Us?</Link></h3>
                    <span>Excellent Service</span>
                    <p>
                      Our dedication to quality, security, and customer satisfaction sets us apart. We leverage our expertise and advanced technology to provide solutions that meet the highest standards. Whether you are looking to manage large-scale shipments or need comprehensive security for valuable assets, Noble Services is here to assist you every step of the way.
                      Thank you for considering Noble Services.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* International Cargo Section */}
      <section className="international-services position-relative pb-120 fix">
        <div className="container">
          <div className="services-wrapper">
            <div className="row align-items-center">
              <div className="col-lg-6 order-0 order-lg-2">
                <div className="int-services-img text-center text-lg-right">
                  <img src="/img/images/container-isolated.png" alt="img" />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="s-section-title mb-30">
                  <h2>International Cargo</h2>
                  <h6>Noble Cargo delivery is an innovative service</h6>
                </div>
                <div className="int-services-content">
                  <p>Noble Cargo is an innovative service is effective logistics solution for the delivery of small and large cargo. This service is useful for companies of various effective logistics scale.</p>
                  <button className="btn red-btn">comparison</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overlay-title paroller" data-paroller-factor="0.15" data-paroller-factor-lg="0.15" data-paroller-factor-md="0.15" data-paroller-factor-sm="0.15" data-paroller-type="foreground" data-paroller-direction="horizontal">Cargo</div>
      </section>

      {/* Video Area */}
      <section className="video-area video-bg">
        <div className="container">
          <div className="video-overlay s-video-overlay">
            <div className="row align-items-center">
              <div className="col-xl-5 col-lg-8 order-2 order-lg-0">
                <div className="video-title">
                  <span>Good Delivery</span>
                  <h2><span>We never</span> break our promise</h2>
                  <Link href="/services">more services<span></span></Link>
                </div>
              </div>
              <div className="col-lg-3">
                {/* Video play button can be added here if needed */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Area - This is a simplified version. Full version would be very long */}
      <section className="faq-area faq-bg pt-110 pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-10">
              <div className="s-section-title text-center mb-60">
                <h2>frequently asked questions</h2>
                <p>
                  At Noble Services, we pride ourselves on being a leading provider of comprehensive logistics and security solutions. Established with a commitment to excellence, our company specializes in Container Cargo, Air Cargo, Parcel Delivery, and Security Services. Our mission is to offer reliable, efficient, and secure services tailored to meet the diverse needs of our clients.
                </p>
              </div>
            </div>
          </div>
          <div className="faq-wrapper">
            <div className="row">
              <div className="col-xl-4 col-lg-5">
                <div className="nav flex-column nav-pills faq-tab-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                  <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">
                    <div className="faq-tab-icon">
                      <i className="far fa-bell"></i>
                    </div>
                    <div className="faq-tab-content d-none d-lg-block">
                      <h5>What types of cargo do you handle?</h5>
                      <p>Noble Services specializes in handling various types of cargo, including container cargo, air cargo, and parcels.</p>
                    </div>
                  </a>
                  <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">
                    <div className="faq-tab-icon">
                      <i className="fas fa-award"></i>
                    </div>
                    <div className="faq-tab-content d-none d-lg-block">
                      <h5>How do I track my shipment?</h5>
                      <p>Express delivery is an innovative service effective logistics.</p>
                    </div>
                  </a>
                  <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">
                    <div className="faq-tab-icon">
                      <i className="fas fa-bullseye"></i>
                    </div>
                    <div className="faq-tab-content d-none d-lg-block">
                      <h5>What security measures are in place for cargo?</h5>
                      <p>We prioritize the security of your cargo with comprehensive measures designed.</p>
                    </div>
                  </a>
                  <a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">
                    <div className="faq-tab-icon">
                      <i className="fas fa-cog"></i>
                    </div>
                    <div className="faq-tab-content d-none d-lg-block">
                      <h5>What should I do if my shipment is delayed?</h5>
                      <p>Noble Services will provide updates through our tracking system.</p>
                    </div>
                  </a>
                </div>
              </div>
              <div className="col-xl-8 col-lg-7">
                <div className="tab-content" id="v-pills-tabContent">
                  <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                    <div className="faq-accordion">
                      <div className="faq-tab-icon">
                        <i className="far fa-bell"></i>
                      </div>
                      <div className="faq-accordion-content fix">
                        <div className="faq-tab-content mb-30">
                          <h5>What types of cargo do you handle?</h5>
                          <p>
                            Noble Services specializes in handling various types of cargo, including container cargo, air cargo, and parcels. Container cargo involves large shipments transported via sea or land, while air cargo covers goods moved by air transport. Our parcel services cater to smaller packages, often handled by courier services. We offer tailored solutions for each type of cargo, ensuring efficient and secure transport based on the unique needs of your shipment.
                            Our team is equipped to manage different types of goods, whether you're sending bulk shipments or individual packages. We ensure that all cargo types are handled with the utmost care, providing real-time tracking and updates throughout the shipping process.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Area */}
      <div className="brand-area pt-85 pb-85">
        <div className="container">
          <div className="row brand-active">
            <div className="col-12">
              <div className="signle-brand">
                <img src="/img/brands/dhl.png" alt="img" style={{ width: '160px', height: '100px' }} />
              </div>
            </div>
            <div className="col-12">
              <div className="signle-brand">
                <img src="/img/brands/FedEx.png" alt="img" style={{ width: '160px', height: '100px' }} />
              </div>
            </div>
            <div className="col-12">
              <div className="signle-brand">
                <img src="/img/brands/ups.png" alt="img" style={{ width: '90px', height: '100px' }} />
              </div>
            </div>
            <div className="col-12">
              <div className="signle-brand">
                <img src="/img/brands/TNT_Logo.svg.png" alt="img" style={{ width: '160px', height: '100px' }} />
              </div>
            </div>
            <div className="col-12">
              <div className="signle-brand">
                <img src="/img/brands/DB_Schenker_logo.svg.png" alt="img" style={{ width: '200px', height: '100px' }} />
              </div>
            </div>
            <div className="col-12">
              <div className="signle-brand">
                <img src="/img/brand/brand_logo03.png" alt="img" style={{ width: '90px', height: '100px' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

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
                      <form action="#">
                        <input type="email" placeholder="Enter your email..." />
                        <button className="btn">subscribe</button>
                      </form>
                    </div>
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