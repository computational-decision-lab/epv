(function () {
  const viewer = document.getElementById('pdf-viewer');
  const download = document.getElementById('download-link');
  const tabs = document.querySelectorAll('.reader-tab');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      const pdf = tab.getAttribute('data-pdf');
      viewer.setAttribute('src', pdf);
      download.setAttribute('href', pdf);
      tabs.forEach(function (item) { item.classList.remove('active'); });
      tab.classList.add('active');
    });
  });
}());
