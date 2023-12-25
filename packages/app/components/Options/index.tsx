import React from 'react';

export interface IOption {
  key: string;
  value: string;
}

export interface IOptionsProps {
  options?: IOption[];
  onClick: (message: string) => void;
}

const Options: React.FC<IOptionsProps> = ({options, onClick}) => {
  if (!options || options.length == 0) {
    return null;
  }

  const renderOptions = options.map((option, key) => {
    return (
      <button
        className="options__option btn btn-dark mx-2"
        key={key}
        onClick={() => {
          onClick(option.value);
        }}>
        {option.key}
      </button>
    );
  });

  return <div className="options">{renderOptions}</div>;
};

export default Options;
