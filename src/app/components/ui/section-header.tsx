import React from "react";
import "../../css/ui/section-header.css";

interface Props {
  text: string;
  desc: string;
}

const SectionHeader: React.FC<Props> = ({ text, desc }: Props) => {
  return (
    <div className="section-header">
      <h5 className="text" data-description={desc}>
        {text}
      </h5>
    </div>
  );
};

export default SectionHeader;
