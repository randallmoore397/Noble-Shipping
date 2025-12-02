'use client'

import React from 'react'
import Link from 'next/link'

interface TrackingHistoryItem {
    id: number
    status: string
    location: string
    timestamp: string
    remarks?: string
    current_carrier?: string
}

interface TrackingData {
    id: number
    tracking_number: string
    status: string
    origin: string
    destination: string
    last_location: string
    weight: string
    dimensions: string
    departure_date?: string
    arrival_date?: string
    sender_name?: string
    sender_contact?: string
    receiver_name?: string
    receiver_contact?: string
    contents_description?: string
    value?: string
    insurance?: string
    payment_status?: string
    history: TrackingHistoryItem[]
    [key: string]: any
}

interface Props {
    type: 'aircargo' | 'container' | 'parcel'
    data: TrackingData
}

export default function TrackingResult({ type, data }: Props) {
    const getTitle = () => {
        switch (type) {
            case 'aircargo': return 'Aircargo Tracking Results'
            case 'container': return 'Container Tracking Results'
            case 'parcel': return 'Parcel Tracking Results'
            default: return 'Tracking Results'
        }
    }

    return (
        <main>
            <section className="breadcrumb-area" style={{ backgroundImage: 'url(/img/bg/breadcrumb_bg.jpg)' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="breadcrumb-content text-center">
                                <h2>{getTitle()}</h2>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link href="/">Home</Link></li>
                                        <li className="breadcrumb-item active">{getTitle()}</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="tracking-results-area pt-120 pb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="tracking-results-wrap">
                                <div className="tracking-header">
                                    <h3>Tracking Number: {data.tracking_number}</h3>
                                    <div className="status-badge">
                                        <span className={`badge ${data.status === 'Delivered' ? 'badge-success' : 'badge-primary'}`}>
                                            {data.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="tracking-details">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="detail-item">
                                                <strong>Origin:</strong> {data.origin}
                                            </div>
                                            <div className="detail-item">
                                                <strong>Destination:</strong> {data.destination}
                                            </div>
                                            <div className="detail-item">
                                                <strong>Current Location:</strong> {data.last_location}
                                            </div>
                                            {data.reference_number && (
                                                <div className="detail-item">
                                                    <strong>Reference Number:</strong> {data.reference_number}
                                                </div>
                                            )}
                                            {data.airway_bill_number && (
                                                <div className="detail-item">
                                                    <strong>Airway Bill:</strong> {data.airway_bill_number}
                                                </div>
                                            )}
                                        </div>
                                        <div className="col-md-6">
                                            <div className="detail-item">
                                                <strong>Weight:</strong> {data.weight}
                                            </div>
                                            <div className="detail-item">
                                                <strong>Dimensions:</strong> {data.dimensions}
                                            </div>
                                            <div className="detail-item">
                                                <strong>Departure:</strong> {data.departure_date ? new Date(data.departure_date).toLocaleDateString() : 'N/A'}
                                            </div>
                                            <div className="detail-item">
                                                <strong>Arrival:</strong> {data.arrival_date ? new Date(data.arrival_date).toLocaleDateString() : 'N/A'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="tracking-timeline">
                                    <h4>Tracking History</h4>
                                    <div className="timeline">
                                        {data.history && data.history.length > 0 ? (
                                            data.history.map((item, index) => (
                                                <div key={item.id} className={`timeline-item ${index === 0 ? 'active' : ''}`}>
                                                    <div className="timeline-marker"></div>
                                                    <div className="timeline-content">
                                                        <h5>{item.status}</h5>
                                                        <p>{item.location}</p>
                                                        <small>{new Date(item.timestamp).toLocaleString()}</small>
                                                        {item.remarks && <p><strong>Remarks:</strong> {item.remarks}</p>}
                                                        {item.current_carrier && <p><strong>Carrier:</strong> {item.current_carrier}</p>}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No history available</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="tracking-sidebar">
                                <div className="sidebar-widget">
                                    <h4>Shipment Details</h4>
                                    <ul className="detail-list">
                                        <li><strong>Contents:</strong> {data.contents_description}</li>
                                        <li><strong>Value:</strong> {data.value}</li>
                                        <li><strong>Insurance:</strong> {data.insurance}</li>
                                        {data.payment_status && <li><strong>Payment Status:</strong> {data.payment_status}</li>}
                                        {data.current_carrier && <li><strong>Current Carrier:</strong> {data.current_carrier}</li>}
                                    </ul>
                                </div>

                                <div className="sidebar-widget">
                                    <h4>Contact Information</h4>
                                    <ul className="detail-list">
                                        <li><strong>Sender:</strong> {data.sender_name}</li>
                                        <li><strong>Sender Contact:</strong> {data.sender_contact}</li>
                                        <li><strong>Receiver:</strong> {data.receiver_name}</li>
                                        <li><strong>Receiver Contact:</strong> {data.receiver_contact}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
