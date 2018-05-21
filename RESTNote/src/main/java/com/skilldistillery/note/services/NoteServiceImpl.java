package com.skilldistillery.note.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.note.entities.Note;
import com.skilldistillery.note.repositories.NoteRepository;

@Service
public class NoteServiceImpl implements NoteService {
	@Autowired
	NoteRepository noteRepo;

	@Override
	public List<Note> index() {
		return noteRepo.findAll();
	}

	@Override
	public Note show(int id) {
		return noteRepo.findById(id).get();
	}

	@Override
	public Note create(Note note) {
		return noteRepo.saveAndFlush(note);
	}

	@Override
	public Note replace(int id, Note note) {
		Note managedNote = noteRepo.findById(id).get();
		
		managedNote.setName(note.getName());
		managedNote.setTitle(note.getTitle());
		managedNote.setMessage(note.getMessage());
		managedNote.setPriority(note.getPriority());
		
		return noteRepo.saveAndFlush(managedNote);
	}

	@Override
	public Note update(int id, Note note) {
		Note managedNote = noteRepo.findById(id).get();
		
		if (note.getName() != null && !note.getName().equals("")) {
			managedNote.setName(note.getName());
		}
		
		if (note.getTitle() != null && !note.getTitle().equals("")) {
			managedNote.setTitle(note.getTitle());
		}
		
		if (note.getMessage() != null && !note.getMessage().equals("")) {
			managedNote.setMessage(note.getMessage());
		}
		
		if (note.getPriority() != null) {
			managedNote.setPriority(note.getPriority());
		}
		return noteRepo.saveAndFlush(managedNote);
	}

	@Override
	public boolean destroy(int id) {
		try {
			noteRepo.deleteById(id);
			return true;
		}
		catch(Exception e) {
			e.printStackTrace();
			return false;
			
		}
	}
}
