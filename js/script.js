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
$('#hidePetugas').on('change',function() {
           console.log($(this).val())
           if ($(this).val() == 'checked') {
               $(this).attr('value','uncheck')
               $('#output-container .handler-section').show();
             
           } else {
              $(this).val('checked')
              $('#output-container .handler-section').hide();
           }
           })
  const now = new Date();

  const pad = n => n.toString().padStart(2, '0');
  const hh = pad(now.getHours());
  const mm = pad(now.getMinutes());
  const yyyy = now.getFullYear();
  const mmNum = pad(now.getMonth() + 1);
  const dd = pad(now.getDate());

  // Format tanggal dan waktu
  const dateStr = `${yyyy}-${mmNum}-${dd}`;
  const timeStr = `${hh}:${mm}`;
  const dayName = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'][now.getDay()];

  // Set nilai default input form
  $('#input-date').val(dateStr);
  $('#input-time').val(timeStr);
  $('#input-day').val(dayName);

  // Jika sudah upload gambar dan ada watermark, update juga watermark-nya
  const $watermark = $('#marki-box-clone');
  if ($watermark.length > 0) {
    updateMarkiBoxContent($watermark, {
      date: dateStr,
      time: timeStr,
      day: dayName
    });
  }
  $('#upload').on('change', function (e) {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.src = event.target.result;
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
      img.style.display = 'block';

      $('#output-container').html(''); // Kosongkan kontainer sebelum menambahkan gambar baru
      $('#output-container').append(img);

      // Clone watermark lalu tempel di kiri bawah gambar
      const watermark = $('.marki-box').clone().attr('id', 'marki-box-clone');
      watermark.css({
        position: 'absolute',
        bottom: '15px',
        left: '15px',
        zIndex: 5
      });
    $('#marki-box-clone').remove(); // hapus watermark sebelumnya jika ada

      $('#output-container').append(watermark);
          $('#download-image').show();
    };
   
    reader.readAsDataURL(file);
  });
      const initialDate = $('#input-date').val();
if (initialDate) {
  $('#input-day').val(getIndonesianDayName(initialDate));
}

function getIndonesianDayName(dateStr) {
  const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const date = new Date(dateStr);
  return days[date.getDay()];
}

$('#input-date').on('change', function () {
  const selectedDate = $(this).val();
  const dayName = getIndonesianDayName(selectedDate);
  $('#input-day').val(dayName);
});

function updateMarkiBoxContent($box, options = {}) {
  if (options.time) {
    const [hh, mm] = options.time.split(':');
    $box.find('.datetime .jam').text(hh);
    $box.find('.datetime .menit').text(mm);
  }

  if (options.date) {
    const [yyyy, mm, dd] = options.date.split('-');
    const tglFormat = `${dd}-${mm}-${yyyy}`;
    $box.find('.column.small-text div').eq(0).text(tglFormat);
  }

  if (options.day) {
    $box.find('.column.small-text div').eq(1).text(options.day);
  }

  if (options.location !== undefined) {
    $box.find('.location-view').text(options.location);
  }

  if (options.handler !== undefined) {
    $box.find('.note-view').text(options.handler);
  }
}

  function getFormData() {
  return {
    time: $('#input-time').val() || '00:00',
    date: $('#input-date').val() || '2000-01-01',
    day: $('#input-day').val() || 'Hari',
    location: $('#input-location').val() || 'Jalan Tanpa Nama',
    handler: $('#input-handler').val() || 'Petugas T'
  };
}

  $('#apply-marki').click(function () {
    const $watermark = $('#marki-box-clone');
    if ($watermark.length === 0) {
      alert('Silakan upload gambar terlebih dahulu.');
      return;
    }
   

    updateMarkiBoxContent($watermark, getFormData());
    $('#popup').hide();
  });
  $('#download-image').click(function () {
    html2canvas(document.querySelector('#output-container')).then(canvas => {
    const link = document.createElement('a');
    link.download = 'patroli_watermark.png';
    link.href = canvas.toDataURL();
    link.click();
    });
  });
});