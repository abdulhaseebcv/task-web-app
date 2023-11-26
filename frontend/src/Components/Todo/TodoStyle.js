import { ToastContainer } from "react-toastify";
import styled from "styled-components";


export const Section = styled.section`
width: 100%;
display: flex;
justify-content: center;
position: absolute;
top: 140px;
@media (max-width:550px) {
    top: 110px;
}
`;

export const Container = styled.div`
width: 540px;
@media (max-width:768px) {
    width: 460px;
}
@media (max-width:550px) {
    width: 320px;
}
`;

export const Heading = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 40px;
h3 {
    color: #fff;
    text-transform: uppercase;
    font-size: clamp(30px,2.67vw,40px);
    font-weight: 700;
    letter-spacing: 15px;
}
span {
    color: #fff;
    font-size: 28px;
    cursor: pointer;
}
`;

export const AddTodo = styled.div`
position: relative;
display: flex;
align-items: center;
margin-bottom: 24px;
`;


export const InputField = styled.input`
width: 100%;
height: 50px;
border: none;
outline: none;
border-radius: 5px;
background: ${props => (props.$isDark ? '#25273D' : '#fff')};
box-shadow: ${props => (props.$isDark ? '0px 35px 50px -15px rgba(0, 0, 0, 0.50)' : '0px 35px 50px -15px rgba(194, 195, 214, 0.50)')};
padding: 0 15px;
color: ${props => (props.$isDark ? '#767992' : '#9495A5')};
font-size: 16px;
font-weight: 400;
letter-spacing: -0.25px;
`;


export const Button = styled.button`
${(props) => props.$add && 'position: absolute; right: 10px;'}
border: none;
color: ${props => (props.$isDark ? '#5B5E7E' : '#494C6B')};
background: transparent;
cursor: pointer; 
`;

export const TodosContainer = styled.div`
width: 100%;
border-radius: 5px;
background: ${props => (props.$isDark ? '#25273D' : '#fff')};
box-shadow: ${props => (props.$isDark ? '0px 35px 50px -15px rgba(0, 0, 0, 0.50)' : '0px 35px 50px -15px rgba(194, 195, 214, 0.50)')};
`;

export const List = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 10px;
  border-bottom: 1px solid ${props => (props.$isDark ? '#393A4B' : '#E3E4F1')};
  div {
    display: flex;
    gap:20px;
    align-items: center;
  }
  span {
    color:  ${props => (props.$isDark ? '#5B5E7E' : '#9495A5')};;
    font-size: 14px;
    font-weight: 400;
    letter-spacing: -0.194px;
  }
  &:last-child {
    border-bottom: none;
  }
`;

export const CheckBox = styled.input`
appearance: none;
width: 24px;
height: 24px;
border: 1px solid #393A4B;
border-radius: 24px;
cursor: pointer;
position: relative;

&:checked {
    background: linear-gradient(135deg, #5DF 0%, #C058F3 100%);
    border: 1px solid rgba(85, 221, 255, 1);
  }

&:checked::before {
    content: '✔'; 
    font-size: 15px;
    color: #fff; 
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

&:hover {
    border-color: rgba(85, 221, 255, 1);
  }
`;

export const Task = styled.p`
font-size: 18px;
font-weight: 400;
color: ${props => props.$isDark && props.$isChecked ? '#4D5067' : props.$isDark ? '#C8CBE7' : props.$isChecked ? '#D1D2DA' : '#494C6B'};
text-decoration-line: ${props => (props.$isChecked && 'line-through')};
`;

export const StyledToastContainer = styled(ToastContainer)`

  @media (max-width: 600px) {
    /* position: absolute;
    top: 100px; */
  }
`;
