"use strict";

/**
 * Конфигурация контактов и опционального Telegram-бота.
 * После покупки сайта владельцем можно вписать token и chatId,
 * чтобы заявки отправлялись в Telegram в фоне без открытия мессенджера у клиента.
 */
const CONFIG = {
  whatsappPhone: "79202175805",
  telegramBotToken: "",
  telegramChatId: ""
};

const TIRE_RATES = {
  steel: {
    R13: 960,
    R14: 1040,
    R15: 1120,
    R16: 1200,
    "R17-R18": 2000,
    "Нива": 1500
  },
  alloy: {
    R13: 1080,
    R14: 1200,
    R15: 1320,
    R16: 1480,
    "R17-R18": 2000,
    "Нива": 1700
  }
};

const TIRE_ADDONS = [
  { id: "valve", label: "Замена вентиля (1 шт.)", price: 50 },
  { id: "seal", label: "Герметизация борта (1 шт.)", price: 50 },
  { id: "camera", label: "Ремонт камеры", price: 150 },
  { id: "plug", label: "Жгут / прокол шины", price: 200 },
  { id: "steelRoll", label: "Прокатка штамп. диска (от)", price: 400 },
  { id: "alloyFix", label: "Правка литого диска (от)", price: 600 }
];

const SERVICES_CATALOG = [
  // Ходовая и тормоза
  { category: "suspension", catLabel: "Ходовая", name: "Диагностика ходовой части", price: "от 200 ₽" },
  { category: "suspension", catLabel: "Ходовая", name: "Замена шаровой опоры", price: "от 250 ₽" },
  { category: "suspension", catLabel: "Ходовая", name: "Замена переднего амортизатора", price: "от 300 ₽" },
  { category: "suspension", catLabel: "Ходовая", name: "Замена рулевых наконечников / краба", price: "от 300 ₽" },
  { category: "suspension", catLabel: "Ходовая", name: "Замена рулевого маятника / задней пружины", price: "от 400 ₽" },
  { category: "suspension", catLabel: "Ходовая", name: "Замена передних тормозных колодок", price: "от 500 ₽" },
  { category: "suspension", catLabel: "Ходовая", name: "Замена подшипника ступицы / заднего подшипника", price: "от 500 ₽" },
  { category: "suspension", catLabel: "Ходовая", name: "Замена сайлентблока", price: "от 500 ₽" },
  { category: "suspension", catLabel: "Ходовая", name: "Замена передней пружины / опорного подшипника", price: "от 1 000 ₽" },
  { category: "suspension", catLabel: "Ходовая", name: "Замена рулевой трапеции / реактивных тяг", price: "от 1 000 ₽" },
  { category: "suspension", catLabel: "Ходовая", name: "Замена заднего амортизатора", price: "от 1 000 ₽" },
  { category: "suspension", catLabel: "Ходовая", name: "Регулировка развал-схождения передних колёс", price: "по осмотру" },

  // Двигатель и КПП
  { category: "engine", catLabel: "ДВС и КПП", name: "Замер компрессии двигателя", price: "от 200 ₽" },
  { category: "engine", catLabel: "ДВС и КПП", name: "Замена генератора / термостата", price: "от 500 ₽" },
  { category: "engine", catLabel: "ДВС и КПП", name: "Регулировка клапанов / замена радиатора", price: "от 700 ₽" },
  { category: "engine", catLabel: "ДВС и КПП", name: "Замена ремня ГРМ", price: "от 800 ₽" },
  { category: "engine", catLabel: "ДВС и КПП", name: "Замена радиатора печки", price: "от 1 000 ₽" },
  { category: "engine", catLabel: "ДВС и КПП", name: "Замена водяной помпы", price: "от 1 200 ₽" },
  { category: "engine", catLabel: "ДВС и КПП", name: "Замена сцепления", price: "от 2 200 ₽" },
  { category: "engine", catLabel: "ДВС и КПП", name: "Замена ГБЦ / гидрокомпенсаторов", price: "от 2 500 ₽" },
  { category: "engine", catLabel: "ДВС и КПП", name: "Капремонт бензиновых ДВС и ремонт МКПП", price: "по осмотру" },

  // ТО и жидкости
  { category: "maintenance", catLabel: "ТО и жидкости", name: "Замена масла и масляного фильтра", price: "от 200 ₽" },
  { category: "maintenance", catLabel: "ТО и жидкости", name: "Замена свечей зажигания", price: "от 200 ₽" },
  { category: "maintenance", catLabel: "ТО и жидкости", name: "Замена масла в АКПП (со снятием поддона) и вариаторе", price: "по осмотру" },
  { category: "maintenance", catLabel: "ТО и жидкости", name: "Замена масла в МКПП, раздатке и редукторе моста", price: "по осмотру" },
  { category: "maintenance", catLabel: "ТО и жидкости", name: "Замена ОЖ (с промывкой), тормозной и жидкости ГУР", price: "по осмотру" },

  // Шиномонтаж и диски
  { category: "tires", catLabel: "Шины и диски", name: "Комплексный шиномонтаж 4 колёс (штамп. R13–R18)", price: "от 960 ₽" },
  { category: "tires", catLabel: "Шины и диски", name: "Комплексный шиномонтаж 4 колёс (литые R13–R18)", price: "от 1 080 ₽" },
  { category: "tires", catLabel: "Шины и диски", name: "Прокатка штампованного диска (R13–R18)", price: "от 400 ₽" },
  { category: "tires", catLabel: "Шины и диски", name: "Правка литого диска (R13–R18)", price: "от 600 ₽" },
  { category: "tires", catLabel: "Шины и диски", name: "Ремонт шины жгутом / ремонт камеры", price: "150–200 ₽" },
  { category: "tires", catLabel: "Шины и диски", name: "Ремонт бокового пореза шины", price: "от 500 ₽" },
  { category: "tires", catLabel: "Шины и диски", name: "Аргонная сварка (диски, поддоны, трубки кондиционера)", price: "по оценке" }
];

const state = {
  diskType: "steel",
  wheelSize: "R14",
  selectedAddons: new Set(),
  activeCategory: "all",
  searchQuery: "",
  showAllPrices: false
};

function updateOpenStatus() {
  const dot = document.getElementById("statusDot");
  const text = document.getElementById("statusText");
  if (!dot || !text) return;

  try {
    const mskHour = Number(
      new Intl.DateTimeFormat("ru-RU", {
        timeZone: "Europe/Moscow",
        hour: "numeric",
        hour12: false
      }).format(new Date())
    );
    const isOpen = mskHour >= 9 && mskHour < 18;
    dot.classList.toggle("is-closed", !isOpen);
    text.textContent = isOpen
      ? "Открыто сейчас · до 18:00"
      : "Сейчас закрыто · с 09:00 до 18:00";
  } catch {
    text.textContent = "Ежедневно 09:00–18:00";
  }
}

function initMobileMenu() {
  const burger = document.getElementById("burgerBtn");
  const drawer = document.getElementById("mobileNav");
  if (!burger || !drawer) return;

  const toggle = (forceState) => {
    const isOpen = typeof forceState === "boolean" ? forceState : !drawer.classList.contains("is-open");
    drawer.classList.toggle("is-open", isOpen);
    burger.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  burger.addEventListener("click", () => toggle());
  drawer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => toggle(false));
  });
}

function renderAddons() {
  const container = document.getElementById("addonGrid");
  if (!container) return;

  container.innerHTML = TIRE_ADDONS.map(
    (addon) => `
      <label class="addon-item">
        <span class="addon-item__left">
          <input type="checkbox" data-addon-id="${addon.id}" />
          <span>${addon.label}</span>
        </span>
        <span class="addon-item__price">+${addon.price} ₽</span>
      </label>
    `
  ).join("");

  container.querySelectorAll("input[type='checkbox']").forEach((checkbox) => {
    checkbox.addEventListener("change", (event) => {
      const id = event.target.dataset.addonId;
      if (event.target.checked) {
        state.selectedAddons.add(id);
      } else {
        state.selectedAddons.delete(id);
      }
      updateTireCalculator();
    });
  });
}

function updateTireCalculator() {
  const basePrice = TIRE_RATES[state.diskType][state.wheelSize] ?? 0;
  let addonsTotal = 0;
  const rows = [
    {
      label: `Комплекс 4 колеса (${state.diskType === "steel" ? "штампованные" : "литые"}, ${state.wheelSize})`,
      value: `от ${basePrice.toLocaleString("ru-RU")} ₽`
    }
  ];

  TIRE_ADDONS.forEach((addon) => {
    if (state.selectedAddons.has(addon.id)) {
      addonsTotal += addon.price;
      rows.push({
        label: addon.label,
        value: `${addon.price} ₽`
      });
    }
  });

  const total = basePrice + addonsTotal;
  const totalEl = document.getElementById("calcTotal");
  const breakdownEl = document.getElementById("calcBreakdown");

  if (totalEl) {
    totalEl.textContent = `от ${total.toLocaleString("ru-RU")} ₽`;
  }
  if (breakdownEl) {
    breakdownEl.innerHTML = rows
      .map((r) => `<div class="calc-breakdown__row"><span>${r.label}</span><strong>${r.value}</strong></div>`)
      .join("");
  }
}

function initTireCalculator() {
  renderAddons();

  document.querySelectorAll("[data-disk-type]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-disk-type]").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      state.diskType = btn.dataset.diskType;
      updateTireCalculator();
    });
  });

  document.querySelectorAll("[data-wheel-size]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-wheel-size]").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      state.wheelSize = btn.dataset.wheelSize;
      updateTireCalculator();
    });
  });

  const applyBtn = document.getElementById("applyCalcBtn");
  if (applyBtn) {
    applyBtn.addEventListener("click", () => {
      const diskLabel = state.diskType === "steel" ? "штампованные" : "литые";
      const addonsList = TIRE_ADDONS.filter((a) => state.selectedAddons.has(a.id)).map((a) => a.label);
      const total = document.getElementById("calcTotal")?.textContent || "";
      const summary = `Шиномонтаж 4 колёс (${diskLabel}, ${state.wheelSize})${
        addonsList.length ? " + " + addonsList.join(", ") : ""
      } — расчёт ${total}`;
      prefillBooking(summary);
    });
  }

  updateTireCalculator();
}

function renderPriceTable() {
  const container = document.getElementById("priceTable");
  if (!container) return;

  const q = state.searchQuery.trim().toLowerCase();
  const filtered = SERVICES_CATALOG.filter((item) => {
    const matchCat = state.activeCategory === "all" || item.category === state.activeCategory;
    const matchQuery = !q || item.name.toLowerCase().includes(q) || item.catLabel.toLowerCase().includes(q);
    return matchCat && matchQuery;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="price-empty">
        По запросу ничего не найдено. Позвоните мастеру +7 (920) 217-58-05 — подскажем точную цену по вашему авто.
      </div>
    `;
    return;
  }

  const shouldLimit = state.activeCategory === "all" && !q && !state.showAllPrices;
  const visible = shouldLimit ? filtered.slice(0, 8) : filtered;
  const hiddenCount = filtered.length - visible.length;

  const rowsHtml = visible
    .map(
      (item) => `
        <div class="price-row">
          <div class="price-row__name">
            ${item.name}
            <span class="price-row__cat">${item.catLabel}</span>
          </div>
          <div class="price-row__cost">${item.price}</div>
          <button type="button" class="btn btn--secondary btn--sm" data-book-service="${item.name} (${item.price})">
            + В заявку
          </button>
        </div>
      `
    )
    .join("");

  const toggleHtml =
    state.activeCategory === "all" && !q && filtered.length > 8
      ? `
        <div class="price-toggle">
          <button type="button" class="btn btn--ghost btn--sm" id="togglePricesBtn">
            ${shouldLimit ? `Показать весь прайс (ещё ${hiddenCount})` : "Свернуть список"}
          </button>
        </div>
      `
      : "";

  container.innerHTML = rowsHtml + toggleHtml;

  container.querySelectorAll("[data-book-service]").forEach((btn) => {
    btn.addEventListener("click", () => prefillBooking(btn.dataset.bookService));
  });

  document.getElementById("togglePricesBtn")?.addEventListener("click", () => {
    state.showAllPrices = !state.showAllPrices;
    renderPriceTable();
  });
}

function initPriceList() {
  document.querySelectorAll("[data-cat]").forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelectorAll("[data-cat]").forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      state.activeCategory = tab.dataset.cat;
      renderPriceTable();
    });
  });

  const searchInput = document.getElementById("priceSearch");
  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      state.searchQuery = event.target.value;
      renderPriceTable();
    });
  }

  document.querySelectorAll("[data-prefill]").forEach((btn) => {
    btn.addEventListener("click", () => prefillBooking(btn.dataset.prefill));
  });

  renderPriceTable();
}

function prefillBooking(serviceText) {
  const detailsField = document.getElementById("bookingDetails");
  const bookingSection = document.getElementById("booking");
  if (detailsField) {
    detailsField.value = serviceText;
    detailsField.focus({ preventScroll: true });
  }
  if (bookingSection) {
    bookingSection.scrollIntoView({ behavior: "smooth" });
  }
}

async function sendToTelegramIfConfigured(text) {
  if (!CONFIG.telegramBotToken || !CONFIG.telegramChatId) return false;
  const endpoint = `https://api.telegram.org/bot${CONFIG.telegramBotToken}/sendMessage`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CONFIG.telegramChatId,
      text
    })
  });
  return response.ok;
}

function initBookingForm() {
  const form = document.getElementById("bookingForm");
  const modal = document.getElementById("bookingModal");
  const summaryEl = document.getElementById("modalSummary");
  const waBtn = document.getElementById("modalWaBtn");
  const copyBtn = document.getElementById("modalCopyBtn");
  const closeBtn = document.getElementById("modalCloseBtn");
  const modalDesc = document.getElementById("modalDesc");

  if (!form || !modal) return;

  const closeModal = () => modal.classList.remove("is-open");
  closeBtn?.addEventListener("click", closeModal);
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const car = String(formData.get("car") || "").trim();
    const time = String(formData.get("time") || "").trim();
    const details = String(formData.get("details") || "").trim();

    const messageText = [
      "Заявка на СТО «У Алексеича»:",
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      car ? `Авто: ${car}` : null,
      time ? `Желаемое время: ${time}` : null,
      details ? `Работы / вопрос: ${details}` : null
    ]
      .filter(Boolean)
      .join("\n");

    let sentDirectly = false;
    try {
      sentDirectly = await sendToTelegramIfConfigured(messageText);
    } catch {
      sentDirectly = false;
    }

    if (summaryEl) summaryEl.textContent = messageText;
    if (modalDesc) {
      modalDesc.textContent = sentDirectly
        ? "Заявка уже отправлена мастеру в Telegram. Также вы можете сразу позвонить или продублировать её в WhatsApp:"
        : "Заявка сформирована! Отправьте её мастеру в WhatsApp одним нажатием или позвоните напрямую:";
    }

    if (waBtn) {
      waBtn.href = `https://wa.me/${CONFIG.whatsappPhone}?text=${encodeURIComponent(messageText)}`;
    }

    if (copyBtn) {
      copyBtn.onclick = async () => {
        try {
          await navigator.clipboard.writeText(messageText);
          copyBtn.textContent = "Скопировано!";
          setTimeout(() => {
            copyBtn.textContent = "Скопировать текст заявки";
          }, 2000);
        } catch {
          copyBtn.textContent = "Выделите текст выше вручную";
        }
      };
    }

    modal.classList.add("is-open");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateOpenStatus();
  initMobileMenu();
  initTireCalculator();
  initPriceList();
  initBookingForm();
});
