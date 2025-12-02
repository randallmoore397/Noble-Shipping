'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

interface PasswordFormData {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export default function ChangePasswordPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit, watch, formState: { errors } } = useForm<PasswordFormData>();
  const newPassword = watch('new_password');

  const onSubmit = async (data: PasswordFormData) => {
    if (data.new_password !== data.confirm_password) {
      setError('New passwords do not match');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/admin/profile/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          current_password: data.current_password,
          new_password: data.new_password
        })
      });

      const result = await response.json();

      if (response.ok) {
        alert('Password changed successfully');
        router.push('/admin/profile');
      } else {
        setError(result.error || 'Error changing password');
      }
    } catch (error) {
      setError('Error changing password');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6 offset-lg-3">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Change Password</h4>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-3">
                  <label>Current Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    {...register('current_password', { required: 'Current password is required' })}
                  />
                  {errors.current_password && (
                    <div className="text-danger">{errors.current_password.message}</div>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label>New Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    {...register('new_password', { 
                      required: 'New password is required',
                      minLength: { value: 6, message: 'Password must be at least 6 characters' }
                    })}
                  />
                  {errors.new_password && (
                    <div className="text-danger">{errors.new_password.message}</div>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label>Confirm New Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    {...register('confirm_password', { 
                      required: 'Please confirm your new password',
                      validate: value => value === newPassword || 'Passwords do not match'
                    })}
                  />
                  {errors.confirm_password && (
                    <div className="text-danger">{errors.confirm_password.message}</div>
                  )}
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Changing...' : 'Change Password'}
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
  );
}