import { Avatar } from '@/components/avatar';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <div>
            <div style={{ 
                position: 'relative',
                width: '100%',
                height: '600px'
            }}>
                <Image
                    src="/coast.jpg"
                    alt="Pacific coast"
                    fill
                    style={{ objectFit: 'cover' }}
                />
                <h1 style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'white',
                    fontSize: '2.2rem',
                    fontWeight: '600',
                    letterSpacing: '2px',
                    textShadow: '0 1px 3px rgba(0,0,0,0.5)'
                }}>ABOUT US</h1>
            </div>

            <div style={{
                maxWidth: '800px',
                margin: '60px auto',
                padding: '0 20px',
                fontSize: '1.2rem',
                lineHeight: '1.8',
                color: '#1a1a1a',
                fontWeight: '400'
            }}>
                <p style={{ textAlign: 'center' }}>
                    As opportunities for higher education expand across Asia and the Pacific, students and graduates from accredited universities—especially BYUH—are gaining access to more competitive jobs and top-tier companies. Pacific Connect Virtual Career Fair is designed to bridge the gap between incredible companies and talented students and alumni from BYUH and beyond. We believe in the potential of every student and the power of meaningful connections, making it easier for companies to discover and connect with the next generation of talented professionals from the Pacific and Asia region.
                </p>
            </div>

            <h2 style={{
                textAlign: 'center',
                fontSize: '2rem',
                marginTop: '40px',
                marginBottom: '30px'
            }}>Our Team</h2>
            
            <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '20px',
                padding: '20px'
            }}>
                <Avatar src="/favicon.ico" alt="avatar img" name="Jesse" title='PM'/>
                <Avatar src="/daniel.jpeg" alt="avatar img" name="Daniel" title='Developer' linkedinUrl='https://www.linkedin.com/in/daniel-hootini/' githubUrl='https://github.com/DanielH987' porfotlioUrl='https://danielh987.github.io/portfolio/'/>
                <Avatar src="/momo.jpg" alt="avatar img" name="Momo" title='Developer' linkedinUrl='https://www.linkedin.com/in/momochan-hk/' githubUrl='https://github.com/MOKOJOPE' porfotlioUrl='https://mokojope.github.io/MYPORFLIE/'/>
                <Avatar src="/fah.jpg" alt="avatar img" name="Fah" title='Developer' linkedinUrl='https://www.linkedin.com/in/kanlaya-berger/' githubUrl='https://github.com/Om4njuu' porfotlioUrl='https://om4njuu.github.io/Portfolio/'/>
                <Avatar src="/hyun.png" alt="avatar img" name="Hyun" title='Developer' linkedinUrl='https://www.linkedin.com/in/kim-hyun/' githubUrl='https://github.com/hyunkimdev' porfotlioUrl='https://hyunkimdev.github.io/'/>                

            </div>
        </div>
    );
}