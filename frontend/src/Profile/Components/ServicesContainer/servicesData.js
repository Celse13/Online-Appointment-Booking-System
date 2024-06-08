import Health from '../../../Assets/Health.png';
import Fitness from '../../../Assets/Fitness.png';
import Consultation from '../../../Assets/Consultation.png';
import Salon from '../../../Assets/Salon.png';
import Spa from '../../../Assets/Spa.png';
import Counselling from '../../../Assets/Counselling.png';
import Tuition from '../../../Assets/Tuition.png';
import Other from '../../../Assets/Other.png';
import { ClientServiceApi } from '../../../Api/Services/handleServicesApi';


export const serviceCategoriesData = [
  { id: 1, category: 'Health', image: Health },
  { id: 2, category: 'Fitness', image: Fitness },
  { id: 3, category: 'Consultation', image: Consultation },
  { id: 4, category: 'Salon And Barber', image: Salon },
  { id: 5, category: 'Massage And Spa', image: Spa },
  { id: 6, category: 'Counselling', image: Counselling },
  { id: 7, category: 'Tuition', image: Tuition },
  { id: 8, category: 'Other', image: Other },
];

export const servicesListData = [
  {  categoryId: 1, serviceName: 'Tele-Medicine', duration: '30 minutes', cost: 50, openingTime: '09:00', closingTime: '17:00', location: 'Online', serviceDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'] },
];




const getServices = async (token, categoryId) => {
  try {
    const response = await ClientServiceApi.getServicesByCategory(token, categoryId);
    console.log(response);
    const services = response.services;

    const mappedServices = services.map(service => ({
      id: service._id,
      categoryId: service.categoryId,
      serviceName: service.serviceName,
      duration: service.serviceDuration[0] + ' minutes', 
      cost: service.servicePrice,
      openingTime: `${service.workingHours.startHour}:${service.workingHours.startMinute} ${service.workingHours.startPeriod}`,
      closingTime: `${service.workingHours.endHour}:${service.workingHours.endMinute} ${service.workingHours.endPeriod}`,
      location: service.serviceLocation,
      serviceDays: service.serviceDays,
    }));

    return mappedServices;
  } catch (error) {
    console.error(error);
  }
};

const token = localStorage.getItem('token');

const fetchServicesForAllCategories = async (token) => {
  for (let category of serviceCategoriesData) {
    try {
      console.log(`Fetching services for category ${category.id} with token ${token}`);
      const services = await getServices(token, category.id);
      console.log('Services:', services);
      servicesListData.push(...services);
    } catch (error) {
      console.error(`Error getting services for category ${category.id}:`, error);
    }
  }
};

fetchServicesForAllCategories(token);