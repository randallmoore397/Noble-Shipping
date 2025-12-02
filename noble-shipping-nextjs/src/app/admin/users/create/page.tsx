'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema, type UserFormData } from '@/lib/validations'
import { AdminPageHeader } from '@/components/admin/AdminPageHeader'
import { FormSection, FormField } from '@/components/admin/FormSection'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { showSuccess, showError } from '@/components/ui/Toast'
import { ArrowLeft, UserPlus } from 'lucide-react'

export default function CreateUser() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      roles: 'Staff',
      gender: 'Male',
      position: 'Staff'
    }
  })

  const onSubmit = async (data: UserFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        showSuccess('User account created successfully')
        router.push('/admin/users/list')
      } else {
        showError('Error creating user account')
      }
    } catch (error) {
      showError('Error creating user account')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Create User Account"
        description="Add a new user account to the system"
        gradient="from-red-600 via-red-500 to-red-700 dark:from-red-800 dark:via-red-700 dark:to-red-900"
      >
        <Button variant="outline" className="shadow-lg hover:shadow-xl transition-all duration-200 bg-red-800 text-white border-red-700 hover:bg-red-900" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
      </AdminPageHeader>

      <Card className="w-full max-w-4xl shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-800 dark:to-blue-900/10">
        <CardContent className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormSection title="Account Information" description="Basic login credentials">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Email" required error={errors.email?.message}>
              <Input type="email" {...register('email')} />
            </FormField>
            <FormField label="Password" required error={errors.password?.message}>
              <Input type="password" {...register('password')} />
            </FormField>
          </div>
        </FormSection>

        <FormSection title="Personal Information" description="User's personal details">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField label="First Name" required error={errors.first_name?.message}>
              <Input {...register('first_name')} />
            </FormField>
            <FormField label="Middle Name" error={errors.middle_name?.message}>
              <Input {...register('middle_name')} />
            </FormField>
            <FormField label="Last Name" required error={errors.last_name?.message}>
              <Input {...register('last_name')} />
            </FormField>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Gender" error={errors.gender?.message}>
              <Select onValueChange={(value) => setValue('gender', value)} defaultValue="Male">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Mobile" error={errors.mobile?.message}>
              <Input {...register('mobile')} />
            </FormField>
          </div>

          <FormField label="Address" error={errors.address?.message}>
            <Textarea {...register('address')} rows={3} />
          </FormField>
        </FormSection>

        <FormSection title="Role & Position" description="User's role and position in the organization">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Position" error={errors.position?.message}>
              <Input {...register('position')} />
            </FormField>
            <FormField label="Roles" error={errors.roles?.message}>
              <Input {...register('roles')} placeholder="Admin,Staff" />
            </FormField>
          </div>
        </FormSection>

            <div className="flex items-center space-x-4 pt-6">
              <Button type="submit" disabled={isSubmitting} size="lg" className="shadow-lg hover:shadow-xl transition-all duration-200">
                <UserPlus className="mr-2 h-4 w-4" />
                {isSubmitting ? 'Creating...' : 'Create User'}
              </Button>
              <Button type="button" variant="outline" size="lg" onClick={() => router.back()}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}