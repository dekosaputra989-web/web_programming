// Hitung sederhana: input x, y dan tombol operasi (+, -, *, /, %)
// Menampilkan hasil di halaman.

(function () {
  'use strict';

  function el(tag, attrs = {}, children = []) {
    const node = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (v === null || v === undefined) continue;
      node.setAttribute(k, String(v));
    }
    for (const child of children) {
      node.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
    }
    return node;
  }

  function createInput(id) {
    return el('input', { id, type: 'number', placeholder: id });
  }

  function createButton(id, label, bgColor) {
    const btn = el('button', { id, type: 'button' });
    btn.textContent = label;
    btn.style.margin = '6px 6px 6px 0';
    btn.style.padding = '8px 12px';
    btn.style.borderRadius = '6px';
    btn.style.border = 'none';
    btn.style.cursor = 'pointer';
    btn.style.backgroundColor = bgColor;
    btn.style.color = '#fff';
    return btn;
  }

  function readNumber(id) {
    const v = document.getElementById(id)?.value;
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }

  // Root container
  const container = el('div', { id: 'hitung-container' });
  container.style.fontFamily = 'Arial, sans-serif';
  container.style.padding = '12px';

  // Inputs
  container.appendChild(createInput('x'));
  container.appendChild(createInput('y'));

  // Output
  const output = el('div', { id: 'hasil' });
  output.style.marginTop = '10px';
  output.style.fontWeight = 'bold';

  // Buttons
  const btnTambah = createButton('tambah', '+', '#45919d');
  const btnKurang = createButton('kurang', '-', '#3b82f6');
  const btnKali = createButton('kali', '×', '#22c55e');
  const btnBagi = createButton('bagi', '÷', '#f59e0b');
  const btnMod = createButton('mod', '%', '#111827');
  const btnHapusHistory = createButton('hapushistory', 'hapus hasil', '#ef4444');
  const btnHapusInput = createButton('hapusinput', 'hapus input', '#6b7280');

  function setHasil(value) {
    output.textContent = `Hasil: ${value}`;
  }

  function doCompute(op) {
    const x = readNumber('x');
    const y = readNumber('y');

    let hasil;
    switch (op) {
      case '+':
        hasil = x + y;
        break;
      case '-':
        hasil = x - y;
        break;
      case '*':
        hasil = x * y;
        break;
      case '/':
        hasil = y === 0 ? 'Tidak bisa dibagi 0' : x / y;
        break;
      case '%':
        hasil = y === 0 ? 'Tidak bisa mod 0' : x % y;
        break;
    }

    setHasil(hasil);
  }

  btnTambah.addEventListener('click', () => doCompute('+'));
  btnKurang.addEventListener('click', () => doCompute('-'));
  btnKali.addEventListener('click', () => doCompute('*'));
  btnBagi.addEventListener('click', () => doCompute('/'));
  btnMod.addEventListener('click', () => doCompute('%'));

  btnHapusHistory.addEventListener('click', () => {
    output.textContent = '';
  });

  btnHapusInput.addEventListener('click', () => {
    document.getElementById('x').value = '';
    document.getElementById('y').value = '';
    output.textContent = '';
  });

  container.appendChild(btnTambah);
  container.appendChild(btnKurang);
  container.appendChild(btnKali);
  container.appendChild(btnBagi);
  container.appendChild(btnMod);
  container.appendChild(btnHapusHistory);
  container.appendChild(btnHapusInput);
  container.appendChild(output);

  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(container);
  });
})();

