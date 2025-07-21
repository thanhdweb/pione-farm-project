import React from "react";
import { useId } from "react";

export const DropdownIcon = ({ className = "" }: { className?: string }) => (
    <svg
        className={`w-3 h-3 ${className}`}
        viewBox="0 0 12 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.248959 0.248959C0.580905 -0.0829864 1.1191 -0.0829864 1.45104 0.248959L5.85 4.64792L10.249 0.248959C10.5809 -0.0829864 11.1191 -0.0829864 11.451 0.248959C11.783 0.580905 11.783 1.1191 11.451 1.45104L6.45104 6.45104C6.11909 6.78299 5.5809 6.78299 5.24896 6.45104L0.248959 1.45104C-0.0829864 1.1191 -0.0829864 0.580905 0.248959 0.248959Z"
            fill="#7C8DB5"
        />
    </svg>
);

export const DropdownIconNav = ({ className = "" }: { className?: string }) => (
    <svg
        className={`!w-3 !h-3 ${className}`}
        viewBox="0 0 12 7"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.248959 0.248959C0.580905 -0.0829864 1.1191 -0.0829864 1.45104 0.248959L5.85 4.64792L10.249 0.248959C10.5809 -0.0829864 11.1191 -0.0829864 11.451 0.248959C11.783 0.580905 11.783 1.1191 11.451 1.45104L6.45104 6.45104C6.11909 6.78299 5.5809 6.78299 5.24896 6.45104L0.248959 1.45104C-0.0829864 1.1191 -0.0829864 0.580905 0.248959 0.248959Z"
            fill="#ffffff"
        />
    </svg>
);

export const SearchIcon = ({ className = "", fill = "white", }: { className?: string; fill?: string; }) => (
    <svg
        className={`w-4 h-4 ${className}`}
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M14.5873 14.5873C14.0371 15.1376 13.1452 15.1376 12.5949 14.5873L10.1087 12.1011C9.08655 12.7568 7.87832 13.1475 6.57376 13.1475C2.94343 13.1475 0 10.2045 0 6.57373C0 2.94299 2.94343 0 6.57376 0C10.2046 0 13.1475 2.94293 13.1475 6.57373C13.1475 7.87785 12.7563 9.08655 12.1011 10.1092L14.5873 12.5954C15.1376 13.1456 15.1376 14.0371 14.5873 14.5873ZM6.57376 1.8782C3.98066 1.8782 1.87822 3.98016 1.87822 6.5737C1.87822 9.16724 3.98069 11.2692 6.57376 11.2692C9.16726 11.2692 11.2693 9.16724 11.2693 6.5737C11.2693 3.98016 9.16726 1.8782 6.57376 1.8782Z"
            fill={fill}
        />
    </svg>
);

export const GoogleIcon = ({ className = '' }: { className?: string }) => (
    <svg
        width="42"
        height="42"
        viewBox="0 0 42 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <rect x="1.00024" y="1.4502" width="40" height="40" fill="#FAFAFA" stroke="#EEEEEE" />
        <mask id="mask0" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="7" y="7" width="29" height="29">
            <rect x="7.00024" y="7.4502" width="28" height="28" fill="white" />
        </mask>
        <g mask="url(#mask0)">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M32.4399 19.165H31.5002V19.1165H21.0002V23.7832H27.5936C26.6317 26.4998 24.0469 28.4499 21.0002 28.4499C17.1344 28.4499 14.0002 25.3156 14.0002 21.4499C14.0002 17.5841 17.1344 14.4499 21.0002 14.4499C22.7846 14.4499 24.408 15.123 25.6441 16.2226L28.944 12.9227C26.8603 10.9808 24.0732 9.7832 21.0002 9.7832C14.5572 9.7832 9.3335 15.007 9.3335 21.4499C9.3335 27.8928 14.5572 33.1165 21.0002 33.1165C27.4431 33.1165 32.6668 27.8928 32.6668 21.4499C32.6668 20.6676 32.5863 19.904 32.4399 19.165Z"
                fill="#FFC107"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.6787 16.0196L14.5118 18.8307C15.549 16.2629 18.0608 14.4499 21.0002 14.4499C22.7846 14.4499 24.408 15.123 25.6441 16.2226L28.944 12.9227C26.8604 10.9808 24.0732 9.7832 21.0002 9.7832C16.519 9.7832 12.6329 12.3131 10.6787 16.0196Z"
                fill="#FF3D00"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.0003 33.1168C24.0138 33.1168 26.7519 31.9635 28.8222 30.0881L25.2113 27.0326C24.04 27.9199 22.584 28.4501 21.0003 28.4501C17.9658 28.4501 15.3892 26.5152 14.4185 23.8149L10.614 26.7462C12.5448 30.5244 16.466 33.1168 21.0003 33.1168Z"
                fill="#4CAF50"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M32.44 19.1656H31.5002V19.1172H21.0002V23.7839H27.5937C27.1317 25.0888 26.2922 26.214 25.2096 27.0336C25.2102 27.033 25.2107 27.033 25.2113 27.0324L28.8222 30.0879C28.5667 30.3201 32.6669 27.2839 32.6669 21.4505C32.6669 20.6683 32.5864 19.9047 32.44 19.1656Z"
                fill="#1976D2"
            />
        </g>
    </svg>
);

// AppleIcon.tsx
export const AppleIcon = ({ className = '' }: { className?: string }) => (
    <svg
        width="42"
        height="42"
        viewBox="0 0 42 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <rect x="1.00024" y="1.4502" width="40" height="40" fill="#FAFAFA" stroke="#EEEEEE" />
        <mask id="apple-mask0" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="5" y="5" width="33" height="33">
            <rect x="5.00024" y="5.4502" width="32" height="32" fill="white" />
        </mask>
        <g mask="url(#apple-mask0)">
            <mask id="apple-mask1" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="10" y="7" width="22" height="29">
                <rect x="10.0002" y="7.4502" width="21" height="28" fill="white" />
            </mask>
            <g mask="url(#apple-mask1)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M27.4292 22.1449C27.4182 20.1379 28.326 18.623 30.1635 17.5074C29.1354 16.0363 27.5823 15.2269 25.5315 15.0683C23.5901 14.9152 21.4682 16.2004 20.6917 16.2004C19.8713 16.2004 17.9901 15.123 16.5135 15.123C13.462 15.1722 10.219 17.5566 10.219 22.4074C10.219 23.8402 10.4815 25.3204 11.0065 26.848C11.7065 28.8551 14.2331 33.7769 16.869 33.6949C18.2471 33.6621 19.2206 32.716 21.0143 32.716C22.7534 32.716 23.6557 33.6949 25.1924 33.6949C27.8502 33.6566 30.1362 29.1832 30.8034 27.1707C27.2377 25.4918 27.4291 22.2488 27.4291 22.1449ZM24.3338 13.165C25.8268 11.3932 25.6901 9.77988 25.6463 9.2002C24.3284 9.27676 22.8026 10.0971 21.9331 11.1088C20.976 12.1916 20.4127 13.5314 20.5331 15.0408C21.9604 15.1502 23.262 14.4174 24.3338 13.165Z"
                    fill="black"
                />
            </g>
        </g>
    </svg>
);

// FacebookIcon.tsx
export const FacebookIcon = ({ className = '' }: { className?: string }) => (
    <svg
        width="42"
        height="42"
        viewBox="0 0 42 42"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <rect x="1.00024" y="1.4502" width="40" height="40" fill="#FAFAFA" stroke="#EEEEEE" />
        <mask id="fb-mask0" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="5" y="5" width="33" height="33">
            <rect x="5.00024" y="5.4502" width="32" height="32" fill="white" />
        </mask>
        <g mask="url(#fb-mask0)">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M21.0003 8.78369C14.0047 8.78369 8.33364 14.4547 8.33362 21.4503C8.3336 28.4459 14.0046 34.117 21.0002 34.117C27.9958 34.117 33.6669 28.446 33.6669 21.4504C33.667 14.4548 27.9959 8.78374 21.0003 8.78369H21.0003Z"
                fill="#039BE5"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22.7149 24.8072H25.9929L26.5076 21.4772H22.7142V19.6572C22.7142 18.2739 23.1662 17.0472 24.4602 17.0472H26.5396V14.1412C26.1742 14.0919 25.4016 13.9839 23.9416 13.9839C20.8929 13.9839 19.1056 15.5939 19.1056 19.2619V21.4772H15.9716V24.8072H19.1056V33.9599C19.7262 34.0532 20.3549 34.1166 21.0002 34.1166C21.5836 34.1166 22.1529 34.0632 22.7149 33.9872V24.8072Z"
                fill="white"
            />
        </g>
    </svg>
);

export const BellIcon = () => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.85002 9C6.85002 7.68111 7.29061 6.39001 8.13533 5.43971C8.96613 4.50505 10.2307 3.85 12 3.85C13.7694 3.85 15.0339 4.50505 15.8647 5.43971C16.7094 6.39001 17.15 7.68111 17.15 9C17.15 10.2596 17.7766 11.1982 18.2542 11.9137L18.2928 11.9715C18.8111 12.7489 19.15 13.2938 19.15 14C19.15 14.9743 18.4563 15.7578 17.0165 16.3363C15.599 16.9058 13.7185 17.15 12 17.15C10.2816 17.15 8.40102 16.9058 6.98359 16.3363C5.54375 15.7578 4.85002 14.9743 4.85002 14C4.85002 13.3065 5.17424 12.8297 5.69813 12.0754C6.20176 11.3504 6.85002 10.4078 6.85002 9ZM12 2.15C9.76938 2.15 8.03393 2.99495 6.86473 4.31029C5.70944 5.60999 5.15002 7.31889 5.15002 9C5.15002 9.83353 4.79829 10.391 4.30191 11.1056L4.23218 11.2057C3.76258 11.8785 3.15002 12.7561 3.15002 14C3.15002 16.0257 4.67852 17.2422 6.3498 17.9137C8.04348 18.5942 10.1629 18.85 12 18.85C13.8371 18.85 15.9566 18.5942 17.6503 17.9137C19.3215 17.2422 20.85 16.0257 20.85 14C20.85 12.7404 20.2235 11.8018 19.7458 11.0863L19.7073 11.0285C19.189 10.2511 18.85 9.70622 18.85 9C18.85 7.31889 18.2906 5.60999 17.1353 4.31029C15.9661 2.99495 14.2307 2.15 12 2.15ZM9.52853 19.2928C9.91605 19.0344 10.4386 19.1363 10.7011 19.5193L10.7074 19.5278C10.7165 19.5397 10.7342 19.5621 10.7603 19.5915C10.8132 19.6511 10.897 19.7352 11.01 19.82C11.2336 19.9877 11.559 20.15 12 20.15C12.441 20.15 12.7665 19.9877 12.99 19.82C13.1031 19.7352 13.1868 19.6511 13.2397 19.5915C13.2659 19.5621 13.2836 19.5397 13.2927 19.5278L13.299 19.5193C13.5615 19.1363 14.084 19.0344 14.4715 19.2928C14.8621 19.5532 14.9677 20.0809 14.7073 20.4715L14 20C14.7073 20.4715 14.7071 20.4718 14.7068 20.4721L14.7064 20.4728L14.7054 20.4742L14.7033 20.4774L14.6983 20.4847L14.6849 20.5038C14.6746 20.5184 14.6612 20.5367 14.6449 20.5581C14.6123 20.6009 14.5675 20.6566 14.5103 20.721C14.3966 20.8489 14.2303 21.0148 14.01 21.18C13.5669 21.5123 12.8924 21.85 12 21.85C11.1077 21.85 10.4332 21.5123 9.99002 21.18C9.76974 21.0148 9.60348 20.8489 9.48973 20.721C9.43256 20.6566 9.38775 20.6009 9.35516 20.5581C9.33884 20.5367 9.3255 20.5184 9.31512 20.5038L9.30176 20.4847L9.29673 20.4774L9.29462 20.4742L9.29367 20.4728L9.29322 20.4721C9.293 20.4718 9.29278 20.4715 10 20L9.29278 20.4715C9.03238 20.0809 9.13793 19.5532 9.52853 19.2928Z"
                fill="black"
            />
        </svg>
    );
};

// icon banner-------------------------------
// BlueDotIcon.tsx
export const BlueDotIcon = ({ className = '' }: { className?: string }) => {
  const id = useId();

  return (
    <svg
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9.30863 18.7793C14.4229 18.7793 18.5689 14.6316 18.5689 9.51516C18.5689 4.39869 14.4229 0.250977 9.30863 0.250977C4.19431 0.250977 0.0483398 4.39869 0.0483398 9.51516C0.0483398 14.6316 4.19431 18.7793 9.30863 18.7793Z"
        fill={`url(#blue_dot_gradient_${id})`}
      />
      <defs>
        <radialGradient
          id={`blue_dot_gradient_${id}`}
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(6.59933 6.49768) scale(12.4352 12.4405)"
        >
          <stop stopColor="#85DEDA" />
          <stop offset="1" stopColor="#599CDA" />
        </radialGradient>
      </defs>
    </svg>
  );
};


// PurpleDotIcon.tsx
export const PurpleDotIcon = ({ className = '' }: { className?: string }) => (
    <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            d="M21.1432 21.0263C25.8259 16.3416 25.8259 8.74631 21.1432 4.06166C16.4605 -0.622989 8.8684 -0.623001 4.18572 4.06165C-0.496955 8.7463 -0.496944 16.3416 4.18574 21.0263C8.86842 25.7109 16.4605 25.7109 21.1432 21.0263Z"
            fill="url(#purple_gradient)"
        />
        <defs>
            <radialGradient
                id="purple_gradient"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(9.15529 8.6413) scale(16.097 16.1038)"
            >
                <stop stopColor="#D4BDF0" />
                <stop offset="1" stopColor="#A190F0" />
            </radialGradient>
        </defs>
    </svg>
);

// FancyGemIcon.tsx
export const FancyGemIcon = ({ className = '' }: { className?: string }) => (
    <svg
        width="34"
        height="36"
        viewBox="0 0 34 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
    >
        <path
            style={{ mixBlendMode: 'color-dodge' }}
            d="M31.0525 20.8386C32.5176 12.6182 27.464 4.84084 19.7649 3.46746C12.0658 2.09408 4.63676 7.64471 3.17161 15.8651C1.70647 24.0855 6.76005 31.8629 14.4591 33.2362C22.1582 34.6096 29.5873 29.059 31.0525 20.8386Z"
            fill="url(#paint0_radial)"
        />
        <path
            style={{ mixBlendMode: 'color-dodge' }}
            d="M19.2706 6.32869C25.4935 7.44039 29.5786 13.7294 28.3933 20.3785C27.208 27.0275 21.1967 31.5167 14.9738 30.405C8.75089 29.2933 4.66578 23.0042 5.8511 16.3552C7.03641 9.70615 13.0477 5.21699 19.2706 6.32869Z"
            fill="url(#paint1_radial)"
        />
        <path
            d="M16.0004 24.2429L18.5298 24.6982L22.5196 17.7527L18.1064 12.4483L13.0477 11.5483L12.8678 22.1254L16.0004 24.2429Z"
            fill="#2487FB"
        />
        <path
            d="M12.8678 22.1254L17.1222 18.3562L18.1064 12.4483L13.0477 11.5483L12.8678 22.1254Z"
            fill="#1341C4"
        />
        <defs>
            <radialGradient
                id="paint0_radial"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(16.9346 18.4323) rotate(-79.8942) scale(15.1331 14.1073)"
            >
                <stop stopColor="white" />
                <stop offset="0.15" stopColor="#D3D3D3" />
                <stop offset="0.46" stopColor="#797979" />
                <stop offset="0.72" stopColor="#383838" />
                <stop offset="0.9" stopColor="#0F0F0F" />
                <stop offset="1" stopColor="black" />
            </radialGradient>
            <radialGradient
                id="paint1_radial"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(16.9444 18.4377) rotate(-79.8942) scale(12.2403 11.4106)"
            >
                <stop stopColor="#45FFFF" />
                <stop offset="0.15" stopColor="#39D3D3" />
                <stop offset="0.46" stopColor="#217979" />
                <stop offset="0.72" stopColor="#0F3838" />
                <stop offset="0.9" stopColor="#040F0F" />
                <stop offset="1" stopColor="black" />
            </radialGradient>
        </defs>
    </svg>
);

export const SmallGemIcon = ({ className = '' }: { className?: string }) => {
    const id = useId();

    return (
        <svg
            width="19"
            height="19"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <path
                style={{ mixBlendMode: "color-dodge" }}
                d="M15.5245 15.944C12.0109 19.2473 6.29598 18.8874 2.77178 15.1288C-0.752419 11.3701 -0.76299 5.65281 2.75063 2.33888C6.26425 -0.975049 11.9792 -0.604485 15.5034 3.15413C19.0276 6.91274 19.0381 12.6301 15.5245 15.944Z"
                fill={`url(#paint0_radial_${id})`}
            />
            <path
                style={{ mixBlendMode: "color-dodge" }}
                d="M14.3074 14.6418C11.4606 17.3204 6.84629 17.024 3.98883 13.9853C1.13137 10.9467 1.13139 6.31987 3.97827 3.6412C6.82515 0.962525 11.4394 1.25898 14.2969 4.29763C17.1543 7.33629 17.1543 11.9631 14.3074 14.6418Z"
                fill={`url(#paint1_radial_${id})`}
            />
            <path
                d="M6.63463 6.42573L5.48106 7.50567L7.44955 12.0478L11.704 11.8148L14.0111 9.63379L8.84651 5.65283L6.63463 6.42573Z"
                fill="#D4BDF0"
            />
            <path
                d="M8.84651 5.65283L9.13228 9.14675L11.704 11.8148L14.0111 9.63379L8.84651 5.65283Z"
                fill="#B08EF0"
            />
            <defs>
                <radialGradient
                    id={`paint0_radial_${id}`}
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(9.83607 9.32787) rotate(46.792) scale(9.34577 8.71549)"
                >
                    <stop stopColor="white" />
                    <stop offset="0.15" stopColor="#D3D3D3" />
                    <stop offset="0.46" stopColor="#797979" />
                    <stop offset="0.72" stopColor="#383838" />
                    <stop offset="0.9" stopColor="#0F0F0F" />
                    <stop offset="1" />
                </radialGradient>
                <radialGradient
                    id={`paint1_radial_${id}`}
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(9.83606 9.32791) rotate(46.792) scale(7.55575 7.04619)"
                >
                    <stop stopColor="#45FFFF" />
                    <stop offset="0.15" stopColor="#39D3D3" />
                    <stop offset="0.46" stopColor="#217979" />
                    <stop offset="0.72" stopColor="#0F3838" />
                    <stop offset="0.9" stopColor="#040F0F" />
                    <stop offset="1" />
                </radialGradient>
            </defs>
        </svg>
    );
};



