import React from 'react';
import Image from 'next/image';

interface AvatarProps {
    src: string;
    alt: string;
    size?: number; // Optional, default size will be applied if not provided
    name: string;
    title: string;
}

export const Avatar = ({ 
    src, alt, size = 50, name, title
}: AvatarProps) => {
    const fallbackSrc = src || '/default-avatar.png';

    return (
        <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm">
            <Image
                src={fallbackSrc}
                alt={alt}
                width={size}
                height={size}
                className="rounded-full object-cover"
            />
            <div>
                <h2 className="text-lg font-semibold">{name}</h2>
                <p className="text-sm text-gray-500">{title}</p>
            </div>
        </div>
    );
};
