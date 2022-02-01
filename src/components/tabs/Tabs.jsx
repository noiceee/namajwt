import React, { useRef, useState } from 'react';
import User from '../user/User';
import './tabs.scss';
import axios from 'axios';

export default function Tabs({token}) {

    let len = 0;
    const [users, setUsers] = useState();
    const emailRef = useRef();
    const usernameRef = useRef();
    const addressRef = useRef();
    const mobileNumberRef = useRef();

    function setUsersFunc(user){
        setUsers((prevUsers)=>{
            return prevUsers.filter(u=>{
                return u.username != user.username
            });
        });
    }

    if(users){
        len = users.length;
    }else{
        axios.get("/users/", {headers: {"token": token}}).then(res => {
            setUsers(res.data);
        }).catch(err => {
            console.log(err);
        });
    }

    function usernameValidator(name){
        for(let i=0; i<name.length; i++){
            let code = name.charCodeAt(i);
            if (!(code > 47 && code < 58) && // numeric (0-9)
                !(code > 64 && code < 91) && // upper alpha (A-Z)
                !(code > 96 && code < 123)) { // lower alpha (a-z)
            return false;
            }
        }
        return true;
    }

    function handleSubmit(e) {
        if(mobileNumberRef.current.value.length == 10){
            if(usernameValidator(usernameRef.current.value)){
                const content = {
                    "username" : usernameRef.current.value,
                    "mobileNumber":mobileNumberRef.current.value,
                    "address":addressRef.current.value,
                    "email":emailRef.current.value
                }
                axios.post("/users/", content, {headers: {"token" : token}}).then(res => {
                    setUsers((prevData)=>{
                        return [...prevData, res.data]
                    });
                }).catch(err => {
                    console.log(err);
                });
                e.preventDefault();
            }else{
                alert("Username should only contain alphanumeric characters.");
            }
        }else{
            alert("Number Not Valid");
        }
    }

    return <div className="tabs">
        <div className="tab-1">
            <form onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <input type="text" placeholder='Username' name='username' ref={usernameRef}/>
                    <input type="number" name="number" placeholder='Mobile Number' ref={mobileNumberRef}/>
                    <input type="email" name="email" placeholder='Email' ref={emailRef}/>
                    <input type="text" placeholder='Address' name='address' ref={addressRef}/>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
        <div className="tab-2">
            {!len? <span>No users yet.</span> : users.map((element, i) => {
                console.log(element);
                return(
                    <User 
                        key = {i}
                        username = {element.username}
                        mobilenumber = {element.mobileNumber}
                        email= {element.email}
                        address= {element.address}
                        setUsersFunc = {setUsersFunc}
                    />
                )
            })}
        </div>
    </div>;
}
