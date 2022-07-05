import React from "react";
import "../../css/ui/error-bar.css";

interface Props {
  text: string;
}

const ErrorBar: React.FC<Props> = ({ text }: Props) => {
  return <div className="error-bar">{text}</div>;
};

export default ErrorBar;
