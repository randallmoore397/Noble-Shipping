'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'

interface ResetPasswordFormData {
  email: string
  password: string
  confirmPassword: string
}

export default function ResetPassword() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, watch } = useForm<ResetPasswordFormData>()
  const password = watch('password')

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (data.password !== data.confirmPassword) {
      alert('Passwords do not match')
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/admin/users/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          email: data.email,
          password: data.password
        })
      })

      if (response.ok) {
        alert('Password reset successfully')
        router.push('/admin/users/list')
      } else {
        alert('Error resetting password')
      }
    } catch (error) {
      alert('Error resetting password')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Reset User Password</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-3">
                  <label>Email Address</label>
                  <input type="email" className="form-control" {...register('email')} required />
                </div>

                <div className="form-group mb-3">
                  <label>New Password</label>
                  <input type="password" className="form-control" {...register('password')} required />
                </div>

                <div className="form-group mb-3">
                  <label>Confirm Password</label>
                  <input type="password" className="form-control" {...register('confirmPassword')} required />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Resetting...' : 'Reset Password'}
                  </button>
                  <button type="button" className="btn btn-secondary ms-2" onClick={() => router.back()}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}