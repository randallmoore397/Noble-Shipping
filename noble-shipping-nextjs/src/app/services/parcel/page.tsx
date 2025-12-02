import MainLayout from '@/components/layouts/MainLayout'
import Image from 'next/image'

export default function ParcelServicesPage() {
  return (
    <MainLayout>
      <section className="breadcrumb-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumb-content text-center">
                <h2>Parcel Delivery Services</h2>
                <nav>
                  <ol className="breadcrumb">
                    <li><a href="/">Home</a></li>
                    <li><a href="/services">Services</a></li>
                    <li className="active">Parcel Delivery</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services-details pt-115 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="services-details-content">
                <div className="services-details-img mb-30">
                  <Image 
                    src="/services/services-parcel.avif" 
                    alt="Parcel Delivery Services" 
                    width={800} 
                    height={400}
                  />
                </div>
                <h3 className="mb-30">Express Parcel Delivery Solutions</h3>
                <p>
                  Our parcel delivery services offer fast, secure, and reliable transportation for documents, packages, and small cargo. With multiple delivery options and real-time tracking, we ensure your parcels reach their destination safely and on time.
                </p>
                <p>
                  We handle various types of parcels including documents, electronics, clothing, books, and other personal items. Our network covers both domestic and international destinations with competitive rates and reliable service.
                </p>
                
                <div className="feature-item mb-30">
                  <div className="feature-icon">
                    <i className="fas fa-truck"></i>
                  </div>
                  <div className="feature-content">
                    <h5>Fast Delivery Network</h5>
                    <p>Extensive delivery network for quick and efficient parcel transportation</p>
                  </div>
                </div>
                
                <div className="feature-item mb-30">
                  <div className="feature-icon">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <div className="feature-content">
                    <h5>Secure Handling</h5>
                    <p>Safe and secure handling of all parcels with insurance options</p>
                  </div>
                </div>
                
                <div className="services-features mt-50">
                  <h4 className="mb-30">Delivery Options</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <ul className="services-list">
                        <li><i className="fas fa-check"></i> Same-day express delivery</li>
                        <li><i className="fas fa-check"></i> Next-day priority delivery</li>
                        <li><i className="fas fa-check"></i> Standard economy delivery</li>
                        <li><i className="fas fa-check"></i> International parcel service</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="services-list">
                        <li><i className="fas fa-check"></i> Real-time parcel tracking</li>
                        <li><i className="fas fa-check"></i> Electronic proof of delivery</li>
                        <li><i className="fas fa-check"></i> Signature confirmation service</li>
                        <li><i className="fas fa-check"></i> Comprehensive insurance options</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="services-sidebar">
                <div className="sidebar-widget mb-40">
                  <h4 className="widget-title">Our Services</h4>
                  <ul className="services-links">
                    <li><a href="/services/aircargo">Air Cargo</a></li>
                    <li><a href="/services/container">Container Shipping</a></li>
                    <li><a href="/services/parcel" className="active">Parcel Delivery</a></li>
                    <li><a href="/services/security-guard">Security Services</a></li>
                    <li><a href="/services/logistics">Logistics</a></li>
                    <li><a href="/services/bullion-vault">Bullion Vault</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}