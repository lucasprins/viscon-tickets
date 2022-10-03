
type solutionProps = {
  solution: string
  issue: string,
}

export default function OneMachineSolution({solution, issue}:solutionProps) {
  return (
    //Parent of óne solution-box
    <div className='p-5 border-solid border border-gray-100 rounded-lg drop-shadow-md w-full dark:text-white  '>
      <h3 className=' text-gray-900 dark:text-white font-medium'>{issue}</h3>
      <p className=' text-gray-600 dark:text-white font-normal'>{solution}</p>

    {/* Later when tags are implemented text below will be replaced by calling the tags function and give the correct values. For now hardcoded */}
      {/* <div className='' >
        <div className='pt-5 text border-solid border border-gray-300 rounded-lg inline-flex'>
        <p className='text-gray-700 font-medium dark:text-white'> Satelliet shuttle</p>
        </div>
        
        <div className='pt-5 border-solid border  border-gray-300 rounded-lg inline-flex'>
          <p className='text-gray-700 dark:text-white font-medium'>Tekeningnummer: 5001483</p>
        </div>
      </div>  */}

    </div> 
)
}