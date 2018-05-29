package com.skilldistillery.note.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.note.entities.Note;
import com.skilldistillery.note.services.NoteService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost:4200" })
public class NoteController {
	@Autowired
	NoteService noteServ;

	@RequestMapping(path = "test", method = RequestMethod.GET)
	public String test() {
		return "test successful";
	}

	@RequestMapping(path = "notes", method = RequestMethod.GET)
	public List<Note> index() {
		return noteServ.index();
	}

	@RequestMapping(path = "notes/{id}", method = RequestMethod.GET)
	public Note show(@PathVariable int id) {
		return noteServ.show(id);
	}

	@RequestMapping(path = "notes", method = RequestMethod.POST)
	public Note create(@RequestBody Note newNote, HttpServletRequest request, HttpServletResponse response) {
		Note note = noteServ.create(newNote);
		if (note == null) {
			response.setStatus(500);
			return null;
		}
		response.setStatus(201);
		return note;
	}
	
	@RequestMapping(path = "notes/{id}", method = RequestMethod.PUT)
	public Note replace(@RequestBody Note note, @PathVariable int id) {
		return noteServ.replace(id, note);
	}

	@RequestMapping(path = "notes/{id}", method = RequestMethod.PATCH)
	public Note update(@RequestBody Note note, @PathVariable int id) {
		return noteServ.update(id, note);
		
	}

	@RequestMapping(path = "notes/{id}", method = RequestMethod.DELETE)
	public Boolean delete(@PathVariable int id) {
		return noteServ.destroy(id);
	}

}
