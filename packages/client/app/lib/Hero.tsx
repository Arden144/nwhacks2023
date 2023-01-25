import { ComponentPropsWithoutRef, forwardRef } from "react";
import styles from "./Hero.module.css";

type Ref = HTMLDivElement;
type Props = ComponentPropsWithoutRef<"div">;

const Hero = forwardRef<Ref, Props>(({ className, children, ...props }, ref) => (
	<div {...props} ref={ref} className={`${styles.hero} ${className}`}>
		{children}
	</div>
));

Hero.displayName = "Hero";

export default Hero;
