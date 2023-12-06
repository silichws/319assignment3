import React, { useState, useEffect } from "react";
import "./info.css";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Form from "./Form";
import DeleteForm from "./DeleteForm";
import EditForm from "./EditForm";
Chart.register(...registerables);

const Info = () => {
  const [labels, setLabels] = useState([]);
  const [temperatures, setTemperatures] = useState([]);
  const [humidity, sethumidity] = useState([]);

  const reload = async () => {
    console.log("reloading");

    // await fetch("http://localhost:8081/list")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log("loading new data");
	// 	setLabels([]);
	// 	console.log(labels.length);
    //     loadInfo(data);
	// 	console.log("done loading new data");
    //   })
    //   .catch((error) => {
    //     console.log("reload error: data not found");
    //   });
  };

  useEffect(() => {
    fetch("http://localhost:8081/list")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        loadInfo(data);
      })
      .catch((error) => {
        console.log("error: data not found");
      });
  }, []);

  function loadInfo(data) {
    console.log("data length " + labels.length);
    
    for (var i = 0; i < data.length; i++) {
      let timestamp = data[i].id;
      let temp = data[i].temp;
      let humid = data[i].humidity;

      labels.push(timestamp);
      temperatures.push(temp);
      humidity.push(humid);
      
    }
	console.log(labels.length);
  }

  const data = {
    labels: labels.reverse(),
    datasets: [
      {
        label: "Temperature °F",
        data: temperatures.reverse(),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        fill: false,
      },
      {
        label: "Humidity %",
        data: humidity.reverse(),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        type: "linear",
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h1 id="topThing">Data Management</h1>

      <Line data={data} options={options} />

      <div>
        <hr></hr>
        <div className="apiCalls">
          <Form reloadPage={reload} />
          <DeleteForm />
          <EditForm />
        </div>
      </div>

      {/* <div id="showData"></div> */}
    </div>
  );
};
export default Info;
