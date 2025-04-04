import React from 'react';
import Image from 'next/image';

interface AvatarProps {
    src: string;
    alt: string;
    size?: number; // Optional, default size will be applied if not provided
}

export const Avatar = ({ 
    src, alt, size = 50 
}: AvatarProps) => {
    const fallbackSrc = src || '/default-avatar.png';
    console.log('Avatar src:', fallbackSrc);

    return (
        <Image
            src={fallbackSrc}
            alt={alt}
            width={size}
            height={size}
            className="rounded-full object-cover"
        />
    );
};
