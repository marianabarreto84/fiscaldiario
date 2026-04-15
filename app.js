// ─── Entry type definitions ───────────────────────────────────────────────────

const ENTRY_TYPES = {
  transporte: {
    icon: '🚗',
    label: 'Transporte',
    color: '#e67e22',
    fields: [
      { key: 'servico', label: 'Serviço', type: 'select', options: ['Uber', '99', 'Táxi', 'Ônibus', 'Metrô', 'Carro', 'A pé', 'Outro'] },
      { key: 'sentido', label: 'Sentido', type: 'select', options: ['Ida', 'Volta', 'Ida e volta'] },
      { key: 'de', label: 'De', type: 'text', placeholder: 'Casa JB' },
      { key: 'para', label: 'Para', type: 'text', placeholder: 'Quantum' },
      { key: 'valor', label: 'Valor (R$)', type: 'number', step: '0.01', placeholder: '0,00', optional: true },
    ],
  },
  musica: {
    icon: '🎵',
    label: 'Música',
    color: '#e74c3c',
    fields: [
      { key: 'artista', label: 'Artista', type: 'text' },
      { key: 'album', label: 'Álbum / Música / Playlist', type: 'text' },
      { key: 'contexto', label: 'Contexto', type: 'text', placeholder: 'indo para o trabalho', optional: true },
    ],
  },
  entretenimento: {
    icon: '📺',
    label: 'Série / Filme',
    color: '#8e44ad',
    fields: [
      { key: 'tipo', label: 'Tipo', type: 'select', options: ['Série', 'Filme', 'Documentário', 'Anime', 'Outro'] },
      { key: 'titulo', label: 'Título', type: 'text' },
      { key: 'episodio', label: 'Episódio', type: 'text', placeholder: 'S01E03', optional: true },
      { key: 'periodo', label: 'Período', type: 'select', options: ['Manhã', 'Tarde', 'Noite'], optional: true },
    ],
  },
  trabalho: {
    icon: '💼',
    label: 'Trabalho',
    color: '#27ae60',
    fields: [
      { key: 'horas', label: 'Horas trabalhadas', type: 'number', step: '0.5', placeholder: '5' },
      { key: 'descricao', label: 'Descrição', type: 'textarea', placeholder: 'No que você trabalhou?', optional: true },
    ],
  },
  refeicao: {
    icon: '🍽️',
    label: 'Refeição',
    color: '#f39c12',
    fields: [
      { key: 'refeicao', label: 'Refeição', type: 'select', options: ['Café da manhã', 'Almoço', 'Jantar', 'Lanche'] },
      { key: 'local', label: 'Local', type: 'text', optional: true },
      { key: 'valor', label: 'Valor (R$)', type: 'number', step: '0.01', placeholder: '0,00', optional: true },
    ],
  },
  leitura: {
    icon: '📚',
    label: 'Leitura',
    color: '#2980b9',
    fields: [
      { key: 'tipo', label: 'Tipo', type: 'select', options: ['Livro', 'Artigo', 'Newsletter', 'HQ', 'Outro'] },
      { key: 'titulo', label: 'Título', type: 'text' },
      { key: 'autor', label: 'Autor', type: 'text', optional: true },
    ],
  },
  gasto: {
    icon: '💸',
    label: 'Gasto',
    color: '#c0392b',
    fields: [
      { key: 'descricao', label: 'Descrição', type: 'text' },
      { key: 'valor', label: 'Valor (R$)', type: 'number', step: '0.01' },
      { key: 'categoria', label: 'Categoria', type: 'text', placeholder: 'alimentação, lazer…', optional: true },
    ],
  },
  nota: {
    icon: '📝',
    label: 'Nota',
    color: '#7f8c8d',
    fields: [
      { key: 'texto', label: 'Texto', type: 'textarea', placeholder: 'O que você quer registrar?' },
    ],
  },
};

// ─── App state ────────────────────────────────────────────────────────────────

let currentDate = new Date();
currentDate.setHours(0, 0, 0, 0);

let entries = [];
let db = null;          // Supabase client or null
let selectedType = null;
let sortableInstance = null;

// ─── Supabase init ────────────────────────────────────────────────────────────

function initStorage() {
  const badge = document.getElementById('storage-badge');
  const url = window.SUPABASE_URL;
  const key = window.SUPABASE_KEY;

  if (url && key && url.trim() !== '' && key.trim() !== '') {
    try {
      db = supabase.createClient(url.trim(), key.trim());
      badge.className = 'storage-badge cloud';
      badge.textContent = '☁ Supabase';
      return;
    } catch (e) {
      console.error('Supabase init failed:', e);
    }
  }

  badge.className = 'storage-badge local';
  badge.textContent = '💾 Local';
}

// ─── Date helpers ─────────────────────────────────────────────────────────────

function toDateKey(date) {
  // Returns YYYY-MM-DD in local time
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatDateDisplay(date) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const full = date.toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' });

  if (date.getTime() === today.getTime()) return { label: 'Hoje', full };
  if (date.getTime() === yesterday.getTime()) return { label: 'Ontem', full };

  const weekday = date.toLocaleDateString('pt-BR', { weekday: 'long' });
  const label = weekday.charAt(0).toUpperCase() + weekday.slice(1);
  return { label, full };
}

function formatTime(isoString) {
  return new Date(isoString).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function formatCurrency(value) {
  const n = parseFloat(value);
  if (isNaN(n)) return null;
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// ─── Storage: load ────────────────────────────────────────────────────────────

async function loadEntries(date) {
  showLoading(true);

  try {
    if (db) {
      const { data, error } = await db
        .from('log_entries')
        .select('*')
        .eq('date', toDateKey(date))
        .order('position', { ascending: true, nullsFirst: false })
        .order('created_at', { ascending: true });

      if (error) throw error;
      entries = data || [];
    } else {
      const raw = localStorage.getItem(`diary_${toDateKey(date)}`);
      entries = raw ? JSON.parse(raw) : [];
    }
  } catch (err) {
    console.error('Load error:', err);
    showToast('Erro ao carregar registros');
    entries = [];
  }

  showLoading(false);
  renderEntries();
}

// ─── Storage: save ────────────────────────────────────────────────────────────

async function saveEntry(type, data, customFields) {
  const entry = {
    date: toDateKey(currentDate),
    type,
    data,
    custom_fields: customFields,
    position: entries.length,
    created_at: new Date().toISOString(),
  };

  try {
    if (db) {
      const { data: saved, error } = await db
        .from('log_entries')
        .insert(entry)
        .select()
        .single();

      if (error) throw error;
      entries.push(saved);
    } else {
      entry.id = crypto.randomUUID();
      entries.push(entry);
      localStorage.setItem(`diary_${toDateKey(currentDate)}`, JSON.stringify(entries));
    }

    renderEntries();
    showToast('Salvo!');
    return true;
  } catch (err) {
    console.error('Save error:', err);
    showToast('Erro ao salvar');
    return false;
  }
}

// ─── Storage: delete ──────────────────────────────────────────────────────────

async function deleteEntry(id) {
  try {
    if (db) {
      const { error } = await db
        .from('log_entries')
        .delete()
        .eq('id', id);

      if (error) throw error;
    }

    entries = entries.filter(e => e.id !== id);

    if (!db) {
      localStorage.setItem(`diary_${toDateKey(currentDate)}`, JSON.stringify(entries));
    }

    renderEntries();
    showToast('Removido');
  } catch (err) {
    console.error('Delete error:', err);
    showToast('Erro ao remover');
  }
}

// ─── Storage: reorder ─────────────────────────────────────────────────────────

async function updatePositions(newOrder) {
  // Reorder local array
  entries = newOrder.map(id => entries.find(e => e.id === id)).filter(Boolean);

  if (db) {
    await Promise.all(
      newOrder.map((id, index) =>
        db.from('log_entries').update({ position: index }).eq('id', id)
      )
    );
  } else {
    localStorage.setItem(`diary_${toDateKey(currentDate)}`, JSON.stringify(entries));
  }
}

// ─── Render: header ───────────────────────────────────────────────────────────

function renderHeader() {
  const { label, full } = formatDateDisplay(currentDate);
  document.getElementById('date-label').textContent = label;
  document.getElementById('date-full').textContent = full;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  document.getElementById('next-day').disabled = currentDate >= today;
}

// ─── Render: entries ──────────────────────────────────────────────────────────

function renderEntries() {
  const container = document.getElementById('entries-list');

  if (entries.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📓</div>
        <p>Nenhum registro ainda.<br>Toque em <strong>+</strong> para adicionar.</p>
      </div>`;
    return;
  }

  container.innerHTML = entries.map(renderCard).join('');

  container.querySelectorAll('.entry-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Remover este registro?')) {
        deleteEntry(btn.dataset.id);
      }
    });
  });

  // Drag and drop
  if (sortableInstance) {
    sortableInstance.destroy();
    sortableInstance = null;
  }

  if (entries.length > 1) {
    sortableInstance = Sortable.create(container, {
      handle: '.drag-handle',
      animation: 150,
      ghostClass: 'card-ghost',
      onEnd(evt) {
        if (evt.oldIndex === evt.newIndex) return;
        const cards = container.querySelectorAll('.entry-card');
        const newOrder = Array.from(cards).map(c => c.dataset.id);
        updatePositions(newOrder);
      },
    });
  }
}

function renderCard(entry) {
  const typeDef = ENTRY_TYPES[entry.type];
  if (!typeDef) return '';

  const time = formatTime(entry.created_at);
  let content = renderCardContent(entry, typeDef);

  // Append custom fields
  const cf = entry.custom_fields || {};
  if (Object.keys(cf).length > 0) {
    content += Object.entries(cf)
      .filter(([k]) => k.trim())
      .map(([k, v]) => `<div><span class="entry-muted">${esc(k)}:</span> ${esc(v)}</div>`)
      .join('');
  }

  return `
    <div class="entry-card" data-id="${entry.id}" style="--type-color:${typeDef.color}">
      <div class="drag-handle" aria-hidden="true">⠿</div>
      <div class="entry-icon">${typeDef.icon}</div>
      <div class="entry-body">
        <div class="entry-header">
          <span class="entry-type-label">${typeDef.label}</span>
          <span class="entry-time">${time}</span>
        </div>
        <div class="entry-content">${content}</div>
      </div>
      <button class="entry-delete" data-id="${entry.id}" aria-label="Remover">×</button>
    </div>`;
}

function renderCardContent(entry, typeDef) {
  const d = entry.data || {};

  switch (entry.type) {
    case 'transporte': {
      const parts = [];
      if (d.servico) parts.push(`<strong>${esc(d.servico)}</strong>`);
      if (d.sentido) parts.push(esc(d.sentido));
      const route = [d.de, d.para].filter(Boolean).map(esc).join(' → ');
      if (route) parts.push(route);
      if (d.valor) parts.push(`<strong>${formatCurrency(d.valor)}</strong>`);
      return parts.join(' · ');
    }

    case 'musica': {
      const lines = [];
      if (d.artista) lines.push(`<strong>${esc(d.artista)}</strong>`);
      if (d.album) lines.push(esc(d.album));
      if (d.contexto) lines.push(`<span class="entry-muted">${esc(d.contexto)}</span>`);
      return lines.join('<br>');
    }

    case 'entretenimento': {
      const parts = [];
      if (d.tipo) parts.push(esc(d.tipo));
      if (d.titulo) parts.push(`<strong>${esc(d.titulo)}</strong>`);
      if (d.episodio) parts.push(esc(d.episodio));
      if (d.periodo) parts.push(`<span class="entry-muted">${esc(d.periodo)}</span>`);
      return parts.join(' · ');
    }

    case 'trabalho': {
      const parts = [];
      if (d.horas) parts.push(`<strong>${esc(String(d.horas))}h</strong> trabalhadas`);
      if (d.descricao) parts.push(`<br><span class="entry-muted">${esc(d.descricao)}</span>`);
      return parts.join('');
    }

    case 'refeicao': {
      const parts = [];
      if (d.refeicao) parts.push(`<strong>${esc(d.refeicao)}</strong>`);
      if (d.local) parts.push(esc(d.local));
      if (d.valor) parts.push(formatCurrency(d.valor));
      return parts.join(' · ');
    }

    case 'leitura': {
      const parts = [];
      if (d.tipo) parts.push(esc(d.tipo));
      if (d.titulo) parts.push(`<strong>${esc(d.titulo)}</strong>`);
      if (d.autor) parts.push(`<span class="entry-muted">${esc(d.autor)}</span>`);
      return parts.join(' · ');
    }

    case 'gasto': {
      const parts = [];
      if (d.descricao) parts.push(`<strong>${esc(d.descricao)}</strong>`);
      if (d.valor) parts.push(`<strong>${formatCurrency(d.valor)}</strong>`);
      if (d.categoria) parts.push(`<span class="entry-muted">${esc(d.categoria)}</span>`);
      return parts.join(' · ');
    }

    case 'nota':
      return d.texto ? esc(d.texto).replace(/\n/g, '<br>') : '';

    default:
      return Object.entries(d)
        .filter(([, v]) => v !== null && v !== '')
        .map(([k, v]) => `<span class="entry-muted">${esc(k)}:</span> ${esc(String(v))}`)
        .join(' · ');
  }
}

function esc(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function openModal() {
  selectedType = null;
  document.getElementById('modal').classList.remove('hidden');
  showTypeStep();
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
  document.body.style.overflow = '';
  selectedType = null;
  document.getElementById('entry-form').reset();
  document.getElementById('custom-fields-list').innerHTML = '';
}

function showTypeStep() {
  document.getElementById('step-type').classList.remove('hidden');
  document.getElementById('step-form').classList.add('hidden');
}

function showFormStep(type) {
  selectedType = type;
  const typeDef = ENTRY_TYPES[type];

  document.getElementById('step-type').classList.add('hidden');
  document.getElementById('step-form').classList.remove('hidden');
  document.getElementById('form-title').textContent = `${typeDef.icon} ${typeDef.label}`;

  // Build form fields
  document.getElementById('form-fields').innerHTML =
    typeDef.fields.map(buildField).join('');

  // Focus first input
  setTimeout(() => {
    const first = document.querySelector('#form-fields input, #form-fields select, #form-fields textarea');
    if (first) first.focus();
  }, 80);
}

// ─── Form field builder ───────────────────────────────────────────────────────

function buildField(field) {
  const labelClass = field.optional ? 'form-label optional' : 'form-label';
  const required = field.optional ? '' : 'required';
  const placeholder = field.placeholder || '';

  if (field.type === 'select') {
    const options = field.options.map(o => `<option value="${esc(o)}">${esc(o)}</option>`).join('');
    return `
      <div class="form-group">
        <label class="${labelClass}" for="f-${field.key}">${field.label}</label>
        <select class="form-select" id="f-${field.key}" name="${field.key}" ${required}>
          <option value="">Selecione…</option>
          ${options}
        </select>
      </div>`;
  }

  if (field.type === 'textarea') {
    return `
      <div class="form-group">
        <label class="${labelClass}" for="f-${field.key}">${field.label}</label>
        <textarea class="form-textarea" id="f-${field.key}" name="${field.key}"
          placeholder="${placeholder}" ${required}></textarea>
      </div>`;
  }

  return `
    <div class="form-group">
      <label class="${labelClass}" for="f-${field.key}">${field.label}</label>
      <input class="form-input" type="${field.type}" id="f-${field.key}" name="${field.key}"
        placeholder="${placeholder}"
        ${field.step ? `step="${field.step}"` : ''}
        ${field.min !== undefined ? `min="${field.min}"` : ''}
        ${required}>
    </div>`;
}

// ─── Custom fields ────────────────────────────────────────────────────────────

function addCustomField() {
  const list = document.getElementById('custom-fields-list');
  const row = document.createElement('div');
  row.className = 'custom-field-row';
  row.innerHTML = `
    <input class="form-input" type="text" placeholder="Campo" data-role="key">
    <input class="form-input" type="text" placeholder="Valor" data-role="value">
    <button type="button" class="remove-field-btn" aria-label="Remover">×</button>`;

  row.querySelector('.remove-field-btn').addEventListener('click', () => row.remove());
  list.appendChild(row);
  row.querySelector('[data-role="key"]').focus();
}

function collectCustomFields() {
  const fields = {};
  document.querySelectorAll('.custom-field-row').forEach(row => {
    const key = row.querySelector('[data-role="key"]').value.trim();
    const val = row.querySelector('[data-role="value"]').value.trim();
    if (key) fields[key] = val;
  });
  return fields;
}

// ─── Form submit ──────────────────────────────────────────────────────────────

async function handleSubmit(e) {
  e.preventDefault();
  if (!selectedType) return;

  const typeDef = ENTRY_TYPES[selectedType];
  const data = {};

  // Validate required fields
  let valid = true;
  for (const field of typeDef.fields) {
    const el = document.getElementById(`f-${field.key}`);
    if (!el) continue;

    let value = el.value.trim();

    if (!field.optional && !value) {
      el.focus();
      el.style.borderColor = '#e05252';
      setTimeout(() => { el.style.borderColor = ''; }, 1500);
      valid = false;
      break;
    }

    if (field.type === 'number' && value !== '') {
      value = parseFloat(value);
      if (isNaN(value)) value = null;
    }

    data[field.key] = value || null;
  }

  if (!valid) return;

  const btn = document.getElementById('submit-btn');
  btn.disabled = true;
  btn.textContent = 'Salvando…';

  const ok = await saveEntry(selectedType, data, collectCustomFields());

  btn.disabled = false;
  btn.textContent = 'Salvar';

  if (ok) closeModal();
}

// ─── Type grid builder ────────────────────────────────────────────────────────

function buildTypeGrid() {
  const grid = document.getElementById('type-grid');
  grid.innerHTML = Object.entries(ENTRY_TYPES).map(([key, t]) => `
    <button class="type-btn" data-type="${key}" style="--type-color:${t.color}" type="button">
      <span class="type-btn-icon">${t.icon}</span>
      <span class="type-btn-label">${t.label}</span>
    </button>`).join('');

  grid.querySelectorAll('.type-btn').forEach(btn =>
    btn.addEventListener('click', () => showFormStep(btn.dataset.type)));
}

// ─── UI helpers ───────────────────────────────────────────────────────────────

function showLoading(on) {
  if (on) {
    document.getElementById('entries-list').innerHTML =
      '<div class="loading">Carregando…</div>';
  }
}

let toastTimer = null;

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
}

// ─── Navigation ───────────────────────────────────────────────────────────────

function goDay(delta) {
  const d = new Date(currentDate);
  d.setDate(d.getDate() + delta);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (d > today) return;

  currentDate = d;
  renderHeader();
  loadEntries(currentDate);
}

// ─── Init ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  initStorage();
  buildTypeGrid();

  // Date navigation
  document.getElementById('prev-day').addEventListener('click', () => goDay(-1));
  document.getElementById('next-day').addEventListener('click', () => goDay(1));

  // FAB & modal
  document.getElementById('fab').addEventListener('click', openModal);
  document.getElementById('modal-backdrop').addEventListener('click', closeModal);
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-close-2').addEventListener('click', closeModal);
  document.getElementById('back-btn').addEventListener('click', showTypeStep);

  // Form
  document.getElementById('entry-form').addEventListener('submit', handleSubmit);
  document.getElementById('add-custom-field').addEventListener('click', addCustomField);

  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  // Load today
  renderHeader();
  loadEntries(currentDate);
});
