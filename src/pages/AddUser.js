import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addSingleUser, updateUser, Useradd } from '../redux/action';
import { useNavigate, useParams } from 'react-router-dom';

const AddUser = () => {
    const [state, setState] = useState({
        name: "",
        email: "",
        contact: "",
        address: "",
    });
    console.log("statestate",state);
    const [error , setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.data)
    console.log("user",user);
    let { id } = useParams();
    useEffect(() => {
        if (user) {
            setState({ ...user })
        }
    }, [user]);
    useEffect(() => {
        dispatch(addSingleUser(id))
    },[]);

const { name, email, contact, address } = state;

const handelSubmit =() =>{
    if (!name ||!email||!contact||!address) {
        setError('Please input all field')
    } else {
            dispatch(Useradd(state))
            navigate('/')
            setError('')
        }
    }
    const handelEdit = () => {
        if (!name || !email || !contact || !address) {
            setError('Please input all field')
        } else {
            dispatch(updateUser(state,id))
            navigate('/')
            setError('')
        }
    }

    const handleInputChange = (e) =>{
        const {name,value} = e.target;
        setState({...state,[name]:value})
    }

    return (
        <div style={{marginTop:50}}>
        <Button style={{width:100}} variant="contained" onClick={() => navigate('/')}>Back</Button>

            <h2>{user.id != null? `Edit User` : `Add User`}</h2>
            <p>{error && <p style={{color:'red'}}>{error}</p>}</p>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '55ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" label="Name" value={name || ""} type="text" name='name' onChange={handleInputChange} />
                <br />
                <TextField id="filled-basic" label="Email" value={email || ""} type="email" name='email' onChange={handleInputChange}/>
                <br />
                <TextField id="standard-basic" label="Contact" value={contact || ""} type="number" name='contact' onChange={handleInputChange}/>
                <br />
                <TextField id="standard-basic" label="Address" value={address ||""} type="text" name='address' onChange={handleInputChange}/>
                <br />
                <Button style={{width:100}} variant="contained" onClick={() => user.id != null?  handelEdit(): handelSubmit()}>Submit</Button>
            </Box>
        </div>
    )
}

export default AddUser