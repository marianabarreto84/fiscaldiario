// ─── Entry type definitions ───────────────────────────────────────────────────

const ENTRY_TYPES = {
  transporte: {
    icon: '🚗',
    label: 'Transporte',
    color: '#e67e22',
    fields: [
      { key: 'servico', label: 'Serviço', type: 'select', options: ['Uber', '99', 'Táxi', 'Ônibus', 'Metrô', 'Carro', 'A pé', 'Outro'] },
      { key: 'de', label: 'De', type: 'text', placeholder: 'Casa JB', autocomplete: true },
      { key: 'para', label: 'Para', type: 'text', placeholder: 'Quantum', autocomplete: true },
      { key: 'inicio', label: 'Início', type: 'datetime-local', optional: true },
      { key: 'fim', label: 'Fim', type: 'datetime-local', optional: true },
      { key: 'valor', label: 'Valor (R$)', type: 'number', step: '0.01', placeholder: '0,00', optional: true },
      { key: 'obs', label: 'Obs', type: 'textarea', optional: true },
    ],
  },
  musica: {
    icon: '🎵',
    label: 'Música',
    color: '#e74c3c',
    fields: [
      { key: 'artista', label: 'Artista', type: 'text', autocomplete: true },
      { key: 'album', label: 'Álbum / Música / Playlist', type: 'text', autocomplete: true },
      { key: 'de_faixa', label: 'De faixa', type: 'text', optional: true, catalogRef: { category: 'album', sourceField: 'album' } },
      { key: 'ate_faixa', label: 'Até faixa', type: 'text', optional: true, catalogRef: { category: 'album', sourceField: 'album' } },
      { key: 'contexto', label: 'Contexto', type: 'text', placeholder: 'indo para o trabalho', optional: true },
      { key: 'obs', label: 'Obs', type: 'textarea', optional: true },
    ],
  },
  entretenimento: {
    icon: '📺',
    label: 'Série / Filme',
    color: '#8e44ad',
    fields: [
      { key: 'tipo',            label: 'Tipo',               type: 'select', options: ['Série', 'Filme', 'Documentário', 'Anime', 'Outro'] },
      { key: 'titulo',          label: 'Título',             type: 'text', autocomplete: true },
      { key: 'temporada',       label: 'Temporada',          type: 'number', min: '1', optional: true, seriesOnly: true },
      { key: 'episodio_numero', label: 'Episódio',           type: 'number', min: '1', optional: true, seriesOnly: true },
      { key: 'episodio_titulo', label: 'Título do episódio', type: 'text',   optional: true, seriesOnly: true },
      { key: 'periodo',         label: 'Período',            type: 'select', options: ['Manhã', 'Tarde', 'Noite', 'Madrugada'], optional: true },
      { key: 'obs', label: 'Obs', type: 'textarea', optional: true },
    ],
  },
  trabalho: {
    icon: '💼',
    label: 'Trabalho',
    color: '#27ae60',
    fields: [
      { key: 'horas', label: 'Horas trabalhadas', type: 'text', placeholder: '5h26min' },
      { key: 'descricao', label: 'Descrição', type: 'textarea', placeholder: 'No que você trabalhou?', optional: true },
      { key: 'obs', label: 'Obs', type: 'textarea', optional: true },
    ],
  },
  mestrado: {
    icon: '🎓',
    label: 'Mestrado',
    color: '#16a085',
    fields: [
      { key: 'categoria', label: 'Categoria', type: 'select', options: ['Dissertação', 'Monitoria', 'Artigo'] },
      { key: 'horas', label: 'Horas trabalhadas', type: 'text', placeholder: '5h26min' },
      { key: 'descricao', label: 'Descrição', type: 'textarea', placeholder: 'No que você trabalhou?', optional: true },
      { key: 'obs', label: 'Obs', type: 'textarea', optional: true },
    ],
  },
  refeicao: {
    icon: '🍽️',
    label: 'Refeição',
    color: '#f39c12',
    fields: [
      { key: 'refeicao', label: 'Refeição', type: 'select', options: ['Café da manhã', 'Almoço', 'Jantar', 'Lanche'] },
      { key: 'local', label: 'Local', type: 'text', optional: true, autocomplete: true },
      { key: 'via', label: 'Via', type: 'select', options: ['Presencial', 'IFood', 'Delivery'], optional: true },
      { key: 'valor', label: 'Valor (R$)', type: 'number', step: '0.01', placeholder: '0,00', optional: true },
      { key: 'obs', label: 'Obs', type: 'textarea', optional: true },
    ],
  },
  leitura: {
    icon: '📚',
    label: 'Leitura',
    color: '#2980b9',
    fields: [
      { key: 'tipo', label: 'Tipo', type: 'select', options: ['Livro', 'Artigo', 'Newsletter', 'HQ', 'Outro'] },
      { key: 'titulo', label: 'Título', type: 'text', autocomplete: true },
      { key: 'autor', label: 'Autor', type: 'text', optional: true, autocomplete: true },
      { key: 'formato', label: 'Formato', type: 'select', options: ['Físico', 'Ebook', 'Audiobook'], optional: true },
      { key: 'dispositivo', label: 'Dispositivo', type: 'select', options: ['Celular', 'Kindle', 'iPad'], optional: true },
      { key: 'progresso', label: 'Progresso', type: 'text', optional: true },
      { key: 'obs', label: 'Obs', type: 'textarea', optional: true },
    ],
  },
  gasto: {
    icon: '💸',
    label: 'Gasto',
    color: '#c0392b',
    fields: [
      { key: 'descricao', label: 'Descrição', type: 'text', autocomplete: true },
      { key: 'valor', label: 'Valor (R$)', type: 'number', step: '0.01' },
      { key: 'categoria', label: 'Categoria', type: 'text', placeholder: 'alimentação, lazer…', optional: true, autocomplete: true },
      { key: 'obs', label: 'Obs', type: 'textarea', optional: true },
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
let editingEntry = null;
let sortableInstance = null;
let catalogItems = [];
let editingCatalogItem = null;
let catalogCategory = 'album';

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

// ─── Storage: update ─────────────────────────────────────────────────────────

async function updateEntry(id, data, customFields) {
  try {
    if (db) {
      const { error } = await db
        .from('log_entries')
        .update({ data, custom_fields: customFields })
        .eq('id', id);
      if (error) throw error;
    }

    const idx = entries.findIndex(e => e.id === id);
    if (idx !== -1) {
      entries[idx] = { ...entries[idx], data, custom_fields: customFields };
    }

    if (!db) {
      localStorage.setItem(`diary_${toDateKey(currentDate)}`, JSON.stringify(entries));
    }

    renderEntries();
    showToast('Atualizado!');
    return true;
  } catch (err) {
    console.error('Update error:', err);
    showToast('Erro ao atualizar');
    return false;
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

// ─── Catalog: series helpers ─────────────────────────────────────────────────

// { '1': {min:1, max:24}, '2': {min:1, max:26}, ... }
function parseCatalogSeasons(items) {
  const seasons = {};
  for (const item of (items || [])) {
    const m = item.match(/^(\d+)x(\d+)/);
    if (!m) continue;
    const s = m[1];
    const e = parseInt(m[2]);
    if (!seasons[s]) seasons[s] = { min: e, max: e };
    else { seasons[s].min = Math.min(seasons[s].min, e); seasons[s].max = Math.max(seasons[s].max, e); }
  }
  return seasons;
}

function findEpisodeTitle(items, season, episode) {
  const prefix = `${season}x${String(episode).padStart(2, '0')} - `;
  const found = (items || []).find(item => item.startsWith(prefix));
  return found ? found.slice(prefix.length) : null;
}

// ─── Catalog: load ────────────────────────────────────────────────────────────

async function loadCatalog() {
  if (db) {
    const { data } = await db
      .from('catalog')
      .select('*')
      .order('name', { ascending: true });
    catalogItems = data || [];
  } else {
    const raw = localStorage.getItem('diary_catalog');
    catalogItems = raw ? JSON.parse(raw) : [];
  }
}

function getCatalogEntry(category, name) {
  if (!name) return null;
  return catalogItems.find(
    c => c.category === category && c.name.toLowerCase() === name.toLowerCase()
  ) || null;
}

// ─── Catalog: save ────────────────────────────────────────────────────────────

async function saveCatalogItem(category, name, metadata, items) {
  const payload = { category, name, metadata, items };

  if (editingCatalogItem) {
    if (db) {
      const { error } = await db.from('catalog').update(payload).eq('id', editingCatalogItem.id);
      if (error) throw error;
    }
    const idx = catalogItems.findIndex(c => c.id === editingCatalogItem.id);
    if (idx !== -1) catalogItems[idx] = { ...editingCatalogItem, ...payload };
  } else {
    if (db) {
      const { data, error } = await db.from('catalog').insert(payload).select().single();
      if (error) throw error;
      catalogItems.push(data);
    } else {
      payload.id = crypto.randomUUID();
      payload.created_at = new Date().toISOString();
      catalogItems.push(payload);
    }
  }

  if (!db) localStorage.setItem('diary_catalog', JSON.stringify(catalogItems));
}

// ─── Catalog: delete ──────────────────────────────────────────────────────────

async function deleteCatalogItem(id) {
  if (db) {
    const { error } = await db.from('catalog').delete().eq('id', id);
    if (error) throw error;
  }
  catalogItems = catalogItems.filter(c => c.id !== id);
  if (!db) localStorage.setItem('diary_catalog', JSON.stringify(catalogItems));
}

// ─── Settings view ────────────────────────────────────────────────────────────

async function showSettings() {
  await loadCatalog();
  document.getElementById('settings-view').classList.remove('hidden');
  renderSettings();
}

function hideSettings() {
  document.getElementById('settings-view').classList.add('hidden');
}

function renderSettings() {
  const content = document.getElementById('settings-content');
  content.innerHTML =
    renderCatalogSection('album', '🎵 Álbuns') +
    renderCatalogSection('serie', '📺 Séries');

  content.querySelectorAll('.add-catalog-btn').forEach(btn =>
    btn.addEventListener('click', () => openCatalogModal(btn.dataset.category))
  );

  content.querySelectorAll('.catalog-edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = catalogItems.find(c => c.id === btn.dataset.id);
      if (item) openCatalogModal(item.category, item);
    });
  });

  content.querySelectorAll('.catalog-delete-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (confirm('Remover este item do catálogo?')) {
        await deleteCatalogItem(btn.dataset.id);
        renderSettings();
        showToast('Removido');
      }
    });
  });
}

function renderCatalogSection(category, title) {
  const items = catalogItems.filter(c => c.category === category);
  const singular = category === 'album' ? 'álbum' : 'série';

  const cards = items.map(item => {
    const meta = category === 'album' ? item.metadata?.artist : null;
    const count = item.items?.length || 0;
    const unit = category === 'album' ? 'faixas' : 'episódios';
    const subtitle = [meta, `${count} ${unit}`].filter(Boolean).join(' · ');
    return `
      <div class="catalog-card">
        <div class="catalog-card-info">
          <div class="catalog-card-name">${esc(item.name)}</div>
          <div class="catalog-card-meta">${esc(subtitle)}</div>
        </div>
        <div class="entry-actions">
          <button class="entry-edit catalog-edit-btn" data-id="${item.id}">✏</button>
          <button class="entry-delete catalog-delete-btn" data-id="${item.id}">×</button>
        </div>
      </div>`;
  }).join('');

  return `
    <div class="catalog-section">
      <div class="catalog-section-header">
        <h2 class="catalog-section-title">${title}</h2>
        <button class="add-catalog-btn" data-category="${category}">+ Adicionar ${singular}</button>
      </div>
      ${items.length === 0
        ? `<p class="catalog-empty">Nenhum ${singular} cadastrado ainda.</p>`
        : cards}
    </div>`;
}

// ─── Catalog modal ────────────────────────────────────────────────────────────

function openCatalogModal(category, existing = null) {
  editingCatalogItem = existing;
  catalogCategory = category;

  const isAlbum = category === 'album';
  document.getElementById('catalog-modal-title').textContent =
    existing
      ? (isAlbum ? 'Editar álbum' : 'Editar série')
      : (isAlbum ? 'Novo álbum' : 'Nova série');

  const itemsPlaceholder = isAlbum
    ? 'Airbag\nParanoid Android\nSubterranean Homesick Alien'
    : '1x01 - Pilot\n1x02 - ...';

  document.getElementById('catalog-form-fields').innerHTML = `
    <div class="form-group">
      <label class="form-label">Nome${isAlbum ? ' do álbum' : ' da série'}</label>
      <input class="form-input" type="text" id="cat-name" required
        value="${esc(existing?.name || '')}">
    </div>
    ${isAlbum ? `
    <div class="form-group">
      <label class="form-label optional">Artista</label>
      <input class="form-input" type="text" id="cat-artist"
        value="${esc(existing?.metadata?.artist || '')}">
    </div>` : ''}
    <div class="form-group">
      <label class="form-label">${isAlbum ? 'Faixas' : 'Episódios'} <small style="font-weight:400;text-transform:none">(um por linha)</small></label>
      <textarea class="form-textarea" id="cat-items" style="min-height:160px" required
        placeholder="${itemsPlaceholder}">${esc((existing?.items || []).join('\n'))}</textarea>
    </div>`;

  document.getElementById('catalog-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('cat-name').focus(), 80);
}

function closeCatalogModal() {
  document.getElementById('catalog-modal').classList.add('hidden');
  document.body.style.overflow = '';
  editingCatalogItem = null;
}

async function handleCatalogSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('cat-name').value.trim();
  if (!name) return;

  const artistEl = document.getElementById('cat-artist');
  const metadata = catalogCategory === 'album' && artistEl
    ? { artist: artistEl.value.trim() }
    : {};

  const items = document.getElementById('cat-items').value
    .split('\n').map(l => l.trim()).filter(Boolean);

  const btn = document.getElementById('catalog-submit');
  btn.disabled = true;
  btn.textContent = 'Salvando…';

  try {
    await saveCatalogItem(catalogCategory, name, metadata, items);
    closeCatalogModal();
    renderSettings();
    showToast('Salvo!');
  } catch (err) {
    console.error(err);
    showToast('Erro ao salvar');
  }

  btn.disabled = false;
  btn.textContent = 'Salvar';
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

// ─── Download modal ───────────────────────────────────────────────────────────

function openDownloadModal() {
  const singleEl = document.getElementById('dl-single-date');
  const startEl  = document.getElementById('dl-start-date');
  const endEl    = document.getElementById('dl-end-date');
  const today    = toDateKey(currentDate);
  singleEl.value = today;
  startEl.value  = today;
  endEl.value    = today;
  setDownloadMode('day');
  document.getElementById('download-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeDownloadModal() {
  document.getElementById('download-modal').classList.add('hidden');
  document.body.style.overflow = '';
}

function setDownloadMode(mode) {
  document.getElementById('download-day-fields').style.display   = mode === 'day'   ? '' : 'none';
  document.getElementById('download-range-fields').style.display = mode === 'range' ? '' : 'none';
  document.getElementById('mode-day').classList.toggle('active',   mode === 'day');
  document.getElementById('mode-range').classList.toggle('active', mode === 'range');
  document.getElementById('download-modal').dataset.mode = mode;
}

function triggerDownload(data, filename) {
  if (!data.length) { showToast('Nenhum registro no período'); return; }
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

async function confirmDownload() {
  const mode = document.getElementById('download-modal').dataset.mode || 'day';

  if (mode === 'day') {
    const dateKey = document.getElementById('dl-single-date').value;
    if (!dateKey) { showToast('Selecione uma data'); return; }

    let data;
    if (db) {
      const { data: rows } = await db.from('log_entries').select('*')
        .eq('date', dateKey)
        .order('position', { ascending: true, nullsFirst: false })
        .order('created_at', { ascending: true });
      data = rows || [];
    } else {
      const raw = localStorage.getItem(`diary_${dateKey}`);
      data = raw ? JSON.parse(raw) : [];
    }

    closeDownloadModal();
    triggerDownload(data, `diario-${dateKey}.json`);

  } else {
    const start = document.getElementById('dl-start-date').value;
    const end   = document.getElementById('dl-end-date').value;
    if (!start || !end) { showToast('Selecione o período'); return; }
    if (start > end)    { showToast('Data inicial maior que a final'); return; }

    let data;
    if (db) {
      const { data: rows } = await db.from('log_entries').select('*')
        .gte('date', start)
        .lte('date', end)
        .order('date', { ascending: true })
        .order('position', { ascending: true, nullsFirst: false })
        .order('created_at', { ascending: true });
      data = rows || [];
    } else {
      data = [];
      const s = new Date(start + 'T00:00:00');
      const e = new Date(end   + 'T00:00:00');
      for (let d = new Date(s); d <= e; d.setDate(d.getDate() + 1)) {
        const key = toDateKey(d);
        const raw = localStorage.getItem(`diary_${key}`);
        if (raw) data.push(...JSON.parse(raw));
      }
    }

    const filename = start === end
      ? `diario-${start}.json`
      : `diario-${start}_${end}.json`;

    closeDownloadModal();
    triggerDownload(data, filename);
  }
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

  container.querySelectorAll('.entry-edit').forEach(btn => {
    btn.addEventListener('click', () => {
      const entry = entries.find(e => e.id === btn.dataset.id);
      if (entry) openEditModal(entry);
    });
  });

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
      <div class="entry-actions">
        <button class="entry-edit" data-id="${entry.id}" aria-label="Editar">✏</button>
        <button class="entry-delete" data-id="${entry.id}" aria-label="Remover">×</button>
      </div>
    </div>`;
}

function renderCardContent(entry, typeDef) {
  const d = entry.data || {};

  const main = (() => { switch (entry.type) {
    case 'transporte': {
      const formatDT = s => {
        if (!s) return '';
        const d = new Date(s);
        return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
      };
      const parts = [];
      if (d.servico) parts.push(`<strong>${esc(d.servico)}</strong>`);
      const route = [d.de, d.para].filter(Boolean).map(esc).join(' → ');
      if (route) parts.push(route);
      if (d.inicio || d.fim) {
        const timeRange = [formatDT(d.inicio), formatDT(d.fim)].filter(Boolean).join(' → ');
        parts.push(`<span class="entry-muted">${timeRange}</span>`);
      }
      if (d.valor) parts.push(`<strong>${formatCurrency(d.valor)}</strong>`);
      return parts.join(' · ');
    }

    case 'musica': {
      const lines = [];
      if (d.artista) lines.push(`<strong>${esc(d.artista)}</strong>`);
      if (d.album) lines.push(esc(d.album));
      if (d.de_faixa || d.ate_faixa) {
        const range = [d.de_faixa, d.ate_faixa].filter(Boolean).map(esc).join(' → ');
        lines.push(`<span class="entry-muted">${range}</span>`);
      }
      if (d.contexto) lines.push(`<span class="entry-muted">${esc(d.contexto)}</span>`);
      return lines.join('<br>');
    }

    case 'entretenimento': {
      const lines = [];
      const header = [d.tipo, d.titulo ? `<strong>${esc(d.titulo)}</strong>` : null].filter(Boolean).join(' · ');
      if (header) lines.push(header);

      // Novo formato: temporada + episodio_numero + episodio_titulo
      if (d.temporada || d.episodio_numero) {
        const epParts = [];
        if (d.temporada)       epParts.push(`T${esc(String(d.temporada))}`);
        if (d.episodio_numero) epParts.push(`Ep ${esc(String(d.episodio_numero))}`);
        if (d.episodio_titulo) epParts.push(esc(d.episodio_titulo));
        lines.push(`<span class="entry-muted">${epParts.join(' · ')}</span>`);
      } else if (d.episodio) {
        // Retrocompatibilidade com entradas antigas
        lines.push(`<span class="entry-muted">${esc(d.episodio)}</span>`);
      }

      if (d.periodo) lines.push(`<span class="entry-muted">${esc(d.periodo)}</span>`);
      return lines.join('<br>');
    }

    case 'trabalho': {
      const parts = [];
      if (d.horas) parts.push(`<strong>${esc(String(d.horas))}</strong> trabalhadas`);
      if (d.descricao) parts.push(`<br><span class="entry-muted">${esc(d.descricao)}</span>`);
      return parts.join('');
    }

    case 'mestrado': {
      const lines = [];
      if (d.categoria) lines.push(`Categoria: <strong>${esc(d.categoria)}</strong>`);
      if (d.horas)     lines.push(`<strong>${esc(String(d.horas))}</strong> trabalhadas`);
      if (d.descricao) lines.push(`<span class="entry-muted">${esc(d.descricao)}</span>`);
      return lines.join('<br>');
    }

    case 'refeicao': {
      const parts = [];
      if (d.refeicao) parts.push(`<strong>${esc(d.refeicao)}</strong>`);
      if (d.local) parts.push(esc(d.local));
      if (d.via) parts.push(`<span class="entry-muted">${esc(d.via)}</span>`);
      if (d.valor) parts.push(formatCurrency(d.valor));
      return parts.join(' · ');
    }

    case 'leitura': {
      const parts = [];
      if (d.tipo) parts.push(esc(d.tipo));
      if (d.titulo) parts.push(`<strong>${esc(d.titulo)}</strong>`);
      if (d.autor) parts.push(`<span class="entry-muted">${esc(d.autor)}</span>`);
      if (d.formato) parts.push(`<span class="entry-muted">${esc(d.formato)}</span>`);
      if (d.progresso) {
        const prefix = d.formato === 'Físico' ? 'pág. ' : '';
        parts.push(`<span class="entry-muted">${prefix}${esc(d.progresso)}</span>`);
      }
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
        .filter(([k, v]) => k !== 'obs' && v !== null && v !== '')
        .map(([k, v]) => `<span class="entry-muted">${esc(k)}:</span> ${esc(String(v))}`)
        .join(' · ');
  } })();

  if (d.obs) {
    const obsHtml = `<span class="entry-muted">${esc(d.obs).replace(/\n/g, '<br>')}</span>`;
    return main ? `${main}<br>${obsHtml}` : obsHtml;
  }
  return main ?? '';
}

function esc(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ─── Entertainment form logic ─────────────────────────────────────────────────

function setupEntertainmentListeners(initialData = {}, pastSuggestions = {}) {
  const tipoEl     = document.getElementById('f-tipo');
  const tituloEl   = document.getElementById('f-titulo');
  const tituloList = document.getElementById('list-titulo');
  const tempEl     = document.getElementById('f-temporada');
  const epNumEl    = document.getElementById('f-episodio_numero');
  const epTitleEl  = document.getElementById('f-episodio_titulo');
  const groups     = document.querySelectorAll('.series-field-group');

  const isSeries = () => ['Série', 'Anime'].includes(tipoEl?.value);

  const showHide = () => {
    groups.forEach(g => g.style.display = isSeries() ? '' : 'none');
  };

  // Catalog series names (for datalist when tipo = Série/Anime)
  const catalogSeriesNames = catalogItems
    .filter(c => c.category === 'serie')
    .map(c => c.name)
    .sort((a, b) => a.localeCompare(b, 'pt-BR'));

  const pastTitles = pastSuggestions.titulo || [];

  const updateTituloList = () => {
    if (!tituloList) return;
    const names = isSeries() ? catalogSeriesNames : pastTitles;
    tituloList.innerHTML = names.map(n => `<option value="${esc(n)}">`).join('');
  };

  const getSeasons = () => {
    const entry = getCatalogEntry('serie', tituloEl?.value?.trim() || '');
    return entry ? parseCatalogSeasons(entry.items) : null;
  };

  const applyEpisodeConstraints = (seasons, season) => {
    if (!epNumEl) return;
    const info = seasons?.[String(season)];
    if (info) {
      epNumEl.min = info.min;
      epNumEl.max = info.max;
    } else {
      epNumEl.removeAttribute('max');
      epNumEl.min = 1;
    }
  };

  const fillEpisodeTitle = () => {
    if (!epTitleEl || !tempEl || !epNumEl || epTitleEl._userEdited) return;
    const entry = getCatalogEntry('serie', tituloEl?.value?.trim() || '');
    if (!entry) return;
    const title = findEpisodeTitle(entry.items, tempEl.value, epNumEl.value);
    if (title) epTitleEl.value = title;
    else if (!epTitleEl._userEdited) epTitleEl.value = '';
  };

  // Returns the index (in catalogEntry.items) of the last episode logged in the
  // diary for this series, or -1 if none found.
  const getLastDiaryEpIdx = async (catalogEntry, seriesName) => {
    let diaryEntries = [];
    if (db) {
      const { data } = await db
        .from('log_entries')
        .select('data')
        .eq('type', 'entretenimento')
        .filter('data->>titulo', 'eq', seriesName);
      diaryEntries = data || [];
    } else {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key.startsWith('diary_')) continue;
        const items = JSON.parse(localStorage.getItem(key) || '[]');
        diaryEntries.push(...items.filter(e =>
          e.type === 'entretenimento' && e.data?.titulo === seriesName
        ));
      }
    }
    let maxIdx = -1;
    for (const e of diaryEntries) {
      const s = e.data?.temporada;
      const n = e.data?.episodio_numero;
      if (s == null || n == null) continue;
      const prefix = `${s}x${String(n).padStart(2, '0')} - `;
      const idx = catalogEntry.items.findIndex(item => item.startsWith(prefix));
      if (idx > maxIdx) maxIdx = idx;
    }
    return maxIdx;
  };

  const applyFromCatalog = async (prefill) => {
    const name  = tituloEl?.value?.trim() || '';
    const entry = getCatalogEntry('serie', name);
    if (!entry || !entry.items.length) {
      if (tempEl) tempEl.removeAttribute('max');
      if (epNumEl) epNumEl.removeAttribute('max');
      return;
    }

    const seasons   = parseCatalogSeasons(entry.items);
    const maxSeason = Math.max(...Object.keys(seasons).map(Number));

    if (prefill && !editingEntry) {
      // Reset fields before async lookup
      if (tempEl)    { tempEl.value = '';    tempEl.max = maxSeason; }
      if (epNumEl)   { epNumEl.value = '';   epNumEl.removeAttribute('max'); }
      if (epTitleEl) { epTitleEl.value = ''; epTitleEl._userEdited = false; }

      // Index of next episode from sync metadata
      let catalogNextIdx = -1;
      const ns = entry.metadata?.next_season;
      const ne = entry.metadata?.next_episode;
      if (ns != null && ne != null) {
        const prefix = `${ns}x${String(ne).padStart(2, '0')} - `;
        catalogNextIdx = entry.items.findIndex(item => item.startsWith(prefix));
      }

      // Index of next episode based on last diary log
      const lastDiaryIdx  = await getLastDiaryEpIdx(entry, name);
      const diaryNextIdx  = lastDiaryIdx >= 0 ? lastDiaryIdx + 1 : -1;

      // Guard: user may have changed the title while we were awaiting
      if ((tituloEl?.value?.trim() || '') !== name) return;

      // Use whichever points further in the episode list
      const nextIdx = Math.max(catalogNextIdx, diaryNextIdx);
      if (nextIdx >= 0 && nextIdx < entry.items.length) {
        const m = entry.items[nextIdx].match(/^(\d+)x(\d+)/);
        if (m) {
          if (tempEl)  tempEl.value  = parseInt(m[1]);
          if (epNumEl) epNumEl.value = parseInt(m[2]);
        }
      }
    } else {
      if (tempEl) tempEl.max = maxSeason;
    }

    applyEpisodeConstraints(seasons, tempEl?.value);
    fillEpisodeTitle();
  };

  // Bind events
  tipoEl?.addEventListener('change', () => {
    showHide();
    updateTituloList();
    if (isSeries()) applyFromCatalog(true);
  });

  tituloEl?.addEventListener('input', () => {
    if (isSeries()) applyFromCatalog(true);
  });

  tempEl?.addEventListener('input', () => {
    const seasons = getSeasons();
    applyEpisodeConstraints(seasons, tempEl.value);
    if (epNumEl) epNumEl.value = '';
    if (epTitleEl) { epTitleEl.value = ''; epTitleEl._userEdited = false; }
  });

  epNumEl?.addEventListener('input', fillEpisodeTitle);

  epTitleEl?.addEventListener('input', () => { epTitleEl._userEdited = true; });

  // Initial state
  updateTituloList();
  showHide();
  if (isSeries()) applyFromCatalog(false);
}

// ─── Modal ────────────────────────────────────────────────────────────────────

function openModal() {
  selectedType = null;
  editingEntry = null;
  document.getElementById('modal').classList.remove('hidden');
  showTypeStep();
  document.body.style.overflow = 'hidden';
}

function openEditModal(entry) {
  editingEntry = entry;
  selectedType = entry.type;
  document.getElementById('modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  showFormStep(entry.type, entry.data, entry.custom_fields);
}

function closeModal() {
  document.getElementById('modal').classList.add('hidden');
  document.body.style.overflow = '';
  selectedType = null;
  editingEntry = null;
  document.getElementById('entry-form').reset();
  document.getElementById('custom-fields-list').innerHTML = '';
}

function showTypeStep() {
  document.getElementById('step-type').classList.remove('hidden');
  document.getElementById('step-form').classList.add('hidden');
}

async function showFormStep(type, initialData = {}, initialCustomFields = {}) {
  selectedType = type;
  const typeDef = ENTRY_TYPES[type];

  document.getElementById('step-type').classList.add('hidden');
  document.getElementById('step-form').classList.remove('hidden');
  document.getElementById('form-title').textContent = `${typeDef.icon} ${typeDef.label}`;
  document.getElementById('back-btn').style.visibility = editingEntry ? 'hidden' : '';
  document.getElementById('submit-btn').textContent = editingEntry ? 'Atualizar' : 'Salvar';

  const suggestions = await loadSuggestions(type);

  document.getElementById('form-fields').innerHTML =
    typeDef.fields.map(f => buildField(f, suggestions)).join('');

  // Pre-fill fields when editing
  typeDef.fields.forEach(f => {
    const el = document.getElementById(`f-${f.key}`);
    if (el && initialData[f.key] != null) el.value = initialData[f.key];
  });

  // Pre-fill custom fields
  document.getElementById('custom-fields-list').innerHTML = '';
  Object.entries(initialCustomFields).forEach(([k, v]) => addCustomField(k, v));

  // Entertainment-specific dynamic behavior
  if (type === 'entretenimento') setupEntertainmentListeners(initialData, suggestions);
  if (type === 'leitura') setupLeituraListeners(initialData);

  // Bind catalog-driven datalists
  typeDef.fields.filter(f => f.catalogRef).forEach(f => {
    const sourceEl = document.getElementById(`f-${f.catalogRef.sourceField}`);
    const targetList = document.getElementById(`list-${f.key}`);
    if (!sourceEl || !targetList) return;
    const update = () => {
      const entry = getCatalogEntry(f.catalogRef.category, sourceEl.value.trim());
      targetList.innerHTML = (entry?.items || [])
        .map(t => `<option value="${esc(t)}">`)
        .join('');
    };
    sourceEl.addEventListener('input', update);
    update();
  });

  setTimeout(() => {
    const first = document.querySelector('#form-fields input, #form-fields select, #form-fields textarea');
    if (first) first.focus();
  }, 80);
}

// ─── Suggestions ─────────────────────────────────────────────────────────────

async function loadSuggestions(type) {
  const acFields = ENTRY_TYPES[type].fields.filter(f => f.autocomplete);
  if (acFields.length === 0) return {};

  const suggestions = {};

  if (db) {
    const { data } = await db
      .from('log_entries')
      .select('data')
      .eq('type', type);

    if (data) {
      acFields.forEach(f => {
        suggestions[f.key] = [...new Set(
          data.map(e => e.data?.[f.key]).filter(Boolean)
        )].sort((a, b) => a.localeCompare(b, 'pt-BR'));
      });
    }
  } else {
    const allEntries = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('diary_')) {
        const items = JSON.parse(localStorage.getItem(key) || '[]');
        allEntries.push(...items.filter(e => e.type === type));
      }
    }
    acFields.forEach(f => {
      suggestions[f.key] = [...new Set(
        allEntries.map(e => e.data?.[f.key]).filter(Boolean)
      )].sort((a, b) => a.localeCompare(b, 'pt-BR'));
    });
  }

  return suggestions;
}

// ─── Form field builder ───────────────────────────────────────────────────────

function buildField(field, suggestions = {}) {
  const html = buildFieldInner(field, suggestions);
  if (field.seriesOnly) {
    return `<div class="series-field-group" style="display:none">${html}</div>`;
  }
  return html;
}

function buildFieldInner(field, suggestions = {}) {
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

  if (field.catalogRef) {
    const listId = `list-${field.key}`;
    return `
      <div class="form-group">
        <label class="${labelClass}" for="f-${field.key}">${field.label}</label>
        <input class="form-input" type="text" id="f-${field.key}" name="${field.key}"
          placeholder="${placeholder}" list="${listId}" autocomplete="off" ${required}>
        <datalist id="${listId}"></datalist>
      </div>`;
  }

  if (field.type === 'text' && field.autocomplete) {
    const listId = `list-${field.key}`;
    const opts = (suggestions[field.key] || [])
      .map(v => `<option value="${esc(v)}">`)
      .join('');
    return `
      <div class="form-group">
        <label class="${labelClass}" for="f-${field.key}">${field.label}</label>
        <input class="form-input" type="text" id="f-${field.key}" name="${field.key}"
          placeholder="${placeholder}" list="${listId}" autocomplete="off" ${required}>
        <datalist id="${listId}">${opts}</datalist>
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

// ─── Leitura form logic ───────────────────────────────────────────────────────

function setupLeituraListeners(initialData = {}) {
  const tituloEl       = document.getElementById('f-titulo');
  const formatoEl      = document.getElementById('f-formato');
  const dispositivoEl  = document.getElementById('f-dispositivo');
  const progressoEl    = document.getElementById('f-progresso');
  const dispositivoGrp = dispositivoEl?.closest('.form-group');
  const progressoLabel = progressoEl?.closest('.form-group')?.querySelector('label');

  const DISPOSITIVO_DEFAULT = { Ebook: 'Kindle', Audiobook: 'Celular' };
  const PROGRESSO_CONFIG = {
    'Físico':    { label: 'Página',      placeholder: '245' },
    Ebook:     { label: 'Porcentagem', placeholder: '67%' },
    Audiobook: { label: 'Tempo',       placeholder: '1h23min' },
  };

  let lastData = null;

  const applyFormatoUI = () => {
    const fmt = formatoEl?.value;
    if (dispositivoGrp) dispositivoGrp.style.display = (!fmt || fmt === 'Físico') ? 'none' : '';
    const cfg = PROGRESSO_CONFIG[fmt];
    if (cfg) {
      if (progressoLabel) progressoLabel.textContent = cfg.label;
      if (progressoEl) progressoEl.placeholder = cfg.placeholder;
    }
  };

  formatoEl?.addEventListener('change', () => {
    const fmt = formatoEl?.value;
    applyFormatoUI();
    if (dispositivoEl && !dispositivoEl.value && DISPOSITIVO_DEFAULT[fmt]) {
      dispositivoEl.value = DISPOSITIVO_DEFAULT[fmt];
    }
    if (progressoEl && lastData) {
      progressoEl.value = fmt === lastData.formato ? (lastData.progresso || '') : '';
    }
  });

  const fetchLastEntry = async (titulo) => {
    if (!titulo) return;
    let data = null;
    if (db) {
      const res = await db
        .from('log_entries')
        .select('data')
        .eq('type', 'leitura')
        .filter('data->>titulo', 'eq', titulo)
        .order('date', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(1);
      data = res.data?.[0]?.data || null;
    }
    if (tituloEl?.value.trim() !== titulo) return; // stale
    lastData = data;
    if (!lastData) return;

    if (formatoEl && lastData.formato) formatoEl.value = lastData.formato;
    applyFormatoUI();
    if (dispositivoEl && lastData.dispositivo) dispositivoEl.value = lastData.dispositivo;
    if (progressoEl && lastData.progresso) progressoEl.value = lastData.progresso;
  };

  tituloEl?.addEventListener('change', e => {
    if (!editingEntry) fetchLastEntry(e.target.value.trim());
  });

  applyFormatoUI();
}

// ─── Custom fields ────────────────────────────────────────────────────────────

function addCustomField(key = '', value = '') {
  const list = document.getElementById('custom-fields-list');
  const row = document.createElement('div');
  row.className = 'custom-field-row';
  row.innerHTML = `
    <input class="form-input" type="text" placeholder="Campo" data-role="key">
    <input class="form-input" type="text" placeholder="Valor" data-role="value">
    <button type="button" class="remove-field-btn" aria-label="Remover">×</button>`;

  row.querySelector('[data-role="key"]').value = key;
  row.querySelector('[data-role="value"]').value = value;
  row.querySelector('.remove-field-btn').addEventListener('click', () => row.remove());
  list.appendChild(row);
  if (!key) row.querySelector('[data-role="key"]').focus();
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
  btn.textContent = editingEntry ? 'Atualizando…' : 'Salvando…';

  const ok = editingEntry
    ? await updateEntry(editingEntry.id, data, collectCustomFields())
    : await saveEntry(selectedType, data, collectCustomFields());

  btn.disabled = false;
  btn.textContent = editingEntry ? 'Atualizar' : 'Salvar';

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
  document.getElementById('download-day').addEventListener('click', openDownloadModal);
  document.getElementById('download-cancel').addEventListener('click', closeDownloadModal);
  document.getElementById('download-backdrop').addEventListener('click', closeDownloadModal);
  document.getElementById('mode-day').addEventListener('click', () => setDownloadMode('day'));
  document.getElementById('mode-range').addEventListener('click', () => setDownloadMode('range'));
  document.getElementById('download-confirm').addEventListener('click', confirmDownload);

  // FAB & modal
  document.getElementById('fab').addEventListener('click', openModal);
  document.getElementById('modal-backdrop').addEventListener('click', closeModal);
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-close-2').addEventListener('click', closeModal);
  document.getElementById('back-btn').addEventListener('click', showTypeStep);

  // Form
  document.getElementById('entry-form').addEventListener('submit', handleSubmit);
  document.getElementById('add-custom-field').addEventListener('click', addCustomField);

  // Settings
  document.getElementById('open-settings').addEventListener('click', showSettings);
  document.getElementById('settings-back').addEventListener('click', hideSettings);

  // Catalog modal
  document.getElementById('catalog-backdrop').addEventListener('click', closeCatalogModal);
  document.getElementById('catalog-cancel').addEventListener('click', closeCatalogModal);
  document.getElementById('catalog-form').addEventListener('submit', handleCatalogSubmit);

  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeModal(); closeCatalogModal(); }
  });

  // Load today
  renderHeader();
  loadEntries(currentDate);
  loadCatalog();
});
