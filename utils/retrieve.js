const knowledgeBase = require('../knowledgeBase.json');

function retrieveDocuments(query) {
  const lowerCaseQuery = query.toLowerCase();
  return knowledgeBase.filter(doc => doc.content.toLowerCase().includes(lowerCaseQuery));
}

module.exports = { retrieveDocuments };
