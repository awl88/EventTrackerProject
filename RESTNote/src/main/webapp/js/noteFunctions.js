window.addEventListener('load', function(e) {
	init();
});

function init() {
	document.noteForm.lookup.addEventListener('click', function(event) {
		event.preventDefault();
		var noteId = document.noteForm.noteId.value;
		if (!isNaN(noteId) && noteId > 0) {
			getNote(noteId);
		}
	});
	document.newNote.save.addEventListener('click', sendNewNote);

	loadNoteIndex();
}

function getNote(noteId) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/notes/' + noteId, true);
	xhr.onreadystatechange = function() {

		if (xhr.readyState === 4 && xhr.status === 200 || xhr.status === 201) {
			var data = xhr.responseText;
			var note = JSON.parse(data);
			displayNote(note);
		}
		if (xhr.readyState === 4 && xhr.status >= 400) {
			console.error(xhr.status + ': ' + xhr.responseText);
			var errorMsg = document.getElementById('errorMsg');
			errorMsg.textContent = "There is no note with that ID!";
		}
	}
	xhr.send(null);
}

function displayNote(note) {
	var dataDiv = document.getElementById('noteData');
	dataDiv.textContent = '';

	var noteName = document.createElement('h4');
	var noteTitle = document.createElement('h1');
	var noteMessage = document.createElement('blockquote');
	var notePriority = document.createElement('h3');

	noteName.textContent = 'Author: ' + note.name;
	noteTitle.textContent = note.title;
	noteMessage.textContent = '"' + note.message + '"';
	notePriority.textContent = 'Priority Level: ' + note.priority;

	var update = document.createElement('button');
	update.textContent = 'Update Note';
	update.addEventListener('click', function(e) {
		e.preventDefault();
		displayUpdateNote(note);
	});
	
	var deleteNotes = document.createElement('button');
	deleteNotes.setAttribute('id', note.id);
	deleteNotes.textContent = 'Delete';
	deleteNotes.addEventListener('click', function(e) {
		e.preventDefault();
		deleteNote(note.id);
	});

	noteData.appendChild(noteName);
	noteData.appendChild(noteTitle);
	noteData.appendChild(noteMessage);
	noteData.appendChild(notePriority);
	noteData.appendChild(update);
	noteData.appendChild(deleteNotes);
}

function sendNewNote(evt) {
	evt.preventDefault();
	var form = document.newNote;
	var newNote = {
		name : form.name.value,
		title : form.title.value,
		message : form.message.value,
		priority : form.priority.value,
	};
	var noteJson = JSON.stringify(newNote);
	console.log(newNote);
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'api/notes');
	xhr.setRequestHeader('Content-type', 'application/json');

	xhr.onreadystatechange = function() {
		if (this.readyState === 4) {

			if (this.status === 200 || this.status === 201) {
				var newNoteJson = this.responseText;
				var newNoteObject = JSON.parse(newNoteJson);
				displayNote(newNoteObject);
			} else {
				console.log('Error with sending new note');
			}
		} else {
		}
	};
	xhr.send(noteJson);
}

function loadNoteIndex() {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'api/notes');
	xhr.onreadystatechange = function() {
		if (this.readyState === 4) {
			if (this.status === 200) {
				var notes = JSON.parse(this.responseText);
				displayNoteIndex(notes);
			}
		}
	};
	xhr.send(null);
}

function displayNoteIndex(notes) {
	var div = document.getElementById('noteIndex');
	var table = document.createElement('table');
	var count = document.createElement('h4');
	
	div.appendChild(count);
	count.textContent = 'There are ' + sumOfHighPriorities(notes) + ' notes that are set to HIGH priority!';
	div.appendChild(table);
	notes.forEach(function(note) {
		var tr = document.createElement('tr');
		tr.noteId = note.id;
		table.appendChild(tr);
		var td = document.createElement('td');
		td.textContent = note.title;
		tr.appendChild(td);

		tr.addEventListener('click', function(evt) {
			var cell = evt.target;
			var fid = cell.parentElement.noteId;
			if (!isNaN(fid) && fid > 0) {
				getNote(fid);
			}
		});
	});
}

function displayUpdateNote(note) {
	var updateForm = document.getElementById('noteUpdate'); 
	var header = document.createElement('h4');
	header.textContent = 'Update Note:';
	updateForm.appendChild(header); 
	
	var noteName = document.createElement('p');
	noteName.textContent = 'Name: ';
	var nameInput = document.createElement('input');
	nameInput.setAttribute('type', 'text');
	nameInput.setAttribute('name', 'name');
	nameInput.setAttribute('value', note.name);
	
	var noteTitle = document.createElement('p');
	noteTitle.textContent = 'Title: ';
	var titleInput = document.createElement('input');
	titleInput.setAttribute('type', 'text');
	titleInput.setAttribute('name', 'title');
	titleInput.setAttribute('value', note.title);
	
	var noteMessage = document.createElement('p');
	noteMessage.textContent = 'Note Body: ';
	var messageInput = document.createElement('input');
	messageInput.setAttribute('type', 'text');
	messageInput.setAttribute('name', 'message');
	messageInput.setAttribute('value', note.message);
	
	var notePriority = document.createElement('p');
	notePriority.textContent = 'Priority: ';
	var select = document.createElement('select');
	select.setAttribute('name', 'priority');

	var option1 = document.createElement('option');
	option1.value = 'High';
	option1.text = 'High';
	select.appendChild(option1);
	var option2 = document.createElement('option');
	option2.value = 'Medium';
	option2.text = 'Medium';
	select.appendChild(option2);
	var option3 = document.createElement('option');
	option3.value = 'Low';
	option3.text = 'Low';
	select.appendChild(option3);
	
	var submit = document.createElement('button');
	submit.setAttribute('id', note.id);
	submit.textContent = 'Submit';
	submit.addEventListener('click', function(e) {
		e.preventDefault();
		updateNote(note.id);
		displayNote(note);
	});
	
	updateForm.appendChild(noteName);
	updateForm.appendChild(nameInput);
	updateForm.appendChild(noteTitle);
	updateForm.appendChild(titleInput);
	updateForm.appendChild(noteMessage);
	updateForm.appendChild(messageInput);
	updateForm.appendChild(notePriority);
	updateForm.appendChild(select);
	updateForm.appendChild(submit); 
}

function updateNote(id){
	var update = document.noteUpdate;
	var updatedNote = {
			name: update.name.value,
			title: update.title.value,
			message: update.message.value,
			priority: update.priority.value
		};
	
	var noteJson = JSON.stringify(updatedNote); 
	var xhr = new XMLHttpRequest();

	xhr.open('PATCH', 'api/notes/' + id , true);
	xhr.setRequestHeader('Content-type', 'application/json');
	
	xhr.onreadystatechange = function(){
		if(this.readyState === 4){
			if(this.status === 200 || this.status === 201) {
				var updatedNoteJson = this.responseText;
				var updatedNoteObject = JSON.parse(updatedNoteJson);
				location.reload();
			}
			else {
				console.log("Error with PATCH request")
			}
		}
	}
	
	xhr.send(noteJson); 
}

function deleteNote(id) {
    var xhr = new XMLHttpRequest();
    xhr.open('DELETE', 'api/notes/' + id, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status < 400) {
            var deleted = JSON.parse(xhr.responseText);
        }
        else {
            console.log("Error with delete");
        }
    }
    xhr.send(null); 
    location.reload();
    init();
}

function sumOfHighPriorities(notes) {
	var count = 0;
	for(var i = 0; i < notes.length; i++) {
		if(notes[i].priority === 'High') {
			count++;
		}
	}
	return count;
}

