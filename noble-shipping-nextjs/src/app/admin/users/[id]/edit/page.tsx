'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { userUpdateSchema, type UserUpdateFormData } from '@/lib/validations';

export default function EditUserPage(props: { params: Promise<{ id: string }> }) {
  const params = use(props.params);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<UserUpdateFormData>({
    resolver: zodResolver(userUpdateSchema)
  });

  useEffect(() => {
    fetch(`/api/admin/users/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setValue('email', data.email);
        setValue('active', data.active);
        setValue('roles', data.roles || '');

        if (data.staff) {
          setValue('first_name', data.staff.first_name || '');
          setValue('middle_name', data.staff.middle_name || '');
          setValue('last_name', data.staff.last_name || '');
          setValue('position', data.staff.position || '');
          setValue('gender', data.staff.gender || '');
          setValue('telephone_phone', data.staff.telephone_phone || '');
          setValue('mobile', data.staff.mobile || '');
          setValue('address', data.staff.address || '');
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id, setValue]);

  const onSubmit = async (data: UserUpdateFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/admin/users/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        router.push('/admin/users/list');
      } else {
        alert('Error updating user');
      }
    } catch (error) {
      alert('Error updating user');
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
              <h4 className="card-title">Edit User</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Email</label>
                      <input type="email" className="form-control" {...register('email')} />
                      {errors.email && <div className="text-danger">{errors.email.message}</div>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Status</label>
                      <select className="form-control" {...register('active', { setValueAs: v => v === 'true' })}>
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>First Name</label>
                      <input type="text" className="form-control" {...register('first_name')} />
                      {errors.first_name && <div className="text-danger">{errors.first_name.message}</div>}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Last Name</label>
                      <input type="text" className="form-control" {...register('last_name')} />
                      {errors.last_name && <div className="text-danger">{errors.last_name.message}</div>}
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Position</label>
                      <input type="text" className="form-control" {...register('position')} />
                    </div>
                  </div>
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
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Phone</label>
                      <input type="tel" className="form-control" {...register('telephone_phone')} />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-3">
                      <label>Mobile</label>
                      <input type="tel" className="form-control" {...register('mobile')} />
                    </div>
                  </div>
                </div>

                <div className="form-group mb-3">
                  <label>Roles (comma-separated)</label>
                  <input type="text" className="form-control" {...register('roles')} placeholder="Admin,Staff" />
                </div>

                <div className="form-group mb-3">
                  <label>Address</label>
                  <textarea className="form-control" rows={3} {...register('address')} />
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Updating...' : 'Update User'}
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