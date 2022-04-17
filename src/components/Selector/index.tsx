import { useState, useLayoutEffect } from "react";
import "./index.css";

interface OptionDetails {
  label: string;
  value: string;
}

interface SelectorProps {
  options: OptionDetails[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const Selector = ({ options, defaultValue, onChange = () => {}}: SelectorProps) => {
  const [selected, setSelected] = useState("");
  useLayoutEffect(() => {
    if(defaultValue) {
      setSelected(defaultValue);
    }
    else if(options.length > 0) {
      setSelected(options[0].value);
    }
  }, [defaultValue]);

  const handleChange = (value: string) => {
    setSelected(value);
    onChange(value);
  };

  return (
    <div className="selector-container">
      {options.map((option, index) => (
        <button
          key={index}
          className={
            selected === option.value ? "selected-button" : "unselected-button"
          }
          onClick={() => handleChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default Selector;
