import React from 'react';
import Image from 'next/image';
import { FaLinkedin, FaGithub, FaLink } from 'react-icons/fa';

interface AvatarProps {
    src: string;
    alt: string;
    size?: number;
    name: string;
    title: string;
    linkedinUrl?: string;
    githubUrl?: string;
    porfotlioUrl?: string;
}

export const Avatar = ({ 
    src, alt, size = 50, name, title, linkedinUrl, githubUrl, porfotlioUrl
}: AvatarProps) => {
    const fallbackSrc = src || '/default-avatar.png';

    return (
        <div className="w-80 p-6 border rounded-2xl shadow-md bg-white flex flex-col items-center space-y-4">
            <Image
                src={fallbackSrc}
                alt={alt}
                width={size}
                height={size}
                className="rounded-full object-cover"
            />
            <div className="flex space-x-4">
                {linkedinUrl && (
                    <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-black-600 hover:text-blue-800">
                        <FaLinkedin size={20} />
                    </a>
                )}
                {githubUrl && (
                    <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-black-400 hover:text-blue-600">
                        <FaGithub size={20} />
                    </a>
                )}
                {porfotlioUrl && (
                    <a href={porfotlioUrl} target="_blank" rel="noopener noreferrer" className="text-black-400 hover:text-blue-600">
                        <FaLink size={20} />
                    </a>
                )}
            </div>
            <div className="text-center">
                <h2 className="text-xl font-semibold">{name}</h2>
                <p className="text-sm text-gray-500 mt-1">{title}</p>
            </div>
        </div>
    );
};
