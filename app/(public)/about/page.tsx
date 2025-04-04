import { Avatar } from '@/components/avatar';

export default function AboutPage() {
    return (
        <div>
            <h1>About Us</h1>
            <Avatar src="/favicon.ico" alt="avatar img" name="Daniel" title='Developer'/>
            <Avatar src="/favicon.ico" alt="avatar img" name="Momo" title='Developer'/>
            <Avatar src="/favicon.ico" alt="avatar img" name="Jesse" title='PM'/>
            <p>Welcome to our website! We are passionate about building amazing experiences for our users.</p>
        </div>
    );
}