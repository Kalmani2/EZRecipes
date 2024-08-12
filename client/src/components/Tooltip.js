import React, { useState } from 'react';

const Tooltip = ({ content, children }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {showTooltip && (
        <div className="absolute mt-14 flex flex-col items-center">
          <div className="absolute z-10 w-44 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg rounded-md">
            {content}
          </div>
          <div className="w-3 h-3 -mt-1 rotate-45 bg-black"></div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Tooltip;