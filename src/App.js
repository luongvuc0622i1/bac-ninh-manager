import React, { useState, useEffect } from 'react';
import routes from './data/routes.json';
import { saveAs } from 'file-saver';

export default function App() {
  const [data, setData] = useState([]);
  const nullForm = {
    id: '',
    name: '',
    go: '',
    back: '',
  };
  const [formData, setFormData] = useState(nullForm);
  const [index, setIndex] = useState();

  useEffect(() => {
    readFile();
  }, []);

  const readFile = async () => {
    try {
      // const jsonData = await fs.readJson('data.json');
      setData(routes.features);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

  const writeFile = async () => {
    const featureCollection = {
      type: "FeatureCollection",
      features: data,
    };
    // Tạo đối tượng Blob từ dữ liệu đã định dạng
    const blob = new Blob([JSON.stringify(featureCollection)], { type: 'application/json' });
    const fileName = 'dataExport.json';
    saveAs(blob, fileName);
  };

  const handleAddFeature = () => {
    if (index) {
      data[index].geometry.id = formData.id;
      data[index].geometry.name = formData.name;
      data[index].coordinates.go = formData.go;
      data[index].coordinates.back = formData.back;
    } else {
      const feature = {
        type: "Feature",
        geometry: {
          id: formData.id,
          name: formData.name,
          status: true
        },
        coordinates: {
          go: formData.go,
          back: formData.back
        },
        properties: {}
      };
      // Tạo bản sao mới của mảng data
      const newData = [...data];
      // Thêm phần tử mới vào newData
      newData.push(feature);
      // Cập nhật trạng thái với newData
      setData(newData);
    }
    setIndex();
    setFormData(nullForm);
  };

  const handleEditFeature = (index) => {
    setIndex(index);
    setFormData({
      id: data[index].geometry.id,
      name: data[index].geometry.name,
      go: data[index].coordinates.go,
      back: data[index].coordinates.back,
    });
  };

  const handleDeleteFeature = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  return (
    <div>
      <h1>JSON Data Editor</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Go</th>
            <th>Back</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((feature, index) => (
            <tr key={index}>
              <td>{feature.geometry.id}</td>
              <td>{feature.geometry.name}</td>
              <td>{feature.coordinates.go}</td>
              <td>{feature.coordinates.back}</td>
              <td>
                <button onClick={() => handleEditFeature(index)}>Edit</button>
                <button onClick={() => handleDeleteFeature(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Add/Edit Feature</h2>
        <input
          type="text"
          placeholder="ID"
          value={formData.id}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
        />
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Go"
          value={formData.go}
          onChange={(e) => setFormData({ ...formData, go: e.target.value })}
        />
        <input
          type="text"
          placeholder="Back"
          value={formData.back}
          onChange={(e) => setFormData({ ...formData, back: e.target.value })}
        />
        <button onClick={handleAddFeature}>Add/Edit</button>
      </div>
      <button onClick={writeFile}>Save Changes</button>
    </div>
  );
};