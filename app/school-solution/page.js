import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'School Buddy Solution - School Bus GPS Tracking | Atlanta Systems',
  description: 'Real-time school bus tracking, parent notification, RFID student attendance logging, and GIS-based route management for educational institutions.',
  alternates: { canonical: 'https://www.atlantasys.com/school-solution' },
  openGraph: {
    title: 'School Buddy Solution - School Bus GPS Tracking | Atlanta Systems',
    description: 'Real-time school bus tracking, parent notification app, RFID student attendance logging, and emergency SOS alerts.',
    url: 'https://www.atlantasys.com/school-solution',
    siteName: 'Atlanta Systems',
    type: 'website',
  },
};

export default function SchoolSolutionPage() {
  return (
    <>
      <Header />

      {/* Page Heading */}
      <div className="about-area about-top-area pb-50 pt-50">
        <div className="container">
          <div className="heading-title">
            <h1>School Buddy Solution</h1>
          </div>
          <div className="row about-top pt-20">
            <div className="col-md-12">
              <p align="center">
                Our school transport solution ensures safe and efficient transportation for students. With a fleet of well-maintained vehicles, trained drivers, and real-time tracking, we prioritize student safety.
              </p>
              <img src="/assets/img/school/banner.webp" alt="School Buddy Solution" style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Revolutionizing School Transportation */}
      <div className="container-fluid pt-50 pb-50">
        <div className="container">
          <div className="row">
            <div className="heading-title">
              <h2>Revolutionizing School Transportation with Smart Monitoring Solutions</h2>
            </div>
          </div>
          <div className="row align-items-center justify-content-center">
            <div className="col-md-12">
              <img src="/assets/img/school/school.svg" alt="School Buddy Solution" style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Features + Description */}
      <div className="container-fluid pb-50">
        <div className="container">
          <div className="row">
            <div className="col-md-5 col-lg-5">
              <h2 className="self-h2">How Our School Bus Solution Enhances Safety and Efficiency</h2>
              <div className="row">
                <div className="col-md-3">
                  <div className="solution_box">
                    <img src="/assets/img/school/route.svg" alt="Intelligent Route Replay" />
                    <h4 className="feature-table">Intelligent Route Replay</h4>
                  </div>
                  <br /><br /><br />
                  <div className="solution_box">
                    <img src="/assets/img/school/alert.svg" alt="Parent Alerts" />
                    <h4 className="feature-table">Parent Alerts</h4>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="solution_box">
                    <img src="/assets/img/school/tracking.svg" alt="Real Time Tracking" />
                    <h4 className="feature-table">Real Time Tracking</h4>
                  </div>
                  <br /><br /><br />
                  <div className="solution_box">
                    <img src="/assets/img/school/speed.svg" alt="Speed Estimates" />
                    <h4 className="feature-table">Speed Estimates</h4>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="solution_box">
                    <img src="/assets/img/school/geofencing.svg" alt="Automation & Fast Ticketing" />
                    <h4 className="feature-table">Automation &amp; Fast Ticketing</h4>
                  </div>
                  <br /><br /><br />
                  <div className="solution_box">
                    <img src="/assets/img/school/geotagging.svg" alt="Admin Controlled" />
                    <h4 className="feature-table">Admin Controlled</h4>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="solution_box">
                    <img src="/assets/img/school/overspeed.svg" alt="Over Speeding Alert" />
                    <h4 className="feature-table">Over Speeding Alert</h4>
                  </div>
                  <br /><br /><br />
                  <div className="solution_box">
                    <img src="/assets/img/school/sos.svg" alt="Panic Button Alert" />
                    <h4 className="feature-table">Panic Button Alert</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-7">
              <p>
                The Problem definition for the system is to develop software for &quot;School Bus Routing Management System&quot; for Schools, based on feature - GIS (Geographic Information System) Technique, in which School buses can be tracked on the way and software also maintains database of Staff and students. Guardian can login to software using student&apos;s id and password.<br /><br />
                The existing fleet of buses and mini buses are currently managed manually. To improve the existing fleet management system as well as decrease the maintenance costs, the software is build supported by a GIS system.
              </p>
              <p className="solution_p">
                <b>1. Integration: </b>Adaptability enhances performance across various platforms<br />
                <b>2. Multi-User Platform: </b>Collaborate effortlessly with a multi-user platform<br />
                <b>3. Push Notifications: </b>Alerts for arrival times, delays, or unexpected route changes<br />
                <b>4. Driver Monitoring: </b>Track driver behavior, including speed, stops, and driving patterns.<br />
                <b>5. Scalability: </b>Expands seamlessly to accommodate higher demands.<br />
                <b>6. Student Safety: </b>Ensuring student safety with live video feeds.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Components */}
      <div className="container-fluid pb-50">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="self-h2">Components of School Buddy</h2>
            </div>
          </div>
          <br />
          <div className="row align-items-center justify-content-center">
            <div className="col-md-2">
              <div className="profile_bx" align="center">
                <img src="/assets/img/school/WP-30L.webp" alt="AIS-140(WP-30L) Device" /><br />
                <h4><a href="https://atlantasys.com/product/wp-30l" className="mobile-anchor">AIS-140(WP-30L) Device</a></h4>
              </div>
            </div>
            <div className="col-md-2">
              <div className="profile_bx" align="center">
                <img src="/assets/img/school/HD-04GG.webp" alt="MDVR For Data Storage" /><br />
                <h4><Link href="/trackers/video-telematics" className="mobile-anchor">MDVR For Data Storage</Link></h4>
              </div>
            </div>
            <div className="col-md-2">
              <div className="profile_bx" align="center">
                <img src="/assets/img/school/cctv-camera.webp" alt="High definition cameras" /><br />
                <h4>High definition cameras</h4>
              </div>
            </div>
            <div className="col-md-2">
              <div className="profile_bx" align="center">
                <img src="/assets/img/school/RFID.webp" alt="RFID receiver and RFID card" /><br />
                <h4>RFID receiver and RFID card</h4>
              </div>
            </div>
            <div className="col-md-2">
              <div className="profile_bx" align="center">
                <img src="/assets/img/school/application.webp" alt="AI-based web & app platform" /><br />
                <h4><a href="https://smartbus.trackofy.com/" className="mobile-anchor" target="_blank" rel="noopener noreferrer">AI-based Web &amp; App platform</a></h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dedicated App */}
      <div className="container-fluid pt-50 pb-50">
        <div className="container">
          <div className="row">
            <div className="heading-title">
              <h2>Dedicated Application for Everyone Involved!</h2>
            </div>
          </div>
          <div className="row align-items-center justify-content-center">
            <div className="col-md-12">
              <img src="/assets/img/school/mobile-app.webp" alt="School Buddy Solution" style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Screenshots */}
      <div className="container-fluid pb-50 screenshot" style={{ background: '#fff' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3>
                Here is the full guide view of our unified software that will guide you to track the bus. When we go to the url:{' '}
                <a href="https://smartbus.trackofy.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#000', fontSize: '24px' }}>
                  https://smartbus.trackofy.com/
                </a>{' '}
                this page will open in the browser.
              </h3>
            </div>
          </div>
          <br />
          {[
            { src: 'Login', fig: 1, title: 'Login', desc: '1. The login page has columns for Parent and admin you need to select the admin.\n2. Username and password that will be generated by our support panel for login to the account.' },
            { src: 'dashboard', fig: 2, title: 'Dashboard', desc: 'When the user will login to the account it will take to the dashboard page that has various parameters listed over it that will gives the analysis of the total students using the platform, total numbers of bus routes, total number of inactive routes, live routes if any.' },
            { src: 'create_route', fig: 3, title: 'Routes', desc: 'In this section user can creates routes for his buses by clicking onto the routes plan and once the routes is formed it will reflect here.' },
            { src: 'route', fig: 4, title: 'Add New Route Plan', desc: "Here's how to create the route plan where user have to fill the details as Route name, Start and Stop Time and also the bus number. *The Route names Should be as Pick and Drop. Example: Route-10 Pick & Route 10 Drop." },
            { src: 'route_mapping', fig: 5, title: 'Automated Route Planning', desc: 'After the route plan user have to map the route. Route is automatically generated with the help of Abctraq.com as it picks up the playback of the vehicle moved. So user can filter the route on the basis of time and can save the route. Tab: Bus Route.' },
            { src: 'route_map2', fig: 6, title: 'Map the Route', desc: 'Map the Route enables accurate planning of student travel paths, ensuring safety, efficiency, timely arrivals, and better route management.' },
            { src: 'student', fig: 7, title: 'Add Student Details to Optimize Route Efficiency', desc: 'In this section user have to add the student Info and bind them with routes, if the student is in both pick and drop then they must be added separately.' },
            { src: 'student_point_allocation', fig: 8, title: 'Student Point Allocation', desc: 'Student point allocation ensures fair evaluation, motivates participation, rewards performance, tracks progress, and promotes academic excellence.' },
            { src: 'holiday', fig: 9, title: 'Holiday & Event', desc: 'School buses ensure safe, reliable transportation for students, including holiday schedules, promoting punctuality and stress-free travel.' },
            { src: 'broadcast', fig: 10, title: 'Manage the Broadcast Messages', desc: 'Broadcast messages deliver timely announcements, important updates, and holiday notices, ensuring clear communication with students, parents, and staff.' },
            { src: 'report', fig: 11, title: 'Unlock insights with powerful reporting tools', desc: 'The analysis of the students can be seen in the report section of the software. It has various reports in it like Notification Log, Student Notification Log, No GPS, Login Report, RFID Report, Stop Violation, UHF Report.' },
            { src: 'parent_complain', fig: 12, title: 'Parent Complain', desc: 'Parent complaints help schools address concerns, improve services, enhance communication, and ensure a better, supportive environment for students.' },
            { src: 'uhf_gates', fig: 13, title: 'Ensure Student Security with UHF Gates, UWB, and BLE', desc: 'Ensure student security using UHF gates, UWB, and BLE technologies for real-time tracking, controlled access, and enhanced campus safety.' },
            { src: 'staff_details', fig: 14, title: 'Staff Details', desc: 'Staff details ensure safety by monitoring campus personnel in real time, improving accountability, response times, and overall campus security.' },
            { src: 'visitor_details', fig: 15, title: 'Visitor Details', desc: 'Visitor details help track campus entries, enhance security, ensure compliance, and maintain a safe, well-managed school environment.' },
            { src: 'attendance', fig: 16, title: 'Efficient Management of Student Attendance', desc: 'Efficient management of student attendance ensures accurate tracking, reduces manual effort, improves transparency, and supports timely academic and administrative decisions.' },
          ].reduce((rows, item, i) => {
            if (i % 2 === 0) rows.push([]);
            rows[rows.length - 1].push(item);
            return rows;
          }, []).map((pair, rowIdx) => (
            <div key={rowIdx} className="row" style={{ marginBottom: '30px' }}>
              {pair.map((item) => (
                <div key={item.fig} className="col-md-6">
                  <center><img src={`/assets/img/school/${item.src}.webp`} alt={item.title} /></center>
                  <h4 align="center">Fig {item.fig}. {item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
