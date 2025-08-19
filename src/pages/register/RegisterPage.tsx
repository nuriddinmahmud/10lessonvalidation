import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import type { IData, IFormData } from '../../types/types'
import { useUser } from '../../hooks/useUser'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../redux'
import { udpatingValues } from '../../redux/features/user'

const schema = yup.object({
  id: yup.string().optional(),
  fullName: yup.string().required('Ismingizni kiriting'),
  username: yup.string().required("Username'ingizni kiriting"),
  email: yup.string().email("To'g'ri email kiriting").required("Email'ingizni kiriting"),
  phoneNumber: yup.string().required("Telefon raqamingizni kiriting"),
  password: yup.string().required("Parolingizni kiriting"),
  gender: yup
    .mixed<'male' | 'female' | 'prefer not to say'>()
    .oneOf(['male', 'female', 'prefer not to say'], 'Jinsingizni tanlang')
    .required('Jinsingizni tanlang'),
}).required()

const Register: React.FC = () => {
  const { createUser, updateUser } = useUser()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user.value)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      id: '',
      fullName: '',
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
      gender: 'prefer not to say',
    },
  })

  const [serverError, setServerError] = useState<string | null>(null)
  const [serverOk, setServerOk] = useState<string | null>(null)

  useEffect(() => {
    if (user) {
      reset({
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
        password: user.password,
        gender: (user.gender as IFormData['gender']) || 'prefer not to say',
      })
    } else {
      reset({
        id: '',
        fullName: '',
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        gender: 'prefer not to say',
      })
    }
  }, [user, reset])

  const clearForm = () =>
    reset({
      id: '',
      fullName: '',
      username: '',
      email: '',
      phoneNumber: '',
      password: '',
      gender: 'prefer not to say',
    })

  const onSubmit = (formData: IFormData) => {
    setServerError(null)
    setServerOk(null)

    const { id, ...rest } = formData
    const payload: IData = id ? { id, ...rest } : { ...rest }

    if (user) {
      updateUser.mutate(
        { id: user.id || '', data: payload },
        {
          onSuccess: () => {
            setServerOk('Updated successfully')
            navigate('/users')
            dispatch(udpatingValues(null))
            clearForm()
          },
          onError: (e: any) =>
            setServerError(e?.response?.data?.message || e?.message || 'Update failed'),
        }
      )
    } else {
      createUser.mutate(payload, {
        onSuccess: () => {
          setServerOk('Registered successfully')
          navigate('/users')
          clearForm()
        },
        onError: (e: any) =>
          setServerError(e?.response?.data?.message || e?.message || 'Registration failed'),
      })
    }
  }

  const isSubmitting = createUser.isPending || updateUser.isPending

  return (
    <div className="min-h-[94vh] flex items-center justify-center p-6
                    bg-gradient-to-br from-[#AC4D39] to-[#CCAA66] dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <h2 className="text-2xl font-bold text-center text-[#AC4D39] dark:text-[#CCAA66]">
            {user ? 'Update User' : 'Registration'}
          </h2>

          {serverError && (
            <div className="px-3 py-2 text-sm rounded-md border border-red-300 bg-red-50 text-red-700">
              {serverError}
            </div>
          )}
          {serverOk && (
            <div className="px-3 py-2 text-sm rounded-md border border-green-300 bg-green-50 text-green-700">
              {serverOk}
            </div>
          )}

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="font-medium text-gray-700 dark:text-gray-200">Full Name</label>
            <input
              id="fullName"
              type="text"
              placeholder="Enter your name"
              {...register('fullName')}
              className={`mt-1 w-full px-3 py-2 border-2 rounded-md placeholder:font-medium 
              ${errors.fullName ? 'border-red-500' : 'border-[#CCAA66]'} 
              focus:outline-none focus:border-[#AC4D39]`}
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="font-medium text-gray-700 dark:text-gray-200">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              {...register('username')}
              className={`mt-1 w-full px-3 py-2 border-2 rounded-md placeholder:font-medium 
              ${errors.username ? 'border-red-500' : 'border-[#CCAA66]'} 
              focus:outline-none focus:border-[#AC4D39]`}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="font-medium text-gray-700 dark:text-gray-200">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email')}
              className={`mt-1 w-full px-3 py-2 border-2 rounded-md placeholder:font-medium 
              ${errors.email ? 'border-red-500' : 'border-[#CCAA66]'} 
              focus:outline-none focus:border-[#AC4D39]`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="font-medium text-gray-700 dark:text-gray-200">Phone Number</label>
            <input
              id="phoneNumber"
              type="text"
              placeholder="Enter your number"
              {...register('phoneNumber')}
              className={`mt-1 w-full px-3 py-2 border-2 rounded-md placeholder:font-medium 
              ${errors.phoneNumber ? 'border-red-500' : 'border-[#CCAA66]'} 
              focus:outline-none focus:border-[#AC4D39]`}
            />
            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="font-medium text-gray-700 dark:text-gray-200">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register('password')}
              className={`mt-1 w-full px-3 py-2 border-2 rounded-md placeholder:font-medium 
              ${errors.password ? 'border-red-500' : 'border-[#CCAA66]'} 
              focus:outline-none focus:border-[#AC4D39]`}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Gender */}
          <div>
            <p className="font-medium text-gray-700 dark:text-gray-200 mb-2">Gender</p>
            <div className="flex items-center gap-6">
              <label htmlFor="gender-male" className="flex items-center gap-2">
                <input
                  id="gender-male"
                  type="radio"
                  value="male"
                  {...register('gender')}
                />
                <span className="text-gray-700 dark:text-gray-200">Male</span>
              </label>
              <label htmlFor="gender-female" className="flex items-center gap-2">
                <input
                  id="gender-female"
                  type="radio"
                  value="female"
                  {...register('gender')}
                />
                <span className="text-gray-700 dark:text-gray-200">Female</span>
              </label>
              <label htmlFor="gender-prefer" className="flex items-center gap-2">
                <input
                  id="gender-prefer"
                  type="radio"
                  value="prefer not to say"
                  {...register('gender')}
                />
                <span className="text-gray-700 dark:text-gray-200">Prefer not to say</span>
              </label>
            </div>
            {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message as string}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-md font-bold text-white transition
            bg-gradient-to-r from-[#AC4D39] to-[#CCAA66] hover:opacity-90
            disabled:opacity-60 disabled:cursor-not-allowed
            dark:bg-[#CCAA66] dark:text-gray-900 dark:hover:bg-[#AC4D39] dark:hover:text-white`}
          >
            {isSubmitting ? (user ? 'Updating...' : 'Registering...') : (user ? 'Update' : 'Register')}
          </button>
        </form>
      </div>
    </div>
  )
}

export default React.memo(Register)
