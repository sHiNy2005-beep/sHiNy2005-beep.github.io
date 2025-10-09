(() => {
  const embeddedJournal = {
    "entries": [
      {"_id":1,"title":"Morning Reflections","date":"2025-09-25","img_name":"json/images/morning-reflection.png","mood":"Peaceful","summary":"Started my day with a walk and meditation. Felt calm and focused."},
      {"_id":2,"title":"Busy Study Day","date":"2025-09-26","img_name":"json/images/midterm-exam.png","mood":"Productive","summary":"Had three classes and a project meeting. Stayed organized and motivated."},
      {"_id":3,"title":"Weekend fun","date":"2025-09-27","img_name":"json/images/weekend-fun.png","mood":"Relaxed","summary":"Spent time with family in georgia."},
      {"_id":4,"title":"Gym time","date":"2025-09-28","img_name":"json/images/gym-time.png","mood":"Energized","summary":"Tried to workout with a friend after a long time."},
      {"_id":5,"title":"Family time","date":"2025-09-29","img_name":"json/images/family-time.png","mood":"Happy","summary":"Had dinner with family after a while."},
      {"_id":6,"title":"Rainy weather","date":"2025-09-30","img_name":"json/images/rainy-weather.png","mood":"Calm","summary":"Rainy day. Spent the evening with someone I like."},
      {"_id":7,"title":"Midterm Stress","date":"2025-10-01","img_name":"json/images/midterm-exam.png","mood":"Stressed","summary":"Studying for midterms, I hated the math class."},
      {"_id":8,"title":"Self-Care Sunday","date":"2025-10-02","img_name":"json/images/self-care.png","mood":"Refreshed","summary":"Did a face mask, listened to music, and journaled about my goals."}
    ]
  };

  const $ = s => document.querySelector(s);

  function parseDate(dstr) {
    if (!dstr) return new Date(NaN);
    const [y, m, d] = dstr.split('-').map(Number);
    return new Date(y, m - 1, d);
  }
  function formatDate(dstr) {
    const d = parseDate(dstr);
    if (isNaN(d)) return dstr || '';
    return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }

  function normalizeImgName(imgName) {
    if (!imgName) return imgName;
    let s = String(imgName).trim();

    s = s.replace(/^[\\/]+/, '');

  
    if (/^images\//i.test(s) && !/^json\/images\//i.test(s)) {
      s = s.replace(/^images\//i, 'json/images/');
    }

   // found a tutorial for doing the image show up forcefully on youtube and used w3 schools.
    if (!/\.[a-z0-9]{2,5}$/i.test(s)) {
      s = s + '.png';
    }

    return s;
  }

  async function resolveAndTestImg(imgCandidate) {
    if (/\.[a-z0-9]{2,5}$/i.test(imgCandidate)) {
      const ok = await testImageLoad(imgCandidate);
      return ok ? imgCandidate : null;
    }

    const png = imgCandidate + '.png';
    if (await testImageLoad(png)) return png;
    const jpg = imgCandidate + '.jpg';
    if (await testImageLoad(jpg)) return jpg;
    return null;
  }

  function testImageLoad(src) {
    return new Promise(resolve => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = src;
    });
  }

  function createEntry(entry) {
    const art = document.createElement('article');
    art.className = 'entry';

    const content = document.createElement('div');
    content.className = 'entry-content';

    const date = document.createElement('div');
    date.className = 'entry-date';
    date.textContent = formatDate(entry.date);

    const h2 = document.createElement('h2');
    h2.textContent = entry.title || '';

    const p = document.createElement('p');
    p.textContent = entry.summary || '';

    const mood = document.createElement('span');
    mood.className = 'mood';
    mood.textContent = entry.mood || '';

    content.appendChild(date);
    content.appendChild(h2);
    content.appendChild(p);
    content.appendChild(mood);

    art.appendChild(content);

    if (entry.img_name) {
      const img = document.createElement('img');
      img.className = 'entry-thumb';
      img.src = entry.img_name;
      img.alt = entry.title || 'journal image';
      img.onerror = () => {
        console.warn('Image failed to load and will be hidden:', img.src);
        img.style.display = 'none';
      };
      art.appendChild(img);
    }

    return art;
  }

  function renderJournal(journal) {
    const container = $('#journal');
    if (!container) {
      console.error('No #journal element found.');
      return;
    }

    const title = container.querySelector('.entries-title');
    container.innerHTML = '';
    if (title) container.appendChild(title);

    const entriesWrapper = document.createElement('div');
    entriesWrapper.className = 'journal-scroll-wrapper';
    container.appendChild(entriesWrapper);

    const sortedEntries = (journal.entries || []).slice().sort((a, b) => parseDate(b.date) - parseDate(a.date));
    sortedEntries.forEach(entry => entriesWrapper.appendChild(createEntry(entry)));

    console.log('Loaded', sortedEntries.length, 'journal entries.');
  }

  async function init() {
    let data = embeddedJournal;
    const tryFiles = ['data.json', 'json/data.json', 'json/shoes.json', 'shoes.json'];
    for (const file of tryFiles) {
      try {
        const resp = await fetch(file, { cache: 'no-store' });
        if (resp.ok) {
          data = await resp.json();
          console.log('Loaded JSON from', file);
          break;
        }
      } catch (err) {
      }
    }

    const entries = data.entries || [];
    for (let i = 0; i < entries.length; i++) {
      const e = entries[i];
      if (!e.img_name) continue;
      const normalized = normalizeImgName(e.img_name);

      let final = null;
      if (/\.[a-z0-9]{2,5}$/i.test(normalized)) {
        const ok = await testImageLoad(normalized);
        final = ok ? normalized : null;
      } else {
        final = await resolveAndTestImg(normalized);
      }

     
      if (!final) {
        const alt = normalized.replace(/^json\/images\//i, 'images/');
        if (alt !== normalized) {
          if (/\.[a-z0-9]{2,5}$/i.test(alt)) {
            final = (await testImageLoad(alt)) ? alt : null;
          } else {
            final = await resolveAndTestImg(alt);
          }
        }
      }

      if (final) {
        e.img_name = final;
        console.log('Image resolved for entry', e._id, '→', final);
      } else {
        e.img_name = normalized;
        console.error('Could not resolve image for entry', e._id, 'attempted:', normalized);
      }
    }

    renderJournal(data);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
