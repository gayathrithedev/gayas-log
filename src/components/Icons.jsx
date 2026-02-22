import React from 'react';

const IconWrapper = ({ size = 24, className = "", children, ...props }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...props}
    >
        {children}
    </svg>
);

export const X = (props) => (
    <IconWrapper {...props}>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
    </IconWrapper>
);

export const Home = (props) => (
    <IconWrapper {...props}>
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
    </IconWrapper>
);

export const Calendar = (props) => (
    <IconWrapper {...props}>
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <line x1="16" x2="16" y1="2" y2="6" />
        <line x1="8" x2="8" y1="2" y2="6" />
        <line x1="3" x2="21" y1="10" y2="10" />
    </IconWrapper>
);

export const Archive = (props) => (
    <IconWrapper {...props}>
        <rect width="20" height="5" x="2" y="3" rx="1" />
        <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
        <path d="M10 12h4" />
    </IconWrapper>
);

export const Timer = (props) => (
    <IconWrapper {...props}>
        <line x1="10" x2="14" y1="2" y2="2" />
        <line x1="12" x2="15" y1="14" y2="11" />
        <circle cx="12" cy="14" r="8" />
    </IconWrapper>
);

export const BookOpen = (props) => (
    <IconWrapper {...props}>
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </IconWrapper>
);

export const Sun = (props) => (
    <IconWrapper {...props}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
    </IconWrapper>
);

export const Moon = (props) => (
    <IconWrapper {...props}>
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </IconWrapper>
);

export const LogOut = (props) => (
    <IconWrapper {...props}>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" x2="9" y1="12" y2="12" />
    </IconWrapper>
);

export const MapPin = (props) => (
    <IconWrapper {...props}>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
    </IconWrapper>
);

export const Clock = (props) => (
    <IconWrapper {...props}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </IconWrapper>
);

export const Download = (props) => (
    <IconWrapper {...props}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" x2="12" y1="15" y2="3" />
    </IconWrapper>
);

export const Linkedin = (props) => (
    <IconWrapper {...props}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
    </IconWrapper>
);

export const Mail = (props) => (
    <IconWrapper {...props}>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </IconWrapper>
);

export const Github = (props) => (
    <IconWrapper {...props}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
    </IconWrapper>
);

export const Twitter = (props) => (
    <IconWrapper {...props}>
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 12.5S1.2 2.9 8.3 7.6l8.5.2a5.5 5.5 0 0 0 3.8-1.3l.5-2.5Z" />
    </IconWrapper>
);

export const XSocial = (props) => (
    <IconWrapper {...props} fill="currentColor" stroke="none">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </IconWrapper>
);

export const Play = (props) => (
    <IconWrapper {...props}>
        <polygon points="5 3 19 12 5 21 5 3" />
    </IconWrapper>
);

export const Pause = (props) => (
    <IconWrapper {...props}>
        <rect width="4" height="16" x="6" y="4" />
        <rect width="4" height="16" x="14" y="4" />
    </IconWrapper>
);

export const RotateCcw = (props) => (
    <IconWrapper {...props}>
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
    </IconWrapper>
);

export const ChevronDown = (props) => (
    <IconWrapper {...props}>
        <path d="m6 9 6 6 6-6" />
    </IconWrapper>
);

export const ChevronRight = (props) => (
    <IconWrapper {...props}>
        <path d="m9 18 6-6-6-6" />
    </IconWrapper>
);

export const Zap = (props) => (
    <IconWrapper {...props}>
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </IconWrapper>
);
