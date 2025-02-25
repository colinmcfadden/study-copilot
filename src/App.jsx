import { useState } from 'react'
import './App.css'

function App() {
  const [inputValue, setInputValue] = useState('')
  const [subItems, setSubItems] = useState([])

  const handleAddItem = () => {
    if(inputValue.trim()) {
      setSubItems([...subItems, {value: inputValue, subItems: []}])
      setInputValue('')
    }
  }

  const handleAddSubItem = (parentItem) => () => {
    if(inputValue.trim()) {
      const addSubItemRecursively = (items, parentValue) => {
        return items.map(item => {
          if (item.value === parentValue) {
            return { ...item, subItems: [...item.subItems, { value: inputValue, subItems: [] }] }
          }
          return { ...item, subItems: addSubItemRecursively(item.subItems, parentValue) }
        })
      }

      const newSubItems = addSubItemRecursively(subItems, parentItem.value)
      setSubItems(newSubItems)
      setInputValue('')
    }
  }

const renderSubItems = (subItems) => {
  return (
    <div className="ml-10 mt-3">
      {subItems.map((subItem, index) => (
          <div key={index} className="flex flex-col">
            <div className="py-1 px-2 flex justify-between items-center border-b-3 border-b-gray-100">
              <span>{subItem.value}</span>
              <button className='p-1 rounded-full cursor-pointer bg-mint-400 transition duration-150 ease-in-out hover:bg-mint-500' onClick={handleAddSubItem(subItem)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            {subItem.subItems && subItem.subItems.length > 0 && renderSubItems(subItem.subItems)}
          </div>
        ))}
    </div>
  )
}

  return (
    <>
      <div>
      </div>
      <h1>Study Copilot</h1>
      <div className="card">
        <div className="input-container flex items-center">
          <input type="text" 
            placeholder="Enter your topic"
            value={inputValue}
            onChange={ (e) => setInputValue(e.target.value) }
            className="field-sizing-content min-w-48 max-w-120 rounded-full border border-slate-300/70 px-5 py-4 !outline-none transition-all duration-200 ease-out placeholder:tracking-widest focus:border-primary focus:ring-transparent"
           />
          <button className='p-4 ml-4 rounded-full cursor-pointer bg-mint-400 transition duration-150 ease-in-out hover:bg-mint-500' onClick={handleAddItem}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
          </button>
        </div>
        <div className="py-3 my-5 flex flex-col">
            {subItems.map((item, index) => (
              <div key={index}>
               <div className="p-1.5 m-0 flex justify-between items-center border-b-3 border-b-gray-100">
                <div><span>{item.value}</span></div>
                <div><button className='p-2 rounded-full cursor-pointer bg-mint-400 transition duration-150 ease-in-out hover:bg-mint-500' onClick={handleAddSubItem(item)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button></div>
               </div>
                
              {item.subItems && item.subItems.length > 0 && renderSubItems(item.subItems)}
              </div>
            ))}
        </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
