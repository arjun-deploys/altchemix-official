'use client';

import Image from 'next/image';
import Logo from '@/public/logo/altchemix_logo.webp';
import LogoLight from '@/public/logo/altchemix_logo_light.webp';

type BrandLogoProps = {
  variant?: 'light' | 'dark';
  priority?: boolean;
  className?: string;
};

export default function BrandLogo({
  variant = 'dark',
  priority = false,
  className = '',
}: BrandLogoProps) {
  const selectedLogo = variant === 'light' ? LogoLight : Logo;

  return (
    <div className={`inline-block ${className}`}>
      <Image
        src={selectedLogo}
        alt='Altchemix – Advanced Chemical Solutions'
        width={180}
        height={56}
        priority={priority}
        fetchPriority={priority ? 'high' : 'auto'}
        quality={90}
        sizes='(max-width: 768px) 140px, 180px'
        className='h-14 w-auto object-contain'
        style={{
          width: 'auto',
        }}
        loading='eager'
      />
    </div>
  );
}
