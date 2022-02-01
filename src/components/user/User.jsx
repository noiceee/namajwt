import './user.scss';
import dustbin from './icons8-trash.svg';
import axios from 'axios';

export default function User({address, email, username, mobileNumber, setUsersFunc}) {
    console.log(setUsersFunc);

    function handleClick(e){
        axios.delete(`users/${username}`, {
            headers: {token : localStorage.getItem("token")}
        }).then(res => {
            console.log(res);
            setUsersFunc(res.data);
        }).catch(err => {
            console.log(err);
        });
    }

    return <div className='user'>
        <div className="info-wrapper">
            <div className="left">
                <span>{username}</span>
                <span>{mobileNumber}</span>
            </div>
            <span>{email}</span>
        </div>
        <div className="bottom-wrapper">
            {address}
            <img src={dustbin} alt="delete" onClick={handleClick}/>
        </div>
    </div>;
}
