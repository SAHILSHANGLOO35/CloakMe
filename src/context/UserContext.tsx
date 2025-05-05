"use client";

import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState({ username: "Anonymous", isLoggedIn: false });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/api/user`);
                if (response.data.user?.username) {
                    setUser({ username: response.data.user.username, isLoggedIn: true });
                } else {
                    setUser({ username: "Anonymous", isLoggedIn: false });
                }
            } catch (error) {
                console.log("User not authenticated:", error);
                setUser({ username: "Anonymous", isLoggedIn: false });
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
