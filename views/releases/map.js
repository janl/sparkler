function(doc) {
  if(doc._attachments) {
    emit(doc._id, doc);
  }
}
