const makeDark = (event) => {
    const pageElement = document.getElementsByClassName("page")[0];
    pageElement.classList.add("dark-mode")
}

const makeLight = (event) => {
    const pageElement = document.getElementsByClassName("page")[0];
    pageElement.classList.remove("dark-mode")
}

export default function DarkMode () {
  return (
    <div className='page'>
        <button 
            className='dark-mode-button'
            onClick={makeDark}>
            Dark Mode
        </button>
      
        <button 
            className='light-mode-button'
            onClick={makeLight}>
            Light Mode
        </button>
    </div>
  )
}
