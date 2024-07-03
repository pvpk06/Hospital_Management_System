import React, { useState, useEffect } from 'react';
import './home.css';
import s1 from '../images/csl/s1.jpg';
import s2 from '../images/csl/s2.jpg';
import s3 from '../images/csl/s3.jpg';
import s4 from '../images/csl/s4.jpg';
import d1 from '../images/doctors/d1.jpg';
import d2 from '../images/doctors/d2.jpg';
import d3 from '../images/doctors/d3.jpg';
import d5 from '../images/doctors/d5.jpg';
import d6 from '../images/doctors/d6.jpg';

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    address: '',
    email: '',
    mobile: '',
    disease: ''
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  const handleOutsideClick = (event) => {
    if (!event.target.matches('#dropdown-btn')) {
      setIsOpen(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/make_appointment/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Appointment submitted successfully!');
        setFormData({
          name: '',
          gender: '',
          address: '',
          email: '',
          mobile: '',
          disease: ''
        });
      } else {
        alert('Failed to submit appointment.');
      }
    } catch (error) {
      console.error('Error submitting appointment:', error);
      alert('Failed to submit appointment. Please try again later.');
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const renderContent = () => {
    switch (activeLink) {
      case 'gallery':
        return (
          <div id="gallery-section" class="gallery-section container-fluid no-left-padding no-right-padding">
            <div class="container">
              <div class="section-header">
                <h3>Top Experts of our hospital</h3>
              </div>
              <ul class="portfolio-list no-left-padding">
                <li class="col-md-4 col-sm-4 col-xs-6 design">
                  <div class="content-image-block">
                    <img src={d1} alt="gallery" />
                    <div class="content-block-hover">
                      <span>Dr William A. Abdu, M.D, M.S.</span>
                      <h5>Orthopedics</h5>
                    </div>
                  </div>
                </li>
                <li class="col-md-4 col-sm-4 col-xs-6 video">
                  <div class="content-image-block">
                    <img src={d2} alt="gallery" />
                    <div class="content-block-hover">
                      <span>Dr Myles. B. Abbott, M.D.</span>
                      <h5>Oncologist</h5>
                    </div>
                  </div>
                </li>
                <li class="col-md-4 col-sm-4 col-xs-6 photography">
                  <div class="content-image-block">
                    <img src={d3} alt="gallery" />
                    <div class="content-block-hover">
                      <span>Dr Sudhansu Bhattacharyya, MBBS, MS, MCH</span>
                      <h5>Cardiovascular Surgeon</h5>
                    </div>
                  </div>
                </li>
                <li class="col-md-4 col-sm-4 col-xs-6 web">
                  <div class="content-image-block">
                    <img src={d5} alt="gallery" />
                    <div class="content-block-hover">
                      <span>Dr. Ajaya Nand Jha MBBS, MS, FRCS</span>
                      <h5>Neurosurgery</h5>
                    </div>
                  </div>
                </li>
                <li class="col-md-4 col-sm-4 col-xs-6 video">
                  <div class="content-image-block">
                    <img src={d6} alt="gallery" />
                    <div class="content-block-hover">
                      <span>Dr. Abhijit Dey MBBS & MS</span>
                      <h5>orthopaedics</h5>
                    </div>
                  </div>
                </li>
                <li class="col-md-4 col-sm-4 col-xs-6 video">
                  <div class="content-image-block">
                    <img src={d1} alt="gallery" />
                    <div class="content-block-hover">
                      <span>Dr. Aroop Mukherjee MBBS, MS </span>
                      <h5>Neurosurgery</h5>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )
      case 'about':
        return (
          <div className="content-container">
            <div className="welcome-section other-services container-fluid no-left-padding no-right-padding">
              <div className="container">
                <div className="row">
                  <div className="col-md-8 col-sm-12 col-xs-12 our-clinic">
                    <div className="row welcome-left">
                      <div class="col-md-6 col-sm-6 col-xs-6">
                        <div class="other-services-block">
                          <div class="services-block-icon">
                            <i class="fa fa-ambulance"></i>
                          </div>

                          <div class="other-services-content">
                            <h5>Emergency services</h5>
                            <p>Dolor sit amet consecdi pisicing eliamsed do eiusmod tempornu</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6 col-sm-6 col-xs-6">
                        <div class="other-services-block">
                          <div class="services-block-icon">
                            <i class="fa fa-users"></i>
                          </div>
                          <div class="other-services-content">
                            <h5>Qualified Doctors</h5>
                            <p>Dolor sit amet consecdi pisicing eliamsed do eiusmod tempornu</p>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-6 col-sm-6 col-xs-6">
                        <div class="other-services-block">
                          <div class="services-block-icon">
                            <i class="fa fa-phone-square"></i>
                          </div>
                          <div class="other-services-content">
                            <h5>24/7 support</h5>
                            <p>Dolor sit amet consecdi pisicing eliamsed do eiusmod tempornu</p>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6 col-sm-6 col-xs-6">
                        <div class="other-services-block">
                          <div class="services-block-icon">
                            <i class="fa fa-calendar"></i>
                          </div>
                          <div class="other-services-content">
                            <h5>Online appointment</h5>
                            <p>Dolor sit amet consecdi pisicing eliamsed do eiusmod tempornu</p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12 col-xs-12 clinic-form">
                    <form className="appoinment-form" onSubmit={handleSubmit}>
                      <h5><i className="fa fa-calendar-check-o"></i>Make Appointment</h5>
                      <div className="form-group col-md-12 no-padding">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Your Name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group col-md-12 no-padding">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group col-md-12 no-padding">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group col-md-12 no-padding">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Email Address"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group col-md-12 no-padding">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Mobile Number"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group col-md-12 no-padding">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Disease"
                          name="disease"
                          value={formData.disease}
                          onChange={handleInputChange}
                        />
                      </div>
                      <button type="submit" className="btn-submit pull-right">
                        <i className="fa fa-heart-o"></i>Submit
                      </button>
                      <div id="appointment-alert-msg" className="alert-msg"></div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="contactcard">
            <footer id="footer-main" className="footer-main container-fluid no-left-padding no-right-padding">
              <div className="container">
                <div className="row">
                  <div className="col-md-4 col-sm-6 col-xs-6 contact-info">
                    <aside className="widget widget_info">
                      <h3 className="widget-title">Contact info</h3>
                      <p><i className="fa fa-phone"></i><a href="tel:386489550686" title="+386 489 550 686">+386 489 550 686</a></p>
                      <p><i className="fa fa-envelope"></i><a href="mailto:yourdomain@name.com" title="yourdomain@name.com">yourdomain@name.com</a></p>
                      <p><i className="fa fa-map-marker"></i>123, Las Vegas street</p>
                    </aside>
                  </div>
                  <div className="col-md-4 col-sm-6 col-xs-6">
                    <aside className="widget widget_workinghours">
                      <span><i className="fa fa-clock-o"></i></span>
                      <h3 className="widget-title">Working Hours</h3>
                      <ul>
                        <li><span>Monday</span> <b>9.00 AM To 5.00 PM</b></li>
                        <li><span>Tuesday</span> <b>9.00 AM To 5.00 PM</b></li>
                        <li><span>Wednesday</span> <b>9.00 AM To 5.00 PM</b></li>
                        <li><span>Thursday</span> <b>9.00 AM To 5.00 PM</b></li>
                        <li><span>Friday</span> <b>9.00 AM To 5.00 PM</b></li>
                        <li><span>Saturday</span> <b>11.00 AM To 3.00 PM</b></li>
                        <li><span>Sunday</span> <b>Closed</b></li>
                      </ul>
                    </aside>
                  </div>
                  <div className="col-md-4 col-sm-6 col-xs-6 contact-form">
                    <h3 className="widget-title">Any Queries ?</h3>
                    <form>
                      <div className="form-group">
                        <input type="text" className="form-control" placeholder="full Name" name="contact-fname" id="input_fname" required="" />
                      </div>
                      <div className="form-group">
                        <input type="text" className="form-control" placeholder="email Address" name="contact-email" id="input_email" required="" />
                      </div>
                      <div className="form-group">
                        <input type="text" className="form-control" placeholder="Gender" name="gender" id="input_gender" required="" />
                      </div>
                      <div className="form-group">
                        <input type="text" className="form-control" placeholder="subject" name="contact-subject" id="input_subject" />
                      </div>
                      <div className="form-group">
                        <textarea className="form-control" placeholder="message" rows="4" name="contact-message" id="input_message"></textarea>
                      </div>
                      <div className="form-group">
                        <button title="Learn More" id="que_btn_submit" type="submit" name="post">Learn more</button>
                      </div>

                      <div id="alert-msg-que" className="alert-msg"></div>
                    </form>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        );

      default:
        return (
          <div id="carouselExample" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={s3} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={s2} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={s1} className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={s4} className="d-block w-100" alt="..." />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        );
    }
  };

  return (
    <div>
      <div className="">
        <header className="header">
          <div className="logo1"></div>
          <div className="nav-links">
            <ul>
              <li>
                <a href="#" onClick={() => handleLinkClick('gallery')}>
                  Gallery
                </a>
              </li>
              <li>
                <a href="#" onClick={() => handleLinkClick('about')}>
                  About
                </a>
              </li>
              <li>
                <a href="#" onClick={() => handleLinkClick('contact')}>
                  Contact
                </a>
              </li>
              <div className="dropdown-container">
                <button id="dropdown-btn" className="dropdown-button" onClick={toggleDropdown}>
                  Login
                </button>
                {isOpen && (
                  <div className="dropdown-content">
                    <a href="/adminlogin" className="dropdown-link">
                      Admin
                    </a>
                    <a href="/doctorlogin" className="dropdown-link">
                      Doctor
                    </a>
                  </div>
                )}
              </div>
            </ul>
          </div>
        </header>
        {renderContent()}
      </div>
    </div>
  );
};

export default HomePage;
