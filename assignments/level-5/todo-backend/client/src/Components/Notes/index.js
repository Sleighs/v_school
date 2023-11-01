import React, { useState, useEffect, useContext } from 'react'
import Cookies from 'universal-cookie';
import { ApiContext } from '../../Context/apiContext';
import { ThemeContext } from '../../Context/themeContext'
import { makeId } from '../../scripts/math';
import './style.css'

export default function Notes() {
  const { theme } = useContext(ThemeContext)
  const { 
    todos, 
    setTodos, 
    getTodos,
    postTodo
} = useContext(ApiContext)

  // Get cookies
  const cookies = new Cookies()
  const notesCookie = cookies.get('notes')

  // Set state
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState('')

  const noteList = () => {
    console.log('todos', todos)
    //console.log('notes', notes)

    return (
        todos.map((item, i) =>
            <ListItem 
                item={item}
                index={i}
                notes={notes} 
                setNotes={setNotes} 
            />
        )
    )
  }

  const addNote = () => {
    let date = new Date()
    let id = makeId(10);

    var newTodo = {
        id: id,
        name: '',
        description: currentNote,
        date: 
            date.getMonth()+ '-'
            + date.getDay() + '-'
            + date.getFullYear() + ' '
            + date.getHours() + ':'
            + date.getMinutes(),
        imageUrl: "http://www.myimage....",
        completed: false
    }

    postTodo(newTodo)

    setCurrentNote('')
  }

  return (
    <div className={`notes-container ${theme}-theme  ${theme}-layout`}>
        <div className={`note-list ${theme}-list list-wide`}>
            <div className={'note-row new-note-open'}>
                <input 
                    className={`note-new ${theme}-theme`}
                    placeholder='New reminder' 
                    value={currentNote} 
                    onChange={(e) => {
                        setCurrentNote(e.target.value)
                    }}
                />
                <button className='add-note-btn' onClick={()=>{
                    if (currentNote.length > 0){
                        addNote()
                    }
                }}>+</button>
            </div>
            {todos ? noteList() : <></>}
            <button className='clear-note-btn' 
                style={{display: 'none'}}
                onClick={()=>{
                //setNotes([])
                }}>Clear Reminders</button>
        </div>
    </div>
  )
}

const Editor = props => {
    const {theme} = useContext(ThemeContext)

    const {
        open, setOpen,
        currentNote, setCurrentNote,
        currentId, setCurrentId, 
        currentEditorNote, setCurrentEditorNote,
        currentCheck
    } = props

    const  { todos, deleteTodo, updateTodo } = useContext(ApiContext)

    return(
        <div className={`note-editor ${theme}-editor `}>
            <div className='editor-textarea-container'>
            <input 
                className={`editor-textarea ${theme}-theme`}
                name='editor-textarea'
                value={currentEditorNote} 
                onChange={(e) => {
                    setCurrentEditorNote(e.target.value);
                }}
            />

            <div className='editor-buttons'>
                <button 
                    className="save-note-btn" 
                    onClick={()=>{
                        setOpen(false)

                        //get todo from todos
                        let newArr = [...todos];
                        let updatedTodos = newArr.map( item => {
                            if (item.id === currentId){
                                let date = new Date();
                                return {
                                    ...item, 
                                    completed: currentCheck,
                                    description: currentEditorNote,
                                    date:  
                                        date.getMonth()+ '-'
                                        + date.getDay() + '-'
                                        + date.getFullYear() + ' '
                                        + date.getHours() + ':'
                                        + date.getMinutes()
                                }
                            } else {
                                return item
                            }
                        })

                        let filtered = updatedTodos.filter(item => item.id === currentId)

                        updateTodo(filtered[0])
                    }}
                >
                    Save
                </button>
                <button 
                    className="delete-note-btn" 
                    onClick={()=>{
                        deleteTodo(currentId)

                        setCurrentEditorNote('')
                        setCurrentNote('')
                        setCurrentId('')
                        setOpen(false)
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    </div>
    )
}

const ListItem = props => {
    const {
        item, 
        index
    } = props

    const {todos, updateTodo} = useContext(ApiContext)

    const [open, setOpen] = useState(false)
    const [currentNote, setCurrentNote] = useState('')
    const [currentId, setCurrentId] = useState(item.id)
    const [currentEditorNote, setCurrentEditorNote] = useState('')
    const [currentCheck, setCurrentCheck] = useState(false)

    const handleChange = () => {
        setCurrentCheck(!currentCheck);

        let newArr = [...todos];
        let updatedTodos = newArr.map( item => {
            if (item.id === currentId){
                return {
                    ...item, 
                    completed: !currentCheck
                }
            } else {
                return item
            }
        })

        let filtered = updatedTodos.filter(item => item.id === currentId)

        updateTodo(filtered[0])
    };

    return(
        <div className="note-link note-row" key={index} >   
            <div className='note-link-checkbox'>
                <Checkbox 
                    label={''}
                    value={item.completed}
                    onChange={handleChange}
                    id={currentId}
                />
            </div>
            <div className='note-link-text-container'>    
                <div className='note-link-text' 
                    onClick={(e)=>{
                        setCurrentEditorNote(item.description)
                        setCurrentId(item.id)
                        setCurrentNote('')
                        if (!open){setOpen(true)}
                    }}>
                {open 
                    ? <Editor 
                        open={open}
                        setOpen={setOpen}
                        currentNote={currentNote}
                        setCurrentNote={setCurrentNote}
                        currentId={currentId}
                        setCurrentId={setCurrentId}
                        currentEditorNote={currentEditorNote}
                        setCurrentEditorNote={setCurrentEditorNote}
                        currentCheck={currentCheck}
                    /> 
                    : item.description}
                </div>
                <div className='note-link-date'>{item.date}</div>
            </div>
        </div>
    )
}

const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input 
            type="checkbox" 
            checked={value} 
            onChange={onChange} 
        />
        {label}
      </label>
    );
  };