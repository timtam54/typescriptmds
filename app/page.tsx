"use client"
import { useEffect, useMemo, useState } from "react";
import { Toaster, toast } from "sonner";
import * as io from "socket.io-client";

const messageSound = '/public/sound/message.mp3';
import { EventEmitterAsyncResource } from "stream";
interface notrec {
    name:string;
    message:string;

}
export default function Home() {
   
    //const socket = io.connect("https://mdsexp.azurewebsites.net")//should be io.connect("https://mdsexpress.azurewebsites.net")

const socket = io.connect("https://mdsexp.azurewebsites.net", {
  withCredentials: true,
  extraHeaders: {
    "Access-Control-Allow-Origin": "*"
    }
});

    useEffect(() => {
        socket.on("connect_error", (err) => {
            // the reason of the error, for example "xhr poll error"
            console.log(err.message);
          
            // some additional description, for example the status code of the initial HTTP response
            console.log(err.message);//description
          
            // some additional context, for example the XMLHttpRequest object
            //console.log(err.context);
          });
        socket.on('connect', () => {
            console.log(`Connected to server`);
        })

        socket.on('notification', (data:notrec) => {
            console.log(`Notification from server`);
             new Audio('./sound/message.mp3').play();
             toast(data.name + ': '+ data.message);
            setNotifications([...notifications, data])
        })

        socket.on('disconnect', () => {
            console.log(`Disconnected from server`);
        })
    }, [socket])

    
    const [notifications, setNotifications] = useState<notrec[]>([]);
    const ply=async()=>
        {
            alert('play');
            await new Audio('./sound/message.mp3').play();
        
            alert('played');
        }
    return (
        <>
          <button
        onClick={ply}>Play
    </button>
        <main className="grid grid-cols-3 p-24 gap-6">

            {
                notifications ? notifications.map((notification, index) => {
                    return (
                        <div key={index} id="toast-message-cta"
                            className="w-full max-w-xs p-4 text-gray-500 
                        bg-white rounded-lg shadow dark:bg-gray-800 
                        dark:text-gray-400" role="alert">
                            <div className="flex">
                                <img className="w-8 h-8 rounded-full"
                                    src="notification.png" alt="Jese Leos image" />
                                <div className="ms-3 text-sm font-normal">
                                    <span className="mb-1 text-sm font-semibold
                                 text-gray-900 dark:text-white">
                                        {notification.name}</span>
                                    <div className="mb-2 text-sm font-normal">
                                        {notification.message}</div>
                                    <a href="#" className="inline-flex px-2.5
                                 py-1.5 text-xs font-medium text-center 
                                 text-white bg-blue-600 rounded-lg hover:bg-blue-700
                                  focus:ring-4 focus:outline-none focus:ring-blue-300
                                   dark:bg-blue-500 dark:hover:bg-blue-600 
                                   dark:focus:ring-blue-800">Reply</a>
                                </div>
                                <button type="button" className="ms-auto -mx-1.5
                             -my-1.5 bg-white justify-center items-center
                              flex-shrink-0 text-gray-400 hover:text-gray-900
                               rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5
                                hover:bg-gray-100 inline-flex h-8 w-8 
                                dark:text-gray-500 dark:hover:text-white dark:bg-gray-800
                                 dark:hover:bg-gray-700"
                                    data-dismiss-target="#toast-message-cta"
                                    aria-label="Close">
                                    <span className="sr-only">Close</span>
                                    <svg className="w-3 h-3" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor"
                                            strokeLinecap="round" strokeLinejoin="round"
                                            strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )
                }) : null

            }
        </main>
        </>

    );
}