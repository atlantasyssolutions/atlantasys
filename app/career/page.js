import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import ZohoEmbed from '@/components/career/ZohoEmbed';
import careersData from '@/data/careers.json';

export const metadata = {
  title: 'Career Opportunities | Atlanta Systems — IoT Hardware & GPS Telematics Jobs',
  description: 'Join the team shaping the future of connected IoT and telematics. Explore hardware engineering, embedded systems, and software developer roles at Atlanta Systems New Delhi.',
  alternates: { canonical: 'https://www.atlantasys.com/career' },
  openGraph: {
    title: 'Career Opportunities | Atlanta Systems',
    description: 'Explore hardware engineering, embedded systems, and software developer roles at Atlanta Systems.',
    url: 'https://www.atlantasys.com/career',
    siteName: 'Atlanta Systems',
    type: 'website',
  },
};

export default function CareerPage() {
  const activeCareers = (careersData || []).filter((c) => c.status === '1' || c.status === 1);

  return (
    <>
      <Header />

      {/* Hero Banner — exact layout from career.php */}
      <div className="about-area about-top-area" style={{ background: '#F4F4F4' }}>
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-6" style={{ paddingLeft: 0 }}>
              <img src="/assets/img/career/banner.webp" alt="Career at Atlanta Systems" style={{ width: '100%' }} />
            </div>
            <div className="col-md-6" style={{ padding: '20px 30px 0' }}>
              <div className="heading-title">
                <h1 style={{ textAlign: 'left' }}>Ready to Join Us?</h1>
              </div>
              <p align="left">
                Be a part of our team that&apos;s changing the world, one innovation at a time. Together, we&apos;ll shape the future of Technology – Are you in?
              </p>
              <div className="actions">
                <a
                  href="#opening"
                  className="btncta normal-cta edit"
                  style={{ borderColor: '#1A1A1A', color: '#1a1a1a', textTransform: 'capitalize' }}
                >
                  Explore Career Path
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Work With Us */}
      <section className="pt-100 pb-100">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-3">
              <img src="/assets/img/career/atlanta-favicon.webp" alt="Atlanta Systems" />
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-5">
              <div className="career_boxx">
                <div className="heading-title">
                  <h2 style={{ textAlign: 'left' }}>Why Work With Us?</h2>
                </div>
                <br />
                <h4>Innovation at the Core</h4>
                <p>
                  Our commitment to innovation drives us to create cutting-edge products that shape the future of connectivity and location-based services. Join us, and be part of a team that&apos;s pushing the boundaries of technology
                </p>
                <br />
                <h4>Collaborative Environment</h4>
                <p>
                  We believe in the power of teamwork. Our collaborative environment encourages creativity, fosters open communication, and values each team member&apos;s input. Together, we achieve more and build solutions that make a difference.
                </p>
                <br />
                <h4>Career Growth and Development</h4>
                <p>
                  Your growth is our priority. We provide continuous learning opportunities through training programs, workshops, and mentorship. We support your professional journey and help you reach your career goals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join India's Fastest Growing IoT Company */}
      <div className="container-fluid pt-50 pb-50" style={{ background: '#F1F1F1' }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-8 heading-title">
              <h2 style={{ textAlign: 'left' }}>COME, JOIN INDIA&apos;S FASTEST GROWING IOT SOLUTION COMPANY</h2>
              <br />
              <p>
                At Atlanta Systems, we&apos;re on a mission to shape the future by helping our customers realize their missions and nurturing our people&apos;s dreams. We&apos;re not just a company; we&apos;re a community of passionate individuals driven by a shared purpose: to innovate, to push boundaries, and to solve complex business problems.<br /><br />
                We offer more than just a job; we offer a challenging and rewarding experience where every day brings new opportunities for growth and achievement.<br /><br />
                Join us in creating a world where possibilities are limitless, and dreams become reality. If you&apos;re ready to make an impact, to unleash your potential, and to be part of something extraordinary, Atlanta Systems is the place for you
              </p>
            </div>
            <div className="col-md-4">
              <img src="/assets/img/career/career-image.webp" style={{ width: '100%' }} alt="Why join Atlanta Systems" />
            </div>
          </div>
        </div>
      </div>

      {/* Job Openings */}
      <div className="container-fluid pt-50 pb-50" id="opening">
        <div className="container">
          <div className="row">
            <div className="col-md-12 heading-title">
              <h2 align="center">Job <span>Openings</span></h2>
            </div>
          </div>
          <br />
          <div className="row">
            {/* Zoho Recruit embed */}
            <link rel="stylesheet" href="https://static.zohocdn.com/recruit/embed_careers_site/css/v1.1/embed_jobs.css" type="text/css" />
            <div className="embed_jobs_head embed_jobs_with_style_3">
              <div className="embed_jobs_head2">
                <div className="embed_jobs_head3">
                  <ZohoEmbed />
                </div>
              </div>
            </div>

            {/* Static career table from JSON data */}
            <div className="col-md-12 col-lg-12 col-xs-12 col-sm-12">
              <table className="table table-striped career_table">
                <tbody>
                  {activeCareers.length > 0 ? (
                    activeCareers.map((job) => (
                      <tr key={job.id}>
                        <td className="job_position align-middle">{job.job_position}</td>
                        <td className="align-middle">
                          <i className="fas fa-map-marker-alt"></i> {job.location}
                        </td>
                        <td className="align-middle">
                          <Link href={`/career/${job.id}`} className="career-btn">APPLY NOW</Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3}>
                        <h4 style={{ fontWeight: 700 }} align="center">Sorry! There is no vacancy. Check again later</h4>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
