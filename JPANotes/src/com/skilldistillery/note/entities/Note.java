package com.skilldistillery.note.entities;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Note {
	// Fields
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String name;

	private String title;

	private String message;

	@Enumerated(EnumType.STRING)
	private Priority priority;

	// Constructors
	public Note() {
	}

	public Note(String name, String title, String message, Priority priority) {
		super();
		this.name = name;
		this.title = title;
		this.message = message;
		this.priority = priority;
	}

	// Getters & Setters
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Priority getPriority() {
		return priority;
	}

	public void setPriority(Priority priority) {
		this.priority = priority;
	}

	public int getId() {
		return id;
	}

	// toString
	@Override
	public String toString() {
		return "Note [id=" + id + ", name=" + name + ", title=" + title + ", message=" + message + ", priority="
				+ priority + "]";
	}
}
