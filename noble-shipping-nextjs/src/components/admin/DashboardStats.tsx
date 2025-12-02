'use client'

interface DashboardStatsProps {
    title: string
    subtitle: string
    count: number
    icon: string
    percentage: string
    trend: 'increase' | 'decrease'
}

export default function DashboardStats({
    title,
    subtitle,
    count,
    icon,
    percentage,
    trend
}: DashboardStatsProps) {
    return (
        <>
            <div className="filter">
                <a className="icon" href="#" data-bs-toggle="dropdown">
                    <i className="bi bi-three-dots"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li className="dropdown-header text-start">
                        <h6>Filter</h6>
                    </li>
                    <li><a className="dropdown-item" href="#">Today</a></li>
                    <li><a className="dropdown-item" href="#">This Month</a></li>
                    <li><a className="dropdown-item" href="#">This Year</a></li>
                </ul>
            </div>

            <div className="card-body">
                <h5 className="card-title">{title} <span>| {subtitle}</span></h5>

                <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i className={icon}></i>
                    </div>
                    <div className="ps-3">
                        <h6>{count}</h6>
                        <span className={`${trend === 'increase' ? 'text-success' : 'text-danger'} small pt-1 fw-bold`}>
                            {percentage}
                        </span>{' '}
                        <span className="text-muted small pt-2 ps-1">{trend}</span>
                    </div>
                </div>
            </div>
        </>
    )
}
