import { useState } from 'react';
import './App.css';
// import { saveAs } from "file-saver";

function App() {
  const [formData, setFormData] = useState({
    geometry: {
      id: "32",
      name: "",
      status: false
    },
    coordinates: {
      go: "",
      back: ""
    }
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
    setFormData((prevData) => ({
      ...prevData,
      name: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const feature = {
      type: "Feature",
      geometry: { ...formData.geometry },
      coordinates: { ...formData.coordinates }
    };
    console.log(feature);
    const featureCollection = {
      type: "FeatureCollection",
      features: [ feature, feature ],
    };
    console.log(featureCollection);
  };

  // const click = () => {
  //   // Tạo đối tượng Blob từ dữ liệu đã định dạng
  //   const blob = new Blob([featureCollection], { type: 'application/json' });
  //   saveAs(blob, "data1.json");
  // }

  return (
    <div className='container'>
      <div className='header'>
        <img src='https://raw.githubusercontent.com/luongvuc0622i1/project-data/master/images/logo2.png' alt='logo' className='logo' />
        <h1 className='title'>Bắc Ninh Bus</h1>
      </div>
      <div className="row">
        <div className="col col-4">
          <form>
            <div className="form-group">
              {/* <label for="inputFile">Chọn File</label> */}
              <input className="form-control" id="inputFile" name="formData.geometry.id" onChange={handleChange} />
            </div>
            {/* <div className="form-group">
              <label for="inputReport">Chọn mẫu Report</label>
              <select className="form-control" defaultValue="default" id="inputReport">
                <option value="default" disabled hidden>Chọn kiểu Report</option>
              </select>
            </div> */}
            <div className="form-group">
              <button className="btn btn-primary" onClick={handleSubmit} style={{ float: "right" }}>Xuất report</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
