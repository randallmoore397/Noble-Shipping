'use client'

import MainLayout from '@/components/layouts/MainLayout'
import Link from 'next/link'

export default function ServicesPage() {
  return (
    <MainLayout>
      <style jsx>{`
        .li-styles {
          background-color: white !important;
        }
        
        .services-blockquote {
          background: #fff !important;
        }
      `}</style>

      {/* Services Details Area */}
      <div className="services-details-area pt-120 pb-115" style={{ backgroundColor: 'ghostwhite' }}>
        <div className="container">
          <div className="services-details-wrap">
            <div className="row">
              <div className="col-lg-4 order-2 order-lg-0">
                <aside className="services-sidebar">
                  <div className="services-widget mb-40">
                    <div className="service-widget-title">
                      <h3>Service Category</h3>
                    </div>
                    <div className="service-cat-list">
                      <ul>
                        <li className="active li-styles"><Link href="/services">All Services</Link></li>
                        <li className="li-styles"><Link href="/services/aircargo">AirCargo Tracking</Link></li>
                        <li className="li-styles"><Link href="/services/container">Container Tracking</Link></li>
                        <li className="li-styles"><Link href="/services/parcel">Parcel Tracking</Link></li>
                        <li className="li-styles"><Link href="/services/security-guard">Provision of Security guard</Link></li>
                        <li className="li-styles"><Link href="/services/logistics">Safekeeping of goods & logistics</Link></li>
                        <li className="li-styles"><Link href="/services/bullion-vault">Provision of bullion Vault</Link></li>
                      </ul>
                    </div>
                  </div>
                  <div className="services-widget mb-40">
                    <div className="service-doc-list">
                      <ul>
                        <li><Link href="#">Noble Shipping Company Listing <i className="fas fa-file-pdf"></i></Link></li>
                      </ul>
                    </div>
                  </div>
                  <div className="services-widget mb-40">
                    <div className="service-sidebar-support">
                      <h3>Need Support?</h3>
                      <p>Express delivery is an innovative service is effective logies</p>
                      <Link href="/contact" className="btn">contact Us</Link>
                    </div>
                  </div>
                  <div className="services-widget">
                    <div className="service-widget-title dark-bg">
                      <h3>Tags Post</h3>
                    </div>
                    <div className="service-tag-list">
                      <ul>
                        <li className="li-styles"><Link href="#">Aircargo Tracking</Link></li>
                        <li className="li-styles"><Link href="#">Parcel Tracking</Link></li>
                        <li className="li-styles"><Link href="#">Container Tracking</Link></li>
                        <li className="li-styles"><Link href="#">Cargo Insurance</Link></li>
                        <li className="li-styles"><Link href="#">Security Guard</Link></li>
                        <li className="li-styles"><Link href="#">Goods and Logistics</Link></li>
                        <li className="li-styles"><Link href="#">Bullion Vault</Link></li>
                        <li className="li-styles"><Link href="#">Delivery</Link></li>
                        <li className="li-styles"><Link href="#">Warehouse</Link></li>
                      </ul>
                    </div>
                  </div>
                </aside>
              </div>
              <div className="col-lg-8">
                <div className="services-details-content">
                  <h4>Was Our Solution is The Best?</h4>
                  <p>At Noble Services, we are dedicated to delivering solutions that not only meet but exceed our clients' expectations. Our comprehensive approach to logistics and security ensures that we provide the best possible service for
                    each unique situation. We continuously evaluate and refine our methods to ensure that our solutions remain at the forefront of industry standards.</p>

                  <div className="services-details-img">
                    <img src="/services/our-services.jpg" alt="img" />
                  </div>
                  <h4>Our Solutions Stand Out Because:</h4>
                  <div className="services-details-list">
                    <ul>
                      <li><i className="fas fa-arrow-alt-circle-right"></i>Tailored Services: We customize our logistics and security solutions to fit the specific needs of each client, whether it's handling air cargo, container shipments, or providing
                        top-notch security.</li>
                      <li><i className="fas fa-arrow-alt-circle-right"></i>Advanced Technology: Our use of cutting-edge technology in tracking systems and security measures ensures accuracy, efficiency, and real-time updates, providing clients with
                        unparalleled visibility and control.</li>
                      <li><i className="fas fa-arrow-alt-circle-right"></i>Experienced Team: Our team of experts brings years of experience to the table, offering professional and knowledgeable support to handle all aspects of logistics and security.</li>
                      <li><i className="fas fa-arrow-alt-circle-right"></i>Comprehensive Security: From on-site security guards to high-security bullion vaults, our security services are designed to protect valuable assets and ensure peace of mind
                        for our clients.</li>
                      <li><i className="fas fa-arrow-alt-circle-right"></i>Help transportation and logistics companies</li>
                    </ul>
                  </div>

                  <br />
                  <h4>Why Our Clients Believe in Our Solutions:</h4>
                  <div className="services-details-list">
                    <ul>
                      <li><i className="fas fa-arrow-alt-circle-right"></i>Reliability: Clients consistently report high levels of satisfaction with our reliable and timely service, which is crucial for maintaining smooth operations and minimizing
                        disruptions.
                      </li>
                      <li><i className="fas fa-arrow-alt-circle-right"></i>Efficiency: Our streamlined processes and effective management strategies contribute to faster turnaround times and more efficient handling of shipments and security needs.</li>
                      <li><i className="fas fa-arrow-alt-circle-right"></i>Customer Support: We pride ourselves on providing exceptional customer service, with a dedicated support team available to address any concerns or questions promptly and
                        effectively.
                      </li>
                      <li><i className="fas fa-arrow-alt-circle-right"></i>Proven Results: Our track record of successful projects and satisfied customers demonstrates the effectiveness of our solutions, reinforcing our commitment to delivering
                        the best possible outcomes.</li>
                      <li><i className="fas fa-arrow-alt-circle-right"></i>Help transportation and logistics companies</li>
                    </ul>
                  </div>

                  <blockquote>
                    By continuously improving and adapting our services, Noble Services remains committed to providing solutions that are not only effective but also align with the evolving needs of our clients. Our focus on excellence ensures that we remain the preferred
                    choice for logistics and security solutions
                  </blockquote>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}