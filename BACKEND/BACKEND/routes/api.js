const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // 예시: 모든 매칭 가져오기
  router.get('/host/main', async (req, res) => {
    try {
      const hostsRef = db.collection('hosts');
      const snapshot = await hostsRef.get();
      const hosts = [];
      snapshot.forEach((doc) => {
        hosts.push({ id: doc.id, ...doc.data() });
      });
      res.status(200).json(hosts);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // 예시: 새로운 매칭 추가하기
  router.post('/host', async (req, res) => {
    try {
      const newHost = req.body;
      const updatedHost = {
        ...newHost,
        views: 0,
      };
      const hostsRef = db.collection('hosts');
      const docRef = await hostsRef.add(updatedHost);
      res.status(201).json({ id: docRef.id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // 예시: 뷰 수 추가하기
  router.post('/host/views', async (req, res) => {
    try {
      const { documentId } = req.body;
      console.log(documentId);

      if (!documentId) {
        return res.status(400).send({ error: 'Document ID is required' });
      }

      const docRef = db.collection('hosts').doc(documentId);
      const doc = await docRef.get();

      if (!doc.exists) {
        return res.status(404).send({ error: 'Document not found' });
      }

      const currentViews = doc.data().views || 0;
      await docRef.update({ views: currentViews + 1 });

      res.send({ message: 'Views updated successfully', newViews: currentViews + 1 });
    } catch (error) {
      console.error('Error updating views:', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });
  // 예시: 뷰 수 가져하기
  router.get('/host/views', async (req, res) => {
    try {
      const { documentId } = req.query;

      if (!documentId) {
        return res.status(400).send({ error: 'Document ID is required' });
      }

      const docRef = db.collection('hosts').doc(documentId);
      const doc = await docRef.get();

      if (!doc.exists) {
        return res.status(404).send({ error: 'Document not found' });
      }

      const views = doc.get('views');
      res.send({ views });
    } catch (error) {
      console.error('Error getting views:', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });
  return router;
};
