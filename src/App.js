import React, { useState, useEffect } from 'react';
// import fs from 'fs-extra';
import routes from './data/routes.json';

const App = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    go: '',
    back: '',
  });
  const [index, setIndex] = useState();

  // const readFile = async () => {
  //   try {
  //     const jsonData = await fs.readJson('data.json');
  //     setData(jsonData.features);
  //   } catch (error) {
  //     console.error('Error reading file:', error);
  //   }
  // };

  const readFile = async () => {
    try {
      // const jsonData = await fs.readJson('data.json');
      setData(routes.features);
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

  // const writeFile = async () => {
  //   try {
  //     await fs.writeJson('data.json', { type: 'FeatureCollection', features: data });
  //     console.log('File saved successfully');
  //   } catch (error) {
  //     console.error('Error writing file:', error);
  //   }
  // };

  const writeFile = async () => {
    try {
      // await fs.writeJson('data.json', { type: 'FeatureCollection', features: data });
      console.log('File saved successfully');
      console.log(data)
    } catch (error) {
      console.error('Error writing file:', error);
    }
  };

  const handleAddFeature = () => {
    if (index) {
      data[index].geometry.id = formData.id;
      data[index].geometry.name = formData.name;
      data[index].coordinates.go = formData.go;
      data[index].coordinates.back = formData.back;
    }
    // setData([...data, formData]);
    console.log(data)
    // setFormData({
    //   id: '',
    //   name: '',
    //   go: '',
    //   back: '',
    // });
  };

  const handleEditFeature = (index) => {
    // const updatedData = [...data];
    // updatedData[index] = formData;
    // setData(updatedData);
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

  useEffect(() => {
    readFile();
  }, []);

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
              <td>{feature.geometry.name.name}</td>
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

export default App;