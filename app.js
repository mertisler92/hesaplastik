// ==========================================================================
// 1. APPLICATION STATE (DURUM YÖNETİMİ)
// ==========================================================================
const state = {
    theme: 'dark',
    lang: 'tr',
    currency: 'TRY',
    people: [],
    expenses: []
};

// LocalStorage Anahtarları
const STORAGE_KEYS = {
    THEME: 'hesaplastik_theme',
    LANG: 'hesaplastik_lang',
    CURRENCY: 'hesaplastik_currency',
    PEOPLE: 'hesaplastik_people',
    EXPENSES: 'hesaplastik_expenses'
};

// ==========================================================================
// DİL ÇEVİRİ SÖZLÜĞÜ (TRANSLATIONS DICTIONARY - TR / EN / DE)
// ==========================================================================
const TRANSLATIONS = {
    tr: {
        // Nav tabs
        tab_people: 'Kişiler',
        tab_expenses: 'Harcamalar',
        tab_summary: 'Özet / Borçlar',
        
        // People Page
        people_title: 'Gruptaki Kişiler',
        people_desc: 'Harcamaları paylaşacak kişileri ekleyin. En az 2 kişi eklemelisiniz.',
        label_person_name: 'Kişi Adı',
        btn_add: 'Ekle',
        empty_people_title: 'Henüz Kimse Yok',
        empty_people_desc: 'Harcamaları paylaşmak için yukarıdaki alandan gruba kişiler ekleyin.',
        
        // Expenses Page
        expenses_title: 'Grup Harcamaları',
        expenses_desc: 'Yapılan harcamaları, ödeyenleri ve ortak olanları kaydedin.',
        btn_add_expense: 'Harcama Ekle',
        empty_expenses_title: 'Harcama Bulunmamaktadır',
        empty_expenses_desc: 'Henüz bir harcama girilmedi. Sağ üstteki veya aşağıdaki buton ile ilk harcamanızı ekleyin.',
        btn_first_expense: 'İlk Harcamayı Ekle',
        
        // Summary Page
        summary_title: 'Hesap Özeti & Dengeleme',
        summary_desc: 'Harcamaların genel dökümü ve minimum transfer ile borç kapatma planı.',
        stat_total_expense: 'Toplam Harcama',
        stat_people_count: 'Kişi Sayısı',
        stat_transfers_count: 'Transfer Sayısı',
        card_member_balances: 'Üye Bakiyeleri',
        card_payment_plan: 'Ödeme Planı (Minimum Transfer)',
        btn_copy_summary: 'Özeti Kopyala',
        
        // Modals
        modal_expense_new_title: 'Yeni Harcama Ekle',
        modal_expense_edit_title: 'Harcamayı Düzenle',
        label_expense_desc: 'Harcama Açıklaması',
        label_expense_amount: 'Tutar',
        label_expense_payer: 'Ödemeyi Yapan Kişi',
        select_payer_placeholder: 'Kişi Seçin...',
        label_expense_beneficiaries: 'Bu Harcamadan Yararlananlar',
        btn_select_all: 'Hepsini Seç',
        btn_select_none: 'Temizle',
        btn_cancel: 'İptal',
        btn_save: 'Kaydet',
        
        modal_person_edit_title: 'Kişiyi Düzenle',
        label_person_new_name: 'Yeni İsim',
        btn_update: 'Güncelle',
        
        // Dynamic labels and details
        payer_label: 'Ödeyen',
        person_count_suffix: 'Kişi',
        per_person_share: 'Kişi Başı Pay',
        edit_action: 'Düzenle',
        delete_action: 'Sil',
        
        // Balance statuses
        status_settled: 'Ödeşildi',
        status_creditor: 'Alacaklı',
        status_debtor: 'Borçlu',
        label_paid: 'Ödediği',
        label_share: 'Harcama Payı',
        
        // Empty states for summary
        summary_min_people: 'Hesaplama yapılabilmesi için en az 2 kişi eklenmiş olmalıdır.',
        settlement_min_people: 'Borç kapatma planı oluşturulabilmesi için en az 2 kişi eklenmiş olmalıdır.',
        no_debts_title: 'Borç Bulunmamaktadır!',
        no_debts_desc: 'Tüm grup üyeleri dengeli durumda veya ödeşmiş.',
        
        // Toasts
        toast_person_empty: 'Kişi adı boş olamaz!',
        toast_person_exists: 'Bu isimde bir kişi zaten grupta var!',
        toast_person_added: 'başarıyla gruba eklendi.',
        toast_person_delete_error: 'silinemez! Bu kişinin dahil olduğu harcamalar var. Önce ilgili harcamaları düzenleyin veya silin.',
        toast_person_delete_confirm: 'kişisini gruptan silmek istediğinize emin misiniz?',
        toast_person_deleted: 'Kişi başarıyla silindi.',
        toast_person_edit_empty: 'Kişi adı boş olamaz!',
        toast_person_edit_exists: 'Bu isimde başka bir kişi zaten var!',
        toast_person_updated: 'ismi olarak güncellendi.',
        
        toast_expense_min_people: 'Harcama eklemek için önce en az 2 kişi eklemelisiniz!',
        toast_expense_desc_empty: 'Açıklama boş olamaz!',
        toast_expense_amount_error: 'Harcama tutarı 0\'dan büyük bir sayı olmalıdır!',
        toast_expense_payer_empty: 'Lütfen ödemeyi yapan kişiyi seçin!',
        toast_expense_beneficiary_empty: 'En az bir yararlanan kişi seçmelisiniz!',
        toast_expense_added: 'Harcama başarıyla eklendi.',
        toast_expense_updated: 'Harcama başarıyla güncellendi.',
        toast_expense_delete_confirm: 'Bu harcamayı silmek istediğinize emin misiniz?',
        toast_expense_deleted: 'Harcama silindi.',
        
        toast_copy_no_debts: 'Kopyalanacak borç planı bulunmamaktadır!',
        toast_copy_success: 'Özet metni panoya kopyalandı! WhatsApp grubunuza yapıştırabilirsiniz.',
        toast_copy_error: 'Metin kopyalanamadı, tarayıcı iznini kontrol edin.',
        
        // Share text template
        share_title: '📊 *HESAPLAŞTIK HESAP ÖZETİ* 📊',
        share_total_expense: 'Toplam Grup Harcaması',
        share_plan_header: 'Ödeme Planı (Kim kime ne kadar ödemeli?):',
        share_footer: 'Hesaplaştık ile otomatik olarak hesaplanmıştır.',
        
        // Language changed
        toast_lang_changed: 'Dil Türkçe olarak değiştirildi.',
        toast_currency_changed: 'Para birimi güncellendi.'
    },
    en: {
        // Nav tabs
        tab_people: 'People',
        tab_expenses: 'Expenses',
        tab_summary: 'Summary / Debts',
        
        // People Page
        people_title: 'Group Members',
        people_desc: 'Add members who will share the expenses. You must add at least 2 people.',
        label_person_name: 'Person Name',
        btn_add: 'Add',
        empty_people_title: 'No Members Yet',
        empty_people_desc: 'Add people to the group from the field above to start sharing expenses.',
        
        // Expenses Page
        expenses_title: 'Group Expenses',
        expenses_desc: 'Record expenses, who paid, and who shared the expense.',
        btn_add_expense: 'Add Expense',
        empty_expenses_title: 'No Expenses Recorded',
        empty_expenses_desc: 'No expenses have been entered yet. Add your first expense using the button in the top right or below.',
        btn_first_expense: 'Add First Expense',
        
        // Summary Page
        summary_title: 'Summary & Settlement',
        summary_desc: 'General breakdown of expenses and minimum transaction debt settlement plan.',
        stat_total_expense: 'Total Expense',
        stat_people_count: 'Members Count',
        stat_transfers_count: 'Transfers Count',
        card_member_balances: 'Member Balances',
        card_payment_plan: 'Payment Plan (Min. Transfers)',
        btn_copy_summary: 'Copy Summary',
        
        // Modals
        modal_expense_new_title: 'Add New Expense',
        modal_expense_edit_title: 'Edit Expense',
        label_expense_desc: 'Expense Description',
        label_expense_amount: 'Amount',
        label_expense_payer: 'Payer',
        select_payer_placeholder: 'Select Person...',
        label_expense_beneficiaries: 'Beneficiaries',
        btn_select_all: 'Select All',
        btn_select_none: 'Clear',
        btn_cancel: 'Cancel',
        btn_save: 'Save',
        
        modal_person_edit_title: 'Edit Person',
        label_person_new_name: 'New Name',
        btn_update: 'Update',
        
        // Dynamic labels and details
        payer_label: 'Payer',
        person_count_suffix: 'People',
        per_person_share: 'Share per Person',
        edit_action: 'Edit',
        delete_action: 'Delete',
        
        // Balance statuses
        status_settled: 'Settled',
        status_creditor: 'Creditor',
        status_debtor: 'Debtor',
        label_paid: 'Paid',
        label_share: 'Share',
        
        // Empty states for summary
        summary_min_people: 'At least 2 people must be added to calculate balances.',
        settlement_min_people: 'At least 2 people must be added to generate a settlement plan.',
        no_debts_title: 'No Debts Remaining!',
        no_debts_desc: 'All group members are settled or balanced.',
        
        // Toasts
        toast_person_empty: 'Person name cannot be empty!',
        toast_person_exists: 'A person with this name already exists in the group!',
        toast_person_added: 'successfully added to the group.',
        toast_person_delete_error: 'cannot be deleted! This person is involved in some expenses. Please edit or delete those expenses first.',
        toast_person_delete_confirm: 'Are you sure you want to delete this person from the group?',
        toast_person_deleted: 'Person successfully deleted.',
        toast_person_edit_empty: 'Person name cannot be empty!',
        toast_person_edit_exists: 'Another person with this name already exists!',
        toast_person_updated: 'name updated to.',
        
        toast_expense_min_people: 'You must add at least 2 people first before adding an expense!',
        toast_expense_desc_empty: 'Description cannot be empty!',
        toast_expense_amount_error: 'Expense amount must be a number greater than 0!',
        toast_expense_payer_empty: 'Please select the person who paid!',
        toast_expense_beneficiary_empty: 'You must select at least one beneficiary!',
        toast_expense_added: 'Expense successfully added.',
        toast_expense_updated: 'Expense successfully updated.',
        toast_expense_delete_confirm: 'Are you sure you want to delete this expense?',
        toast_expense_deleted: 'Expense deleted.',
        
        toast_copy_no_debts: 'There is no debt plan to copy!',
        toast_copy_success: 'Summary copied to clipboard! You can paste it into your WhatsApp group.',
        toast_copy_error: 'Failed to copy text, please check browser permissions.',
        
        // Share text template
        share_title: '📊 *HESAPLAŞTIK SUMMARY* 📊',
        share_total_expense: 'Total Group Expense',
        share_plan_header: 'Payment Plan (Who should pay whom?):',
        share_footer: 'Automatically calculated by Hesaplaştık.',
        
        // Language changed
        toast_lang_changed: 'Language changed to English.',
        toast_currency_changed: 'Currency updated.'
    },
    de: {
        // Nav tabs
        tab_people: 'Personen',
        tab_expenses: 'Ausgaben',
        tab_summary: 'Übersicht / Schulden',
        
        // People Page
        people_title: 'Gruppenmitglieder',
        people_desc: 'Fügen Sie Mitglieder hinzu, die Ausgaben teilen. Sie müssen mindestens 2 Personen hinzufügen.',
        label_person_name: 'Name der Person',
        btn_add: 'Hinzufügen',
        empty_people_title: 'Noch keine Mitglieder',
        empty_people_desc: 'Fügen Sie oben Personen zur Gruppe hinzu, um Ausgaben zu teilen.',
        
        // Expenses Page
        expenses_title: 'Gruppenausgaben',
        expenses_desc: 'Erfassen Sie Ausgaben, Zahler und Begünstigte.',
        btn_add_expense: 'Ausgabe hinzufügen',
        empty_expenses_title: 'Keine Ausgaben erfasst',
        empty_expenses_desc: 'Es wurden noch keine Ausgaben eingetragen. Fügen Sie Ihre erste Ausgabe über die Schaltfläche oben rechts oder unten hinzu.',
        btn_first_expense: 'Erste Ausgabe hinzufügen',
        
        // Summary Page
        summary_title: 'Zusammenfassung & Ausgleich',
        summary_desc: 'Allgemeine Aufschlüsselung der Ausgaben und Zahlungsplan mit minimalen Transfers.',
        stat_total_expense: 'Gesamtausgaben',
        stat_people_count: 'Anzahl Personen',
        stat_transfers_count: 'Anzahl Transfers',
        card_member_balances: 'Salden der Mitglieder',
        card_payment_plan: 'Zahlungsplan (Min. Transfers)',
        btn_copy_summary: 'Zusammenfassung kopieren',
        
        // Modals
        modal_expense_new_title: 'Neue Ausgabe hinzufügen',
        modal_expense_edit_title: 'Ausgabe bearbeiten',
        label_expense_desc: 'Ausgabenbeschreibung',
        label_expense_amount: 'Betrag',
        label_expense_payer: 'Bezahlt von',
        select_payer_placeholder: 'Person auswählen...',
        label_expense_beneficiaries: 'Begünstigte',
        btn_select_all: 'Alle auswählen',
        btn_select_none: 'Löschen',
        btn_cancel: 'Abbrechen',
        btn_save: 'Speichern',
        
        modal_person_edit_title: 'Person bearbeiten',
        label_person_new_name: 'Neuer Name',
        btn_update: 'Aktualisieren',
        
        // Dynamic labels and details
        payer_label: 'Zahler',
        person_count_suffix: 'Personen',
        per_person_share: 'Anteil pro Person',
        edit_action: 'Bearbeiten',
        delete_action: 'Löschen',
        
        // Balance statuses
        status_settled: 'Ausgeglichen',
        status_creditor: 'Gläubiger',
        status_debtor: 'Schuldner',
        label_paid: 'Bezahlt',
        label_share: 'Anteil',
        
        // Empty states for summary
        summary_min_people: 'Mindestens 2 Personen müssen hinzugefügt werden, um Salden zu berechnen.',
        settlement_min_people: 'Mindestens 2 Personen müssen hinzugefügt werden, um einen Zahlungsplan zu erstellen.',
        no_debts_title: 'Keine Schulden verbleibend!',
        no_debts_desc: 'Alle Gruppenmitglieder sind ausgeglichen.',
        
        // Toasts
        toast_person_empty: 'Name der Person darf nicht leer sein!',
        toast_person_exists: 'Eine Person mit diesem Namen existiert bereits in der Gruppe!',
        toast_person_added: 'erfolgreich zur Gruppe hinzugefügt.',
        toast_person_delete_error: 'kann nicht gelöscht werden! Diese Person ist an Ausgaben beteiligt. Bitte bearbeiten oder löschen Sie zuerst diese Ausgaben.',
        toast_person_delete_confirm: 'Sind Sie sicher, dass Sie diese Person aus der Gruppe löschen möchten?',
        toast_person_deleted: 'Person erfolgreich gelöscht.',
        toast_person_edit_empty: 'Name der Person darf nicht leer sein!',
        toast_person_edit_exists: 'Eine andere Person mit diesem Namen existiert bereits!',
        toast_person_updated: 'Name aktualisiert auf.',
        
        toast_expense_min_people: 'Sie müssen zuerst mindestens 2 Personen hinzufügen, bevor Sie eine Ausgabe hinzufügen!',
        toast_expense_desc_empty: 'Beschreibung darf nicht leer sein!',
        toast_expense_amount_error: 'Der Ausgabenbetrag muss eine Zahl größer als 0 sein!',
        toast_expense_payer_empty: 'Bitte wählen Sie die Person aus, die bezahlt hat!',
        toast_expense_beneficiary_empty: 'Sie müssen mindestens einen Begünstigten auswählen!',
        toast_expense_added: 'Ausgabe erfolgreich hinzugefügt.',
        toast_expense_updated: 'Ausgabe erfolgreich aktualisiert.',
        toast_expense_delete_confirm: 'Sind Sie sicher, dass Sie diese Ausgabe löschen möchten?',
        toast_expense_deleted: 'Ausgabe gelöscht.',
        
        toast_copy_no_debts: 'Es gibt keinen Zahlungsplan zum Kopieren!',
        toast_copy_success: 'Zusammenfassung in die Zwischenablage kopiert! Sie können sie in Ihre WhatsApp-Gruppe einfügen.',
        toast_copy_error: 'Text konnte nicht kopiert werden, bitte überprüfen Sie die Browserberechtigungen.',
        
        // Share text template
        share_title: '📊 *HESAPLAŞTIK ÜBERSICHT* 📊',
        share_total_expense: 'Gesamte Gruppenausgaben',
        share_plan_header: 'Zahlungsplan (Wer sollte wem was bezahlen?):',
        share_footer: 'Automatisch berechnet von Hesaplaştık.',
        
        // Language changed
        toast_lang_changed: 'Sprache auf Deutsch geändert.',
        toast_currency_changed: 'Währung aktualisiert.'
    }
};

// State'i LocalStorage'dan yükle
function loadState() {
    state.theme = localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
    state.lang = 'tr';
    state.currency = 'TRY';
    
    try {
        state.people = JSON.parse(localStorage.getItem(STORAGE_KEYS.PEOPLE)) || [];
        state.expenses = JSON.parse(localStorage.getItem(STORAGE_KEYS.EXPENSES)) || [];
    } catch (e) {
        console.error('Veri yüklenirken hata oluştu, varsayılan değerler kullanılıyor.', e);
        state.people = [];
        state.expenses = [];
    }
}

// State'i LocalStorage'a kaydet
function saveState() {
    localStorage.setItem(STORAGE_KEYS.THEME, state.theme);
    localStorage.setItem(STORAGE_KEYS.LANG, 'tr');
    localStorage.setItem(STORAGE_KEYS.CURRENCY, 'TRY');
    localStorage.setItem(STORAGE_KEYS.PEOPLE, JSON.stringify(state.people));
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(state.expenses));
}

// ==========================================================================
// DİL DESTEK FONKSİYONLARI (I18N UTILITIES)
// ==========================================================================
function t(key) {
    const lang = state.lang || 'tr';
    if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
        return TRANSLATIONS[lang][key];
    }
    // Fallback Türkçe
    if (TRANSLATIONS['tr'] && TRANSLATIONS['tr'][key]) {
        return TRANSLATIONS['tr'][key];
    }
    return key;
}

function getCurrencySymbol(currency) {
    switch (currency) {
        case 'USD': return '$';
        case 'EUR': return '€';
        default: return '₺';
    }
}

function translatePage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        let translation = t(key);
        if (translation) {
            if (key === 'label_expense_amount') {
                const sym = getCurrencySymbol(state.currency);
                translation = `${translation} (${sym})`;
            }
            el.textContent = translation;
        }
    });

    // Sayfa başlığını da çevirelim
    const subtitle = state.lang === 'tr' ? 'Alman Usulü Harcama Takibi' : (state.lang === 'en' ? 'Group Expense Tracker' : 'Gruppenausgaben-Tracker');
    document.title = `Hesaplaştık | ${subtitle}`;
}

// Benzersiz ID Üretici
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// ==========================================================================
// 2. TOAST BİLDİRİM SİSTEMİ (PREMIUM UYARILAR)
// ==========================================================================
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = 'ℹ️';
    if (type === 'success') icon = '✅';
    if (type === 'error') icon = '❌';

    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
    `;

    container.appendChild(toast);

    // 3 saniye sonra DOM'dan kaldır
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// ==========================================================================
// 3. TEMA YÖNETİMİ (DARK/LIGHT MODE)
// ==========================================================================
const themeToggleBtn = document.getElementById('theme-toggle');
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');

function initTheme() {
    if (state.theme === 'light') {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        moonIcon.classList.add('hidden');
        sunIcon.classList.remove('hidden');
    } else {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        sunIcon.classList.add('hidden');
        moonIcon.classList.remove('hidden');
    }
}

themeToggleBtn.addEventListener('click', () => {
    if (state.theme === 'dark') {
        state.theme = 'light';
    } else {
        state.theme = 'dark';
    }
    initTheme();
    saveState();
});

// ==========================================================================
// 4. SPA ROTATOR & TAB BAR YÖNETİMİ
// ==========================================================================
const navTabs = document.querySelectorAll('.nav-tab');
const pageSections = document.querySelectorAll('.page-section');
const navIndicator = document.querySelector('.nav-indicator');

function switchPage(targetPageId) {
    pageSections.forEach(section => {
        if (section.id === targetPageId) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });

    navTabs.forEach(tab => {
        if (tab.getAttribute('data-target') === targetPageId) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    updateNavIndicator();
    
    // Mobil Harcama Ekle butonunun görünürlüğünü güncelle
    if (typeof mobileAddExpenseBtn !== 'undefined' && mobileAddExpenseBtn) {
        if (targetPageId === 'expenses-page') {
            mobileAddExpenseBtn.classList.remove('hidden');
        } else {
            mobileAddExpenseBtn.classList.add('hidden');
        }
    }
    
    // Özet sayfasına geçildiğinde hesaplamayı zorunlu olarak yenile
    if (targetPageId === 'summary-page') {
        calculateAndRenderSummary();
    }
}

function updateNavIndicator() {
    const activeTab = document.querySelector('.nav-tab.active');
    if (activeTab && navIndicator) {
        const leftOffset = activeTab.offsetLeft;
        const tabWidth = activeTab.offsetWidth;
        navIndicator.style.width = `${tabWidth - 16}px`;
        navIndicator.style.transform = `translateX(${leftOffset - 8}px)`;
    }
}

// Router Event Listeners
navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-target');
        switchPage(target);
    });
});

// Pencere boyutu değiştiğinde tab çizgisini hizala
window.addEventListener('resize', updateNavIndicator);

// ==========================================================================
// 5. KİŞİLER SAYFASI İŞLEMLERİ (SAYFA 1)
// ==========================================================================
const addPersonForm = document.getElementById('add-person-form');
const personNameInput = document.getElementById('person-name-input');
const peopleList = document.getElementById('people-list');
const peopleEmptyState = document.getElementById('people-empty-state');

// Kişi Düzenleme Modalı Elemanları
const personEditModal = document.getElementById('person-edit-modal');
const personEditForm = document.getElementById('person-edit-form');
const personEditIdInput = document.getElementById('person-edit-id-input');
const personEditNameInput = document.getElementById('person-edit-name-input');

function renderPeople() {
    peopleList.innerHTML = '';
    
    if (state.people.length === 0) {
        peopleEmptyState.classList.remove('hidden');
    } else {
        peopleEmptyState.classList.add('hidden');
        
        state.people.forEach(person => {
            const li = document.createElement('li');
            li.className = 'list-item';
            
            // İsmin ilk harfini avatar yap
            const initial = person.name.charAt(0).toUpperCase();
            
            li.innerHTML = `
                <div class="item-info">
                    <div class="item-avatar">${initial}</div>
                    <span class="item-name">${escapeHTML(person.name)}</span>
                </div>
                <div class="item-actions">
                    <button class="action-btn edit-btn" onclick="openEditPersonModal('${person.id}')" title="Düzenle">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                    </button>
                    <button class="action-btn delete-btn" onclick="deletePerson('${person.id}')" title="Sil">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                    </button>
                </div>
            `;
            peopleList.appendChild(li);
        });
    }
}

// Kişi Ekleme Formu Dinleyicisi
addPersonForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = personNameInput.value.trim();
    
    // Doğrulama (Hatalı Girişlerin Engellenmesi)
    if (!name) {
        showToast(t('toast_person_empty'), 'error');
        return;
    }
    
    // Aynı isimde kişi kontrolü (Case insensitive)
    const exists = state.people.some(p => p.name.toLowerCase() === name.toLowerCase());
    if (exists) {
        showToast(t('toast_person_exists'), 'error');
        return;
    }

    const newPerson = {
        id: generateId(),
        name: name
    };

    state.people.push(newPerson);
    saveState();
    renderPeople();
    
    personNameInput.value = '';
    personNameInput.blur(); // Input odağını kaldır
    
    showToast(`"${name}" ` + t('toast_person_added'), 'success');
});

// Kişi Silme
function deletePerson(id) {
    const person = state.people.find(p => p.id === id);
    if (!person) return;

    // Harcama Kontrolü: Bu kişi herhangi bir harcamaya dahil mi?
    const isPayer = state.expenses.some(exp => exp.payerId === id);
    const isBeneficiary = state.expenses.some(exp => exp.beneficiaryIds.includes(id));

    if (isPayer || isBeneficiary) {
        showToast(`"${person.name}" ` + t('toast_person_delete_error'), 'error');
        return;
    }

    if (confirm(t('toast_person_delete_confirm') + ` ("${person.name}")`)) {
        state.people = state.people.filter(p => p.id !== id);
        saveState();
        renderPeople();
        showToast(t('toast_person_deleted'), 'info');
    }
}

// Kişi Düzenleme Modalı Açılış
function openEditPersonModal(id) {
    const person = state.people.find(p => p.id === id);
    if (!person) return;

    personEditIdInput.value = person.id;
    personEditNameInput.value = person.name;
    
    personEditModal.classList.remove('hidden');
    personEditNameInput.focus();
}

// Kişi Düzenleme Formu Dinleyicisi
personEditForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = personEditIdInput.value;
    const newName = personEditNameInput.value.trim();

    if (!newName) {
        showToast(t('toast_person_edit_empty'), 'error');
        return;
    }

    // Başka birinin bu ismi kullanıp kullanmadığı kontrolü
    const exists = state.people.some(p => p.id !== id && p.name.toLowerCase() === newName.toLowerCase());
    if (exists) {
        showToast(t('toast_person_edit_exists'), 'error');
        return;
    }

    const person = state.people.find(p => p.id === id);
    if (person) {
        const oldName = person.name;
        person.name = newName;
        saveState();
        renderPeople();
        closeModal('person-edit-modal');
        showToast(`"${oldName}" ➜ "${newName}" ` + t('toast_person_updated'), 'success');
    }
});

// ==========================================================================
// 6. HARCAMALAR SAYFASI İŞLEMLERİ (SAYFA 2)
// ==========================================================================
const expenseModal = document.getElementById('expense-modal');
const expenseForm = document.getElementById('expense-form');
const expenseIdInput = document.getElementById('expense-id-input');
const expenseDescInput = document.getElementById('expense-desc-input');
const expenseAmountInput = document.getElementById('expense-amount-input');
const expensePayerSelect = document.getElementById('expense-payer-select');
const beneficiariesCheckboxes = document.getElementById('beneficiaries-checkboxes');
const beneficiariesError = document.getElementById('beneficiaries-error');
const expensesList = document.getElementById('expenses-list');
const expensesEmptyState = document.getElementById('expenses-empty-state');

// Modalları Açma / Kapatma Butonları
const openExpenseModalBtn = document.getElementById('open-expense-modal-btn');
const mobileAddExpenseBtn = document.getElementById('mobile-add-expense-btn');
const emptyStateAddExpenseBtn = document.getElementById('empty-state-add-expense-btn');
const selectAllBtn = document.getElementById('select-all-btn');
const selectNoneBtn = document.getElementById('select-none-btn');

function renderExpenses() {
    expensesList.innerHTML = '';
    
    if (state.expenses.length === 0) {
        expensesEmptyState.classList.remove('hidden');
    } else {
        expensesEmptyState.classList.add('hidden');
        
        state.expenses.forEach(exp => {
            const payer = state.people.find(p => p.id === exp.payerId);
            const payerName = payer ? payer.name : 'Silinmiş Kişi';
            
            // Yararlananların isim listesi
            const beneficiaryNames = exp.beneficiaryIds
                .map(bId => {
                    const p = state.people.find(person => person.id === bId);
                    return p ? p.name : null;
                })
                .filter(Boolean);

            const card = document.createElement('div');
            card.className = 'glass-card expense-card';
            
            // Kişi başı düşen pay hesabı
            const share = exp.amount / Math.max(1, exp.beneficiaryIds.length);

            card.innerHTML = `
                <div class="expense-card-header">
                    <div class="expense-title-group">
                        <h3>${escapeHTML(exp.description)}</h3>
                        <div class="expense-meta">
                            <span>${t('payer_label')}: <strong>${escapeHTML(payerName)}</strong></span>
                            <span>•</span>
                            <span>${exp.beneficiaryIds.length} ${t('person_count_suffix')}</span>
                        </div>
                    </div>
                    <div class="expense-amount">${formatCurrency(exp.amount)}</div>
                </div>
                
                <div class="expense-details-row">
                    <div>
                        <span class="detail-label">${t('per_person_share')}</span>
                        <span class="detail-val">${formatCurrency(share)}</span>
                    </div>
                </div>

                <div class="expense-beneficiaries-list">
                    ${beneficiaryNames.map(name => {
                        const isPayer = name === payerName;
                        return `<span class="badge ${isPayer ? 'payer-badge' : ''}">${escapeHTML(name)}</span>`;
                    }).join('')}
                </div>
                
                <div class="expense-card-footer">
                    <button class="action-btn edit-btn" onclick="openExpenseModal('${exp.id}')" title="${t('edit_action')}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                        <span style="font-size: 0.8rem; margin-left: 4px; font-weight:600;">${t('edit_action')}</span>
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteExpense('${exp.id}')" title="${t('delete_action')}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        <span style="font-size: 0.8rem; margin-left: 4px; font-weight:600;">${t('delete_action')}</span>
                    </button>
                </div>
            `;
            expensesList.appendChild(card);
        });
    }
}

// Harcama Ekleme/Düzenleme Modalı Hazırlığı (Seçim kutularını doldur)
function prepareExpenseModalFields() {
    // Ödeyen seçeneğini doldur
    expensePayerSelect.innerHTML = `<option value="" disabled selected data-i18n="select_payer_placeholder">${t('select_payer_placeholder')}</option>`;
    state.people.forEach(p => {
        const option = document.createElement('option');
        option.value = p.id;
        option.textContent = p.name;
        expensePayerSelect.appendChild(option);
    });

    // Yararlanan checkboxes doldur
    beneficiariesCheckboxes.innerHTML = '';
    state.people.forEach(p => {
        const label = document.createElement('label');
        label.className = 'checkbox-label';
        label.innerHTML = `
            <input type="checkbox" name="beneficiary" value="${p.id}" checked>
            <span class="custom-checkbox">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </span>
            <span>${escapeHTML(p.name)}</span>
        `;
        beneficiariesCheckboxes.appendChild(label);
    });
}

// Harcama Modalını Aç
function openExpenseModal(editId = null) {
    // Harcama eklemek için en az 2 kişi eklenmiş olmalı
    if (state.people.length < 2) {
        showToast(t('toast_expense_min_people'), 'error');
        switchPage('people-page');
        return;
    }

    prepareExpenseModalFields();
    beneficiariesError.classList.add('hidden');

    if (editId) {
        // Düzenleme Modu
        const exp = state.expenses.find(e => e.id === editId);
        if (!exp) return;

        document.getElementById('modal-title').textContent = t('modal_expense_edit_title');
        expenseIdInput.value = exp.id;
        expenseDescInput.value = exp.description;
        expenseAmountInput.value = exp.amount;
        expensePayerSelect.value = exp.payerId;

        // Checkboxları seçili yap
        const checkboxes = document.querySelectorAll('input[name="beneficiary"]');
        checkboxes.forEach(cb => {
            cb.checked = exp.beneficiaryIds.includes(cb.value);
        });
    } else {
        // Yeni Ekleme Modu
        document.getElementById('modal-title').textContent = t('modal_expense_new_title');
        expenseIdInput.value = '';
        expenseDescInput.value = '';
        expenseAmountInput.value = '';
        expensePayerSelect.selectedIndex = 0;
        
        // Varsayılan olarak herkesi yararlanan olarak seç
        const checkboxes = document.querySelectorAll('input[name="beneficiary"]');
        checkboxes.forEach(cb => cb.checked = true);
    }

    expenseModal.classList.remove('hidden');
    expenseDescInput.focus();
}

// Modal Kapatma Genel Fonksiyonu
function closeModal(modalId) {
    document.getElementById(modalId).classList.add('hidden');
}

// Event Listeners for Modal Trigger
openExpenseModalBtn.addEventListener('click', () => openExpenseModal());
mobileAddExpenseBtn.addEventListener('click', () => openExpenseModal());
emptyStateAddExpenseBtn.addEventListener('click', () => openExpenseModal());

// Kapatma düğmeleri dinleyicileri
document.querySelectorAll('.close-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal-backdrop');
        if (modal) modal.classList.add('hidden');
    });
});

// Arka plana tıklandığında modalı kapat
document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
            backdrop.classList.add('hidden');
        }
    });
});

// Hepsini Seç / Temizle butonları
selectAllBtn.addEventListener('click', () => {
    document.querySelectorAll('input[name="beneficiary"]').forEach(cb => cb.checked = true);
});
selectNoneBtn.addEventListener('click', () => {
    document.querySelectorAll('input[name="beneficiary"]').forEach(cb => cb.checked = false);
});

// Harcama Formu Kaydetme (Submit)
expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const id = expenseIdInput.value;
    const desc = expenseDescInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value);
    const payerId = expensePayerSelect.value;
    
    // Seçilen yararlananları bul
    const selectedCheckboxes = document.querySelectorAll('input[name="beneficiary"]:checked');
    const beneficiaryIds = Array.from(selectedCheckboxes).map(cb => cb.value);

    // Hatalı Girişlerin Engellenmesi (Validasyonlar)
    if (!desc) {
        showToast(t('toast_expense_desc_empty'), 'error');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        showToast(t('toast_expense_amount_error'), 'error');
        return;
    }
    if (!payerId) {
        showToast(t('toast_expense_payer_empty'), 'error');
        return;
    }
    if (beneficiaryIds.length === 0) {
        beneficiariesError.classList.remove('hidden');
        showToast(t('toast_expense_beneficiary_empty'), 'error');
        return;
    }

    if (id) {
        // Düzenleme Kaydet
        const expIndex = state.expenses.findIndex(e => e.id === id);
        if (expIndex > -1) {
            state.expenses[expIndex] = {
                id,
                description: desc,
                amount,
                payerId,
                beneficiaryIds
            };
            showToast(t('toast_expense_updated'), 'success');
        }
    } else {
        // Yeni Kaydet
        const newExpense = {
            id: generateId(),
            description: desc,
            amount,
            payerId,
            beneficiaryIds
        };
        state.expenses.push(newExpense);
        showToast(t('toast_expense_added'), 'success');
    }

    saveState();
    renderExpenses();
    closeModal('expense-modal');
});

// Harcama Sil
function deleteExpense(id) {
    if (confirm(t('toast_expense_delete_confirm'))) {
        state.expenses = state.expenses.filter(e => e.id !== id);
        saveState();
        renderExpenses();
        showToast(t('toast_expense_deleted'), 'info');
    }
}

// ==========================================================================
// 7. ÖZET SAYFASI VE BORÇ SADELEŞTİRME (SAYFA 3)
// ==========================================================================
const totalGroupExpenseEl = document.getElementById('total-group-expense');
const totalPeopleCountEl = document.getElementById('total-people-count');
const totalTransactionsCountEl = document.getElementById('total-transactions-count');
const balancesListEl = document.getElementById('balances-list');
const settlementsListEl = document.getElementById('settlements-list');
const copySummaryBtn = document.getElementById('copy-summary-btn');

function calculateAndRenderSummary() {
    // 1. İstatistikleri Güncelle
    const totalGroupSpending = state.expenses.reduce((sum, exp) => sum + exp.amount, 0);
    totalGroupExpenseEl.textContent = formatCurrency(totalGroupSpending);
    totalPeopleCountEl.textContent = state.people.length;

    // Eğer grup üye sayısı 2'den azsa hesap yapma
    if (state.people.length < 2) {
        balancesListEl.innerHTML = `
            <div class="empty-state" style="border: none; padding: 20px 0;">
                <p>${t('summary_min_people')}</p>
            </div>
        `;
        settlementsListEl.innerHTML = `
            <div class="empty-state" style="border: none; padding: 20px 0;">
                <p>${t('settlement_min_people')}</p>
            </div>
        `;
        totalTransactionsCountEl.textContent = '0';
        return;
    }

    // 2. Bakiye Hesaplamaları ve Sadeleştirme Algoritmasını Çalıştır
    const result = runSettleAlgorithm();

    // 3. Bakiye Listesini Render Et
    renderBalances(result.balances, result.paidAmounts, result.shareAmounts);

    // 4. Transfer Planını Render Et
    renderSettlements(result.transactions);
    totalTransactionsCountEl.textContent = result.transactions.length;

    // WhatsApp formatında paylaşım metnini butona ata
    setupShareButton(result.transactions);
}

/**
 * Borç Sadeleştirme Algoritması (Greedy Settlement Algorithm)
 */
function runSettleAlgorithm() {
    const balances = {};      // kişiId -> net bakiye (ödediği - payı)
    const paidAmounts = {};   // kişiId -> toplam yaptığı ödeme
    const shareAmounts = {};  // kişiId -> toplam harcama payı

    // Temiz başlangıç
    state.people.forEach(p => {
        balances[p.id] = 0;
        paidAmounts[p.id] = 0;
        shareAmounts[p.id] = 0;
    });

    // Harcamaları tek tek hesapla
    state.expenses.forEach(exp => {
        const amount = exp.amount;
        const payerId = exp.payerId;
        const beneficiaryIds = exp.beneficiaryIds;

        if (beneficiaryIds.length === 0) return;

        // Harcamadan yararlanan kişi başı pay
        const share = amount / beneficiaryIds.length;

        // Ödeyen kişinin alacağına ekle
        if (balances[payerId] !== undefined) {
            balances[payerId] += amount;
            paidAmounts[payerId] += amount;
        }

        // Yararlananların borcuna (payına) ekle
        beneficiaryIds.forEach(bId => {
            if (balances[bId] !== undefined) {
                balances[bId] -= share;
                shareAmounts[bId] += share;
            }
        });
    });

    // Borçlular ve alacaklılar listesini ayır
    const debtors = [];
    const creditors = [];

    state.people.forEach(person => {
        const net = balances[person.id];
        
        // Float hatalarını yuvarla
        const roundedNet = Math.round(net * 100) / 100;

        if (roundedNet < -0.01) {
            // Net negatif: Borçlu
            debtors.push({
                id: person.id,
                name: person.name,
                balance: roundedNet // Örn: -1500
            });
        } else if (roundedNet > 0.01) {
            // Net pozitif: Alacaklı
            creditors.push({
                id: person.id,
                name: person.name,
                balance: roundedNet // Örn: 2000
            });
        }
    });

    // Borçluları en çok borcu olandan en aza doğru sırala (artan sıra, e.g. -1500, -1000, -500)
    debtors.sort((a, b) => a.balance - b.balance);
    
    // Alacaklıları en çok alacağı olandan en aza sırala (azalan sıra, e.g. 2000, 1500, 500)
    creditors.sort((a, b) => b.balance - a.balance);

    const transactions = [];
    let dIdx = 0;
    let cIdx = 0;

    // Karşılıklı borç kapama döngüsü
    while (dIdx < debtors.length && cIdx < creditors.length) {
        const debtor = debtors[dIdx];
        const creditor = creditors[cIdx];

        const debtVal = Math.abs(debtor.balance);
        const creditVal = creditor.balance;

        // Transfer edilecek tutar ikisinden küçük olanıdır
        const transferAmount = Math.min(debtVal, creditVal);

        if (transferAmount > 0.01) {
            transactions.push({
                from: debtor.name,
                fromId: debtor.id,
                to: creditor.name,
                toId: creditor.id,
                amount: Math.round(transferAmount * 100) / 100
            });
        }

        // Bakiyeleri güncelle
        debtor.balance += transferAmount;
        creditor.balance -= transferAmount;

        // Borçlu tamamen ödendiyse sonraki borçluya geç
        if (Math.abs(debtor.balance) < 0.01) {
            dIdx++;
        }
        // Alacaklı tamamen kapandıysa sonraki alacaklıya geç
        if (Math.abs(creditor.balance) < 0.01) {
            cIdx++;
        }
    }

    return {
        balances,
        paidAmounts,
        shareAmounts,
        transactions
    };
}

// Bakiye Listesini Arayüze Çizme
function renderBalances(balances, paidAmounts, shareAmounts) {
    balancesListEl.innerHTML = '';
    
    state.people.forEach(p => {
        const net = balances[p.id] || 0;
        const paid = paidAmounts[p.id] || 0;
        const share = shareAmounts[p.id] || 0;

        const roundedNet = Math.round(net * 100) / 100;
        
        let statusClass = 'neutral';
        let statusText = t('status_settled');
        
        if (roundedNet > 0.01) {
            statusClass = 'creditor';
            statusText = `${t('status_creditor')}: +${formatCurrency(roundedNet)}`;
        } else if (roundedNet < -0.01) {
            statusClass = 'debtor';
            statusText = `${t('status_debtor')}: -${formatCurrency(Math.abs(roundedNet))}`;
        }

        const div = document.createElement('div');
        div.className = 'balance-row';
        div.innerHTML = `
            <div class="balance-user-info">
                <span>${escapeHTML(p.name)}</span>
                <span class="balance-badge ${statusClass}">${statusText}</span>
            </div>
            <div class="balance-user-details">
                <span>${t('label_paid')}: <span>${formatCurrency(paid)}</span></span>
                <span>${t('label_share')}: <span>${formatCurrency(share)}</span></span>
            </div>
        `;
        balancesListEl.appendChild(div);
    });
}

// Ödeme Planını Arayüze Çizme
function renderSettlements(transactions) {
    settlementsListEl.innerHTML = '';

    if (transactions.length === 0) {
        settlementsListEl.innerHTML = `
            <div class="empty-state" style="border: none; padding: 20px 0;">
                <div class="empty-icon" style="font-size: 2rem;">🎉</div>
                <h3>${t('no_debts_title')}</h3>
                <p>${t('no_debts_desc')}</p>
            </div>
        `;
        return;
    }

    transactions.forEach(t => {
        const div = document.createElement('div');
        div.className = 'settlement-item';
        div.innerHTML = `
            <div class="settlement-flow">
                <span class="settlement-person">${escapeHTML(t.from)}</span>
                <span class="settlement-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </span>
                <span class="settlement-person">${escapeHTML(t.to)}</span>
            </div>
            <span class="settlement-amount">${formatCurrency(t.amount)}</span>
        `;
        settlementsListEl.appendChild(div);
    });
}

// WhatsApp / Metin paylaşımını hazırlama
function setupShareButton(transactions) {
    // Eski listener'ları temizlemek için klonlama
    const newBtn = copySummaryBtn.cloneNode(true);
    copySummaryBtn.parentNode.replaceChild(newBtn, copySummaryBtn);

    newBtn.addEventListener('click', () => {
        if (transactions.length === 0) {
            showToast(t('toast_copy_no_debts'), 'info');
            return;
        }

        let shareText = `${t('share_title')}\n`;
        shareText += `───────────────────\n`;
        shareText += `💰 *${t('share_total_expense')}:* ${formatCurrency(state.expenses.reduce((s, e) => s + e.amount, 0))}\n\n`;
        shareText += `👉 *${t('share_plan_header')}*\n`;
        
        transactions.forEach((t, i) => {
            shareText += `${i + 1}. 🔴 *${t.from}*  ➜  🟢 *${t.to}*:  *${formatCurrency(t.amount)}*\n`;
        });
        
        shareText += `───────────────────\n`;
        shareText += `_${t('share_footer')}_ 📱`;

        navigator.clipboard.writeText(shareText)
            .then(() => {
                showToast(t('toast_copy_success'), 'success');
            })
            .catch(err => {
                console.error('Panoya yazma hatası:', err);
                showToast(t('toast_copy_error'), 'error');
            });
    });
}

// ==========================================================================
// 8. YARDIMCI YAZILIMSAL FONKSİYONLAR (UTIL FUNCTIONS)
// ==========================================================================

// Para Birimi Biçimlendirme (Dinamik)
function formatCurrency(value) {
    const currency = state.currency || 'TRY';
    let locale = 'tr-TR';
    if (currency === 'USD') locale = 'en-US';
    if (currency === 'EUR') locale = 'de-DE';
    
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}

// HTML XSS Koruması (Escape input)
function escapeHTML(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// ==========================================================================
// 9. DİL DEĞİŞTİRME & DÜĞME EŞLEŞTİRMELERİ (I18N DOM BINDINGS)
// ==========================================================================
// Dil ve Para Birimi butonları arayüzden kaldırıldığı için event listener'lar temizlendi.

// Aktif Dili Ayarlama ve Arayüzü Güncelleme
function setLanguage(lang) {
    if (!TRANSLATIONS[lang]) return;
    
    state.lang = lang;
    saveState();
    
    // Sayfadaki statik metinleri çevir
    translatePage();
    
    // Dinamik alanları yeniden çiz
    renderPeople();
    renderExpenses();
    calculateAndRenderSummary();
}

// Aktif Para Birimini Ayarlama ve Arayüzü Güncelleme
function setCurrency(currency) {
    state.currency = currency;
    saveState();
    
    // Sayfadaki statik metinleri (tutar etiketi vb.) çevir/güncelle
    translatePage();
    
    // Dinamik alanları yeniden çiz
    renderExpenses();
    calculateAndRenderSummary();
}

// ==========================================================================
// 10. UYGULAMA BAŞLANGIÇ ÇALIŞMASI (INIT)
// ==========================================================================
function initApp() {
    loadState();
    initTheme();
    
    // Dil ayarlarını başlat
    setLanguage(state.lang || 'tr');
    
    // Para birimi ayarlarını başlat
    setCurrency(state.currency || 'TRY');
    
    // Varsayılan olarak Kişiler sekmesini aç
    switchPage('people-page');
}

// DOM yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', initApp);
