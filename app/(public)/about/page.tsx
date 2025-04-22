import { Avatar } from '@/components/avatar';

export default function AboutPage() {
    return (
        <div>
            <h1>About Us</h1>
            <div style={{ padding: '10px' }}>
                <Avatar src="/daniel.jpeg" alt="avatar img" name="Daniel" title='Developer' linkedinUrl='https://www.linkedin.com/in/daniel-hootini/' githubUrl='https://github.com/DanielH987' porfotlioUrl='https://danielh987.github.io/portfolio/'/>
                <Avatar src="/favicon.ico" alt="avatar img" name="Momo" title='Developer'/>
                <Avatar src="/favicon.ico" alt="avatar img" name="Jesse" title='PM'/>
            </div>
            <p>Welcome to our website! We are passionate about building amazing experiences for our users.</p>
        </div>
    );
}