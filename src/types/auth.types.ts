export interface LoginCredentials {
  email: string
  password: string
}

export interface SignUpCredentials {
  email: string
  password: string
  repeatPassword: string
  full_name: string
}

export interface ForgotPasswordData {
  email: string
}

export interface UpdatePasswordData {
  password: string
}

export interface AuthActionResult {
  success: boolean
  error?: string
  redirectTo?: string
} 