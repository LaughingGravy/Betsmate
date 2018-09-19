import intl from 'react-intl-universal'

const validateEmail = (email) => {
  return {
    key: "emailFormat",
    test: () => {
      var re = /\S+@\S+\.\S+/
      return re.test(email)
    },
    msg: intl.get("email-validation-msg")
  }
}

export { validateEmail }