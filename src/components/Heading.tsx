import React from 'react'
type HeadingProps = {

};

const Heading: React.FC<HeadingProps> = ({
}) => {


  return (
      <h1 className="text-6xl font-bold text-center my-4 text-[var(--accent-color)]">Book-a-Table</h1>
  );
};

export default Heading;
