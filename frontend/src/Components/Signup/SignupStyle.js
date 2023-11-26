import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
width: 100%;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
background: #f8f9fa;
`;

export const AuthContainer = styled.div`
width: 30%;
padding: 4% 2%;
border-radius: 40px;
border: 2px solid rgb(23, 24, 35);
background-color: rgb(23, 24, 35);
text-align: center;
p{
    font-weight: 400;
    color: #fff;
    font-size: 14px;
    margin-top: 5%;
}

@media (max-width:1300px) {
    width: 40%;
}
@media (max-width:850px) {
    width: 50%;
}
@media (max-width:650px) {
    width: 70%;
}
@media (max-width:500px) {
    width: 90%;
}
`;

export const Logo = styled.img`
height: 70px;
margin-bottom: 6%;
`;

export const Form = styled.form`
display: flex;
flex-direction: column;
gap: 17px;
`;

export const InputField = styled.input`
width: 100%;
height: 45px;
border-radius: 10px;
border: 1px solid #bcbec0;
background: #fff;
padding-left: 10px;
font-size: 15px;
font-weight: 400;
outline: none;

::placeholder {
    color: #bcbec0;
    font-weight: 400;
}
@media (max-width:850px) {
    height: 40px;
}
`;

export const Button = styled.button`
width: 100%;
border-radius: 10px;
background: #003465;
color: #fff;
font-size: clamp(12px,1.2vw,18px);
font-weight: 700;
padding: 10px 0;
border: 1px solid #003465;
cursor: pointer;
`;

export const NavigateLink = styled(Link)`
font-weight: 600;
color: #fff;
text-decoration: none;
padding-left: 7px;
`;

export const ErrorMessage = styled.span`
color: #ba181b;
font-size: 11px;
font-weight: 600;
text-align: start;
`;