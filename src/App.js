import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

const teams = [
  'Red Rabbits',
  'Orange Ocelots',
  'Yellow Yaks', 
  'Lime Llamas',
  'Green Guardians',
  'Cyan Creepers',
  'Blue Bats',
  'Purple Pandas',
  'Pink Parrots',
  'Aqua Axolotls'
]

var genTeams = [];

for (let i=0; i < teams.length; i++) {
  let team = {
    id: teams[i].split(' ')[0].toLowerCase(),
    name: teams[i],
    thumb: '/images/' + teams[i].split(' ')[0].toLowerCase() + '_' + 
      teams[i].split(' ')[1].toLowerCase() + '_logo.png',
  }
  genTeams.push(team);
}

const mccTeams = genTeams


function App() {
  const [characters, updateCharacters] = useState(mccTeams);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="header-title">MINECRAFT CHAMPIONSHIP RANKINGS</h1>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {characters.map(({id, name, thumb}, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div className="characters-thumb">
                            <img src={thumb} alt={`${name} Thumb`} />
                          </div>
                          <p>
                            { name }
                          </p>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
      <p className="image-credit">
        Images from <a href="https://mcchampionship.fandom.com/wiki/MCChampionship_Wiki" 
          target="_blank"  rel="noopener noreferrer">MCC Championship Wiki</a>
      </p>
    </div>
  );
}

export default App;
