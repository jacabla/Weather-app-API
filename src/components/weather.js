import React from "react";

export default function Weather() {
  return (
    <>
      <div>
        <div className="box_container">
            <div className="box">
                <p>Humedad</p>
                <h2>12%</h2>
            </div>

            <div className="box">
                <p>Viento</p>
                <h2>12 km/h</h2>
            </div>

            <div className="box">
                <p>Sensacion</p>
                <h2>20 C</h2>
            </div>
        </div>
      </div>
    </>
  );
}
