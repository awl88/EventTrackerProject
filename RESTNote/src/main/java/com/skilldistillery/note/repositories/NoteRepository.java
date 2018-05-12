package com.skilldistillery.note.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.note.entities.Note;

public interface NoteRepository  extends JpaRepository<Note, Integer>{

}
