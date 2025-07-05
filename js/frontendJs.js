 $(document).ready(function() {
 
  const editBtn = $('#edit-button');
  const popupFormEditMark = $('#popup');
  const cancelBtn = $('#cancel-button');

  editBtn.on('click', function() {
    popupFormEditMark.attr('style','display: flex;');
  });

  cancelBtn.on('click', function() {
    popupFormEditMark.hide()
  });
})