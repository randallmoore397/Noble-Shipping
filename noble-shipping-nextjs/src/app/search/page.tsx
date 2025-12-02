'use client'

import { useSearchParams } from 'next/navigation'
import MainLayout from '@/components/layouts/MainLayout'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  return (
    <MainLayout>
      <main>
        <section className="breadcrumb-area" style={{ backgroundImage: 'url(/img/bg/breadcrumb_bg.jpg)' }}>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="breadcrumb-content text-center">
                  <h2>Search Results</h2>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-115 pb-120">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h3>Search Results for: "{query}"</h3>
                <p>Search functionality is under development.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  )
}