'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { loginSchema, LoginFormData } from '@/lib/validations'
import Swal from 'sweetalert2'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })

  // Set body background color for login page
  useEffect(() => {
    document.body.style.background = '#f6f9ff'
    return () => {
      document.body.style.background = ''
    }
  }, [])

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true)
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false
      })

      if (result?.error) {
        Swal.fire({
          title: 'Login Failed',
          text: 'Invalid email or password',
          icon: 'error',
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        })
      } else {
        Swal.fire({
          title: 'Success!',
          text: 'Login successful',
          icon: 'success',
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true
        })
        router.push('/admin/dashboard')
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'An error occurred. Please try again.',
        icon: 'error',
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <style jsx global>{`
        .swal2-title {
          color: #0e0e23 !important;
        }
      `}</style>

      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">

                  <div className="d-flex justify-content-center py-4">
                    <Link href="/" className="log d-flex align-items-center w-auto">
                      <img src="/img/Noble-Shipping-logo-1.png" alt="logo" style={{ width: '130px' }} />
                    </Link>
                  </div>

                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">Authentication</h5>
                        <p className="text-center small">Enter your username & password</p>
                      </div>

                      <form onSubmit={handleSubmit(onSubmit)} className="row g-3 needs-validation" noValidate>
                        <div className="col-12">
                          <label htmlFor="email" className="form-label">Email</label>
                          <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend" style={{ borderTopRightRadius: 'unset', borderBottomRightRadius: 'unset' }}>
                              <i className="fa fa-user"></i>
                            </span>
                            <input
                              {...register('email')}
                              type="email"
                              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                              id="email"
                              placeholder="Username"
                              required
                            />
                            {errors.email && (
                              <div className="invalid-feedback">
                                {errors.email.message}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-12">
                          <label htmlFor="password" className="form-label">Password</label>
                          <div className="input-group has-validation">
                            <span className="input-group-text" id="inputGroupPrepend" style={{ borderTopRightRadius: 'unset', borderBottomRightRadius: 'unset' }}>
                              <i className="fa fa-lock"></i>
                            </span>
                            <input
                              {...register('password')}
                              type="password"
                              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                              id="password"
                              placeholder="Password"
                              required
                            />
                            {errors.password && (
                              <div className="invalid-feedback">
                                {errors.password.message}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-12">
                          <div className="form-check">
                            <input
                              {...register('remember')}
                              className="form-check-input"
                              type="checkbox"
                              name="remember"
                              value="true"
                              id="rememberMe"
                            />
                            <label className="form-check-label" htmlFor="rememberMe">
                              Remember me
                            </label>
                          </div>
                        </div>

                        <div className="col-12">
                          <button
                            className="btn btn-primary w-100"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'Logging in...' : 'Login'}
                          </button>
                        </div>

                        <div className="col-12">
                          <p className="small mb-0">
                            Don&apos;t have account? <Link href="/">Return to Home Page</Link>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Link href="#" className="back-to-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short"></i>
      </Link>
    </>
  )
}