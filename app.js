(function () {
  function initMobileNavigation() {
    const toggle = document.getElementById('nav-toggle');
    const navigation = document.getElementById('reviewer-navigation');
    if (!toggle || !navigation) return;

    const mobile = window.matchMedia('(max-width: 690px)');
    document.documentElement.classList.add('nav-enhanced');

    function setOpen(open, returnFocus) {
      const nextOpen = mobile.matches && open;
      toggle.setAttribute('aria-expanded', String(nextOpen));
      toggle.setAttribute('aria-label', nextOpen ? 'Close reviewer navigation' : 'Open reviewer navigation');
      navigation.classList.toggle('is-open', nextOpen);
      if (returnFocus) toggle.focus();
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true', false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false, true);
      }
    });

    navigation.addEventListener('click', function (event) {
      if (event.target.closest('a') && mobile.matches) setOpen(false, false);
    });

    function syncNavigation() {
      setOpen(false, false);
    }

    if (typeof mobile.addEventListener === 'function') mobile.addEventListener('change', syncNavigation);
    else if (typeof mobile.addListener === 'function') mobile.addListener(syncNavigation);
    syncNavigation();
  }

  function initPdfReader() {
    const viewer = document.getElementById('pdf-viewer');
    const download = document.getElementById('download-link');
    const tabs = Array.from(document.querySelectorAll('.reader-tab'));

    if (!viewer || !download || !tabs.length) return;

    function activatePdf(tab, focus) {
      const pdf = tab.getAttribute('data-pdf');
      viewer.setAttribute('src', pdf);
      download.setAttribute('href', pdf);
      tabs.forEach(function (item) {
        const selected = item === tab;
        item.classList.toggle('active', selected);
        item.setAttribute('aria-selected', String(selected));
        item.tabIndex = selected ? 0 : -1;
      });
      const panel = document.getElementById('pdf-reader-panel');
      if (panel) panel.setAttribute('aria-labelledby', tab.id);
      if (focus) tab.focus();
    }

    activatePdf(tabs.find(function (tab) {
      return tab.getAttribute('aria-selected') === 'true';
    }) || tabs[0], false);

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () {
        activatePdf(tab, false);
      });

      tab.addEventListener('keydown', function (event) {
        let nextIndex = null;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = tabs.length - 1;
        if (nextIndex === null) return;
        event.preventDefault();
        activatePdf(tabs[nextIndex], true);
      });
    });
  }

  function initScenarioTabs() {
    const practice = document.getElementById('practice');
    const tablist = document.getElementById('practice-tabs');
    if (!practice || !tablist) return;

    const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));
    if (!tabs.length) return;

    function activateScenario(tab, focus) {
      tabs.forEach(function (item) {
        const selected = item === tab;
        const panel = document.getElementById(item.getAttribute('aria-controls'));
        item.setAttribute('aria-selected', String(selected));
        item.tabIndex = selected ? 0 : -1;
        if (panel) panel.hidden = !selected;
      });
      if (focus) tab.focus();
    }

    practice.classList.add('scenario-enhanced');
    activateScenario(tabs.find(function (tab) {
      return tab.getAttribute('aria-selected') === 'true';
    }) || tabs[0], false);

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () {
        activateScenario(tab, false);
      });

      tab.addEventListener('keydown', function (event) {
        let nextIndex = null;
        if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') nextIndex = 0;
        if (event.key === 'End') nextIndex = tabs.length - 1;
        if (nextIndex === null) return;
        event.preventDefault();
        activateScenario(tabs[nextIndex], true);
      });
    });
  }

  function initGateExplorer() {
    const input = document.getElementById('gate-threshold');
    const output = document.getElementById('threshold-output');
    const actions = document.querySelectorAll('#explorer-actions [data-score]');
    if (!input || !output || !actions.length) return;

    function updateExplorer() {
      const threshold = Number(input.value);
      output.textContent = (threshold / 100).toFixed(2);

      actions.forEach(function (action) {
        const clearsThreshold = Number(action.dataset.score) >= threshold;
        const supported = action.dataset.supported === 'true';
        const route = !clearsThreshold ? 'Abstain' : supported ? 'Authorize' : 'Review';
        const reason = !clearsThreshold
          ? 'Does not clear the registered score threshold.'
          : supported
            ? 'Clears the threshold and has registered local support.'
            : 'Clears the score threshold but lacks registered local support.';

        action.dataset.routeState = route.toLowerCase();
        action.querySelector('[data-route]').textContent = route;
        action.querySelector('[data-reason]').textContent = reason;
      });
    }

    input.addEventListener('input', updateExplorer);
    updateExplorer();
  }

  initMobileNavigation();
  initPdfReader();
  initScenarioTabs();
  initGateExplorer();
}());
