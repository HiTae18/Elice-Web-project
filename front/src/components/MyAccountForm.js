import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from 'react-bootstrap';
import axios from "axios";
import DaumPostcode from 'react-daum-postcode';
import UserEditForm from "./UserEditForm";

import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBRow,
    MDBInput,
    MDBSwitch,
    MDBCheckbox,
    MDBIcon
}
    from 'mdb-react-ui-kit';

function MyAccountForm() {

    const [user, setUser] = useState([]);

    const init = async () => {
        const jwt = localStorage.getItem('token')
        await axios.get('http://localhost:5001/api/user', {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then(res => {
            console.log(res.data)
            setUser(res.data)
        })
            .catch(error => console.log(error))

    };
    useEffect(() => {
        init();
    }, []);

    return (
        <>
            <UserEditForm
                user={user}
                setUser={setUser}
            />

<<<<<<< HEAD
                                <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '60%' }}>
                                    <MDBCardBody className='p-5 w-100 d-flex flex-column'>

                                        <p className="mb-1">이름</p>
                                        <div className="user-input">
                                            <MDBInput wrapperClass='mb-4 w-100' label='' id='formUserName' type='text' size="lg"
                                                disabled={disabled} onChange={e => setUserName(e.target.value)} value={userName} />
                                        </div>
                                        <p className="mb-1">비밀번호</p>
                                        <MDBInput wrapperClass='mb-4 w-100' label='' id='formUserPassword' type='password' size="lg" disabled={disabled} onChange={e => setPassword(e.target.value)} value={password} />
                                        <p className="mb-1">비밀번호 확인</p>
                                        <MDBInput wrapperClass='mb-4 w-100' label='' id='formUserConfirmPassword' type='password' size="lg" disabled={disabled} onChange={e => setConfirmPassword(e.target.value)} value={password} />
                                        <p className="mb-1">주소</p>
                                        <MDBInput wrapperClass='mb-4 w-100' label='' id='formUserAddress' type='address' size="lg" disabled={disabled} onChange={e => setAddress(e.target.value)} value={address} />
                                        <p className="mb-1">전화번호</p>
                                        <MDBInput wrapperClass='mb-4 w-100' label='' id='formUserPhoneNumber' type='address' size="lg" disabled={disabled} onChange={e => setPhoneNumber(e.target.value)} value={phoneNumber} />
                                        <MDBBtn size='lg' type="submit">
                                            저장하기
                                        </MDBBtn>

                                    </MDBCardBody>
                                </MDBCard>

                            </MDBCol>
                        </MDBRow>
                    </Form>
                </MDBContainer>
            </div >
=======
>>>>>>> 4b7e48f3db5e4bd425b16ce14ac66bd27a8dfefa
        </>
    );

}


export default MyAccountForm;