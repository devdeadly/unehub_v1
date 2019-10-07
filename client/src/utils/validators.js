export const email = value => {
  return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'invalid email'
    : undefined
}

const maxLength = max => value => {
  return value && value.length > max
    ? `must be ${max} characters or less`
    : undefined
}

export const maxLength20 = maxLength(20)

const minLength = min => value => {
  return value && value.length < min
    ? `must be ${min} characters or more`
    : undefined
}

export const minLength8 = minLength(8)

export const passwordsMustMatch = (value, allValues) => {
  return value !== allValues.password ? 'passwords do not match' : undefined
}

export const required = value => {
  return value || typeof value === 'number' ? undefined : 'required'
}
