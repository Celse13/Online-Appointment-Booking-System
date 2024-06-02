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
