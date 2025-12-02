import MainLayout from '@/components/layouts/MainLayout'
import Image from 'next/image'

export default function SecurityGuardServicesPage() {
  return (
    <MainLayout>
      <section className="breadcrumb-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumb-content text-center">
                <h2>Security Guard Services</h2>
                <nav>
                  <ol className="breadcrumb">
                    <li><a href="/">Home</a></li>
                    <li><a href="/services">Services</a></li>
                    <li className="active">Security Guard</li>
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
                    src="/img/images/security-guard.avif" 
                    alt="Security Guard Services" 
                    width={800} 
                    height={400}
                  />
                </div>
                <h3 className="mb-30">Professional Security Guard Services</h3>
                <p>
                  Our professional security guard services provide comprehensive protection for businesses, events, and residential properties. Our highly trained security personnel ensure the safety and security of your assets, property, and people.
                </p>
                <p>
                  We offer customized security solutions tailored to your specific needs, from corporate security to event protection. Our guards are licensed, bonded, and equipped with the latest security technology.
                </p>
                
                <div className="feature-item mb-30">
                  <div className="feature-icon">
                    <i className="fas fa-user-shield"></i>
                  </div>
                  <div className="feature-content">
                    <h5>Trained Security Personnel</h5>
                    <p>Licensed and certified security guards with extensive training and experience</p>
                  </div>
                </div>
                
                <div className="feature-item mb-30">
                  <div className="feature-icon">
                    <i className="fas fa-eye"></i>
                  </div>
                  <div className="feature-content">
                    <h5>24/7 Surveillance</h5>
                    <p>Round-the-clock monitoring and protection services</p>
                  </div>
                </div>
                
                <div className="services-features mt-50">
                  <h4 className="mb-30">Security Solutions</h4>
                  <div className="row">
                    <div className="col-md-6">
                      <ul className="services-list">
                        <li><i className="fas fa-check"></i> Armed security personnel</li>
                        <li><i className="fas fa-check"></i> Unarmed security officers</li>
                        <li><i className="fas fa-check"></i> Mobile patrol services</li>
                        <li><i className="fas fa-check"></i> Special event security</li>
                      </ul>
                    </div>
                    <div className="col-md-6">
                      <ul className="services-list">
                        <li><i className="fas fa-check"></i> Access control management</li>
                        <li><i className="fas fa-check"></i> CCTV surveillance monitoring</li>
                        <li><i className="fas fa-check"></i> Emergency alarm response</li>
                        <li><i className="fas fa-check"></i> 24/7 security protection</li>
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
                    <li><a href="/services/security-guard" className="active">Security Services</a></li>
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