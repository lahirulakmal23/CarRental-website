import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiUser, FiTruck, FiArrowLeft, FiArrowRight, FiX, FiCheck } from 'react-icons/fi'

const roles = [
  { value: 'customer', label: 'Customer', description: 'Find and book a car for your next journey.', icon: FiUser },
  { value: 'owner', label: 'Car Owner', description: 'List your cars and manage rental bookings.', icon: FiTruck },
]

const Login = ({ setShowLogin, onLogin, initialState = 'login' }) => {
  const navigate = useNavigate()
  const [state, setState] = useState(initialState)
  const [role, setRole] = useState('')
  const [detailsStep, setDetailsStep] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const dialogRef = useRef(null)
  const register = state === 'register'
  const choosingRole = register && !detailsStep
  const selectedRole = roles.find((item) => item.value === role)

  useEffect(() => {
    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      previousFocus?.focus()
    }
  }, [])

  const close = () => { if (!submitting) setShowLogin(false) }
  const switchMode = () => {
    setState(register ? 'login' : 'register')
    setDetailsStep(false)
    setRole('')
    setPassword('')
    setError('')
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    if (submitting) return
    setError('')
    if (choosingRole) {
      if (!role) { setError('Please select Customer or Car Owner to continue.'); return }
      setDetailsStep(true)
      return
    }
    if (register && !roles.some((item) => item.value === role)) {
      setDetailsStep(false)
      setError('Please select your account role.')
      return
    }
    setSubmitting(true)
    try {
      const baseUrl = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '')
      const response = await fetch(`${baseUrl}/auth/${register ? 'register' : 'login'}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(register ? { name: name.trim(), email: email.trim(), password, role } : { email: email.trim(), password }),
      })
      const result = await response.json()
      if (!response.ok || !result.success) throw new Error(result.message || 'Unable to continue. Please try again.')
      if (!result.data?.token || !result.data?.user) throw new Error('Unable to verify the account response. Please try again.')
      sessionStorage.setItem('token', result.data.token)
      sessionStorage.setItem('user', JSON.stringify(result.data.user))
      onLogin?.(result.data.user)
      navigate(result.data.user.role === 'owner' ? '/owner' : '/cars', { replace: true })
    } catch (requestError) {
      setError(requestError instanceof TypeError || requestError instanceof SyntaxError ? 'Unable to connect. Please check that the server is running and try again.' : requestError.message)
    } finally {
      setSubmitting(false)
    }
  }

  const onDialogKeyDown = (event) => {
    if (event.key === 'Escape') { event.stopPropagation(); close(); return }
    if (event.key !== 'Tab') return
    const elements = dialogRef.current.querySelectorAll('button:not(:disabled), input:not(:disabled), [tabindex="0"]')
    const first = elements[0]
    const last = elements[elements.length - 1]
    if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) { event.preventDefault(); last?.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
  }

  const inputClass = 'mt-2 min-h-11 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-primary focus:ring-2 focus:ring-blue-100 disabled:opacity-60'

  return (
    <div onClick={close} className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/50 p-4">
      <div ref={dialogRef} tabIndex={-1} role="dialog" aria-modal="true" aria-labelledby="auth-title" onKeyDown={onDialogKeyDown} onClick={(event) => event.stopPropagation()} className="relative my-auto max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-2xl border border-gray-100 bg-white p-6 shadow-xl outline-none sm:p-8">
        <button type="button" aria-label="Close form" onClick={close} disabled={submitting} className="absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-gray-400 hover:bg-gray-50 hover:text-gray-700"><FiX aria-hidden="true" className="h-5 w-5" /></button>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">CarRental</p>
        <h2 id="auth-title" className="mt-3 pr-5 text-2xl font-extrabold text-gray-900">{choosingRole ? 'Choose Your Account' : register ? 'Create Your Account' : 'Welcome Back'}</h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-500">{choosingRole ? 'First, tell us how you would like to use CarRental.' : register ? `Sign up as a ${selectedRole?.label.toLowerCase()}.` : 'Log in with your email and password.'}</p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          {choosingRole ? (
            <fieldset>
              <legend className="mb-3 text-sm font-semibold text-gray-700">Select your role</legend>
              <div className="space-y-3">
                {roles.map(({ value, label, description, icon: Icon }) => (
                  <label key={value} className={`relative flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-colors focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 ${role === value ? 'border-primary bg-blue-50' : 'border-gray-100 hover:border-blue-200'}`}>
                    <input type="radio" name="role" value={value} checked={role === value} onChange={() => { setRole(value); setError('') }} className="sr-only" required />
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-primary"><Icon aria-hidden="true" className="h-5 w-5" /></span>
                    <span className="flex-1"><span className="block font-semibold text-gray-900">{label}</span><span className="mt-1 block text-xs leading-relaxed text-gray-500">{description}</span></span>
                    {role === value && <FiCheck aria-hidden="true" className="h-5 w-5 shrink-0 text-primary" />}
                  </label>
                ))}
              </div>
            </fieldset>
          ) : (
            <>
              {register && <><button type="button" onClick={() => { setDetailsStep(false); setError('') }} disabled={submitting} className="inline-flex min-h-9 items-center gap-2 text-sm font-semibold text-primary"><FiArrowLeft aria-hidden="true" />Change role</button><div><label htmlFor="auth-name" className="text-sm font-medium text-gray-700">Full Name</label><input id="auth-name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} className={inputClass} required disabled={submitting} /></div></>}
              <div><label htmlFor="auth-email" className="text-sm font-medium text-gray-700">Email</label><input id="auth-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} className={inputClass} required disabled={submitting} /></div>
              <div><label htmlFor="auth-password" className="text-sm font-medium text-gray-700">Password</label><input id="auth-password" type="password" autoComplete={register ? 'new-password' : 'current-password'} minLength={register ? 6 : undefined} value={password} onChange={(event) => setPassword(event.target.value)} className={inputClass} required disabled={submitting} />{register && <p className="mt-1 text-xs text-gray-400">Use at least 6 characters.</p>}</div>
            </>
          )}
          {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <button type="submit" disabled={submitting || (choosingRole && !role)} className="flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dull disabled:cursor-not-allowed disabled:opacity-50">{submitting ? 'Please wait...' : choosingRole ? 'Continue' : register ? 'Create Account' : 'Login'}{choosingRole && <FiArrowRight aria-hidden="true" />}</button>
        </form>
        <p className="mt-5 text-center text-sm text-gray-500">{register ? 'Already have an account?' : 'New to CarRental?'}{' '}<button type="button" onClick={switchMode} disabled={submitting} className="min-h-9 cursor-pointer font-semibold text-primary hover:underline">{register ? 'Log in' : 'Sign up'}</button></p>
      </div>
    </div>
  )
}

export default Login
