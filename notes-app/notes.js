const fs = require('fs')
const chalk = require('chalk')

const addNotes = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const removeNotes = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note Removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No Note Found!'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.red.inverse('Your notes'))
    notes.forEach((note) => console.log(note.title))
}

const readNotes = (title) => {
    const notes = loadNotes()
    const foundNote = notes.find((note) => note.title === title)
    if (foundNote) {
        console.log(chalk.inverse(foundNote.title))
        console.log(foundNote.body)
    } else {
        console.log(chalk.red.red('Note not found!'))
    }
}

const saveNotes = (notes) => {
    const notesJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', notesJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        return JSON.parse(dataJson)
    } catch(e) {
        return []
    } 
}

module.exports = {
    addNotes,
    removeNotes,
    listNotes,
    readNotes
}
