package com.skilldistillery.note.services;

import java.util.List;

import com.skilldistillery.note.entities.Note;

public interface NoteService {
	List<Note> index();

	Note show(int id);

	Note create(Note note);

	Note replace(int id, Note note);

	Note update(int id, Note note);

	boolean destroy(int id);
}
