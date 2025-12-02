import MainLayout from '@/components/layouts/MainLayout'
import Image from 'next/image'

export default function AircargoServicesPage() {
  return (
    <MainLayout>
      <section className="breadcrumb-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumb-content text-center">
                <h2>Air Cargo Services</h2>
                <nav>
                  <ol className="breadcrumb">
                    <li><a href="/">Home</a></li>
                    <li><a href="/services">Services</a></li>
                    <li className="active">Air Cargo</li>
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
                    src="/services/services-aircargo.jpg" 
                    alt="Air Cargo Services" 
                    width={800} 
                    height={400}
                  />
                </div>
                <h3 className="mb-30">Professional Air Cargo Services</h3>
                <p>
                  Our air cargo services provide fast, reliable, and secure transportation for your time-sensitive shipments. With our extensive network of airline partners and experienced logistics team, we ensure your cargo reaches its destination safely and on time.
                </p>
                <p>
                  We specialize in handling various types of air cargo including general cargo, perishables, pharmaceuticals, electronics, and dangerous goods. Our state-of-the-art facilities and experienced team ensure proper handling and storage of your valuable shipments.
                </p>
                
                <div className="feature-item mb-30">
                  <div className="feature-icon">
                    <i className="fas fa-plane"></i>
                  </div>
                  <div className="feature-content">
                    <h5>Global Network</h5>
                    <p>Access to major airports worldwide with reliable airline partnerships</p>
                  </div>
                </div>
                
                <div className="feature-item mb-30">
                  <div className="feature-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="feature-content">
                    <h5>Time-Critical Delivery</h5>
                    <p>Express and priority services for urgent shipments</p>
                  </div>
                </div>
                
                <div className="services-features mt-50">
                  <h4 className="mb-30">Key Features</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <ul className="services-list">
                        <li><i className="fas fa-check"></i> Real-time tracking system</li>
                        <li><i className="fas fa-check"></i> Express and priority delivery</li>
                        <li><i className="fas fa-check"></i> Temperature-controlled transport</li>
                        <li><i className="fas fa-check"></i> Hazardous materials handling</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="services-list">
                        <li><i className="fas fa-check"></i> Door-to-door delivery service</li>
                        <li><i className="fas fa-check"></i> Customs clearance assistance</li>
                        <li><i className="fas fa-check"></i> Comprehensive insurance options</li>
                        <li><i className="fas fa-check"></i> 24/7 customer support team</li>
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
                    <li><a href="/services/aircargo" className="active">Air Cargo</a></li>
                    <li><a href="/services/container">Container Shipping</a></li>
                    <li><a href="/services/parcel">Parcel Delivery</a></li>
                    <li><a href="/services/security-guard">Security Services</a></li>
                    <li><a href="/services/logistics">Logistics</a></li>
                    <li><a href="/services/bullion-vault">Bullion Vault</a></li>
                  </ul>
                </div>
                <div className="sidebar-widget">
                  <h4 className="widget-title">Contact Info</h4>
                  <div className="contact-info">
                    <p><i className="fas fa-phone"></i> +231-770-961-810</p>
                    <p><i className="fas fa-envelope"></i> info@nobleshippingandsecurity.com</p>
                    <p><i className="fas fa-map-marker-alt"></i> ELWA Paynesville City, Liberia</p>
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