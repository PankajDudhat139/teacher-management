export interface Teacher {
  id: string
  avatarUrl: string
  name: string
  subject: string
  email: string
  phone: string
  address?: string
  birthDate?: string
  role?: string
  qualifications?: { name: string; rate: number }[]
}