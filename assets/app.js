'use strict';

document.getElementById('yearSpan').textContent = new Date().getFullYear();
document.querySelectorAll('.fa-solid').forEach((icon) => {
  icon.setAttribute('aria-hidden', 'true');
});

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (mobileMenuBtn && mobileMenu) {
  const setMobileMenuOpen = (isOpen) => {
    mobileMenu.classList.toggle('hidden', !isOpen);
    mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    mobileMenuBtn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
  };

  mobileMenuBtn.addEventListener('click', () => {
    setMobileMenuOpen(mobileMenuBtn.getAttribute('aria-expanded') !== 'true');
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMobileMenuOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileMenuBtn.getAttribute('aria-expanded') === 'true') {
      setMobileMenuOpen(false);
      mobileMenuBtn.focus();
    }
  });
}

const moleSlider = document.getElementById('moleSlider');
const boringMole = document.getElementById('boringMole');
if (moleSlider && boringMole) {
  moleSlider.addEventListener('input', (event) => {
    boringMole.dataset.position = event.target.value;
    moleSlider.setAttribute('aria-valuetext', `${event.target.value} percent`);
  });
}

const btnBore = document.getElementById('btnMethodBore');
const btnTrench = document.getElementById('btnMethodTrench');
const methodTitle = document.getElementById('methodTitle');
const methodDesc = document.getElementById('methodDesc');
const methodBadge = document.getElementById('methodBadge');
const metricDamage = document.getElementById('metricDamage');
const metricTime = document.getElementById('metricTime');
const metricPaving = document.getElementById('metricPaving');
const metricRoi = document.getElementById('metricRoi');

if (btnBore && btnTrench) {
  btnBore.addEventListener('click', () => {
    btnBore.setAttribute('aria-pressed', 'true');
    btnTrench.setAttribute('aria-pressed', 'false');
    btnBore.className = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-brand-gold text-slate-950 shadow';
    btnTrench.className = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 text-slate-400 hover:text-white';
    methodTitle.textContent = 'T&M Pneumatic Missile Boring';
    methodTitle.className = 'text-lg font-bold text-brand-gold';
    methodBadge.textContent = 'RECOMMENDED';
    methodBadge.className = 'text-xs px-2.5 py-1 rounded font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30';
    methodDesc.textContent = 'Underground piercing tool creates a precise subterranean hole under driveways, structures, and turf with minimal entry/exit pits.';
    metricDamage.textContent = 'Minimal';
    metricDamage.className = 'text-base font-bold text-emerald-400 mt-1';
    metricTime.textContent = 'Often Hours';
    metricTime.className = 'text-base font-bold text-white mt-1';
    metricPaving.textContent = 'Often Avoided';
    metricPaving.className = 'text-base font-bold text-emerald-400 mt-1';
    metricRoi.textContent = 'Lower Burden';
    metricRoi.className = 'text-base font-bold text-brand-gold mt-1';
  });

  btnTrench.addEventListener('click', () => {
    btnTrench.setAttribute('aria-pressed', 'true');
    btnBore.setAttribute('aria-pressed', 'false');
    btnTrench.className = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-brand-gold text-slate-950 shadow';
    btnBore.className = 'px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 text-slate-400 hover:text-white';
    methodTitle.textContent = 'Traditional Open Cut Trenching';
    methodTitle.className = 'text-lg font-bold text-red-400';
    methodBadge.textContent = 'HIGH RESTORATION COST';
    methodBadge.className = 'text-xs px-2.5 py-1 rounded font-mono bg-red-500/10 text-red-400 border border-red-500/30';
    methodDesc.textContent = 'Rips up concrete, turf, and asphalt with excavators or trenchers, requiring expensive repaving, lawn resodding, and traffic shutdowns.';
    metricDamage.textContent = 'Higher';
    metricDamage.className = 'text-base font-bold text-red-400 mt-1';
    metricTime.textContent = 'Often Days';
    metricTime.className = 'text-base font-bold text-white mt-1';
    metricPaving.textContent = 'Often Required';
    metricPaving.className = 'text-base font-bold text-red-400 mt-1';
    metricRoi.textContent = 'Higher Burden';
    metricRoi.className = 'text-base font-bold text-slate-400 mt-1';
  });
}

function updateDistanceDisplay() {
  const distRange = document.getElementById('distRange');
  if (!distRange) return;
  document.getElementById('distVal').textContent = `${parseInt(distRange.value, 10)} Feet`;
}

function showToast(title, message, icon = 'fa-circle-check', iconColor = 'text-emerald-400') {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-6 right-6 z-50 bg-slate-900 border border-brand-gold text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce max-w-sm';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.setAttribute('aria-atomic', 'true');

  const toastIcon = document.createElement('i');
  toastIcon.className = `fa-solid ${icon} ${iconColor} text-xl`;
  toastIcon.setAttribute('aria-hidden', 'true');

  const toastContent = document.createElement('div');
  const toastTitle = document.createElement('div');
  toastTitle.className = 'font-bold text-sm';
  toastTitle.textContent = title;

  const toastMessage = document.createElement('div');
  toastMessage.className = 'text-xs text-slate-300';
  toastMessage.textContent = message;

  toastContent.append(toastTitle, toastMessage);
  toast.append(toastIcon, toastContent);
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 6000);
}

async function handleEstimatorSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');

  submitBtn.disabled = true;
  btnText.textContent = 'Sending Project Details...';

  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const email = document.getElementById('custEmail').value.trim();
  const honey = document.getElementById('formWebsite').value;
  const dist = `${document.getElementById('distRange').value} Feet`;
  const sectorElem = document.querySelector('input[name="Sector"]:checked');
  const sector = sectorElem ? sectorElem.value : 'Residential';
  const conduitSelect = document.getElementById('conduitSize');
  const conduitSize = conduitSelect.options[conduitSelect.selectedIndex].text;
  document.getElementById('hiddenReplyTo').value = email;

  const safeSubjectName = name.replace(/[\r\n]+/g, ' ').slice(0, 80);
  const formData = {
    _subject: `NEW PROJECT REQUEST: ${safeSubjectName}`,
    _replyto: email,
    _honey: honey,
    Name: name,
    Phone: phone,
    Email: email,
    Sector: sector,
    'Bore Distance': dist,
    'Conduit Size': conduitSize,
  };

  if (window.location.protocol === 'file:') {
    form.submit();
    return;
  }

  try {
    const response = await fetch('https://formsubmit.co/ajax/antonio.aboytes@tm-uc.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json().catch(() => ({}));
    const submissionAccepted = response.ok && (result.success === true || result.success === 'true');

    if (submissionAccepted) {
      showToast('Project Request Sent!', `Thanks ${name}, our team will contact you shortly.`);
      form.reset();
      updateDistanceDisplay();
    } else if (response.ok) {
      console.warn('FormSubmit did not accept the project request:', result.message || 'Unknown response');
      showToast(
        'Request Not Sent',
        'Please complete any verification requested and try again, or call (904) 844-3438 for assistance.',
        'fa-triangle-exclamation',
        'text-red-400',
      );
    } else {
      form.submit();
    }
  } catch (error) {
    console.warn('AJAX fetch failed (likely CORS or offline), falling back to standard submit:', error);
    form.submit();
  } finally {
    submitBtn.disabled = false;
    btnText.textContent = 'Submit Project Details & Request Follow-Up';
  }
}

const distRange = document.getElementById('distRange');
if (distRange) {
  distRange.addEventListener('input', updateDistanceDisplay);
}

const estimatorForm = document.getElementById('estimatorForm');
if (estimatorForm) {
  estimatorForm.addEventListener('submit', handleEstimatorSubmit);
}

updateDistanceDisplay();
