import { useState } from "react";
import TourpackContext from "./tourContext";

const TourpackState = (props) => {
const host ="http://localhost:5000/api/tourpack"

  const tourpackInitial = [
    {
      _id: "66a751deb5253be94e76b407",
      user: "66a746854bf2b7451df14d0b",
      title: "heheh",
      description: "jsut a try one",
      tag: "General",
      date: "2024-07-29T08:25:02.105Z",
      __v: 0,
    },

    {
      _id: "66a751deb15253be94e76b407",
      user: "66a746854bf212b7451df14d0b",
      title: "heheh",
      description: "jsut a try one",
      tag: "General",
      date: "2024-07-29T08:25:02.105Z",
      __v: 0,
    },
  ];
  const [tourpacks, setTourpacks] = useState(tourpackInitial);

  //Add a package
  const addTourpack = async(title, description, tag) => {
    console.log("Adding a new package");
    const response = await(fetch(`${host}/addpackage/${id}`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhOWU4YTAwYjU1MTJiODAxMDMyOTk3In0sImlhdCI6MTcyMjQ0NDk2NH0.YxhMXgedUZDOu-9v5pDvdwdgwXDYCIiueuCtqnOy31E'
      },
      body:JSON.stringify(title,description,tag)
    }));
 

    const tourpack = {
      _id: "66a751deb152153be94e76b407",
      user: "66a746854bf2b7451df14d0b",
      title: title,
      description: description,
      tag: "General",
      date: "2024-07-29T08:25:02.105Z",
      __v: 0,
    };
    setTourpacks(tourpacks.concat(tourpack));
  };

  //delete a package
  const deleteTourpack =(id) => {
    console.log("Deleting the tourpack with id" + id);
    const newTourpacks = tourpacks.filter((tourpack) => {
      return tourpack._id !== id
    })
    setTourpacks(newTourpacks);
  };

  //edit a package
  const editTourpack = async (id, title, description, tag) => {
    //API Call
      const response = await(fetch(`${host}/updatepackage/${id}`,{
        method:'POST',
        headers:{
          'Content-Type': 'application/json',
          'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhOWU4YTAwYjU1MTJiODAxMDMyOTk3In0sImlhdCI6MTcyMjQ0NDk2NH0.YxhMXgedUZDOu-9v5pDvdwdgwXDYCIiueuCtqnOy31E'
        },
        body:JSON.stringify(title,description,tag)
      }));
    const json =  response.json();
  
    //Logic to edit packs
    for (let index = 0; index < tourpacks.length; index++) {
      const element = tourpacks[index];
      if ((element._id === id)) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }
  return (
    <TourpackContext.Provider
      value={{ tourpacks, addTourpack, deleteTourpack, editTourpack }}
    >
      {props.children}
    </TourpackContext.Provider>
  );
};

export default TourpackState;
