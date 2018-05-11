package com.skilldistillery.note.test;

import static org.junit.Assert.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import com.skilldistillery.note.entities.Note;

class NoteTest {
	private EntityManagerFactory emf;
	private EntityManager em;
	private Note note;
	
	@BeforeEach
	public void setUp() throws Exception {
		emf = Persistence.createEntityManagerFactory("Note");
		em = emf.createEntityManager();
		note = em.find(Note.class, 1);
	}

	@AfterEach
	public void tearDown() throws Exception {
		em.close();
		emf.close();
	}

	@Test
	public void test_category_mappings() {
		assertEquals("Andrew", note.getName());
	}

}
