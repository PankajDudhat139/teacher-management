'use client'
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { validateTeacherForm } from '@/utils/formValidation'
import { Teacher } from '@/types/teacher'
import toast from 'react-hot-toast'

export default function EditTeacherPage() {
  const router = useRouter()
  const params = useParams()
  const id = params?.id as string

  const [form, setForm] = useState<Teacher | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const stored = localStorage.getItem('teachers')
    if (stored) {
      const teachers: Teacher[] = JSON.parse(stored)
      const teacher = teachers.find((t) => t.id === id)
      if (teacher) setForm(teacher)
    }
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!form) return
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form) return

    const validationErrors = validateTeacherForm(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    const stored = localStorage.getItem('teachers')
    const teachers = stored ? JSON.parse(stored) : []
    const updated = teachers.map((t: Teacher) => (t.id === id ? form : t))
    localStorage.setItem('teachers', JSON.stringify(updated))

    toast.success('Teacher updated!')
    router.push('/teachers')
  }

  if (!form) return <p>Loading...</p>

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Edit Teacher</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name (at least 3 words)" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" />
        {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}

        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border p-2 rounded" />
        {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}

        <input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} className="w-full border p-2 rounded" />
        {errors.subject && <p className="text-sm text-red-600">{errors.subject}</p>}

        <input name="phone" placeholder="Phone (10 digits)" value={form.phone} onChange={handleChange} className="w-full border p-2 rounded" />
        {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}

        <input type="date" name="birthDate" value={form.birthDate || ''} onChange={handleChange} className="w-full border p-2 rounded" />
        {errors.birthDate && <p className="text-sm text-red-600">{errors.birthDate}</p>}

        <select name="role" value={form.role || ''} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="">Select Role</option>
          <option value="Teacher">Teacher</option>
          <option value="Assistant">Assistant</option>
          <option value="Coordinator">Coordinator</option>
        </select>
        {errors.role && <p className="text-sm text-red-600">{errors.role}</p>}

        <input name="address" placeholder="Address" value={form.address || ''} onChange={handleChange} className="w-full border p-2 rounded" />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Update
        </button>
      </form>
    </div>
  )
}
