interface TeacherFormData {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  role?: string;
  birthDate?: string;
}

export const validateTeacherForm = (data: TeacherFormData) => {
  const errors: Record<string, string> = {}

  if (!data.name || data.name.trim().split(' ').length < 2) {
    errors.name = 'Full name must be at least 2 words'
  }

  if (!data.email) {
    errors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email format'
  }

  if (!data.phone) {
    errors.phone = 'Phone is required'
  } else if (!/^\d{10}$/.test(data.phone)) {
    errors.phone = 'Phone must be 10 digits'
  }

  if (!data.subject) errors.subject = 'Subject is required'
  if (!data.role) errors.role = 'Role is required'
  if (!data.birthDate) errors.birthDate = 'Birth date is required'

  return errors
}