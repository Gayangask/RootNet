(function () {
  'use strict';

  var overlay    = document.getElementById('modal-overlay');
  var mClose     = document.getElementById('modal-close');
  var mStamp     = document.getElementById('m-stamp');
  var mTitle     = document.getElementById('modal-title');
  var mDesc      = document.getElementById('modal-desc');
  var stepForm   = document.getElementById('step-form');
  var stepConf   = document.getElementById('step-confirm');
  var submitBtn  = document.getElementById('submit-btn');
  var doneBtn    = document.getElementById('done-btn');
  var ctaBtn     = document.getElementById('cta-btn');
  var cEmail     = document.getElementById('c-email');
  var cSummary   = document.getElementById('c-summary');

  var fName   = document.getElementById('f-name');
  var fEmail  = document.getElementById('f-email');
  var fDep    = document.getElementById('f-dep');
  var fRet    = document.getElementById('f-ret');
  var fTrav   = document.getElementById('f-trav');
  var fBudget = document.getElementById('f-budget');
  var fNotes  = document.getElementById('f-notes');

  var selCat = '';

  // Min dates
  var today = new Date().toISOString().split('T')[0];
  fDep.min = today;
  fRet.min = today;

  fDep.addEventListener('change', function () {
    fRet.min = this.value || today;
    if (fRet.value && fRet.value <= this.value) fRet.value = '';
  });

  
  function openModal(cat, stamp, desc) {
    selCat = cat;
    mStamp.textContent = stamp;
    mTitle.textContent = cat;
    mDesc.textContent  = desc;

    stepForm.hidden = false;
    stepConf.hidden = true;

    fName.value = ''; fEmail.value = ''; fDep.value = ''; fRet.value = ''; fNotes.value = '';
    fTrav.value = ''; fBudget.value = '';
    clearErrors();

    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(function () { fName.focus(); }, 80);
  }

  function closeModal() {
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
  }

  
  document.querySelectorAll('.card').forEach(function (card) {
    card.addEventListener('click', function () {
      openModal(this.dataset.category, this.dataset.stamp, this.dataset.desc);
    });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.click(); }
    });
  });


  ctaBtn.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector('.categories').scrollIntoView({ behavior: 'smooth' });
  });

 
  mClose.addEventListener('click', closeModal);
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !overlay.classList.contains('hidden')) closeModal();
  });

 
  function clearErrors() {
    ['f-name','f-email','f-dep','f-ret','f-trav','f-budget'].forEach(function (id) {
      document.getElementById(id).classList.remove('err');
    });
    ['e-name','e-email','e-dep','e-ret','e-trav','e-budget'].forEach(function (id) {
      document.getElementById(id).textContent = '';
    });
  }

  function setErr(fieldId, errId, msg) {
    document.getElementById(fieldId).classList.add('err');
    document.getElementById(errId).textContent = msg;
  }

  function validate() {
    clearErrors();
    var ok = true;

    if (!fName.value.trim()) {
      setErr('f-name', 'e-name', 'Enter your full name.'); ok = false;
    }
    if (!fEmail.value.trim()) {
      setErr('f-email', 'e-email', 'Enter your email.'); ok = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fEmail.value.trim())) {
      setErr('f-email', 'e-email', 'Enter a valid email.'); ok = false;
    }
    if (!fDep.value) {
      setErr('f-dep', 'e-dep', 'Pick a departure date.'); ok = false;
    }
    if (!fRet.value) {
      setErr('f-ret', 'e-ret', 'Pick a return date.'); ok = false;
    } else if (fDep.value && fRet.value <= fDep.value) {
      setErr('f-ret', 'e-ret', 'Return must be after departure.'); ok = false;
    }
    if (!fTrav.value) {
      setErr('f-trav', 'e-trav', 'Select number of travelers.'); ok = false;
    }
    if (!fBudget.value) {
      setErr('f-budget', 'e-budget', 'Select a budget range.'); ok = false;
    }
    return ok;
  }

  
  function fmt(d) {
    if (!d) return '';
    return new Date(d + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

 
  submitBtn.addEventListener('click', function () {
    if (!validate()) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Processing…';

    setTimeout(function () {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Confirm Booking →';

      var nights = Math.round((new Date(fRet.value) - new Date(fDep.value)) / 86400000);
      var ref = '#' + Math.random().toString(36).substring(2, 9).toUpperCase();

      cEmail.textContent = fEmail.value.trim();
      cSummary.innerHTML =
        '<div><strong>Trip:</strong> ' + selCat + '</div>' +
        '<div><strong>Name:</strong> ' + fName.value.trim() + '</div>' +
        '<div><strong>Departure:</strong> ' + fmt(fDep.value) + '</div>' +
        '<div><strong>Return:</strong> ' + fmt(fRet.value) + ' · ' + nights + ' night' + (nights !== 1 ? 's' : '') + '</div>' +
        '<div><strong>Travelers:</strong> ' + fTrav.value + '</div>' +
        '<div><strong>Budget:</strong> ' + fBudget.value + ' per person</div>' +
        (fNotes.value.trim() ? '<div><strong>Requests:</strong> ' + fNotes.value.trim() + '</div>' : '') +
        '<div class="ref">Booking ref ' + ref + '</div>';

      stepForm.hidden = true;
      stepConf.hidden = false;
    }, 900);
  });

  doneBtn.addEventListener('click', closeModal);

})();
