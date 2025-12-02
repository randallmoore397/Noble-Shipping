'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';

interface ProfileFormData {
  first_name: string;
  middle_name?: string;
  last_name: string;
  position?: string;
  gender?: string;
  telephone_phone?: string;
  mobile?: string;
  address?: string;
  address_two?: string;
}

export default function EditProfilePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, setValue } = useForm<ProfileFormData>();

  useEffect(() => {
    if (session?.user?.email) {
      fetch('/api/admin/profile')
        .then(res => res.json())
        .then(data => {
          if (data.staff) {
            Object.keys(data.staff).forEach(key => {
              setValue(key as keyof ProfileFormData, data.staff[key] || '');
            });
          }
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [session, setValue]);

  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        router.push('/admin/profile');
      } else {
        alert('Error updating profile');
      }
    } catch (error) {
      alert('Error updating profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Edit Profile</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>First Name</label>
                      <input type="text" className="form-control" {...register('first_name')} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Middle Name</label>
                      <input type="text" className="form-control" {...register('middle_name')} />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Last Name</label>
                      <input type="text" className="form-control" {...register('last_name')} required />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Position</label>
                      <input type="text" className="form-control" {...register('position')} />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Gender</label>
                      <select className="form-control" {...register('gender')}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Phone</label>
                      <input type="tel" className="form-control" {...register('telephone_phone')} />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Mobile</label>
                      <input type="tel" className="form-control" {...register('mobile')} />
                    </div>
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label>Address</label>
                  <input type="text" className="form-control" {...register('address')} />
                </div>

                <div className="form-group mb-3">
                  <label>Address Line 2</label>
                  <input type="text" className="form-control" {...register('address_two')} />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Updating...' : 'Update Profile'}
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