import { styled } from "@linaria/react";

const Hero = styled.div`
  margin: 4rem 2rem;
  padding: 3rem;
  background-color: var(--background-color);
  border-radius: 5rem;
  display: flex;
  justify-content: space-around;
  min-width: 350px;

  @media only screen and (max-width: 40em) {
    margin: 2rem 1rem;
  }
`;

export default Hero;
