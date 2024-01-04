import { createContext, useContext, useEffect } from "react";
import { ref, set } from 'firebase/database';
import { database } from './firebase';

// Hàm để tạo ID dựa trên thời gian thực
const taoIdTheoThoiGian = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Add leading zero
    const day = String(now.getDate()).padStart(2, '0'); // Add leading zero
    const hours = String(now.getHours()).padStart(2, '0'); // Add leading zero
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Add leading zero
    const seconds = String(now.getSeconds()).padStart(2, '0'); // Add leading zero
    const milliseconds = now.getMilliseconds();

    // Tạo một chuỗi ID từ các thành phần thời gian
    const idTime = `${year}${month}${day}_${hours}${minutes}${seconds}${milliseconds}`;

    return idTime;
};


export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const idTime = taoIdTheoThoiGian();
    const writeUserData = (userId, name, mes, img) => {
        set(ref(database, `user/${userId}/${idTime}`), {
            username: name,
            mes: mes,
            Img: img
        });
        console.log(`User ${userId}`)
    }

    return (
        <ChatContext.Provider value={{ writeUserData }}>
            {children}
        </ChatContext.Provider>
    );
};
