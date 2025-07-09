'use client'
import { useState } from 'react'
import { validateTeacherForm } from '@/utils/formValidation'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

export default function CreateTeacherPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    phone: '',
    birthDate: '',
    role: '',
    address: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validateTeacherForm(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const newTeacher = { id: uuidv4(), ...form }
    const stored = localStorage.getItem('teachers')
    const current = stored ? JSON.parse(stored) : []
    const updated = [...current, newTeacher]
    localStorage.setItem('teachers', JSON.stringify(updated))

    toast.success('Teacher created!')
    router.push('/teachers')
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Create Teacher</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name (at least 3 words)" onChange={handleChange} className="w-full border p-2 rounded" />
        {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}

        <input name="email" placeholder="Email" onChange={handleChange} className="w-full border p-2 rounded" />
        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}

        <input name="subject" placeholder="Subject" onChange={handleChange} className="w-full border p-2 rounded" />
        {errors.subject && <p className="text-sm text-red-600">{errors.subject}</p>}

        <input name="phone" placeholder="Phone (10 digits)" onChange={handleChange} className="w-full border p-2 rounded" />
        {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}

        <input type="date" name="birthDate" placeholder="Birth Date" onChange={handleChange} className="w-full border p-2 rounded" />
        {errors.birthDate && <p className="text-sm text-red-600">{errors.birthDate}</p>}

        <select name="role" onChange={handleChange} className="w-full border p-2 rounded">
          <option value="">Select Role</option>
          <option value="Teacher">Teacher</option>
          <option value="Assistant">Assistant</option>
          <option value="Coordinator">Coordinator</option>
        </select>
        {errors.role && <p className="text-sm text-red-600">{errors.role}</p>}

        <input name="address" placeholder="Address" onChange={handleChange} className="w-full border p-2 rounded" />

        <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  )
}
