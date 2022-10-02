import React, { useState } from 'react';
import OneMachineSolutionBox from './OneMachineSolutionBox'


// type MachineSolutionListProps = {
//   chosenMachine: string // We krijgen een machine_id als prop en op basis daarvan gaan we de solutions filteren.
//   machine_name: string,
//   machine_blueprint: string
// }; 

//Will be used later when importing data or from database or from the User's choice of machine where he wants to see the solutions

 export default function MachineSolutionList() {
  const [language, setLanguage] = useState('nl;'); // Dit gaan we later dynamisch maken met Redux
  
  const machineID = "1" //Temp hardcoded untill database is working
  const solutions = [
      { solution_id: '1', machine_id: '1', issue: 'Product verkeerd op machine' ,solution: 'Fotocellen controleren. Eventueel product handmatig op juiste positie plaatsen', language: 'nl' },
      { solution_id: '2', machine_id: '1', issue: 'Satelliet verkeer op machine' ,solution: 'Fotocellen controleren. Eventueel product handmatig op juiste positie plaatsen', language: 'nl' },
      { solution_id: '3', machine_id: '1', issue: 'Geen verbinding met satelliet' ,solution: 'Controleren of satelliet aan staat. Als deze in het kanaal staat een opgeladen moet worden, opladen met oplaadkabel en in handbediening terugzetten op de shuttle ', language: 'nl' },
      { solution_id: '4', machine_id: '1', issue: 'Niet veilig om te bewegen', solution: 'De pallet steekt uit op de shuttle of een andere pallet op een baan aan het shuttle pad. Draai de pallet handmatig op de juiste positie', language: 'nl' },
      { solution_id: '5', machine_id: '2', issue: 'Laden/lossen duurt te lang', solution: 'Waarschijnlijk staat de pallet klem. Zorg dat deze weer goed staat, reset de baan en de shuttle en voer recovery uit in VLC', language: 'nl' },
      { solution_id: '6', machine_id: '2', issue: 'Niet veilig om te bewegen', solution: 'De pallet steekt uit op de shuttle of een andere pallet op een baan aan het shuttle pad. Draai de pallet handmatig op de juiste positie', language: 'nl' },
  ] //temp hardcoded untill database is implemented
  

  const machines = [
    { machine_id: '1', name: 'Satelliet shuttle', blueprint_number: '5001483', type: '...' },
    { machine_id: '2', name: 'Transfer shuttle', blueprint_number: '5008716', type: '...' }
    ] //temp hardcoded untill database is implemented
  


  // -> We moeten ergens de solutions filteren op language en op de meegegeven prop: machine_id 
  // -> We willen alleen de solutions van een bepaalde machine natuurlijk

  //temp filter functions. Need to implement better system that also splits on language
  //It search on Hardcoded machineID and drops the correct arrays into FilteredSolutions
  const FilteredSolutions = solutions.filter(item =>
    item.machine_id === machineID
    )
  const FilteredMachines = machines.filter(item =>
    item.machine_id === machineID
    )

  return (
      <div className='pl-8 flex flex-col gap-4 pt-5' >
          {FilteredSolutions.map((solution) => (
            <OneMachineSolutionBox solution={solution.solution} issue={solution.issue}  />
          ))}
      </div>
  )
}
