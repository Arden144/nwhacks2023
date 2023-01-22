import { styled } from "@linaria/react";

const CourseWidget = styled.div`
    width: 250px;
    height: 300px;
    background-color: var(--background-color);
    margin: 4rem 2rem;
    border-radius: 2rem;
    overflow: hidden;
    :hover {
        background-color: var(--tertiary-color);
    }

    img {
        border-top-left-radius: 2rem;
        border-top-right-radius: 2rem;
        height: 58%;
        width: 100%;
      }
    
      h2 {
        font-weight: heavy;
        font-family: Arial;
        padding-left: 15px;
        padding-bottom: 0px;
        margin: 0px;
      }
      p {
        font-size: 15px;
        padding-left: 10px;
      }
`;

export default CourseWidget;