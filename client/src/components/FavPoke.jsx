import React from "react";
import LikePoke from "./LikePoke";

function FavPoke({ fav }) {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
      {/* ดึงข้อมูล state fav มาจาก App.jsx */}
      {fav?.map((data, idx) => (
        <div key={idx}>
          <h3>{data.name}</h3>
          <img src={data?.sprites?.other?.home?.front_default} alt="" />
          <LikePoke />
        </div>
      ))}
    </div>
  );
}

export default FavPoke;
