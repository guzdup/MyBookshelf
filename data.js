// data.js — myBookshelf curated library
// Each book carries REAL physical dimensions (mm). Spine height & thickness on the
// shelf are derived from these, so the shelf is dimensionally honest — the whole point.
//   heightMM  : real cover height (paperback ~178, trade ~203, hardback 210-240)
//   thickMM   : real spine thickness (derived from page count / binding)
//   widthMM   : real cover width (defaults to ~0.64 * height if omitted)
// Colors describe the printed spine. coverStyle drives the front-cover art for the
// few "real-art" titles; the rest get a clean typeset spine + cover.
// page/pages power the "open to the last page you read" moment. Excerpts are ORIGINAL
// placeholder prose (no copyrighted text).

window.MB_PXMM = 0.72; // px per mm — global shelf scale

(function () {
  const ex1 = "The lamp threw a small circle of gold against the dark, and for a while that was all the world she needed. She read until the words began to blur at their edges, until the difference between the page and the hour stopped mattering. Somewhere a clock let go of midnight without comment.";
  const ex2 = "He had learned, after everything, that endings rarely announce themselves. They arrive folded into ordinary afternoons — a door left open, a name said once and not again. By the time you understand a thing has finished, you are already standing in whatever comes next.";
  const ex3 = "They walked the long way home because neither of them was ready to stop talking. The streetlights came on one by one as if lit by their passing, and the whole town smelled of rain that hadn't fallen yet. She thought: I will want to remember this exactly, and knew already that she wouldn't.";
  const ex4 = "What the map could not show was the weight of the distance — how each mile asked something of you, and kept it. The mountains held their snow like a secret. He folded the paper into quarters, then eighths, until it fit in his palm like a stone worth carrying.";

  const E = [ex1, ex2, ex3, ex4];
  const pick = (i) => E[i % E.length];

  // helpers to make thickness feel real from a page count
  const thick = (pages, hard) => Math.max(8, Math.round(pages * 0.052 + (hard ? 7 : 2)));

  let _id = 0;
  const B = (o) => {
    const pages = o.pages;
    const b = {
      id: 'b' + (_id++),
      widthMM: Math.round(o.heightMM * 0.64),
      thickMM: o.thickMM != null ? o.thickMM : thick(pages, o.hard),
      textColor: o.textColor || '#f4efe4',
      accent: o.accent || o.textColor || '#f4efe4',
      coverStyle: o.coverStyle || 'type',
      page: o.page != null ? o.page : Math.round(pages * (0.2 + (_id % 7) / 14)),
      excerpt: o.excerpt || pick(_id),
      ...o,
    };
    return b;
  };

  // ── Shelf 1 (top) — literary fiction, warm + bright ───────────────
  const shelf1 = [
    B({ title: 'The Overstory', author: 'Richard Powers', heightMM: 203, pages: 502, hard: true, spineColor: '#2f5d3a', textColor: '#f0ead6', accent: '#cbb26a' }),
    B({ title: 'Normal People', author: 'Sally Rooney', heightMM: 198, pages: 273, spineColor: '#dfe7ea', textColor: '#2b3a42', accent: '#6f8a93' }),
    B({ title: 'Pachinko', author: 'Min Jin Lee', heightMM: 210, pages: 496, hard: true, spineColor: '#b13a2f', textColor: '#f6e7c8', accent: '#e8c878' }),
    B({ title: 'A Little Life', author: 'Hanya Yanagihara', heightMM: 210, pages: 720, hard: true, spineColor: '#27292e', textColor: '#e7e2d6', accent: '#9aa6ad' }),
    B({ title: 'Circe', author: 'Madeline Miller', heightMM: 203, pages: 393, spineColor: '#c8632a', textColor: '#fbf0d8', accent: '#f2c75c', coverStyle: 'feature' }),
    B({ title: 'Beloved', author: 'Toni Morrison', heightMM: 198, pages: 324, spineColor: '#6a2030', textColor: '#f3dcc4', accent: '#d9a05b' }),
    B({ title: 'Cloud Atlas', author: 'David Mitchell', heightMM: 198, pages: 509, spineColor: '#1f4e63', textColor: '#dfeaf0', accent: '#7fc0cf' }),
    B({ title: 'The Goldfinch', author: 'Donna Tartt', heightMM: 210, pages: 771, hard: true, spineColor: '#c9a227', textColor: '#2c2a22', accent: '#3a3726', coverStyle: 'feature' }),
    B({ title: 'Lincoln in the Bardo', author: 'George Saunders', heightMM: 203, pages: 343, spineColor: '#3a3f4b', textColor: '#e9e4d6', accent: '#b9c1cc' }),
    B({ title: 'Atonement', author: 'Ian McEwan', heightMM: 198, pages: 351, spineColor: '#e7dcc4', textColor: '#5a4a32', accent: '#9c7c4a' }),
    B({ title: 'The Road', author: 'Cormac McCarthy', heightMM: 198, pages: 287, spineColor: '#3b3b3b', textColor: '#d8d2c4', accent: '#8c8578' }),
    B({ title: 'Middlesex', author: 'Jeffrey Eugenides', heightMM: 203, pages: 529, spineColor: '#8a3a52', textColor: '#f3e3df', accent: '#e3a6b4' }),
    B({ title: 'Klara and the Sun', author: 'Kazuo Ishiguro', heightMM: 210, pages: 303, hard: true, spineColor: '#e1b94a', textColor: '#3a3216', accent: '#7a6a2a', coverStyle: 'feature' }),
  ];

  // ── Shelf 2 (middle) — modern bestsellers ─────────────────────────
  const shelf2 = [
    B({ title: 'Project Hail Mary', author: 'Andy Weir', heightMM: 210, pages: 496, hard: true, spineColor: '#13243f', textColor: '#cfe0f0', accent: '#f0c14b', coverStyle: 'feature' }),
    B({ title: 'Where the Crawdads Sing', author: 'Delia Owens', heightMM: 203, pages: 384, spineColor: '#2c5e54', textColor: '#e8e0c8', accent: '#d9b25a', coverStyle: 'feature' }),
    B({ title: 'The Night Circus', author: 'Erin Morgenstern', heightMM: 203, pages: 516, spineColor: '#181818', textColor: '#f2f2f2', accent: '#c0392b' }),
    B({ title: 'Tomorrow, and Tomorrow', author: 'Gabrielle Zevin', heightMM: 210, pages: 401, hard: true, spineColor: '#2858a6', textColor: '#eef4fb', accent: '#e9b949', coverStyle: 'feature' }),
    B({ title: 'The Seven Husbands', author: 'Taylor Jenkins Reid', heightMM: 203, pages: 389, spineColor: '#1f8a5b', textColor: '#f4ecd8', accent: '#f0c75e' }),
    B({ title: 'Educated', author: 'Tara Westover', heightMM: 210, pages: 334, hard: true, spineColor: '#c8c2b6', textColor: '#3a3630', accent: '#7a746a' }),
    B({ title: 'The Midnight Library', author: 'Matt Haig', heightMM: 198, pages: 304, spineColor: '#16324f', textColor: '#dfe9f2', accent: '#9fd0e0' }),
    B({ title: 'Anxious People', author: 'Fredrik Backman', heightMM: 203, pages: 352, spineColor: '#e08a2c', textColor: '#3a2a14', accent: '#5a3f1a' }),
    B({ title: 'Hamnet', author: "Maggie O'Farrell", heightMM: 198, pages: 372, spineColor: '#5a6e3a', textColor: '#eef0e0', accent: '#bcc98a' }),
    B({ title: 'Lessons in Chemistry', author: 'Bonnie Garmus', heightMM: 210, pages: 390, hard: true, spineColor: '#d24a3a', textColor: '#fbeede', accent: '#f0c050', coverStyle: 'feature' }),
    B({ title: 'The Vanishing Half', author: 'Brit Bennett', heightMM: 203, pages: 343, spineColor: '#e9d24a', textColor: '#2c2710', accent: '#c0392b' }),
    B({ title: 'Demon Copperhead', author: 'Barbara Kingsolver', heightMM: 210, pages: 548, hard: true, spineColor: '#7a3320', textColor: '#f0dcc0', accent: '#d99a4a' }),
    B({ title: 'Sea of Tranquility', author: 'Emily St. John Mandel', heightMM: 203, pages: 259, spineColor: '#9fb6c2', textColor: '#23323a', accent: '#3a5260' }),
  ];

  // ── Shelf 3 (bottom) — classics + nonfiction, taller hardbacks ────
  const shelf3 = [
    B({ title: 'Sapiens', author: 'Yuval Noah Harari', heightMM: 234, pages: 443, hard: true, spineColor: '#e7e2d6', textColor: '#2b2620', accent: '#b13a2f' }),
    B({ title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', heightMM: 234, pages: 499, hard: true, spineColor: '#f0ece2', textColor: '#2b2620', accent: '#3a6ea5' }),
    B({ title: 'East of Eden', author: 'John Steinbeck', heightMM: 210, pages: 601, hard: true, spineColor: '#3a4a2e', textColor: '#ece4cc', accent: '#c2a85a' }),
    B({ title: 'The Count of Monte Cristo', author: 'Alexandre Dumas', heightMM: 234, pages: 1276, hard: true, spineColor: '#5a1f24', textColor: '#e8cf9a', accent: '#c9a227' }),
    B({ title: 'Anna Karenina', author: 'Leo Tolstoy', heightMM: 216, pages: 864, hard: true, spineColor: '#243a52', textColor: '#e4dcc6', accent: '#bda35a' }),
    B({ title: 'Jane Eyre', author: 'Charlotte Brontë', heightMM: 210, pages: 532, spineColor: '#43304a', textColor: '#e9dcea', accent: '#b99ac4' }),
    B({ title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', heightMM: 216, pages: 671, hard: true, spineColor: '#2b2b2b', textColor: '#d9cfc0', accent: '#a8331f' }),
    B({ title: 'The Brothers Karamazov', author: 'F. Dostoevsky', heightMM: 216, pages: 824, hard: true, spineColor: '#6a4a2a', textColor: '#efe2c8', accent: '#cbb26a' }),
    B({ title: 'Dune', author: 'Frank Herbert', heightMM: 210, pages: 688, hard: true, spineColor: '#9c5a1e', textColor: '#f4e0bc', accent: '#e0a23a', coverStyle: 'feature' }),
    B({ title: 'Wuthering Heights', author: 'Emily Brontë', heightMM: 198, pages: 416, spineColor: '#46525a', textColor: '#dde6ea', accent: '#9fb4bc' }),
    B({ title: 'The Name of the Wind', author: 'Patrick Rothfuss', heightMM: 234, pages: 662, hard: true, spineColor: '#1b2a36', textColor: '#cdd8de', accent: '#cf8a3a' }),
    B({ title: 'Gödel, Escher, Bach', author: 'Douglas Hofstadter', heightMM: 234, pages: 777, hard: true, spineColor: '#d8c9a8', textColor: '#2b2620', accent: '#6a4a2a' }),
  ];

  // ── Shelf 4 (added) — contemporary fiction, memoir & ideas ────────
  const shelf4 = [
    B({ title: 'The Secret History', author: 'Donna Tartt', heightMM: 203, pages: 559, spineColor: '#2c3a2e', textColor: '#e6e0cc', accent: '#c2a85a' }),
    B({ title: 'Never Let Me Go', author: 'Kazuo Ishiguro', heightMM: 198, pages: 288, spineColor: '#9fb0b6', textColor: '#23323a', accent: '#3a5260' }),
    B({ title: 'The Kite Runner', author: 'Khaled Hosseini', heightMM: 203, pages: 371, spineColor: '#b5472e', textColor: '#f4e3cc', accent: '#e8b85a' }),
    B({ title: 'Life of Pi', author: 'Yann Martel', heightMM: 198, pages: 460, spineColor: '#1f6e7a', textColor: '#e6f0ec', accent: '#f0a83a', coverStyle: 'feature' }),
    B({ title: 'The Power', author: 'Naomi Alderman', heightMM: 203, pages: 341, spineColor: '#161616', textColor: '#f2f2f2', accent: '#e0b020' }),
    B({ title: 'Babel', author: 'R.F. Kuang', heightMM: 234, pages: 545, hard: true, spineColor: '#3a2438', textColor: '#ecdcea', accent: '#c8a05a' }),
    B({ title: 'Piranesi', author: 'Susanna Clarke', heightMM: 210, pages: 245, hard: true, spineColor: '#c8d2d6', textColor: '#2b3a42', accent: '#6f8a93' }),
    B({ title: 'Cutting for Stone', author: 'Abraham Verghese', heightMM: 203, pages: 658, spineColor: '#217a1e', textColor: '#f0dcc0', accent: '#d99a4a' }),
    B({ title: 'The Shadow of the Wind', author: 'Carlos Ruiz Zafón', heightMM: 198, pages: 487, spineColor: '#2b2b2b', textColor: '#d9cfc0', accent: '#a8331f' }),
    B({ title: 'A Gentleman in Moscow', author: 'Amor Towles', heightMM: 210, pages: 462, hard: true, spineColor: '#1f3a52', textColor: '#e4dcc6', accent: '#bda35a', coverStyle: 'feature' }),
    B({ title: 'Wolf Hall', author: 'Hilary Mantel', heightMM: 216, pages: 653, hard: true, spineColor: '#5a1f24', textColor: '#e8cf9a', accent: '#c9a227' }),
    B({ title: 'Station Eleven', author: 'Emily St. John Mandel', heightMM: 198, pages: 333, spineColor: '#13243f', textColor: '#cfe0f0', accent: '#7fc0cf' }),
    B({ title: 'The Idiot', author: 'Elif Batuman', heightMM: 203, pages: 423, spineColor: '#e9d24a', textColor: '#2c2710', accent: '#c0392b' }),
  ];

  window.MB_SHELVES = [shelf1, shelf2, shelf3, shelf4];
  window.MB_BOOKS = [...shelf1, ...shelf2, ...shelf3, ...shelf4];
})();
