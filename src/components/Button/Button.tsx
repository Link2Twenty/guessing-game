// Styles
import useClassList from "@blocdigital/useclasslist";
import maps from "./Button.module.scss";

// Types
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function Button({ className, children, ...props }: ButtonProps) {
  const classlist = useClassList({ defaultClass: "btn", className, maps, string: true }) as string;

  return (
    <button className={classlist} {...props}>
      {children}
    </button>
  );
}
