(function () {
  function initClaimTrace() {
    const root = document.querySelector('[data-claim-trace]');
    if (!root) return;

    const tabs = Array.from(root.querySelectorAll('[data-claim-tab]'));
    const panels = Array.from(root.querySelectorAll('[data-claim-panel]'));
    if (!tabs.length || !panels.length) return;

    function fromHash() {
      const match = window.location.hash.match(/^#claim-(c[123])$/);
      return match ? match[1] : tabs[0].dataset.claimTab;
    }

    function activate(id, focus, updateHash) {
      const validId = tabs.some(function (tab) {
        return tab.dataset.claimTab === id;
      }) ? id : tabs[0].dataset.claimTab;

      tabs.forEach(function (tab) {
        const selected = tab.dataset.claimTab === validId;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
      });
      panels.forEach(function (panel) {
        panel.hidden = panel.dataset.claimPanel !== validId;
      });
      root.classList.add('claim-trace-enhanced');
      if (updateHash) history.replaceState(null, '', '#claim-' + validId);

      const active = tabs.find(function (tab) {
        return tab.dataset.claimTab === validId;
      });
      if (focus && active) active.focus();
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () {
        activate(tab.dataset.claimTab, false, true);
      });

      tab.addEventListener('keydown', function (event) {
        let next = null;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next === null) return;
        event.preventDefault();
        activate(tabs[next].dataset.claimTab, true, true);
      });
    });

    window.addEventListener('hashchange', function () {
      activate(fromHash(), false, false);
    });
    activate(fromHash(), false, false);
  }

  function initEvidenceViews() {
    const root = document.querySelector('[data-claim-trace]');
    if (!root) return;

    const panels = Array.from(root.querySelectorAll('[data-claim-panel]'));
    if (!panels.length) return;

    function activate(panel, view) {
      const buttons = Array.from(panel.querySelectorAll('[data-trace-view]'));
      const views = Array.from(panel.querySelectorAll('[data-trace-panel]'));
      if (!buttons.length || !views.length) return;

      buttons.forEach(function (button) {
        button.setAttribute('aria-pressed', String(button.dataset.traceView === view));
      });
      views.forEach(function (item) {
        item.hidden = item.dataset.tracePanel !== view;
      });
      panel.classList.add('trace-views-enhanced');
    }

    panels.forEach(function (panel) {
      const initial = panel.querySelector('[data-trace-view][aria-pressed="true"]');
      if (initial) activate(panel, initial.dataset.traceView);
    });

    root.addEventListener('click', function (event) {
      const button = event.target.closest('[data-trace-view]');
      if (!button || !root.contains(button)) return;
      const panel = button.closest('[data-claim-panel]');
      if (panel) activate(panel, button.dataset.traceView);
    });
  }

  function initCopyCommands() {
    const status = document.getElementById('copy-status');
    const buttons = Array.from(document.querySelectorAll('[data-copy-command]'));
    if (!status || !buttons.length) return;

    buttons.forEach(function (button) {
      button.addEventListener('click', async function () {
        const target = document.getElementById(button.dataset.copyCommand);
        if (!target) return;
        const text = target.textContent.trim();
        try {
          await navigator.clipboard.writeText(text);
          status.textContent = 'Copied reviewer check command.';
        } catch (error) {
          status.textContent = 'Copy unavailable; select the visible command manually.';
        }
      });
    });
  }

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

  initClaimTrace();
  initEvidenceViews();
  initCopyCommands();
  initMobileNavigation();
  initPdfReader();
  initScenarioTabs();
  initGateExplorer();
}());
