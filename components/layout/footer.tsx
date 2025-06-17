import Logo from '@/public/Logo.svg';
import Image from 'next/image';
const Footer = () => {
    return (
        <footer className="bg-blue-ocean/85 text-white py-6 border-t">
            <div className="flex flex-col md:flex-row justify-center items-center space-x-4">
                <Image src={Logo} alt="Blog Logo" width={80} height={80} />
                <p className="text-sm">© 2025 Blog genzet. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;