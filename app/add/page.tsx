"use client"
import axios from "axios";
import { useState } from "react";

export default function Add() {

    const [body,setBody] =  useState('');
    const [user,setUser] =  useState('');
    const handleInputChange = (
        event: React.ChangeEvent<
          HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
      ) => {
       // alert(event.target.name);
        if (event.target.name.toLowerCase().includes('body')) {
          setBody(event.target.value);
        }
        else  if (event.target.name.toLowerCase().includes('user')) {
            setUser(event.target.value);
          }
    }
    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const name =user;//'test';// e.target[0].value;
        const message =body;//'test message';// e.target[1].value;
        const tpe='chat';
        axios.post("https://mdsexp.azurewebsites.net/api", { name, message,tpe })//https://mango-sky-000567500.5.azurestaticapps.net
            .then((res) => {
                console.log(res)
            })

        console.log("submitted", name, message)
    }

    return (
        <main className="flex p-10 justify-center gap-6">
            <div className="w-full max-w-xs">

                <h2 className="text-center my-5 text-2xl">
                    Send New Notification
                </h2>
                <form className="bg-white shadow-md 
                                 rounded px-8 pt-6 
                                 pb-8 mb-4"
                    onSubmit={handleSubmit}>
                  <div className="mb-6">
                        <label
                            className="block text-gray-700 
                                       text-sm font-bold mb-2"
                        >
                            Sender
                        </label>
                        <input name="user" id="user"
                            className="shadow appearance-none 
                                       border rounded w-full
                                        py-2 px-3 text-gray-700 
                                       leading-tight 
                                       focus:outline-none
                                         focus:shadow-outline"
                            type="text" onChange={handleInputChange}
                            placeholder="Message"
                        />

                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-gray-700 
                                       text-sm font-bold mb-2"
                        >
                            Notification Message
                        </label>
                        <input name="body" id="body"
                            className="shadow appearance-none 
                                       border rounded w-full
                                        py-2 px-3 text-gray-700 
                                       leading-tight 
                                       focus:outline-none
                                         focus:shadow-outline"
                            type="text" onChange={handleInputChange}
                            placeholder="Message"
                        />

                    </div>
                    <div className="flex items-center 
                                    justify-between">
                        <button className="bg-blue-500 
                                              hover:bg-blue-700 
                                           text-white
                                               font-bold py-2 px-4 
                                              rounded 
                                           focus:outline-none
                                                focus:shadow-outline"
                            type="submit"
                        >
                            Send
                        </button>

                    </div>
                </form>
            </div>
        </main>
    );
}