import { Avatar } from '@/components/avatar';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <div>
            <div className="relative w-full h-[600px]">
                <Image
                    src="/coast.jpg"
                    alt="Pacific coast"
                    fill
                    className="object-cover"
                />
                <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[2.2rem] font-semibold tracking-[2px] drop-shadow-md">
                    ABOUT US
                </h1>
            </div>

            <div className="max-w-[800px] mx-auto my-[60px] px-5 text-[1.2rem] leading-[1.8] text-[#1a1a1a] font-normal">
                <p className="text-center">
                    As opportunities for higher education expand across Asia and the Pacific, students and graduates from accredited universities—especially BYUH—are gaining access to more competitive jobs and top-tier companies. Pacific Connect Virtual Career Fair is designed to bridge the gap between incredible companies and talented students and alumni from BYUH and beyond. We believe in the potential of every student and the power of meaningful connections, making it easier for companies to discover and connect with the next generation of talented professionals from the Pacific and Asia region.
                </p>
            </div>

            <h2 className="text-center text-[2rem] mt-10 mb-[30px]">Our Team</h2>
            
            <div className="flex flex-wrap justify-center gap-5 p-5">
                <Avatar src="/jesse.jpg" alt="avatar img" name="Jesse" title='PM' linkedinUrl='https://www.linkedin.com/in/jessemoncur/' porfotlioUrl='https://jessemoncur.wixsite.com/jesse-s-moncur'/>
                <Avatar src="/daniel.jpeg" alt="avatar img" name="Daniel" title='Developer' linkedinUrl='https://www.linkedin.com/in/daniel-hootini/' githubUrl='https://github.com/DanielH987' porfotlioUrl='https://danielh987.github.io/portfolio/'/>
                <Avatar src="/momo.jpg" alt="avatar img" name="Momo" title='Developer' linkedinUrl='https://www.linkedin.com/in/momochan-hk/' githubUrl='https://github.com/MOKOJOPE' porfotlioUrl='https://mokojope.github.io/MYPORFLIE/'/>
                <Avatar src="/fah.jpg" alt="avatar img" name="Fah" title='Developer' linkedinUrl='https://www.linkedin.com/in/kanlaya-berger/' githubUrl='https://github.com/Om4njuu' porfotlioUrl='https://om4njuu.github.io/Portfolio/'/>
                <Avatar src="/hyun.png" alt="avatar img" name="Hyun" title='Developer' linkedinUrl='https://www.linkedin.com/in/kim-hyun/' githubUrl='https://github.com/hyunkimdev' porfotlioUrl='https://hyunkimdev.github.io/'/>                
            </div>
        </div>
    );
}