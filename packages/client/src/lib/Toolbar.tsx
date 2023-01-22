import { styled } from "@linaria/react";

const Toolbar = styled.div`
  position: sticky;
  top: 0;

  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 4rem;
  padding: 0 2rem;
  background-color: white;
  min-width: 378px;
  // border-bottom: 1px solid black;

  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  
  img {
    height: 5rem;
    padding: 1.5rem 0.5rem;
  }


`;

export default Toolbar;
