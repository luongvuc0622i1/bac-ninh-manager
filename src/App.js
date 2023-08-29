import './App.css';
import { saveAs } from "file-saver";

function App() {
  const click = () => {
    const a = {
      "type": "Feature",
      "geometry": {
        "id": "BN01",
        "name": "Bắc Ninh - Lương Tài",
        "status": true
      },
      "coordinates": {
        "go": "[bn01Go]",
        "back": "[bn01Back]"
      }
    };

    const data = `export let routesData = {
  "type": "FeatureCollection",
  "features": [
    `+JSON.stringify(a)+`,
    `+JSON.stringify(a)+`,
    `+JSON.stringify(a)+`
  ]
}`;

console.log(a);

    const blob = new Blob([data], { type: "application/javascript" });
    saveAs(blob, "data1.js");
  }

  return (
    <div className='container'>
      <div className='header'>
        <img src='https://raw.githubusercontent.com/luongvuc0622i1/project-data/master/images/logo2.png' alt='logo' className='logo' />
        <h1 className='title'>Bắc Ninh Bus</h1>
      </div>
      <div className="row">
        <div className="col col-4">
          {/* <form>
            <div className="form-group">
              <label for="inputFile">Chọn File</label>
              <input className="form-control" id="inputFile" />
            </div>
            <div className="form-group">
              {/* <label for="inputReport">Chọn mẫu Report</label> */}
              {/* <select className="form-control" defaultValue="default" id="inputReport">
                <option value="default" disabled hidden>Chọn kiểu Report</option>
              </select>
            </div> */}
            <div className="form-group">
              <button className="btn btn-primary" onClick={click} style={{ float: "right" }}>Xuất report</button>
            </div>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
}

export default App;
