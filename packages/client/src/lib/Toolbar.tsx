import { styled } from "@linaria/react";

const Toolbar = styled.div`
  position: sticky;
  top: 0;
  background-color: var(--secondary-background-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;
  height: 5rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  > img {
    position: relative;
    display: block;
    height: 6rem;
    top: 8px;
  }

  span > :not(:last-child) {
    padding-right: 2rem;
  }
`;

export default Toolbar;
