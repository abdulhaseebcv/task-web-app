import styled from "styled-components";

export const ImageContainer = styled.div`
width: 100%;
height: 300px;
display: flex;
img {
    width: 100%;
    object-fit: cover;
}
@media (max-width:550px) {
    height: 250px;
}
`;