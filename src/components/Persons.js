import React from "react";

import Number from "./Number";

function Persons({filteredPersons, deletePerson}) {
  return (
    <div>
      {filteredPersons.map((number) => (
        <Number key={number.name} number={number} id={number.id} deletePerson={deletePerson}/>
      ))}
    </div>
  );
}

export default Persons;
