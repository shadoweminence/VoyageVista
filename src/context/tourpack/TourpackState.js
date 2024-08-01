import { useState } from "react";
import TourpackContext from "./tourContext";

const TourpackState = (props) => {
const host ="http://localhost:5001/api/tourpack"

  const tourpackInitial = []
  const [tourpacks, setTourpacks] = useState(tourpackInitial);


  //Fetch all packages
  const getTourpacks = async () => {
    
    const response = await fetch(`${host}/fetchtourpacks`,{
      method:'GET',
      headers:{
        'Content-Type': 'application/json',
      },
     
    });
    const json = await response.json()
 setTourpacks(json);
  }

  

  //Add a package
  const addTourpack = async(title, description, tag) => {
   
    const response = await fetch(`${host}/addtourpack/`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
        'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhYjRjMzkwNmY1ZTQ1OWE4YWIyOWM1Iiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcyMjUwOTk1OX0.AhWDfVWYuxzxPZbA6n9gGR04dvodFqX9k6pJ0bSMKiA'
      },
      body:JSON.stringify({title,description,tag})
    });
   const json = await response.json();
   console.log(json);
    
    const tourpack = {
      _id: "66a751deb152153bekm94e76b407",
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
  const deleteTourpack = async (id) => {
   
   
      const response = await fetch(`${host}/deletetourpack/${id}`,{
        method:'DELETE',
        headers:{
          'Content-Type': 'application/json',
          'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhYjRjMzkwNmY1ZTQ1OWE4YWIyOWM1Iiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcyMjUwOTk1OX0.AhWDfVWYuxzxPZbA6n9gGR04dvodFqX9k6pJ0bSMKiA'
        },
    
      });
      const json = response.json();
      console.log(json);

    console.log("Deleting the tourpack with id" + id);
    const newTourpacks = tourpacks.filter((tourpack) => {
      return tourpack._id !== id;
    });
    setTourpacks(newTourpacks);
  };

  //edit a package
  const editTourpack = async (id, title, description, tag) => {
    //API Call
      const response = await fetch(`${host}/updatetourpack/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjZhYjRjMzkwNmY1ZTQ1OWE4YWIyOWM1Iiwicm9sZSI6ImFkbWluIn0sImlhdCI6MTcyMjUwODM4NH0.J33hucKBWTiBUU7CgiyeDDv1LxG4_udtojZxnuwfiKk",
        },
        body: JSON.stringify({title, description, tag}),
      });
    const json = await response.json();
    console.log(json);
  
    let newTourpacks = JSON.parse(JSON.stringify(tourpacks))
    //Logic to edit packs
    for (let index = 0; index < tourpacks.length; index++) {
      const element = tourpacks[index];
      if ((element._id === id)) {
        newTourpacks[index].title = title;
        newTourpacks[index].description = description;
        newTourpacks[index].tag = tag;
         break;
      }
     
    }
    setTourpacks(newTourpacks);
  }
  return (
    <TourpackContext.Provider
      value={{ tourpacks, addTourpack, deleteTourpack, editTourpack ,getTourpacks}}
    >
      {props.children}
    </TourpackContext.Provider>
  );
};

export default TourpackState;
