import { styled } from "@linaria/react";

const Toolbar = styled.div`
  position: sticky;
  top: 0;
  background-color: var(--background-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;
  height: 5rem;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  img {
    height: 5rem;
    padding: 1.5rem 0.5rem;
  }

  span {
    display: flex;
    height: 100%;
    align-items: center;
  }

  span > * {
    flex-shrink: 0;
  }

  span > :not(:last-child) {'    padding-right: 2rem;
  padding-left: 2rem;
    padding-right: 2rem;
  }
`;

export default Toolbar;
