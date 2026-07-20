// Antigravity Chinese Localization Patch v3.0
// DO NOT EDIT THIS MARKER LINE - used by installer to locate patch start
;(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     1. TOGGLE STATE
  ───────────────────────────────────────────── */
  var STORAGE_KEY = 'ag_i18n_enabled';
  var translationOn = (localStorage.getItem(STORAGE_KEY) !== 'false');

  /* ─────────────────────────────────────────────
     2. DICTIONARY
  ───────────────────────────────────────────── */
  var DICT = /*__DICT_JSON__*/{};

  /* ─────────────────────────────────────────────
     3. TEXT TRANSLATE
  ───────────────────────────────────────────── */
  function translateText(text) {
    if (!text || !text.trim()) return null;
    var result = text;
    var changed = false;
    var keys = Object.keys(DICT);
    
    // Sort keys by length descending to match longest phrases first
    keys.sort(function(a, b) { return b.length - a.length; });
    
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      if (result.indexOf(k) !== -1) {
        // Escape regex special chars for the key
        var escapedKey = k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Use word boundary if the key starts/ends with alphanumeric characters
        // This prevents 'Pro' from matching inside 'Protocol' or 'Model' inside 'Models'
        var startBoundary = /^[a-zA-Z0-9]/.test(k) ? '\\b' : '';
        var endBoundary = /[a-zA-Z0-9]$/.test(k) ? '\\b' : '';
        var regex = new RegExp(startBoundary + escapedKey + endBoundary, 'g');
        
        var newResult = result.replace(regex, DICT[k]);
        
        if (newResult !== result) {
            result = newResult;
            changed = true;
        }
      }
    }
    return changed ? result : null;
  }

  /* ─────────────────────────────────────────────
     4. EXCLUSION (skip chat & input areas)
  ───────────────────────────────────────────── */
  var SKIP_TAGS = { TEXTAREA: 1, SCRIPT: 1, STYLE: 1, CODE: 1, PRE: 1, SVG: 1, MATH: 1 };
  var SKIP_ROLES = { textbox: 1, log: 1, feed: 1 };
  var SKIP_CLASSES = [
    'prose', 'markdown', 'message', 'chat', 'conversation-content',
    'katex', 'cm-content', 'cm-line', 'monaco', 'codemirror', 'hljs',
    'user-message', 'assistant-message', 'message-content', 'turn-content'
  ];

  function shouldSkip(node) {
    if (!node || node.nodeType !== 1) return false;
    var tag = node.tagName ? node.tagName.toUpperCase() : '';
    if (SKIP_TAGS[tag]) return true;
    if (node.isContentEditable) return true;
    var role = node.getAttribute ? node.getAttribute('role') : null;
    if (role && SKIP_ROLES[role]) return true;
    if (node.className && typeof node.className === 'string') {
      var cls = node.className.toLowerCase();
      for (var i = 0; i < SKIP_CLASSES.length; i++) {
        if (cls.indexOf(SKIP_CLASSES[i]) !== -1) return true;
      }
    }
    return false;
  }

  /* ─────────────────────────────────────────────
     5. DOM WALKER
  ───────────────────────────────────────────── */
  function walk(node) {
    if (!node) return;
    if (node.nodeType === 3) {
      var t = translateText(node.nodeValue);
      if (t !== null) node.nodeValue = t;
      return;
    }
    if (node.nodeType === 1) {
      if (shouldSkip(node)) return;
      if (node.placeholder) {
        var tp = translateText(node.placeholder);
        if (tp !== null) node.placeholder = tp;
      }
      if (node.tagName === 'INPUT' && (node.type === 'button' || node.type === 'submit')) {
        var tv = translateText(node.value);
        if (tv !== null) node.value = tv;
      }
      if (node.shadowRoot) walk(node.shadowRoot);
      var child = node.firstChild;
      while (child) { var nx = child.nextSibling; walk(child); child = nx; }
      return;
    }
    if (node.nodeType === 11) {
      var c = node.firstChild;
      while (c) { var nc = c.nextSibling; walk(c); c = nc; }
    }
  }

  /* ─────────────────────────────────────────────
     6. MUTATION OBSERVER
  ───────────────────────────────────────────── */
  var observer = null;
  var OBS_CFG = {
    childList: true, subtree: true,
    characterData: true,
    attributes: true, attributeFilter: ['placeholder', 'value', 'aria-label']
  };

  function startObserver() {
    if (observer) { observer.observe(document.documentElement, OBS_CFG); return; }
    observer = new MutationObserver(function (mutations) {
      observer.disconnect();
      for (var i = 0; i < mutations.length; i++) {
        var m = mutations[i];
        if (m.type === 'childList') {
          for (var j = 0; j < m.addedNodes.length; j++) walk(m.addedNodes[j]);
        } else if (m.type === 'characterData') {
          if (m.target.parentNode && !shouldSkip(m.target.parentNode)) {
            var t = translateText(m.target.nodeValue);
            if (t !== null) m.target.nodeValue = t;
          }
        } else if (m.type === 'attributes') {
          var el = m.target;
          if (el.placeholder) {
            var tp = translateText(el.placeholder);
            if (tp !== null) el.placeholder = tp;
          }
        }
      }
      observer.observe(document.documentElement, OBS_CFG);
    });
    observer.observe(document.documentElement, OBS_CFG);
  }

  function stopObserver() {
    if (observer) { observer.disconnect(); observer = null; }
  }

  /* ─────────────────────────────────────────────
     7. TOGGLE BUTTON  中 / EN
  ───────────────────────────────────────────── */
  function injectToggle() {
    if (document.getElementById('ag-toggle-container')) return;
    
    var container = document.createElement('div');
    container.id = 'ag-toggle-container';
    container.setAttribute('style', 'position:fixed;bottom:20px;right:20px;z-index:2147483647;font-family:system-ui,-apple-system,sans-serif;');
    
    var menu = document.createElement('div');
    menu.id = 'ag-hover-menu';
    menu.setAttribute('style', 'position:absolute;bottom:50px;right:0;background:#fff;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.15);display:none;flex-direction:column;min-width:140px;overflow:hidden;border:1px solid rgba(0,0,0,0.1);');
    
    var btnTranslate = document.createElement('div');
    btnTranslate.textContent = '🤖 一键翻译页面长文';
    btnTranslate.setAttribute('style', 'padding:10px 15px;font-size:13px;color:#333;cursor:pointer;user-select:none;border-bottom:1px solid #eee;background:#fff;transition:background 0.2s;');
    btnTranslate.onmouseenter = function() { this.style.background = '#f0f0f0'; };
    btnTranslate.onmouseleave = function() { this.style.background = '#fff'; };
    
    btnTranslate.onclick = function() {
      var targetNodes = [];
      var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
      var node;
      while (node = walker.nextNode()) {
        var val = node.nodeValue.trim();
        // 查找长度大于 10 且包含较多英文字母的文本节点
        if (val.length > 10 && /[a-zA-Z].*[a-zA-Z].*[a-zA-Z]/.test(val)) {
          var parent = node.parentElement;
          var tag = parent ? parent.tagName.toUpperCase() : '';
          // 排除不需要翻译的标签
          if (parent && tag !== 'SCRIPT' && tag !== 'STYLE' && tag !== 'A' && tag !== 'CODE' && tag !== 'BUTTON' && tag !== 'PRE') {
             // 排除本身已经是翻译块，或者属于编辑器/控制台内的内容
             if (targetNodes.indexOf(parent) === -1 && !parent.classList.contains('ag-translated-block') && !parent.closest('.monaco-editor') && !parent.isContentEditable) {
               targetNodes.push(parent);
             }
          }
        }
      }
      
      if (targetNodes.length === 0) {
        alert('当前没有发现需要翻译的英文长文或思考过程。请确保文本已展开！');
        return;
      }
      
      var oldText = btnTranslate.textContent;
      btnTranslate.textContent = '⏳ 正在拼命翻译中...';
      btnTranslate.style.pointerEvents = 'none';
      
      var executeSequential = function(index, retries) {
        if (index >= targetNodes.length) {
          btnTranslate.textContent = oldText;
          btnTranslate.style.pointerEvents = 'auto';
          return;
        }
        retries = retries || 0;
        var el = targetNodes[index];
        var text = el.textContent.trim();
        var origBg = el.style.backgroundColor;
        
        if (retries === 0) {
          el.style.backgroundColor = 'rgba(31,111,235,0.1)';
        }
        
        fetchTranslation(text).then(function(translated) {
          if (translated && translated !== text) {
            el.dataset.origHtml = el.innerHTML;
            el.dataset.origBg = origBg || '';
            el.classList.add('ag-translated-block');
            el.textContent = translated;
            el.style.borderLeft = '3px solid #58a6ff';
            el.style.paddingLeft = '10px';
            el.style.backgroundColor = 'rgba(31,111,235,0.05)';
            el.title = '已翻译 · 点击悬浮菜单还原原文';
          } else {
            el.style.backgroundColor = origBg;
          }
          setTimeout(function() {
            executeSequential(index + 1, 0);
          }, 400); // 正常成功后等 0.4 秒
        }).catch(function() {
          if (retries < 3) {
            // 失败后等待 2 秒并重试
            setTimeout(function() {
              executeSequential(index, retries + 1);
            }, 2000);
          } else {
            el.style.backgroundColor = origBg;
            setTimeout(function() {
              executeSequential(index + 1, 0);
            }, 400);
          }
        });
      };
      
      executeSequential(0);
    };

    var btnRestore = document.createElement('div');
    btnRestore.textContent = '↩️ 一键还原全部翻译';
    btnRestore.setAttribute('style', 'padding:10px 15px;font-size:13px;color:#333;cursor:pointer;user-select:none;background:#fff;transition:background 0.2s;');
    btnRestore.onmouseenter = function() { this.style.background = '#f0f0f0'; };
    btnRestore.onmouseleave = function() { this.style.background = '#fff'; };
    
    btnRestore.onclick = function() {
      var translated = document.querySelectorAll('.ag-translated-block');
      translated.forEach(function(el) {
        if (el.dataset.origHtml) {
          el.innerHTML = el.dataset.origHtml;
          el.classList.remove('ag-translated-block');
          el.style.borderLeft = '';
          el.style.paddingLeft = '';
          el.style.backgroundColor = el.dataset.origBg || '';
        }
      });
    };
    
    menu.appendChild(btnTranslate);
    menu.appendChild(btnRestore);
    
    var btn = document.createElement('div');
    btn.id = 'ag-toggle-btn';
    btn.textContent = translationOn ? '中' : 'EN';
    btn.title = translationOn ? '点击关闭全局界面汉化，恢复英文' : '点击开启全局界面汉化';
    btn.setAttribute('style',
      'width:40px;height:40px;' +
      'border-radius:50%;background:' + (translationOn ? '#2ea043' : '#6e7681') + ';' +
      'color:#fff;font-size:13px;font-weight:700;' +
      'display:flex;align-items:center;justify-content:center;' +
      'cursor:pointer;box-shadow:0 2px 12px rgba(0,0,0,0.35);' +
      'user-select:none;opacity:0.85;' +
      'transition:opacity 0.2s,transform 0.2s;'
    );
    
    var hideTimeout = null;
    container.onmouseenter = function () { 
      clearTimeout(hideTimeout);
      btn.style.opacity = '1'; 
      btn.style.transform = 'scale(1.05)'; 
      menu.style.display = 'flex';
    };
    container.onmouseleave = function () { 
      hideTimeout = setTimeout(function() {
        btn.style.opacity = '0.85'; 
        btn.style.transform = 'scale(1)'; 
        menu.style.display = 'none';
      }, 300);
    };
    
    btn.onclick = function () {
      if (translationOn) { stopObserver(); }
      localStorage.setItem(STORAGE_KEY, translationOn ? 'false' : 'true');
      window.location.reload();
    };
    
    container.appendChild(menu);
    container.appendChild(btn);
    document.body.appendChild(container);
  }

  /* ─────────────────────────────────────────────
     8. SELECTION TRANSLATOR  划词翻译
  ───────────────────────────────────────────── */
  function fetchTranslation(text) {
    var url1 = 'https://translate.googleapis.com/translate_a/single' +
      '?client=gtx&sl=auto&tl=zh-CN&dt=t&q=' + encodeURIComponent(text);
    var url2 = 'https://api.mymemory.translated.net/get' +
      '?q=' + encodeURIComponent(text) + '&langpair=en|zh';
    return fetch(url1)
      .then(function (r) {
        if (!r.ok) return Promise.reject('g-fail');
        return r.json();
      })
      .then(function (data) {
        var parts = data[0]; var out = '';
        for (var i = 0; i < parts.length; i++) { if (parts[i] && parts[i][0]) out += parts[i][0]; }
        return out || Promise.reject('empty');
      })
      .catch(function () {
        return fetch(url2)
          .then(function (r) { return r.json(); })
          .then(function (d) {
            var t = d.responseData && d.responseData.translatedText;
            return t || Promise.reject('no-result');
          });
      });
  }

  function injectSelectionTranslator() {
    if (document.getElementById('ag-sel-btn')) return;
    var btn = document.createElement('div');
    btn.id = 'ag-sel-btn';
    btn.textContent = '翻 译';
    btn.setAttribute('style',
      'position:fixed;display:none;padding:5px 12px;' +
      'background:#1f6feb;color:#fff;border-radius:8px;' +
      'font-size:12px;font-weight:600;cursor:pointer;' +
      'font-family:system-ui,-apple-system,sans-serif;' +
      'box-shadow:0 4px 14px rgba(0,0,0,0.28);' +
      'z-index:2147483647;user-select:none;letter-spacing:0.5px;'
    );
    document.body.appendChild(btn);

    document.addEventListener('mouseup', function (e) {
      if (e.target === btn) return;
      var sel = window.getSelection();
      var text = sel ? sel.toString().trim() : '';
      if (text.length > 0 && /[a-zA-Z]/.test(text)) {
        var x = e.clientX + 10;
        var y = e.clientY + 14;
        if (x + 90 > window.innerWidth) x = e.clientX - 90;
        if (y + 32 > window.innerHeight) y = e.clientY - 36;
        btn.style.left = x + 'px';
        btn.style.top = y + 'px';
        btn.style.display = 'block';
        btn.style.background = '#1f6feb';
        btn.textContent = '翻 译';
      } else {
        btn.style.display = 'none';
      }
    });

    document.addEventListener('mousedown', function (e) {
      if (e.target !== btn) btn.style.display = 'none';
    });

    btn.addEventListener('mousedown', function (e) { e.preventDefault(); });

    btn.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      var sel = window.getSelection();
      if (!sel || !sel.rangeCount) return;
      var text = sel.toString().trim();
      if (!text) return;
      var range = sel.getRangeAt(0);
      btn.textContent = '翻译中…';
      btn.style.background = '#9e6a03';

      fetchTranslation(text).then(function (translated) {
        if (translated && translated !== text) {
          var span = document.createElement('span');
          span.className = 'ag-translated';
          span.dataset.orig = text;
          // Blue color = visually distinct from normal text
          span.setAttribute('style',
            'color:#58a6ff;background:rgba(31,111,235,0.12);' +
            'border-bottom:2px solid #58a6ff;border-radius:3px;' +
            'padding:0 3px;cursor:pointer;transition:background 0.15s;'
          );
          span.title = '已翻译 · 点击还原英文原文';
          span.textContent = translated;
          span.onmouseenter = function () { span.style.background = 'rgba(31,111,235,0.22)'; };
          span.onmouseleave = function () { span.style.background = 'rgba(31,111,235,0.12)'; };
          span.onclick = function (ev) {
            ev.preventDefault(); ev.stopPropagation();
            span.parentNode.replaceChild(document.createTextNode(span.dataset.orig), span);
          };
          range.deleteContents();
          range.insertNode(span);
          sel.removeAllRanges();
        } else {
          alert('翻译服务暂时不可用，请检查网络连接。');
        }
        btn.style.display = 'none';
      }).catch(function () {
        alert('翻译失败，请检查网络连接。');
        btn.style.display = 'none';
      });
    });
  }

  /* ─────────────────────────────────────────────
     9. BOOT
  ───────────────────────────────────────────── */
  function forceTranslatePopups() {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    var node;
    while ((node = walker.nextNode())) {
      var txt = node.nodeValue;
      if (!txt) continue;
      
      var changed = false;
      if (txt.includes('allow this time')) {
        txt = txt.replace('allow this time', '仅限这一次允许');
        changed = true;
      }
      if (txt.includes("and always allow '")) {
        txt = txt.replace(/and always allow '([^']+)' when not in a project/g, "并且在非项目目录时始终允许 '$1'");
        txt = txt.replace(/and always allow '([^']+)'/g, "永远允许命令 '$1'");
        changed = true;
      } else if (txt.includes("and always allow when not in a project")) {
        txt = txt.replace("and always allow when not in a project", "并且在非项目目录时始终允许");
        changed = true;
      } else if (txt.includes("and always allow")) {
        txt = txt.replace("and always allow", "永远允许，不再弹窗");
        changed = true;
      }
      if (txt.includes("(tell the agent what to do instead)")) {
        txt = txt.replace("(tell the agent what to do instead)", "(拒绝，在下方输入框告诉它该怎么做)");
        changed = true;
      }
      if (txt.includes("executing the Node script to inject the new translations into dict.json")) {
        txt = txt.replace("executing the Node script to inject the new translations into dict.json", "执行 Node 脚本以注入新翻译到 dict.json");
        changed = true;
      }
      
      if (changed && node.nodeValue !== txt) {
        node.nodeValue = txt;
      }
    }
  }

  function boot() {
    if (translationOn) { 
      walk(document.body); 
      startObserver(); 
      setInterval(forceTranslatePopups, 1000);
    }
    injectToggle();
    injectSelectionTranslator();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

}());
