export const getFullYear = () =>{
  return new Date().getFullYear();
}

export const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export const handleBackHome = (navigate) => {
  navigate('/');
}

export const handleChange = (e, formData, setFormData, setErrorMessages) => {
  const { name, value } = e.target;
  let errorMessage = '';

  if (name === 'name') {
    if (value.length < 3) {
      errorMessage = 'Name should contain at least 3 characters';
    }
  } else if (name === 'email') {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(value)) {
      errorMessage = 'Invalid email address';
    }
  } else if (name === 'phone') {
    const phoneRegex = /^[\d()-]{7,15}$/;
    if (!phoneRegex.test(value)) {
      errorMessage = 'Invalid phone number';
    }
  } else if (name === 'description') {
    if (value.length < 10) {
      errorMessage = 'Description should contain at least 10 characters';
    }
  } else if (name === 'password') {
    const lowerCaseRegex = /^(?=.*[a-z])/;
    const upperCaseRegex = /^(?=.*[A-Z])/;
    const digitRegex = /^(?=.*\d)/;
    const specialCharRegex = /^(?=.*[!@#$%^&*])/;
    const minCharLength = /^.{8,}$/;
    if (!lowerCaseRegex.test(value)) {
      errorMessage = 'Password should contain at least one lowercase letter';
    } else if (!upperCaseRegex.test(value)) {
      errorMessage = 'Password should contain at least one uppercase letter';
    } else if (!digitRegex.test(value)) {
      errorMessage = 'Password should contain at least one digit';
    } else if (!minCharLength.test(value)) {
      errorMessage = 'Password should be at least 8 characters';
    } else if (!specialCharRegex.test(value)) {
      errorMessage = 'Password should contain at least one special character';
    }
  } else if (name === 'confirmPassword') {
    const password = formData.password;
    if (password !== value) {
      errorMessage = 'Passwords do not match!';
    }
  }

  setErrorMessages((prevErrors) => ({
    ...prevErrors,
    [name]: errorMessage
  }));

  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: value,
  }));
};
