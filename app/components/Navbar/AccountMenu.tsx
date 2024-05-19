"use client";
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useState } from 'react';

const AccountMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    // const auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    // const user = useAppSelector(state => state.auth.user);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleMenuItemClick = (item: string) => () => {
        if (item === "Logout") {
            // dispatch(logout());
        }
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                className="text-white"
                onClick={handleToggle}
            >
                {/* {user?.username} */}
                Global
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                    <div className="py-1">
                        {['Profile', 'Logout'].map((item, index) => (
                            <button
                                key={index}
                                onClick={handleMenuItemClick(item)}
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountMenu;
