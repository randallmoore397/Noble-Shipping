import MainLayout from '@/components/layouts/MainLayout'
import Image from 'next/image'

export default function ContainerServicesPage() {
  return (
    <MainLayout>
      <section className="breadcrumb-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumb-content text-center">
                <h2>Container Shipping Services</h2>
                <nav>
                  <ol className="breadcrumb">
                    <li><a href="/">Home</a></li>
                    <li><a href="/services">Services</a></li>
                    <li className="active">Container Shipping</li>
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
                    src="/services/services-container.jpg" 
                    alt="Container Shipping Services" 
                    width={800} 
                    height={400}
                  />
                </div>
                <h3 className="mb-30">Reliable Container Shipping Solutions</h3>
                <p>
                  Our container shipping services provide cost-effective solutions for large volume shipments via sea freight. We handle Full Container Load (FCL) and Less than Container Load (LCL) shipments with complete tracking and documentation support.
                </p>
                <p>
                  We offer various container sizes including 20ft and 40ft standard containers, high cube containers, and specialized containers for specific cargo types. Our global network ensures reliable connections to major ports worldwide.
                </p>
                
                <div className="feature-item mb-30">
                  <div className="feature-icon">
                    <i className="fas fa-ship"></i>
                  </div>
                  <div className="feature-content">
                    <h5>Global Shipping Network</h5>
                    <p>Connections to major ports worldwide with reliable shipping lines</p>
                  </div>
                </div>
                
                <div className="feature-item mb-30">
                  <div className="feature-icon">
                    <i className="fas fa-dollar-sign"></i>
                  </div>
                  <div className="feature-content">
                    <h5>Cost-Effective Solutions</h5>
                    <p>Competitive rates for both FCL and LCL shipments</p>
                  </div>
                </div>
                
                <div className="services-features mt-50">
                  <h4 className="mb-30">Service Features</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <ul className="services-list">
                        <li><i className="fas fa-check"></i> FCL & LCL shipping services</li>
                        <li><i className="fas fa-check"></i> Port-to-port and door-to-door</li>
                        <li><i className="fas fa-check"></i> Real-time container tracking</li>
                        <li><i className="fas fa-check"></i> Complete documentation support</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="services-list">
                        <li><i className="fas fa-check"></i> Customs clearance assistance</li>
                        <li><i className="fas fa-check"></i> Marine cargo insurance</li>
                        <li><i className="fas fa-check"></i> Warehousing and storage</li>
                        <li><i className="fas fa-check"></i> Competitive shipping rates</li>
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
                    <li><a href="/services/container" className="active">Container Shipping</a></li>
                    <li><a href="/services/parcel">Parcel Delivery</a></li>
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