import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDay, setCurrentDay] = useState('');
  const [openingHours, setOpeningHours] = useState({});

  useEffect(() => {
    // Calculate isOpenSalon, currentDay, and openingHours
    const isOpenSalon = checkIfSalonIsOpen();
    setIsOpen(isOpenSalon);
    setCurrentDay(new Date().toLocaleDateString('en-US', { weekday: 'long' }));
    setOpeningHours(getOpeningHours());
  }, []);
  const checkIfSalonIsOpen = () => {
    const currentDayOfWeek = new Date().getDay();
    const currentTime = new Date().toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' });
    const [hour, minute] = currentTime.split(':').map(Number);

    const openingHours = {
      0: "9:00 AM - 8:00 PM", // Sunday
      1: "Closed", // Monday
      2: "9:00 AM - 8:00 PM", // Tuesday
      3: "9:00 AM - 8:00 PM", // Wednesday
      4: "9:00 AM - 8:00 PM", // Thursday
      5: "9:00 AM - 8:00 PM", // Friday
      6: "9:00 AM - 8:00 PM" // Saturday
    };

    if (openingHours[currentDayOfWeek] === "Closed") {
      return false;
    } else {
      const [startTime, endTime] = openingHours[currentDayOfWeek].split(" - ");
      const [endHour, endMinute] = endTime.split(":").map(Number);

      if (hour < endHour || (hour === endHour && minute <= endMinute)) {
        return true;
      } else {
        return false;
      }
    }
  };

  const getOpeningHours = () => {
    const openingHours = {
      0: "9:00 AM - 8:00 PM", // Sunday
      1: "Closed", // Monday
      2: "9:00 AM - 8:00 PM", // Tuesday
      3: "9:00 AM - 8:00 PM", // Wednesday
      4: "9:00 AM - 8:00 PM", // Thursday
      5: "9:00 AM - 8:00 PM", // Friday
      6: "9:00 AM - 8:00 PM" // Saturday
    };
    return openingHours;
  };

  return (
    <div>
      <div className="flex justify-center items-center h-96 bg-cover bg-center bg-fixed " style={{ backgroundImage: 'url("./images/userbg.jpg")' }}>
        <div className="bg-white bg-opacity-15 p-14 rounded-lg shadow-lg backdrop-filter backdrop-blur-xl ">
          <div className="container" style={{ display: 'flex' }}>
            <a href="tel:+94770286216" style={{ marginRight: '10px' }}>
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.978 4a2.553 2.553 0 0 0-1.926.877C4.233 6.7 3.699 8.751 4.153 10.814c.44 1.995 1.778 3.893 3.456 5.572 1.68 1.679 3.577 3.018 5.57 3.459 2.062.456 4.115-.073 5.94-1.885a2.556 2.556 0 0 0 .001-3.861l-1.21-1.21a2.689 2.689 0 0 0-3.802 0l-.617.618a.806.806 0 0 1-1.14 0l-1.854-1.855a.807.807 0 0 1 0-1.14l.618-.62a2.692 2.692 0 0 0 0-3.803l-1.21-1.211A2.555 2.555 0 0 0 7.978 4Z" />
              </svg>
            </a>
            <p>Telephone: 0770286216</p></div>
          <br />
          <div className="container" style={{ display: 'flex' }}>
            <a href="https://maps.app.goo.gl/khKKmn4zmtqgYr666" style={{ marginRight: '10px' }}>
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z" />
              </svg>
            </a>
            <p>Address: 4B/3L, NHS, Raddolugama</p>

          </div><br />
          <div className="container" style={{ display: 'flex' }}><svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>

            <p style={{ color: isOpen ? 'green' : 'red', marginLeft: '10px' }}>

              {isOpen ? `Open, closes at ${openingHours[new Date().getDay()]}` : "Closed"}
            </p></div>
          <select value={currentDay} className="form-control">
            <option value="Sunday">Sunday: {openingHours[0]}</option>
            <option value="Monday">Monday: {openingHours[1]}</option>
            <option value="Tuesday">Tuesday: {openingHours[2]}</option>
            <option value="Wednesday">Wednesday: {openingHours[3]}</option>
            <option value="Thursday">Thursday: {openingHours[4]}</option>
            <option value="Friday">Friday: {openingHours[5]}</option>
            <option value="Saturday">Saturday: {openingHours[6]}</option>
          </select><br />

          <div className='mt-8'>
            <Link to="/bookService" className="p-3 bg-green-600 hover:bg-green-700 rounded-lg text-white">BOOK NOW</Link>
          </div>
        </div>
      </div>

      <div>

        <section id="imgGallery" className="d-flex align-items-center justify-content-center" style={{ border: '1px solid gray', backgroundColor: 'gray', marginBottom: '100px', marginTop: '50px', overflowX: 'auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '40px', marginTop: '50px' }}>Image Gallery</h2>
          <div className="gallery-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '20px', marginTop: '50px', marginBottom: '50px' }}>
            <div className="imgGallery">
              <img src="https://lh3.googleusercontent.com/p/AF1QipPcnmEc5WK-380uBaskJCr9FnMxQqR517MVkBmQ=s680-w680-h510" className="pic_gray img-rounded" alt="" style={{ width: '200px', height: '200px' }} />
            </div>
            <div className="imgGallery">
              <img src="https://lh3.googleusercontent.com/p/AF1QipNK7k69X8aYg6R0yqsnxLb-biDtJJiweIwuppcq=s680-w680-h510" className="pic_gray img-rounded" alt="" style={{ width: '200px', height: '200px' }} />
            </div>
            <div className="imgGallery">
              <img src="https://lh3.googleusercontent.com/p/AF1QipPmORbNb5ZegvEThxpMvNlW_tPyizDHTUa4RhUR=s680-w680-h510" className="pic_gray img-rounded" alt="" style={{ width: '200px', height: '200px' }} />
            </div>
            <div className="imgGallery">
              <img src="https://lh3.googleusercontent.com/p/AF1QipOrP1Q14DaQhYz-n3a7ANamRsk7o6Ixp6THn0Bp=s680-w680-h510" className="pic_gray img-rounded" alt="" style={{ width: '200px', height: '200px' }} />
            </div>
            <div className="imgGallery">
              <img src="https://lh3.googleusercontent.com/p/AF1QipOjVjymV0NWq7yNuKLQgSAoQC96bt-Ukbe_utDP=s680-w680-h510" className="pic_gray img-rounded" alt="" style={{ width: '200px', height: '200px' }} />
            </div>
            <div className="imgGallery">
              <img src="https://lh3.googleusercontent.com/p/AF1QipN5VkXENuUkBekhASk48y-OXyyxvTAs4xmJMGmk=s680-w680-h510" className="pic_gray img-rounded" alt="" style={{ width: '200px', height: '200px' }} />
            </div>
          </div>
        </section>
      </div><br />

      <div className="flex justify-center items-center h-96 bg-cover bg-center bg-fixed ">
        <section id="Map" className="d-flex align-items-center justify-content-center" style={{ marginLeft: '150px', marginTop: '200px' }}>
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.8727255750928!2d79.89706807365458!3d7.140713215686029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2f017aaf5e4a3%3A0x4f6b5c36303b79d7!2sSalon%20Wasana!5e0!3m2!1sen!2slk!4v1714825467923!5m2!1sen!2slk"
              width="600"
              height="450"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
            <br /><br /><br />
          </div>

          <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="row">
              <div className="col-md-12">
                <div className="social-icons" style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
                  <a href="https://www.facebook.com/profile.php?id=100046872290348&mibextid=ZbWKwL">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="blue" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clip-rule="evenodd" />
                    </svg>

                  </a>
                  <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13.795 10.533 20.68 2h-3.073l-5.255 6.517L7.69 2H1l7.806 10.91L1.47 22h3.074l5.705-7.07L15.31 22H22l-8.205-11.467Zm-2.38 2.95L9.97 11.464 4.36 3.627h2.31l4.528 6.317 1.443 2.02 6.018 8.409h-2.31l-4.934-6.89Z" />
                    </svg>

                  </a>
                  <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path fill="red" fill-rule="evenodd" d="M3 8a5 5 0 0 1 5-5h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Zm5-3a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H8Zm7.597 2.214a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2h-.01a1 1 0 0 1-1-1ZM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm-5 3a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z" clip-rule="evenodd" />
                    </svg>

                  </a>
                  <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                    <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="blue" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clip-rule="evenodd" />
                      <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

    </div>
  );
}
