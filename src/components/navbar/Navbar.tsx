'use client'

import Link from "next/link";
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';

export default function Navbar () {
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const {logout, user, isAuthenticated} = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null); 
   
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node))
                setIsDropdownOpen(false);
        };

        if (isDropdownOpen)
            document.addEventListener('mousedown', handleClickOutside);

        return () => {// Cleanup event listener
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);
 
    const AccountLinksList =
        <div className="flex flex-col min-h-[120px] justify-between absolute py-3 px-4 top-8 right-0 min-w-32 border-stone-700 border-[0.9px] bg-neutral-800 rounded-md border">
            <Link className="text-sm block" href="/dashboard">
                Dashboard
            </Link>
            <Link className="text-sm" onClick={() => { 
                logout();
            }} 
            href="/"> <div className="text-sm block">Logout</div> 
            </Link>
            <Link className="text-sm block" href="/switch-users">
                Switch User
            </Link>
            <Link className="text-sm block" href="/switch-users">
                Add New User 
            </Link>
        </div> 

    const toggleDropdownOpen = () => 
        setIsDropdownOpen(prev => !prev)

    const accountLinksList = 
        <div 
        className="relative flex-0 mr-2 z-1 md:mr-3 cursor-pointer"
            onClick={toggleDropdownOpen}
            ref={dropdownRef}
        >
            <div>
                <FontAwesomeIcon icon={faUser} />
                {isDropdownOpen ? AccountLinksList : null}
            </div>
        </div>;
         
    
    return (
        <nav className="flex w-full items-center justify-between bg-glass border-b-stone-700 border-b-[0.9px] bg-neutral-800 py-2">
                <Link className="flex-1 pt-0.5 ml-5 text-md" href="/">
                    <div className="">
                        <Image width={30} height={30} src="/images/FoodiesLogo2.png" alt={"Foodies Logo"} />
                    </div>
                </Link>
            <div className="flex flex-1 justify-end">
                {/* <Link className="flex-0 mr-5" href="/map">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <FontAwesomeIcon icon={faSearch} />
                </Link>  */}
                {!isAuthenticated &&
                    <>
                        <Link className="grow-0 w-fit pt-0.5 mr-5 text-sm xl:text-lg" href="/login">
                            Login
                        </Link>
                        <Link className="grow-0 w-fit pt-0.5 mr-5 text-sm xl:text-lg" href="/sign-up">
                            Sign up
                        </Link> 
                    </>}
                {isAuthenticated && accountLinksList}
            </div> 
        </nav>
    );
}