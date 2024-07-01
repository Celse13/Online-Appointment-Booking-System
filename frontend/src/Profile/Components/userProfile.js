import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Form, InputGroup, Modal } from 'react-bootstrap';
import ppic from '../../Assets/ppic.png';
import { css } from 'aphrodite';
import { appointmentStyles, createServiceStyles, myProfileStyles, } from '../../styles/profCompStyles';
import { BusinessServicesApi } from '../../Api/Services/handleServicesApi';
import { ChevronsDown, ChevronsUp, Pencil, Trash2, SquarePlus } from 'lucide-react';
import { daysOfWeek, formatTime } from '../../utils/utils';
import UserApi from '../../Api/Services/handleUserApi';
import { jwtDecode } from 'jwt-decode';

const Profile = ({ userType }) => {
  const isClient = userType === 'client';
  const isAdmin = userType === 'admin';
  const [servicesData, setServicesData] = useState([]);
  const [showDetails, setShowDetails] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [currentService, setCurrentService] = useState(null);
	const [updateFields, setUpdateFields] = useState({});
	const [profileData, setProfileData] = useState({ name: '', lastName: '', email: '', profilePicture: '' });
	const [showProfileDetails, setShowProfileDetails] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const token = localStorage.getItem('token');
	const decoded = jwtDecode(token);
	const userId = decoded._id;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await BusinessServicesApi.getBusinessServices(token);
				const services = response.services.map((service) => ({
					id: service._id,
					serviceName: service.serviceName,
					serviceDescription: service.serviceDescription,
					serviceDuration: service.serviceDuration,
					servicePrice: service.servicePrice,
					serviceLocation: service.serviceLocation,
					serviceDays: service.serviceDays,
					workingHours: {
						startTime: service.workingHours.startTime,
						endTime: service.workingHours.endTime,
					},
				}));
				setServicesData(services);
				setShowDetails(services.map(() => false));
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

		const fetchProfile = async () => {
			try {
				const response = await UserApi.getUserById(userId, token);
				setProfileData(response.data);
			} catch (error) {
				console.error('Error fetching profile:', error);
			}
		};
    if (isAdmin) {
      fetchServices()
        .then();
    }
		fetchProfile()
			.then();
  }, [isAdmin, token, userId]);

  const handleMoreInfo = (index) => {
    setShowDetails((prevDetails) =>
      prevDetails.map((detail, i) => (i === index ? !detail : detail))
    );
  };

  const handleDelete = async (serviceId) => {
    try {
      await BusinessServicesApi.deleteService(serviceId, token);
      setServicesData((prevData) => prevData.filter((serv) => serv._id !== serviceId));
      alert('Service deleted');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  }

	const handleEdit = async () => {
		try{
			await BusinessServicesApi.updateService(currentService, updateFields, token);
			setServicesData((prevData) =>
				prevData.map((serv) =>
					serv._id === currentService ? { ...serv, ...updateFields } : serv
				)
			);
			setShowModal(false);
			alert('Service updated successfully');
			window.location.reload();
		} catch (error) {
			console.error('Error updating service:', error);
			alert('Error updating service');
		}
	};

	const handleShowModal = (service) => {
		setCurrentService(service.id);
		setUpdateFields({
			serviceName: service.serviceName,
			serviceDescription: service.serviceDescription,
			serviceDuration: service.serviceDuration,
			servicePrice: service.servicePrice,
			serviceLocation: service.serviceLocation,
			serviceDays: service.serviceDays,
			startTime: formatTime(service.workingHours.startTime),
			endTime: formatTime(service.workingHours.endTime)
		});
		setShowModal(true);
	}

	const handleCloseModal = () => {
		setShowModal(false);
		setCurrentService(null);
		setUpdateFields({});
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setUpdateFields((prevState) => ({
			...prevState,
			[name]: value
		}));
	};

	const handleCheckboxChange = (e) => {
		const { value, checked } = e.target;
		setUpdateFields((prevState) => ({
			...prevState,
			serviceDays: checked
				? [...prevState.serviceDays, value]
				: prevState.serviceDays.filter((day) => day !== value)
		}));
	};

	const renderMyServices = () => {
		return servicesData.map((service, index) => (
			<div key={index}>
				<div key={service.id}>
					<div  className={css(myProfileStyles.myServicesItemName)}>
						<h4>{service.serviceName}</h4>
						<p className={css(myProfileStyles.moreInfo)} onClick={() => handleMoreInfo(index)}>{showDetails[index] ? <ChevronsUp /> : <ChevronsDown />}</p>
					</div>
					{showDetails[index] && (
						<div className={css(myProfileStyles.details)}>
							<p>Description: {service.serviceDescription}</p>
							<p>Duration: {service.serviceDuration}</p>
							<p>Price: {service.servicePrice}</p>
							<p>Location: {service.serviceLocation}</p>
							<p>Days: {service.serviceDays.join(', ')}</p>
							<p>Working Hours:
								<span className={css(appointmentStyles.timeInputSpan)}>
									<input
										type="time"
										name="workingHours"
										value={formatTime(service.workingHours.startTime)}
										className={css(appointmentStyles.timeInput)}
										readOnly />
									-
									<input
										type="time"
										name="workingHours"
										value={formatTime(service.workingHours.endTime)}
										className={css(appointmentStyles.timeInput2)}
										readOnly />
								</span>
							</p>
							<div className={css(appointmentStyles.buttons)}>
								<Button className={css(appointmentStyles.editButton)} onClick={() => handleShowModal(service)}><Pencil /></Button>
								<Button className={css(appointmentStyles.deleteButton)} onClick={() => handleDelete(service.id)}><Trash2 /></Button>
							</div>
						</div>
					)}
				</div>
			</div>
		));
	};

	const handleProfileEdit = async () => {
		try {
      const updateFields = new FormData();
      updateFields.append('name', profileData.name);
      updateFields.append('lastName', profileData.lastName);
      updateFields.append('email', profileData.email);
      selectedFile && updateFields.append('profilePicture', selectedFile);

			await UserApi.updateUser(userId, updateFields, token);
			setShowProfileDetails(false);
			alert('Profile updated successfully');
		} catch (error) {
			console.error('Error updating profile:', error);
			alert('Error updating profile');
		}
	};

	const toggleProfileDetails = () => {
		setShowProfileDetails((prevState) => !prevState);
		setProfileData({
			name: profileData.name,
      lastName: profileData.lastName,
			email: profileData.email,
      profilePicture: profileData.profilePicture
		});
	};

	const handleProfileChange = (e) => {
		const { name, value } = e.target;
		setProfileData((prevState) => ({
			...prevState,
			[name]: value
		}));
		console.log(profileData);
	};

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setProfileData((prevState) => ({
        ...prevState,
        profilePicture: fileReader.result
      }));
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

	return (
    <div className={css(myProfileStyles.container)}>
			{isClient && (
				<Card className={css(myProfileStyles.clientCard)}>
          <CardHeader className={css(myProfileStyles.header)}>
            {profileData.profilePicture === '' ?
              <img src={ppic} alt="profile picture"
                   className={css(myProfileStyles.ppic)} /> :
              <img src={profileData.profilePicture} alt="profile picture"
                   className={css(myProfileStyles.ppic)} />
            }
            {showProfileDetails && <SquarePlus onClick={() => document.getElementById('fileInput').click()} />}
            <input
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
          </CardHeader>
          <CardBody className={css(myProfileStyles.body)}>
            <div className={css(myProfileStyles.bodyDiv)}>
              <h6>Name:
                {!showProfileDetails ?
                  <> {profileData.name} {profileData.lastName}</>
                  :
                  <>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      className={css(createServiceStyles.input)}
                    />
                    <h6>Last Name:
                      <input
                        type="text"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleProfileChange}
                        className={css(createServiceStyles.input)}
                      />
                    </h6>
                  </>
                }
              </h6>
              <h6>Email: {profileData.email}</h6>
              <a href="#" className={css(myProfileStyles.resetPass)}>Reset password</a>
            </div>
          </CardBody>
          <CardFooter className={css(myProfileStyles.footer)}>
            {!showProfileDetails ?
              <Button onClick={toggleProfileDetails} className={css(myProfileStyles.button)}>Edit
                Profile</Button> :
              <Button onClick={handleProfileEdit} className={css(myProfileStyles.button)}>Save Changes</Button>
            }
          </CardFooter>
        </Card>
      )}
      {isAdmin && (
        <>
          <div className={css(myProfileStyles.adminBodyDiv)}>
            <div className={css(myProfileStyles.adminBodyDivItem)}>
              <div className={css(myProfileStyles.adminPpicDiv)}>
								<span className={css(myProfileStyles.adminPpicSpan)}>
									{profileData.profilePicture === '' ?
                    <img src={ppic} alt="profile picture"
                         className={css(myProfileStyles.adminPpic)} /> :
                    <img src={profileData.profilePicture} alt="profile picture"
                         className={css(myProfileStyles.adminPpic)} />
                  }
                  {showProfileDetails && <SquarePlus
                    onClick={() => document.getElementById('fileInput')
                      .click()} />}
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
								</span>
                <Pencil onClick={toggleProfileDetails} className={css(myProfileStyles.settings)} />
              </div>
              <h6>Name:
                {!showProfileDetails ?
                  <> {profileData.name} {profileData.lastName}</>
                  :
                  <>
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      className={css(createServiceStyles.input)}
                    />
                    <h6>Last Name:
                      <input
                        type="text"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleProfileChange}
                        className={css(createServiceStyles.input)}
                      />
                    </h6>
                  </>
                }
              </h6>
              <h6>Email: {profileData.email}</h6>
              {showProfileDetails && (
                <>
                  <a href="#" className={css(myProfileStyles.resetPass)}>Reset password</a>
                  <p onClick={handleProfileEdit}>Save Changes</p>
                </>
              )}
            </div>
          </div>
          <div className={css(myProfileStyles.myServices)}>
            <h2>My Services</h2>
            <div className={css(myProfileStyles.myServicesDiv)}>
              {servicesData.length > 0 ? renderMyServices() : <h6>No services available</h6>}
            </div>
          </div>
        </>
      )}
      {currentService && (
        <Modal show={showModal} onHide={handleCloseModal} className={css(appointmentStyles.modal)}>
          <Modal.Header closeButton className={css(appointmentStyles.header)}>Update
            Appointment</Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label className={css(createServiceStyles.label)}>Name</Form.Label>
                <Form.Control
                  className={css(createServiceStyles.input)}
                  type="text"
                  name="serviceName"
                  value={updateFields.serviceName}
                  onChange={handleChange} />
              </Form.Group>
							<Form.Group controlId="description" >
								<Form.Label className={css(createServiceStyles.label)}>Description</Form.Label>
								<Form.Control
									className={css(createServiceStyles.input)}
									type='textarea'
									name='serviceDescription'
									value={updateFields.serviceDescription}
									onChange={handleChange} />
							</Form.Group>
							<Form.Group controlId="duration" >
								<Form.Label className={css(createServiceStyles.label)}>Duration</Form.Label>
								<InputGroup>
									<Form.Control
										className={css(createServiceStyles.inputDuration)}
										type='number'
										name='serviceDuration'
										value={updateFields.serviceDuration}
										onChange={handleChange} />
									<InputGroup.Text className={css(createServiceStyles.inputDurationText)}>minutes</InputGroup.Text>
								</InputGroup>
							</Form.Group>
							<Form.Group controlId="price" >
								<Form.Label className={css(createServiceStyles.label)}>Price</Form.Label>
								<InputGroup>
									<Form.Control
										className={css(createServiceStyles.inputDuration)}
										type='number'
										name='servicePrice'
										value={updateFields.servicePrice}
										onChange={handleChange} />
									<InputGroup.Text className={css(createServiceStyles.inputDurationText)}>$</InputGroup.Text>
								</InputGroup>
							</Form.Group>
							<Form.Group controlId="location" >
								<Form.Label className={css(createServiceStyles.label)}>Location</Form.Label>
								<Form.Control
									className={css(createServiceStyles.input)}
									type='text'
									name='serviceLocation'
									value={updateFields.serviceLocation}
									onChange={handleChange} />
							</Form.Group>
							<Form.Group controlId="openingTime">
								<Form.Label className={css(createServiceStyles.label)}>Opening TIme</Form.Label>
								<Form.Control
									className={css(createServiceStyles.input)}
									type="time"
									name='startTime'
									value={updateFields.startTime}
									onChange={handleChange} />
							</Form.Group>
							<Form.Group controlId="closingTime">
								<Form.Label className={css(createServiceStyles.label)}>Closing Time</Form.Label>
								<Form.Control
									className={css(createServiceStyles.input)}
									type="time"
									name='endTime'
									value={updateFields.endTime}
									onChange={handleChange} />
							</Form.Group>
							<Form.Group controlId="serviceDays">
								<Form.Label className={css(createServiceStyles.label)}>Working Days</Form.Label>
								<div className={css(createServiceStyles.checkboxGroup)}>
									{daysOfWeek.map((day) => (
										<Form.Check
											key={day}
											type="checkbox"
											label={day}
											name="serviceDays"
											value={day}
											checked={updateFields.serviceDays.includes(day)}
											onChange={handleCheckboxChange}
											className={css(createServiceStyles.checkbox)} />
									))}
								</div>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer className={css(appointmentStyles.footer)}>
						<Button variant="secondary" onClick={handleCloseModal} className={css(appointmentStyles.button)}>Close</Button>
						<Button variant="primary" onClick={handleEdit} className={css(appointmentStyles.button)}>Save Changes</Button>
					</Modal.Footer>
				</Modal>
			)}
    </div>
  );
}

export default Profile;
