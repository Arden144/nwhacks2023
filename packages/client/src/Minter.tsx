import { trpc } from "@lib/trpc";
import { Player } from "@livepeer/react";
import { Link } from "react-router-dom";
import { css } from "@linaria/core";

const fullPageImage = css`
background-image: url("/CIRS-lecture-theatre.jpg"); 
background-size: cover;
background-position: center;
height = 100%;
overscroll-behavior: none;
display: flex;
align-items: center;
justify-items: center;
justify-content: center;
overflow: hidden;
flex-direction: column

`;
const textColorWhite = css`
  color: white;
  font-family: InterVariable, Inter;
  font-weight: 900;
  font-size: 1rem;
`;

const container = css``;

function Minter() {
  return (
    <html className={fullPageImage}>
      <p className={textColorWhite}>
        {" "}
        Congratulations on completing your course!
        <br />
        Enter your Polygon wallet address below to recieve your NFT badge.
      </p>
      <form>
        <label>
          <input type="text" name="walletAddress" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </html>
  );
}

export default Minter;
