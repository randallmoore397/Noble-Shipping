import MainLayout from '@/components/layouts/MainLayout'
import Image from 'next/image'

export default function LogisticsServicesPage() {
  return (
    <MainLayout>
      <section className="breadcrumb-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumb-content text-center">
                <h2>Logistics & Warehousing Services</h2>
                <nav>
                  <ol className="breadcrumb">
                    <li><a href="/">Home</a></li>
                    <li><a href="/services">Services</a></li>
                    <li className="active">Logistics</li>
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
                    src="/services/logistics.avif" 
                    alt="Logistics Services" 
                    width={800} 
                    height={400}
                  />
                </div>
                <h3 className="mb-30">Complete Logistics & Warehousing Solutions</h3>
                <p>
                  Our comprehensive logistics and warehousing services provide end-to-end supply chain management solutions. From inventory management to distribution, we handle all aspects of your logistics needs with precision and efficiency.
                </p>
                <p>
                  We operate state-of-the-art warehouse facilities with advanced inventory management systems, climate-controlled storage, and 24/7 security monitoring. Our logistics experts optimize your supply chain for maximum efficiency and cost savings.
                </p>
                
                <div className="feature-item mb-30">
                  <div className="feature-icon">
                    <i className="fas fa-warehouse"></i>
                  </div>
                  <div className="feature-content">
                    <h5>Modern Warehouse Facilities</h5>
                    <p>State-of-the-art storage facilities with advanced security and climate control</p>
                  </div>
                </div>
                
                <div className="feature-item mb-30">
                  <div className="feature-icon">
                    <i className="fas fa-chart-line"></i>
                  </div>
                  <div className="feature-content">
                    <h5>Supply Chain Optimization</h5>
                    <p>Advanced analytics and optimization for efficient supply chain management</p>
                  </div>
                </div>
                
                <div className="services-features mt-50">
                  <h4 className="mb-30">Logistics Solutions</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <ul className="services-list">
                        <li><i className="fas fa-check"></i> Advanced inventory management</li>
                        <li><i className="fas fa-check"></i> Automated order fulfillment</li>
                        <li><i className="fas fa-check"></i> Multi-channel distribution</li>
                        <li><i className="fas fa-check"></i> Supply chain optimization</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="services-list">
                        <li><i className="fas fa-check"></i> Secure warehouse storage</li>
                        <li><i className="fas fa-check"></i> Cross-docking services</li>
                        <li><i className="fas fa-check"></i> Pick, pack, and ship</li>
                        <li><i className="fas fa-check"></i> Real-time inventory tracking</li>
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
                    <li><a href="/services/parcel">Parcel Delivery</a></li>
                    <li><a href="/services/security-guard">Security Services</a></li>
                    <li><a href="/services/logistics" className="active">Logistics</a></li>
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