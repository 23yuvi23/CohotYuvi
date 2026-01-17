import React from "react";

const Card = (props) => {
    // console.log(props);

    
  return (
    <div className="w-80 bg-white rounded-xl shadow-lg overflow-hidden">
      <img
        src="https://images.pexels.com/photos/7474348/pexels-photo-7474348.jpeg"
        alt="animal"
        className="w-full h-48 object-cover"
      />

      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-2 text-amber-800">
          {props.username}
        </h1>

        <p className="text-gray-600 text-sm">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Ea, perspiciatis.
        </p>
      </div>
    </div>
  );
};

export default Card;
