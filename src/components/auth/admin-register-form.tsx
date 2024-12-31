import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axiosInstance from '@/utils/axios-instance';
import { isAxiosError } from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { registerSchema, RegisterFormData } from '@/schemas/auth/admin-schema';

const AdminRegisterForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await axiosInstance.post('/admin/register', data);
      alert(response.data.message);
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        alert(error.response?.data?.error || 'Registration failed');
      } else {
        alert('Registration failed');
      }
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 max-w-md mx-auto"
      >
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" type="text" {...register("fullName")} />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="mobileNumber">Mobile Number</Label>
          <Input id="mobileNumber" type="text" {...register("mobileNumber")} />
          {errors.mobileNumber && (
            <p className="text-red-500 text-sm">
              {errors.mobileNumber.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="accessTo">Access To</Label>
          <Input id="accessTo" type="text" {...register("accessTo")} />
          {errors.accessTo && (
            <p className="text-red-500 text-sm">{errors.accessTo.message}</p>
          )}
        </div>

        <Button type="submit">Register</Button>
      </form>
    </>
  );
};

export default AdminRegisterForm;
