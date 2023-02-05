import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBRow,
    MDBInput,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInputGroup
}
    from 'mdb-react-ui-kit';
import "bootstrap/dist/css/bootstrap.min.css";
import { Form } from 'react-bootstrap';
import * as Api from "../api";
import Postcode from './Postcode'

function MyAccountForm() {
    const [disabled, setDisabled] = useState(true);
    const [formData, setFormData] = useState(
        {
            userName: "",
            address: {
                address1: "",
                address2: "",
                postalCode: ""
            },
            phoneNumber: "",
            _id: ""
        }
    );
    const [currentPassword, setCurrentPassword] = useState('');

    const [popup, setPopup] = useState(false);
    const toggleShow = (e) => {
        e.preventDefault();
        console.log('toggle clicked!');
        setPopup(!popup);
    }



    const init = async () => {
        const jwt = localStorage.getItem('token')
        await axios.get('http://localhost:5001/api/user', {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then(res => {
            console.log(res.data)
            setFormData({ ...res.data });

        }).catch(error => console.log(error))
    };

    useEffect(() => {
        init();
    }, []);



    const handleInputChange = e => {
        console.log(e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleAddressChange = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setFormData({
            ...formData,
            address: {
                ...formData.address,
                [name]: value
            }
        })
    }

    const [postPopup, setPostPopup] = useState(false);
    const handleComplete = (e) => {
        e.preventDefault();
        setPostPopup(!postPopup);
    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        // "users/유저id" 엔드포인트로 patch 요청함.
        const updatedUser = {
            username: formData.userName,
            phoneNumber: formData.phoneNumber || "",
            address: {
                address1: formData.address1 || "",
                address2: formData.address2 || "",
                postalCode: formData.postalCode || ""
            },
            currentPassword: currentPassword,

        };
        const newData = await Api.patch(`users/${formData._id}`, updatedUser);
        console.log(newData);
        alert('수정이 완료되었습니다!')

    };



    const validateForm = ({ userName, password, confirmPassword }) => {
        console.log(userName, password, confirmPassword);

        if (userName.length < 2) {
            return "이름은 2글자 이상이어야합니다.";
        }
        if (password.length < 4) {
            return "비밀번호는 4글자 이상이어야합니다.";
        }
        if (password !== confirmPassword) {
            return "비밀번호가 일치하지 않습니다.";
        }
        return true;
    };


    return (
        <>
            <div className="container">
                <MDBContainer fluid>
                    <div className="edit-button">
                        <MDBBtn className="mb-1 size=sm" color='secondary' size="lg"
                            onClick={(e) => {
                                setDisabled((current) => !current)
                                console.log(disabled)
                            }}>수정하기</MDBBtn>
                    </div>
                    <form >
                        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
                            <MDBCol col='12'>

                                <MDBCard className='bg-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '60%' }}>
                                    <MDBCardBody className='p-5 w-100 d-flex flex-column'>

                                        <p className="mb-1">이름</p>
                                        <div className="user-input">
                                            <MDBInput wrapperClass='mb-4 w-100' label='' name="userName" type='text' size="lg"
                                                disabled={disabled} onChange={handleInputChange} value={formData.userName} />
                                        </div>
                                        <p className="mb-1">비밀번호</p>
                                        <MDBInput wrapperClass='mb-4 w-100' label='' name="password" type='password' size="lg" disabled />
                                        <p className="mb-1">비밀번호 확인</p>
                                        <MDBInput wrapperClass='mb-4 w-100' label='' name='password' type='password' size="lg" disabled />
                                        <p className="mb-1">주소</p>

                                        <MDBInputGroup className='mb-3'>
                                            <input className='form-control' label="우편번호" name='postalCode' type='address' size="lg" disabled={disabled} onChange={handleAddressChange} value={formData.address?.postalCode} />
                                            <MDBBtn onClick={handleComplete} disabled={disabled}  >우편번호 찾기</MDBBtn>
                                        </MDBInputGroup>

                                        {postPopup && <Postcode setFormData={setFormData} formData={formData} ></Postcode>}

                                        <MDBInput wrapperClass='mb-4 w-100' label='주소' name='address1' type='address' size="lg" disabled={disabled} onChange={handleAddressChange} value={formData.address?.address1} />

                                        <MDBInput wrapperClass='mb-4 w-100' label='상세주소' name='address2' type='address' size="lg" disabled={disabled} onChange={handleAddressChange}
                                            value={formData.address?.address2}
                                        />

                                        <p className="mb-1">전화번호</p>
                                        <MDBInput wrapperClass='mb-4 w-100' label='' name='phoneNumber' type='tel' size="lg" disabled={disabled} onChange={handleInputChange} value={formData.phoneNumber} />
                                        {!disabled &&
                                            <MDBBtn size='lg' type="submit" disabled={disabled} onClick={toggleShow}  >
                                                수정하기
                                            </MDBBtn>}
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </form>
                </MDBContainer>
                <MDBModal show={popup} tabIndex='-1' >
                    <MDBModalDialog>
                        <MDBModalContent>
                            <MDBModalHeader>
                                <MDBModalTitle>현재 비밀번호를 입력하세요</MDBModalTitle>
                                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                            </MDBModalHeader>
                            <MDBModalBody>
                                <MDBInput name='currentPassword' type='password' onChange={e => setCurrentPassword(e.target.value)} />
                            </MDBModalBody>

                            <MDBModalFooter>
                                <MDBBtn onClick={handleSubmit} size="lg">수정 완료하기</MDBBtn>
                            </MDBModalFooter>
                        </MDBModalContent>
                    </MDBModalDialog>
                </MDBModal>
            </div >
        </>
    );
}




export default MyAccountForm;
