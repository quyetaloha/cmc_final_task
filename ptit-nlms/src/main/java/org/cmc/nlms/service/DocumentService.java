package org.cmc.nlms.service;

import java.util.NoSuchElementException;

import org.cmc.nlms.dao.DocumentDao;
import org.cmc.nlms.model.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DocumentService {
	@Autowired
	private DocumentDao documentDao;

	public Document getDocumentById(int id) {
		Document document = null;
		try {
			document = documentDao.findById(id).get();
			return document;
		} catch (NoSuchElementException e) {
			System.out.println("Document not found");
			return null;
		}
	}

	public Document addDocument(Document document) {
		return documentDao.save(document);
	}

	public Document updateDocument(Document document) {
		return documentDao.save(document);
	}

	public void deleteDocument(Document document) {
		documentDao.delete(document);
	}

	public void deleteDocument(int id) {
		documentDao.deleteById(id);

	}
}
