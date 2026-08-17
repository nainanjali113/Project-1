import yup from 'yup'


export const validname = (name) => {
   const nameRegex = /^[A-Za-z]+([ '-][A-Za-z]+)*$/
    return nameRegex.test(name)
}


export const validemail = (email) => {
  const  emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
    return emailRegex.test(email)
}


export const validpassword = (password) => {
  const  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
}


export const validgender = (gender) => {
    if (gender === 'male' || gender === 'female' || gender === 'other') {
        return true
    }
    return false
}