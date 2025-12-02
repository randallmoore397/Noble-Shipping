import MainLayout from '@/components/layouts/MainLayout'
import Image from 'next/image'

export default function BullionVaultServicesPage() {
  return (
    <MainLayout>
      <section className="breadcrumb-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumb-content text-center">
                <h2>Bullion Vault Services</h2>
                <nav>
                  <ol className="breadcrumb">
                    <li><a href="/">Home</a></li>
                    <li><a href="/services">Services</a></li>
                    <li className="active">Bullion Vault</li>
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
                    src="/img/images/vault.jpg" 
                    alt="Bullion Vault Services" 
                    width={800} 
                    height={400}
                  />
                </div>
                <h3 className="mb-30">Secure Bullion Vault Services</h3>
                <p>
                  Our bullion vault services provide the highest level of security for precious metals, jewelry, and other valuable assets. With state-of-the-art security systems and 24/7 monitoring, your valuables are protected in our secure facilities.
                </p>
                <p>
                  We offer secure storage solutions for gold, silver, platinum, precious stones, important documents, and other high-value items. Our vaults meet international security standards with multiple layers of protection.
                </p>
                
                <div className="feature-item mb-30">
                  <div className="feature-icon">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <div className="feature-content">
                    <h5>Maximum Security</h5>
                    <p>Multi-layered security systems with biometric access and 24/7 monitoring</p>
                  </div>
                </div>
                
                <div className="feature-item mb-30">
                  <div className="feature-icon">
                    <i className="fas fa-gem"></i>
                  </div>
                  <div className="feature-content">
                    <h5>Precious Metals Storage</h5>
                    <p>Specialized storage for gold, silver, platinum, and precious stones</p>
                  </div>
                </div>
                
                <div className="services-features mt-50">
                  <h4 className="mb-30">Vault Features</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <ul className="services-list">
                        <li><i className="fas fa-check"></i> Bank-grade security vaults</li>
                        <li><i className="fas fa-check"></i> 24/7 video surveillance</li>
                        <li><i className="fas fa-check"></i> Climate-controlled environment</li>
                        <li><i className="fas fa-check"></i> Comprehensive insurance coverage</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="services-list">
                        <li><i className="fas fa-check"></i> Biometric access control</li>
                        <li><i className="fas fa-check"></i> Complete audit trails</li>
                        <li><i className="fas fa-check"></i> Private inspection rooms</li>
                        <li><i className="fas fa-check"></i> Confidential client service</li>
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
                    <li><a href="/services/logistics">Logistics</a></li>
                    <li><a href="/services/bullion-vault" className="active">Bullion Vault</a></li>
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