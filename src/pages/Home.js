import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { loadUsers, UserDelete } from '../redux/action';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useNavigate } from 'react-router-dom';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const Home = () => {
    let dispatch = useDispatch();
    const navigate = useNavigate();

    const data = useSelector((state) => state.data.users)
    // console.log("data", data);
    useEffect(() => {
        dispatch(loadUsers());
    }, []);

    const handelDelete = (id) => {
        dispatch(UserDelete(id))
    }
    return (
        <div>
            <div style={{marginTop:60,textAlign:'end',marginRight:35}}>
                <Button variant="contained" onClick={() => navigate('addUser')}>User Add</Button>
            </div>
            <TableContainer component={Paper}>
                <Table style={{ marginTop: 30 }} sx={{ minWidth: 900 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Index</StyledTableCell>
                            <StyledTableCell align="center">Name</StyledTableCell>
                            <StyledTableCell align="center">Email</StyledTableCell>
                            <StyledTableCell align="center">Contact</StyledTableCell>
                            <StyledTableCell align="center">Address</StyledTableCell>
                            <StyledTableCell align="center">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data && data.map((user, index) => (
                            <StyledTableRow key={user.id}>
                                <StyledTableCell component="th" scope="row">
                                    {index + 1}
                                </StyledTableCell>
                                <StyledTableCell align="center">{user.name}</StyledTableCell>
                                <StyledTableCell align="center">{user.email}</StyledTableCell>
                                <StyledTableCell align="center">{user.contact}</StyledTableCell>
                                <StyledTableCell align="center">{user.address}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <ButtonGroup variant="contained" aria-label="contained button">
                                        <Button style={{ marginRight: '5px' }} color="error" onClick={() => handelDelete(user.id)}>Delete</Button>
                                        <Button onClick={() => navigate(`editUser/${user.id}`)}>Edit</Button>
                                    </ButtonGroup>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Home