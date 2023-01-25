import { ComponentPropsWithoutRef, forwardRef } from "react";
import styles from "./CourseWidget.module.css";

type Ref = HTMLDivElement;
type Props = ComponentPropsWithoutRef<"div">;

const CourseWidget = forwardRef<Ref, Props>(({ className, children, ...props }, ref) => (
	<div {...props} ref={ref} className={`${styles.widget} ${className}`}>
		{children}
	</div>
));

CourseWidget.displayName = "CourseWidget";

export default CourseWidget;
