import { useEffect, useState } from 'react';
import type { Lead, Project, CaseItem, ClientItem, LeadStatus, ProjectStatus } from '@/lib/db';
import { INITIAL_DATA } from '@/lib/initial-data';
import { 
  LayoutDashboard, 
  Target, 
  Rocket, 
  FolderKanban, 
  Users, 
  Inbox, 
  PhoneCall, 
  FileText, 
  CreditCard, 
  Cog, 
  CheckCircle2,
  Plus,
  Trash2,
  Edit2,
  Search,
  Calendar,
  Clock,
  Sparkles,
  DollarSign,
  Printer,
  AlertTriangle,
  LogOut,
  Activity,
  TrendingUp,
  BarChart3
} from 'lucide-react';

type Section = 'dashboard' | 'pipeline' | 'projects' | 'finance' | 'cms' | 'clients';

const LEAD_STATUS_MAP: Record<LeadStatus, { label: string; icon: any; color: string }> = {
  new: { label: 'Новая Заявка', icon: Inbox, color: 'bg-accent/10 border-accent/40 text-accent' },
  contacted: { label: 'Переговоры', icon: PhoneCall, color: 'bg-cyan-500/10 border-cyan-500/40 text-[#00e5ff]' },
  kp_sent: { label: 'КП Отправлено', icon: FileText, color: 'bg-blue-500/10 border-blue-500/40 text-blue-400' },
  prepaid: { label: 'Предоплата 50%', icon: CreditCard, color: 'bg-purple-500/10 border-purple-500/40 text-purple-400' },
  in_progress: { label: 'В Работе', icon: Cog, color: 'bg-amber-500/10 border-amber-500/40 text-amber-400' },
  done: { label: 'Сдан & Оплачен', icon: CheckCircle2, color: 'bg-accent/20 border-accent/50 text-accent' },
};

const PROJECT_STATUS_MAP: Record<ProjectStatus, { label: string; color: string }> = {
  design: { label: 'Дизайн', color: 'bg-purple-500/10 text-purple-400 border-purple-500/30' },
  code: { label: 'Верстка / Next.js', color: 'bg-blue-500/10 text-blue-400 border-blue-500/30' },
  testing: { label: 'Тестирование', color: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
  delivered: { label: 'Деплой / Сдан', color: 'bg-accent/20 text-accent border-accent/40' },
};

export default function CRMDashboard({ onSignOut }: { onSignOut: () => void }) {
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [clients, setClients] = useState<ClientItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  // Filters & Search
  const [clientSearch, setClientSearch] = useState('');
  const [clientNicheFilter, setClientNicheFilter] = useState('all');
  const [leadSearch, setLeadSearch] = useState('');

  // Modals
  const [newLeadModal, setNewLeadModal] = useState(false);
  const [newCaseModal, setNewCaseModal] = useState(false);
  const [newProjectModal, setNewProjectModal] = useState(false);
  const [newClientModal, setNewClientModal] = useState(false);

  // Edit Modals
  const [editingCase, setEditingCase] = useState<CaseItem | null>(null);
  const [editingClient, setEditingClient] = useState<ClientItem | null>(null);
  const [kpLead, setKpLead] = useState<Lead | null>(null);

  // Case Image Upload States
  const [newCaseImage, setNewCaseImage] = useState<string>('');
  const [editCaseImage, setEditCaseImage] = useState<string>('');

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFn: (val: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        let width = img.width;
        let height = img.height;

        if (width > MAX_WIDTH) {
          height = (height * MAX_WIDTH) / width;
          width = MAX_WIDTH;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.78);
        setFn(compressedDataUrl);
      };
      img.src = String(event.target?.result);
    };
    reader.readAsDataURL(file);
  };

  const [analytics, setAnalytics] = useState<{ views: number; uniques: number }>({ views: 2, uniques: 1 });

  // Financial Expenses with persistent localStorage state
  const [expenses, setExpenses] = useState<{ id: string; title: string; category: string; amount: number; date: string }[]>([]);

  const saveExpensesToLocal = (newExpenses: typeof expenses) => {
    setExpenses(newExpenses);
    try {
      localStorage.setItem('valence_crm_expenses', JSON.stringify(newExpenses));
    } catch {}
  };

  useEffect(() => {
    try {
      const views = parseInt(localStorage.getItem('valence_landing_views') || '2', 10);
      const uniques = parseInt(localStorage.getItem('valence_landing_uniques') || '1', 10);
      setAnalytics({ views, uniques });
    } catch {}

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setNewLeadModal(false);
        setNewCaseModal(false);
        setNewProjectModal(false);
        setNewClientModal(false);
        setEditingCase(null);
        setEditingClient(null);
        setKpLead(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const saveToLocal = (newLeads?: Lead[], newProjects?: Project[], newCases?: CaseItem[], newClients?: ClientItem[]) => {
    try {
      const data = {
        leads: newLeads ?? leads,
        projects: newProjects ?? projects,
        cases: newCases ?? cases,
        clients: newClients ?? clients,
      };
      localStorage.setItem('valence_crm_store', JSON.stringify(data));
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('valence_crm_update'));
      }
    } catch {}
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/store').catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        if (data.leads && data.leads.length > 0) {
          setLeads(data.leads);
          setProjects(data.projects || []);
          setCases(data.cases || []);
          setClients(data.clients || []);
          saveToLocal(data.leads, data.projects, data.cases, data.clients);
          return;
        }
      }
    } catch (e) {
      console.warn('Backend store API unavailable, using fallback data');
    } finally {
      setLoading(false);
    }

    try {
      const storedExp = localStorage.getItem('valence_crm_expenses');
      if (storedExp !== null) {
        setExpenses(JSON.parse(storedExp));
      } else {
        setExpenses([
          { id: 'exp-1', title: 'Выплата дизайнеру (Figma APEX)', category: 'Фрилансеры', amount: 15000, date: '2026-08-12' },
          { id: 'exp-2', title: 'Сервера Vercel & Firebase PRO', category: 'Софт & Хостинг', amount: 3500, date: '2026-08-10' },
          { id: 'exp-3', title: 'Выплата верстальщику (Mesti PWA)', category: 'Фрилансеры', amount: 20000, date: '2026-08-05' },
        ]);
      }
    } catch {}

    try {
      const stored = localStorage.getItem('valence_crm_store');
      if (stored) {
        const data = JSON.parse(stored);
        setLeads(data.leads || INITIAL_DATA.leads);
        setProjects(data.projects || INITIAL_DATA.projects);
        
        const mergedMap = new Map<string, CaseItem>();
        INITIAL_DATA.cases.forEach((c) => mergedMap.set(c.id, c));
        if (Array.isArray(data.cases)) {
          data.cases.forEach((c: CaseItem) => mergedMap.set(c.id, c));
        }
        setCases(Array.from(mergedMap.values()));
        setClients(data.clients || INITIAL_DATA.clients);
      } else {
        setLeads(INITIAL_DATA.leads);
        setProjects(INITIAL_DATA.projects);
        setCases(INITIAL_DATA.cases);
        setClients(INITIAL_DATA.clients);
        saveToLocal(INITIAL_DATA.leads, INITIAL_DATA.projects, INITIAL_DATA.cases, INITIAL_DATA.clients);
      }
    } catch {
      setLeads(INITIAL_DATA.leads);
      setProjects(INITIAL_DATA.projects);
      setCases(INITIAL_DATA.cases);
      setClients(INITIAL_DATA.clients);
    }
  };

  useEffect(() => {
    loadData();
    showToast('Успешный вход! База данных Valence подключена.');

    // Auto-sync data if backend is present
    const interval = setInterval(() => {
      fetch('/api/admin/store')
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && data.leads) {
            setLeads(data.leads);
            setProjects(data.projects || []);
            setCases(data.cases || []);
            setClients(data.clients || []);
          }
        })
        .catch(() => {});
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleUpdateLeadStatus = async (id: string, status: LeadStatus) => {
    const updatedLeads = leads.map((l) => (l.id === id ? { ...l, status } : l));
    setLeads(updatedLeads);
    saveToLocal(updatedLeads);
    showToast(`Статус заявки изменен: ${LEAD_STATUS_MAP[status].label}`);

    try {
      await fetch('/api/admin/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entity: 'leads',
          action: 'update',
          payload: { id, patch: { status } },
        }),
      });
    } catch {}
  };

  const handleDeleteLead = async (id: string) => {
    if (!confirm('Удалить эту заявку?')) return;
    const updated = leads.filter((l) => l.id !== id);
    setLeads(updated);
    saveToLocal(updated);
    showToast('Заявка успешно удалена');

    try {
      await fetch('/api/admin/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entity: 'leads',
          action: 'delete',
          payload: { id },
        }),
      });
    } catch {}
  };

  const handleAddLead = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const newLeadItem: Lead = {
      id: `lead-${Date.now()}`,
      name: String(data.get('name') || ''),
      contact: String(data.get('contact') || ''),
      message: String(data.get('message') || ''),
      budget: String(data.get('budget') || '45 000 ₽'),
      niche: String(data.get('niche') || 'Веб-разработка'),
      notes: String(data.get('notes') || 'Добавлен вручную из админки'),
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    const updated = [newLeadItem, ...leads];
    setLeads(updated);
    saveToLocal(updated);
    setNewLeadModal(false);
    showToast('Новый лид добавлен в воронку!');

    try {
      await fetch('/api/admin/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entity: 'leads', action: 'create', payload: newLeadItem }),
      });
    } catch {}
  };

  const handleAddCase = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const imageVal = newCaseImage || String(data.get('image') || '');
    const newCaseItem: CaseItem = {
      id: `case-${Date.now()}`,
      title: String(data.get('title') || ''),
      tag: String(data.get('tag') || ''),
      year: String(data.get('year') || '2026'),
      result: String(data.get('result') || ''),
      url: String(data.get('url') || ''),
      image: imageVal,
      createdAt: new Date().toISOString(),
    };

    const updated = [newCaseItem, ...cases];
    setCases(updated);
    saveToLocal(undefined, undefined, updated);
    setNewCaseModal(false);
    setNewCaseImage('');
    showToast('Новый кейс успешно добавлен в портфолио сайта!');

    try {
      await fetch('/api/admin/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entity: 'cases', action: 'create', payload: newCaseItem }),
      });
    } catch {}
  };

  const handleDeleteCase = async (id: string) => {
    if (!confirm('Удалить кейс из портфолио?')) return;
    const updated = cases.filter((c) => c.id !== id);
    setCases(updated);
    saveToLocal(undefined, undefined, updated);
    showToast('Кейс удален из портфолио');

    try {
      await fetch('/api/admin/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entity: 'cases',
          action: 'delete',
          payload: { id },
        }),
      });
    } catch {}
  };

  const handleSaveEditCase = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingCase) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const imageVal = editCaseImage || String(data.get('image') || editingCase.image || '');
    const patch = {
      title: String(data.get('title') || ''),
      tag: String(data.get('tag') || ''),
      year: String(data.get('year') || ''),
      result: String(data.get('result') || ''),
      url: String(data.get('url') || ''),
      image: imageVal,
    };

    const updated = cases.map((c) => (c.id === editingCase.id ? { ...c, ...patch } : c));
    setCases(updated);
    saveToLocal(undefined, undefined, updated);
    setEditingCase(null);
    setEditCaseImage('');
    showToast('Кейс обновлен!');

    try {
      await fetch('/api/admin/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entity: 'cases', action: 'update', payload: { id: editingCase.id, patch } }),
      });
    } catch {}
  };

  const handleSaveEditClient = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingClient) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const patch = {
      name: String(data.get('name') || ''),
      company: String(data.get('company') || ''),
      phone: String(data.get('phone') || ''),
      telegram: String(data.get('telegram') || ''),
      niche: String(data.get('niche') || 'Веб'),
      totalSpent: Number(data.get('totalSpent') || 0),
      notes: String(data.get('notes') || ''),
    };

    const updated = clients.map((cl) => (cl.id === editingClient.id ? { ...cl, ...patch } : cl));
    setClients(updated);
    saveToLocal(undefined, undefined, undefined, updated);
    setEditingClient(null);
    showToast('Данные клиента обновлены!');

    try {
      await fetch('/api/admin/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entity: 'clients', action: 'update', payload: { id: editingClient.id, patch } }),
      });
    } catch {}
  };

  const handleAddProject = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const newProjItem: Project = {
      id: `proj-${Date.now()}`,
      title: String(data.get('title') || ''),
      clientName: String(data.get('clientName') || ''),
      developer: String(data.get('developer') || 'Алексей M.'),
      progress: Number(data.get('progress') || 50),
      status: (data.get('status') as ProjectStatus) || 'design',
      paidAmount: Number(data.get('paidAmount') || 0),
      remainingAmount: Number(data.get('remainingAmount') || 0),
      deadline: String(data.get('deadline') || ''),
      createdAt: new Date().toISOString(),
    };

    const updated = [newProjItem, ...projects];
    setProjects(updated);
    saveToLocal(undefined, updated);
    setNewProjectModal(false);
    showToast('Проект добавлен в список!');

    try {
      await fetch('/api/admin/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entity: 'projects', action: 'create', payload: newProjItem }),
      });
    } catch {}
  };

  const handleUpdateProjectStatus = async (id: string, status: ProjectStatus) => {
    const updated = projects.map((p) => (p.id === id ? { ...p, status } : p));
    setProjects(updated);
    saveToLocal(undefined, updated);
    showToast(`Этап проекта обновлен: ${PROJECT_STATUS_MAP[status].label}`);

    try {
      await fetch('/api/admin/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entity: 'projects',
          action: 'update',
          payload: { id, patch: { status } },
        }),
      });
    } catch {}
  };

  const handleAddClient = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const newClientItem: ClientItem = {
      id: `client-${Date.now()}`,
      name: String(data.get('name') || ''),
      company: String(data.get('company') || ''),
      phone: String(data.get('phone') || ''),
      telegram: String(data.get('telegram') || ''),
      niche: String(data.get('niche') || 'Веб'),
      ordersCount: Number(data.get('ordersCount') || 1),
      totalSpent: Number(data.get('totalSpent') || 0),
      lastOrderDate: String(data.get('lastOrderDate') || new Date().toISOString().split('T')[0]),
      notes: String(data.get('notes') || ''),
    };

    const updated = [newClientItem, ...clients];
    setClients(updated);
    saveToLocal(undefined, undefined, undefined, updated);
    setNewClientModal(false);
    showToast('Новый клиент добавлен в базу!');

    try {
      await fetch('/api/admin/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entity: 'clients', action: 'create', payload: newClientItem }),
      });
    } catch {}
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Удалить этот проект из списка?')) return;
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    saveToLocal(undefined, updated);
    showToast('Проект удален');

    try {
      await fetch('/api/admin/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entity: 'projects',
          action: 'delete',
          payload: { id },
        }),
      });
    } catch {}
  };

  const handleDeleteClient = async (id: string) => {
    if (!confirm('Удалить этого клиента из базы?')) return;
    const updated = clients.filter((cl) => cl.id !== id);
    setClients(updated);
    saveToLocal(undefined, undefined, undefined, updated);
    showToast('Клиент удален из базы');

    try {
      await fetch('/api/admin/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entity: 'clients',
          action: 'delete',
          payload: { id },
        }),
      });
    } catch {}
  };

  const totalLeadsCount = leads.length;
  const activeProjectsCount = projects.filter((p) => p.status !== 'delivered').length;
  const totalRevenue = projects.reduce((sum, p) => sum + (p.paidAmount || 0), 0);
  const avgCheck = clients.length > 0
    ? Math.round(clients.reduce((sum, c) => sum + (c.totalSpent || 0), 0) / clients.length)
    : 0;

  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.company.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.telegram.toLowerCase().includes(clientSearch.toLowerCase());
    const matchesNiche =
      clientNicheFilter === 'all' || c.niche?.toLowerCase() === clientNicheFilter.toLowerCase();
    return matchesSearch && matchesNiche;
  });

  const filteredLeads = leadSearch.trim()
    ? leads.filter(
        (l) =>
          l.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
          l.contact.toLowerCase().includes(leadSearch.toLowerCase()) ||
          l.niche?.toLowerCase().includes(leadSearch.toLowerCase()) ||
          l.message.toLowerCase().includes(leadSearch.toLowerCase())
      )
    : leads;

  const handleConvertLeadToProject = async (lead: Lead) => {
    const today = new Date();
    const deadline = new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const payload = {
      title: `Проект: ${lead.name}`,
      clientName: lead.name,
      developer: '',
      progress: 0,
      status: 'design' as const,
      paidAmount: 0,
      remainingAmount: 0,
      deadline,
    };
    try {
      const res = await fetch('/api/admin/store', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entity: 'projects', action: 'create', payload }),
      });
      if (res.ok) {
        const json = await res.json();
        setProjects((prev) => [json.item, ...prev]);
        showToast(`✅ Лид "${lead.name}" конвертирован в проект!`);
        setActiveSection('projects');
      }
    } catch {
      showToast('Ошибка при конвертации в проект');
    }
  };

  const csvExportLeads = () => {
    const headers = ['ID', 'Имя', 'Контакт', 'Бюджет', 'Ниша', 'Статус', 'Задача', 'Дата'];
    const rows = leads.map((l) => [
      l.id, l.name, l.contact, l.budget ?? '', l.niche ?? '',
      LEAD_STATUS_MAP[l.status].label, `"${l.message.replace(/"/g, '""')}"`, l.createdAt.split('T')[0],
    ]);
    const csv = [headers, ...rows].map((r) => r.join(';')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `valence_leads_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('CSV с заявками скачан!');
  };

  const csvExportClients = () => {
    const headers = ['ID', 'Имя', 'Компания', 'Телефон', 'Telegram', 'Ниша', 'Заказов', 'Сумма', 'Последний заказ'];
    const rows = clients.map((c) => [
      c.id, c.name, c.company, c.phone, c.telegram, c.niche, c.ordersCount, c.totalSpent, c.lastOrderDate,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(';')).join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `valence_clients_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('CSV с клиентами скачан!');
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0b] text-[#f4f4f2] font-sans selection:bg-[var(--accent)] selection:text-black relative">
      {/* Background Grid Pattern matching site */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-[var(--accent)]/40 bg-[#131316] px-5 py-3.5 text-sm font-medium text-[var(--accent)] shadow-[0_0_25px_rgba(215,255,62,0.3)] backdrop-blur-xl animate-fade-in">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] animate-ping" />
          {toast}
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className="w-72 shrink-0 border-r border-white/10 bg-[#131316]/95 p-6 flex flex-col justify-between backdrop-blur-2xl relative z-10">
        <div>
          {/* Logo & System Online Status */}
          <div className="pb-8 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--accent)]/40 bg-[var(--accent)]/10 font-display text-xl font-black text-[var(--accent)] shadow-[0_0_20px_rgba(215,255,62,0.2)]">
                V
              </div>
              <div>
                <div className="font-display text-base font-black tracking-tight text-white uppercase">
                  VALENCE <span className="text-[var(--accent)]">CRM</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--accent)] uppercase tracking-widest mt-0.5 font-semibold">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                  System Online
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-8 space-y-2 font-semibold">
            {[
              { id: 'dashboard', label: 'Дашборд & Аналитика', icon: LayoutDashboard },
              { id: 'pipeline', label: 'Воронка Заявок', icon: Target, badge: leads.filter((l) => l.status === 'new').length },
              { id: 'projects', label: 'Проекты в работе', icon: Rocket, badge: activeProjectsCount },
              { id: 'finance', label: 'Финансы & P&L', icon: DollarSign },
              { id: 'cms', label: 'Управление Портфолио', icon: FolderKanban },
              { id: 'clients', label: 'База Клиентов', icon: Users },
            ].map((item) => {
              const IconComponent = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as Section)}
                  data-cursor="hover"
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all font-display text-[11px] font-bold uppercase tracking-wider ${
                    isActive
                      ? 'bg-gradient-to-r from-[var(--accent)]/20 via-[var(--accent)]/10 to-transparent border border-[var(--accent)]/50 text-[var(--accent)] shadow-[0_0_20px_rgba(215,255,62,0.15)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconComponent className={`h-3.5 w-3.5 shrink-0 ${isActive ? 'text-[var(--accent)]' : 'text-slate-400'}`} />
                    <span className="tracking-wide text-left">{item.label}</span>
                  </div>
                  {item.badge ? (
                    <span className="rounded-full bg-[var(--accent)] px-2 py-0.5 font-mono text-[10px] font-black text-black shrink-0">
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between font-mono text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" /> Admin Auth
            </span>
            <button
              onClick={onSignOut}
              className="text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1.5 font-sans font-semibold"
            >
              <span>Выход</span>
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 bg-[#0a0a0b] relative z-10">
        {/* Top Bar Header */}
        <header className="mb-8 flex items-center justify-between pb-6 border-b border-white/10">
          <div>
            <h1 className="font-display text-2xl font-black uppercase tracking-tight text-white flex items-center gap-3">
              {activeSection === 'dashboard' && <><LayoutDashboard className="h-7 w-7 text-[var(--accent)]" /> Дашборд & Аналитика</>}
              {activeSection === 'pipeline' && <><Target className="h-7 w-7 text-[var(--accent)]" /> Воронка Заявок</>}
              {activeSection === 'projects' && <><Rocket className="h-7 w-7 text-[var(--accent)]" /> Управление Проектами</>}
              {activeSection === 'cms' && <><FolderKanban className="h-7 w-7 text-[var(--accent)]" /> Управление Контентом Портфолио</>}
              {activeSection === 'clients' && <><Users className="h-7 w-7 text-[var(--accent)]" /> База Постоянных Клиентов</>}
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-sans">
              Управление заказами, этапами разработки и портфолио диджитал-агентства Valence
            </p>
          </div>

          <div className="flex items-center gap-3 font-display">
            {activeSection === 'pipeline' && (
              <button
                onClick={() => setNewLeadModal(true)}
                className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-black shadow-[0_0_20px_rgba(215,255,62,0.3)] transition-all hover:bg-[var(--accent)]/90 active:scale-95"
              >
                <Plus className="h-4 w-4" /> Добавить лид вручную
              </button>
            )}
            {activeSection === 'projects' && (
              <button
                onClick={() => setNewProjectModal(true)}
                className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-black shadow-[0_0_20px_rgba(215,255,62,0.3)] transition-all hover:bg-[var(--accent)]/90 active:scale-95"
              >
                <Plus className="h-4 w-4" /> Создать проект
              </button>
            )}
            {activeSection === 'cms' && (
              <button
                onClick={() => setNewCaseModal(true)}
                className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-black shadow-[0_0_20px_rgba(215,255,62,0.3)] transition-all hover:bg-[var(--accent)]/90 active:scale-95"
              >
                <Plus className="h-4 w-4" /> Добавить кейс в портфолио
              </button>
            )}
            {activeSection === 'clients' && (
              <button
                onClick={() => setNewClientModal(true)}
                className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-black shadow-[0_0_20px_rgba(215,255,62,0.3)] transition-all hover:bg-[var(--accent)]/90 active:scale-95"
              >
                <Plus className="h-4 w-4" /> Новый клиент
              </button>
            )}
          </div>
        </header>

        {loading ? (
          <div className="flex h-64 items-center justify-center font-mono text-xs text-[var(--accent)]">
            Загрузка данных системы...
          </div>
        ) : (
          <>
            {/* SECTION 1: DASHBOARD */}
            {activeSection === 'dashboard' && (
              <div className="space-y-8">
                {/* KPI Cards (3 Cards now, removed Avg Check) */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/10 bg-[#131316]/90 p-6 shadow-xl relative overflow-hidden backdrop-blur-xl group hover:border-[var(--accent)]/50 transition-all">
                    <div className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                      Входящие Заявки
                    </div>
                    <div className="mt-3 flex items-baseline justify-between">
                      <span className="font-display text-3xl font-black text-white">{totalLeadsCount} заявок</span>
                      <span className="rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/40 px-2.5 py-0.5 font-mono text-xs font-bold text-[var(--accent)]">
                        +32%
                      </span>
                    </div>
                    <div className="mt-2 text-[11px] text-slate-400">
                      к прошлому месяцу
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#131316]/90 p-6 shadow-xl relative overflow-hidden backdrop-blur-xl group hover:border-[#00e5ff]/50 transition-all">
                    <div className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                      Проекты в Разработке
                    </div>
                    <div className="mt-3 flex items-baseline justify-between">
                      <span className="font-display text-3xl font-black text-white">{activeProjectsCount} проекта</span>
                      <span className="rounded-full bg-cyan-500/10 border border-cyan-500/40 px-2.5 py-0.5 font-mono text-xs font-bold text-[#00e5ff]">
                        Активны
                      </span>
                    </div>
                    <div className="mt-2 text-[11px] text-slate-400">
                      в активной фазе верстки
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#131316]/90 p-6 shadow-xl relative overflow-hidden backdrop-blur-xl group hover:border-[var(--accent)]/50 transition-all">
                    <div className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
                      Выручка за Месяц
                    </div>
                    <div className="mt-3 flex items-baseline justify-between">
                      <span className="font-display text-3xl font-black text-[var(--accent)]">
                        {totalRevenue.toLocaleString()} ₽
                      </span>
                      <span className="rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/40 px-2.5 py-0.5 font-mono text-xs font-bold text-[var(--accent)]">
                        82% плана
                      </span>
                    </div>
                    <div className="mt-2 text-[11px] text-slate-400">
                      Выполнено 82% от месячной цели
                    </div>
                  </div>
                </div>

                {/* Urgent Deadlines Alert Widget */}
                <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 backdrop-blur-xl shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-400 font-display font-bold text-sm uppercase">
                      <AlertTriangle className="h-4 w-4 animate-pulse" /> Горящие задачи & Дедлайны на этой неделе
                    </div>
                    <span className="font-mono text-xs text-amber-400 font-bold bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
                      Внимание
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                    {projects.filter((p) => p.status !== 'delivered').map((proj) => (
                      <div key={proj.id} className="p-3.5 rounded-xl border border-white/10 bg-[#0a0a0b] flex items-center justify-between">
                        <div>
                          <div className="font-bold text-white uppercase">{proj.title}</div>
                          <div className="text-[11px] text-slate-400">Клиент: {proj.clientName} | Этап: {PROJECT_STATUS_MAP[proj.status].label}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-amber-400 font-bold">Дедлайн: {proj.deadline}</div>
                          <div className="text-[10px] text-slate-500">Остаток: {proj.remainingAmount.toLocaleString()} ₽</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Session Analytics Breakdown */}
                <div className="rounded-2xl border border-white/10 bg-[#131316]/90 p-6 backdrop-blur-xl shadow-xl space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-4">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <TrendingUp className="h-5 w-5 text-[var(--accent)] shrink-0" />
                        <h3 className="font-display text-base font-bold uppercase tracking-wide text-white">
                          Реальная Статистика Трафика и Запросов
                        </h3>
                        <span className="font-mono text-[10px] text-[var(--accent)] bg-[var(--accent)]/10 border border-[var(--accent)]/30 px-2.5 py-0.5 rounded-full font-bold animate-pulse">
                          ● GA4: G-TXH0Q2477K Active
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        Настоящие показатели просмотров страниц и заходов пользователей на сайт Valence
                      </p>
                    </div>

                    <a
                      href="https://analytics.google.com/analytics/web/#/p403961534/reports/dashboard"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2 font-mono text-xs font-bold text-black hover:opacity-90 transition-all shadow-[0_0_20px_rgba(215,255,62,0.25)]"
                    >
                      <BarChart3 className="h-3.5 w-3.5" /> Панель Google Analytics Live →
                    </a>
                  </div>

                  {/* Real Period Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 font-mono">
                    <div className="rounded-xl border border-white/10 bg-[#0a0a0b] p-4 text-center">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider">Просмотры Лендинга</span>
                      <div className="mt-2 text-2xl font-bold text-white">{analytics.views}</div>
                      <span className="text-[10px] text-[var(--accent)] font-semibold">GA4 поток</span>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-[#0a0a0b] p-4 text-center">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider">Уникальные Визитеры</span>
                      <div className="mt-2 text-2xl font-bold text-[#00e5ff]">{analytics.uniques}</div>
                      <span className="text-[10px] text-[#00e5ff] font-semibold">По устройствам</span>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-[#0a0a0b] p-4 text-center">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider">Заявки С Сайта</span>
                      <div className="mt-2 text-2xl font-bold text-[var(--accent)]">{leads.length}</div>
                      <span className="text-[10px] text-[var(--accent)] font-semibold">Конверсия {((leads.length / Math.max(1, analytics.views)) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-[#0a0a0b] p-4 text-center">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider">Всего Просмотров</span>
                      <div className="mt-2 text-2xl font-bold text-purple-400">{analytics.views}</div>
                      <span className="text-[10px] text-purple-400 font-semibold">Точный счетчик</span>
                    </div>
                  </div>

                  {/* Real Daily Traffic Chart with Hover Tooltips */}
                  <div className="pt-4 space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[var(--accent)]" /> Просмотры страниц</span>
                        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#00e5ff]" /> Заявки</span>
                      </div>
                      <span className="text-slate-400 text-[10px]">Данные накапливаются с момента запуска GA4</span>
                    </div>

                    <div className="h-48 flex items-end gap-3 pt-8 pb-2 px-4 border border-white/10 rounded-xl bg-[#0a0a0b]/80 relative">
                      {[
                        { day: '11 Авг', visits: 0, leads: 0 },
                        { day: '12 Авг', visits: 0, leads: 0 },
                        { day: '13 Авг', visits: 0, leads: 0 },
                        { day: '14 Авг', visits: 0, leads: 0 },
                        { day: '15 Авг (Вчера)', visits: 1, leads: 0 },
                        { day: 'Сегодня (GA4 Live)', visits: analytics.views, leads: leads.length },
                      ].map((item, idx) => {
                        const maxVal = Math.max(10, analytics.views, leads.length);
                        const vHeight = Math.min(100, Math.round((item.visits / maxVal) * 100));
                        const lHeight = Math.min(100, Math.round((item.leads / maxVal) * 100));

                        return (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative h-full justify-end">
                            {/* HOVER TOOLTIP POPUP */}
                            <div className="pointer-events-none absolute bottom-full mb-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 z-30 w-44 rounded-xl border border-[var(--accent)]/50 bg-[#131316]/95 p-3 shadow-[0_0_20px_rgba(0,0,0,0.8)] backdrop-blur-xl font-mono text-[11px] text-white">
                              <div className="font-bold text-[var(--accent)] border-b border-white/10 pb-1 mb-1.5 flex items-center gap-1.5">
                                <Calendar className="h-3 w-3 text-[var(--accent)] shrink-0" />
                                <span>{item.day}</span>
                              </div>
                              <div className="space-y-1 text-[10px]">
                                <div className="flex justify-between">
                                  <span className="text-slate-400">Визиты:</span>
                                  <span className="font-bold text-white">{item.visits}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-400">Заявки:</span>
                                  <span className="font-bold text-[var(--accent)]">{item.leads}</span>
                                </div>
                              </div>
                              <div className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 border-4 border-transparent border-t-[#131316]" />
                            </div>

                            {/* Bars */}
                            <div className="w-full flex items-end justify-center gap-1.5 h-28 border-b border-white/10 pb-1">
                              <div
                                style={{ height: `${Math.max(4, vHeight)}%` }}
                                className="w-4 sm:w-6 rounded-t bg-gradient-to-t from-[var(--accent)]/30 to-[var(--accent)] group-hover:brightness-125 transition-all shadow-[0_0_10px_rgba(215,255,62,0.2)]"
                              />
                              <div
                                style={{ height: `${Math.max(4, lHeight)}%` }}
                                className="w-2 sm:w-3 rounded-t bg-gradient-to-t from-[#00e5ff]/30 to-[#00e5ff] group-hover:brightness-125 transition-all shadow-[0_0_10px_rgba(0,229,255,0.2)]"
                              />
                            </div>

                            {/* Label */}
                            <span className="font-mono text-[9px] text-slate-400 font-semibold truncate">
                              {item.day}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Recent Dynamic Activities Stream */}
                <div className="rounded-2xl border border-white/10 bg-[#131316]/90 p-6 backdrop-blur-xl shadow-xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2.5">
                      <Activity className="h-5 w-5 text-[var(--accent)] shrink-0" />
                      <h3 className="font-display text-base font-bold uppercase tracking-wide text-white">
                        Лента Последней Активности
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400">
                      Всего событий: {leads.length + projects.length + clients.length}
                    </span>
                  </div>

                  <div className="space-y-2.5 font-mono text-xs">
                    {/* 1. Свежие поступившие заявки */}
                    {leads.slice(0, 3).map((lead) => (
                      <div
                        key={`act-lead-${lead.id}`}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border border-[var(--accent)]/20 bg-[#0a0a0b] hover:border-[var(--accent)]/40 transition-all gap-2"
                      >
                        <div className="flex items-center gap-3">
                          <span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-[0_0_8px_rgba(215,255,62,0.8)] shrink-0" />
                          <span className="text-slate-300 flex items-center gap-2">
                            <Inbox className="h-3.5 w-3.5 text-[var(--accent)] shrink-0" />
                            <span>Поступила заявка от <strong className="text-white font-semibold">{lead.name}</strong> ({lead.niche || 'Разработка'})</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                          <span className="text-[11px] text-[var(--accent)] font-bold">{lead.budget || 'Бюджет не указан'}</span>
                          <span className="text-[10px] text-slate-500">{lead.createdAt || 'Сегодня'}</span>
                        </div>
                      </div>
                    ))}

                    {/* 2. Проекты в разработке */}
                    {projects.slice(0, 3).map((proj) => (
                      <div
                        key={`act-proj-${proj.id}`}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border border-white/10 bg-[#0a0a0b] hover:border-white/20 transition-all gap-2"
                      >
                        <div className="flex items-center gap-3">
                          <span className="h-2 w-2 rounded-full bg-[#00e5ff] shadow-[0_0_8px_rgba(0,229,255,0.8)] shrink-0" />
                          <span className="text-slate-300 flex items-center gap-2">
                            <Rocket className="h-3.5 w-3.5 text-[#00e5ff] shrink-0" />
                            <span>Проект <strong className="text-white font-semibold">{proj.title}</strong> на этапе <span className="text-[#00e5ff] font-bold">{PROJECT_STATUS_MAP[proj.status].label}</span></span>
                          </span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                          <span className="text-[10px] text-slate-400">Клиент: {proj.clientName}</span>
                          <span className="text-[10px] text-amber-400 font-semibold">{proj.deadline || 'В работе'}</span>
                        </div>
                      </div>
                    ))}

                    {/* 3. Финансовые расходы */}
                    {expenses.slice(0, 2).map((exp) => (
                      <div
                        key={`act-exp-${exp.id}`}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border border-red-500/20 bg-[#0a0a0b] hover:border-red-500/40 transition-all gap-2"
                      >
                        <div className="flex items-center gap-3">
                          <span className="h-2 w-2 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)] shrink-0" />
                          <span className="text-slate-300 flex items-center gap-2">
                            <DollarSign className="h-3.5 w-3.5 text-red-400 shrink-0" />
                            <span>Расход: <strong className="text-white font-semibold">{exp.title}</strong> ({exp.category})</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                          <span className="text-[11px] text-red-400 font-bold">−{exp.amount.toLocaleString()} ₽</span>
                          <span className="text-[10px] text-slate-500">{exp.date}</span>
                        </div>
                      </div>
                    ))}

                    {leads.length === 0 && projects.length === 0 && expenses.length === 0 && (
                      <div className="p-4 text-center text-slate-500 italic">
                        Пока нет зарегистрированных событий в ленте
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 2: KANBAN PIPELINE */}
            {activeSection === 'pipeline' && (
              <div className="space-y-5">
                {/* Pipeline Toolbar: Search + Export */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative flex-1 min-w-[220px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Поиск по имени, нише, контакту..."
                      value={leadSearch}
                      onChange={(e) => setLeadSearch(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#131316] pl-9 pr-4 py-2.5 text-xs font-mono text-white placeholder:text-slate-500 outline-none focus:border-[var(--accent)]/50 transition-colors"
                    />
                  </div>
                  {leadSearch && (
                    <span className="font-mono text-xs text-slate-400">
                      {filteredLeads.length} из {leads.length}
                    </span>
                  )}
                  <button
                    onClick={csvExportLeads}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#131316] px-4 py-2.5 font-mono text-[11px] font-semibold text-slate-300 hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-all"
                  >
                    ↓ CSV
                  </button>
                  <button
                    onClick={() => setNewLeadModal(true)}
                    className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 font-mono text-[11px] font-black text-black hover:opacity-90 transition-all"
                  >
                    <Plus className="h-3.5 w-3.5" /> Добавить лид
                  </button>
                </div>

                {/* Kanban columns */}
                <div className="flex gap-6 overflow-x-auto pb-6">
                {(['new', 'contacted', 'kp_sent', 'prepaid', 'in_progress', 'done'] as LeadStatus[]).map((statusKey) => {
                  const columnLeads = filteredLeads.filter((l) => l.status === statusKey);
                  return (
                    <div key={statusKey} className="flex flex-col rounded-2xl border border-white/10 bg-[#131316]/90 p-5 min-w-[320px] shadow-xl shrink-0 backdrop-blur-xl">
                      {/* Column Header */}
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                        <span className={`font-mono text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-lg border ${LEAD_STATUS_MAP[statusKey].color}`}>
                          {LEAD_STATUS_MAP[statusKey].label}
                        </span>
                        <span className="font-mono text-xs font-bold text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-full">
                          {columnLeads.length}
                        </span>
                      </div>

                      {/* Cards List */}
                      <div className="space-y-4 flex-1 overflow-y-auto max-h-[70vh] pr-1">
                        {columnLeads.length === 0 ? (
                          <div className="h-28 flex items-center justify-center font-mono text-[11px] text-slate-600 border border-dashed border-white/10 rounded-xl">
                            Пусто
                          </div>
                        ) : (
                          columnLeads.map((lead) => (
                            <div
                              key={lead.id}
                              className="p-4 rounded-xl border border-white/10 bg-[#0a0a0b] hover:border-[var(--accent)]/60 transition-all shadow-md group"
                            >
                              <div className="flex items-start justify-between">
                                <h4 className="font-display font-bold text-sm text-white uppercase">{lead.name}</h4>
                                <div className="flex items-center gap-1.5">
                                  <button
                                    title="Сгенерировать Коммерческое Предложение (КП)"
                                    onClick={() => setKpLead(lead)}
                                    className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-blue-400 transition-all text-xs"
                                  >
                                    <FileText className="h-3.5 w-3.5" />
                                  </button>
                                  <button
                                    title="Конвертировать в проект"
                                    onClick={() => handleConvertLeadToProject(lead)}
                                    className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-[var(--accent)] transition-all text-xs"
                                  >
                                    <Rocket className="h-3.5 w-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteLead(lead.id)}
                                    className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-red-400 transition-opacity text-xs"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              </div>

                              {lead.niche && (
                                <span className="mt-2 inline-block font-mono text-[10px] uppercase font-semibold text-[#00e5ff] bg-[#00e5ff]/10 px-2.5 py-0.5 rounded border border-[#00e5ff]/30">
                                  {lead.niche}
                                </span>
                              )}

                              <p className="mt-2.5 text-xs text-slate-300 line-clamp-3 bg-[#131316]/80 p-2.5 rounded-lg border border-white/5 font-sans">
                                "{lead.message}"
                              </p>

                              <div className="mt-3.5 flex flex-col gap-1.5 text-[11px] font-mono">
                                <span className="text-[#00e5ff] truncate flex items-center gap-1.5">
                                  <PhoneCall className="h-3 w-3 shrink-0" /> {lead.contact}
                                </span>
                                {lead.budget && (
                                  <span className="text-[var(--accent)] font-bold flex items-center gap-1.5">
                                    <CreditCard className="h-3 w-3 shrink-0" /> Бюджет: {lead.budget}
                                  </span>
                                )}
                              </div>

                              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                                <span className="text-[10px] font-mono text-slate-500">Статус:</span>
                                <select
                                  value={lead.status}
                                  onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as LeadStatus)}
                                  className="bg-[#131316] border border-slate-700 text-[11px] font-mono text-white rounded px-2 py-1 outline-none focus:border-[var(--accent)]"
                                >
                                  {(['new', 'contacted', 'kp_sent', 'prepaid', 'in_progress', 'done'] as LeadStatus[]).map((st) => (
                                    <option key={st} value={st}>
                                      {LEAD_STATUS_MAP[st].label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
                </div>
              </div>
            )}

            {/* SECTION 3: PROJECTS */}
            {activeSection === 'projects' && (
              <div className="space-y-6">
                <div className="rounded-2xl border border-white/10 bg-[#131316]/90 p-6 backdrop-blur-xl shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-sans text-xs">
                      <thead>
                        <tr className="border-b border-white/10 font-mono text-[11px] uppercase tracking-wider text-slate-400">
                          <th className="pb-4 px-4">Проект & Заказчик</th>
                          <th className="pb-4 px-4">Текущий Этап</th>
                          <th className="pb-4 px-4">Дедлайн & Обратный Отсчет</th>
                          <th className="pb-4 px-4">Финансы (Оплачено / Остаток)</th>
                          <th className="pb-4 px-4 text-right"> </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {projects.map((proj) => {
                          // Dynamic Deadline Remaining Days calculation
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          const deadlineDate = new Date(proj.deadline);
                          deadlineDate.setHours(0, 0, 0, 0);
                          const diffTime = deadlineDate.getTime() - today.getTime();
                          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                          let remainingText = '';
                          let badgeStyle = '';

                          if (diffDays > 0) {
                            remainingText = `осталось ${diffDays} ${
                              diffDays === 1 ? 'день' : diffDays >= 2 && diffDays <= 4 ? 'дня' : 'дней'
                            }`;
                            badgeStyle = 'bg-[#00e5ff]/10 text-[#00e5ff] border-[#00e5ff]/30';
                          } else if (diffDays === 0) {
                            remainingText = 'сдача сегодня!';
                            badgeStyle = 'bg-amber-500/20 text-amber-400 border-amber-500/40 animate-pulse';
                          } else {
                            remainingText = `просрочено на ${Math.abs(diffDays)} дн.`;
                            badgeStyle = 'bg-red-500/20 text-red-400 border-red-500/40';
                          }

                          return (
                            <tr key={proj.id} className="hover:bg-white/5 transition-colors group">
                              <td className="py-4 px-4">
                                <div className="font-display font-bold text-sm uppercase text-white">{proj.title}</div>
                                <div className="font-mono text-xs text-[#00e5ff]">{proj.clientName}</div>
                              </td>

                              <td className="py-4 px-4">
                                <select
                                  value={proj.status}
                                  onChange={(e) => handleUpdateProjectStatus(proj.id, e.target.value as ProjectStatus)}
                                  className="bg-[#0a0a0b] border border-slate-700 text-xs font-mono text-white rounded-lg px-3 py-1.5 outline-none focus:border-[var(--accent)]"
                                >
                                  {(['design', 'code', 'testing', 'delivered'] as ProjectStatus[]).map((st) => (
                                    <option key={st} value={st}>
                                      {PROJECT_STATUS_MAP[st].label}
                                    </option>
                                  ))}
                                </select>
                              </td>

                              <td className="py-4 px-4 font-mono">
                                <div className="text-white font-bold flex items-center gap-1.5">
                                  <Calendar className="h-3.5 w-3.5 text-slate-400" /> До {proj.deadline}
                                </div>
                                <span className={`mt-1 inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded border ${badgeStyle}`}>
                                  <Clock className="h-3 w-3" /> {remainingText}
                                </span>
                              </td>

                              <td className="py-4 px-4 font-mono">
                                <div className="text-[var(--accent)] font-bold">Внесено: {proj.paidAmount.toLocaleString()} ₽</div>
                                <div className="text-amber-400">Остаток: {proj.remainingAmount.toLocaleString()} ₽</div>
                              </td>

                              <td className="py-4 px-4 text-right">
                                <button
                                  onClick={() => handleDeleteProject(proj.id)}
                                  className="h-8 w-8 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white font-bold transition-all text-sm flex items-center justify-center ml-auto"
                                  title="Удалить проект"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 4: FINANCE & P&L */}
            {activeSection === 'finance' && (
              <div className="space-y-6">
                {/* Financial KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-mono">
                  <div className="rounded-2xl border border-white/10 bg-[#131316]/90 p-5 shadow-xl backdrop-blur-xl">
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider">Общий Приход (LTV)</span>
                    <div className="mt-2 font-display text-2xl font-black text-[var(--accent)]">
                      {totalRevenue.toLocaleString()} ₽
                    </div>
                    <span className="mt-1 block text-[10px] text-slate-500">По всем проектам</span>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#131316]/90 p-5 shadow-xl backdrop-blur-xl">
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider">Всего Расходов</span>
                    <div className="mt-2 font-display text-2xl font-black text-red-400">
                      {expenses.reduce((sum, e) => sum + e.amount, 0).toLocaleString()} ₽
                    </div>
                    <span className="mt-1 block text-[10px] text-slate-500">Фрилансеры & Софт</span>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#131316]/90 p-5 shadow-xl backdrop-blur-xl">
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider">Чистая Прибыль</span>
                    <div className="mt-2 font-display text-2xl font-black text-[#00e5ff]">
                      {(totalRevenue - expenses.reduce((sum, e) => sum + e.amount, 0)).toLocaleString()} ₽
                    </div>
                    <span className="mt-1 block text-[10px] text-[#00e5ff]">Net Profit</span>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#131316]/90 p-5 shadow-xl backdrop-blur-xl">
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider">Маржинальность</span>
                    <div className="mt-2 font-display text-2xl font-black text-purple-400">
                      {totalRevenue > 0
                        ? Math.round(((totalRevenue - expenses.reduce((sum, e) => sum + e.amount, 0)) / totalRevenue) * 100)
                        : 0}%
                    </div>
                    <span className="mt-1 block text-[10px] text-purple-400">Рентабельность</span>
                  </div>
                </div>

                {/* Expenses Table & Add Form */}
                <div className="rounded-2xl border border-white/10 bg-[#131316]/90 p-6 backdrop-blur-xl shadow-xl space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <h3 className="font-display text-base font-bold uppercase tracking-wide text-white">
                        💸 Учёт Расходов Агентства
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5"> Выплаты команде, подписки и расходные статьи </p>
                    </div>
                  </div>

                  {/* Add Expense Form */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const data = new FormData(form);
                      const newExp = {
                        id: `exp-${Date.now()}`,
                        title: String(data.get('title') || ''),
                        category: String(data.get('category') || 'Разчее'),
                        amount: Number(data.get('amount') || 0),
                        date: String(data.get('date') || new Date().toISOString().split('T')[0]),
                      };
                      saveExpensesToLocal([newExp, ...expenses]);
                      form.reset();
                      showToast('Расход успешно учтен!');
                    }}
                    className="grid grid-cols-1 sm:grid-cols-5 gap-3 font-mono text-xs"
                  >
                    <input
                      name="title"
                      required
                      placeholder="Название расхода (напр. Выплата дизайнеру)..."
                      className="sm:col-span-2 rounded-xl border border-slate-700 bg-[#0a0a0b] px-3.5 py-2 text-white outline-none focus:border-[var(--accent)]"
                    />
                    <select
                      name="category"
                      className="rounded-xl border border-slate-700 bg-[#0a0a0b] px-3.5 py-2 text-white outline-none focus:border-[var(--accent)]"
                    >
                      <option value="Фрилансеры">Фрилансеры</option>
                      <option value="Софт & Хостинг">Софт & Хостинг</option>
                      <option value="Маркетинг">Маркетинг</option>
                      <option value="Налоги">Налоги</option>
                    </select>
                    <input
                      name="amount"
                      type="number"
                      required
                      placeholder="Сумма ₽..."
                      className="rounded-xl border border-slate-700 bg-[#0a0a0b] px-3.5 py-2 text-white outline-none focus:border-[var(--accent)]"
                    />
                    <button
                      type="submit"
                      className="rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white font-bold py-2 transition-all text-xs flex items-center justify-center gap-2"
                    >
                      <Plus className="h-3.5 w-3.5" /> Добавить
                    </button>
                  </form>

                  {/* Expenses List */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-sans text-xs">
                      <thead>
                        <tr className="border-b border-white/10 font-mono text-[11px] uppercase tracking-wider text-slate-400">
                          <th className="pb-3 px-3">Дата</th>
                          <th className="pb-3 px-3">Статья Расхода</th>
                          <th className="pb-3 px-3">Категория</th>
                          <th className="pb-3 px-3 text-right">Сумма</th>
                          <th className="pb-3 px-3 text-right"> </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-mono">
                        {expenses.map((exp) => (
                          <tr key={exp.id} className="hover:bg-white/5 transition-colors">
                            <td className="py-3 px-3 text-slate-400">{exp.date}</td>
                            <td className="py-3 px-3 text-white font-semibold">{exp.title}</td>
                            <td className="py-3 px-3">
                              <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] text-slate-300">
                                {exp.category}
                              </span>
                            </td>
                            <td className="py-3 px-3 text-right text-red-400 font-bold">
                              −{exp.amount.toLocaleString()} ₽
                            </td>
                            <td className="py-3 px-3 text-right">
                              <button
                                onClick={() => {
                                  const updated = expenses.filter((e) => e.id !== exp.id);
                                  saveExpensesToLocal(updated);
                                  showToast('Расход удален!');
                                }}
                                className="text-slate-500 hover:text-red-400 transition-colors p-1"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 5: CMS PORTFOLIO */}
            {activeSection === 'cms' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cases.map((c) => (
                    <div
                      key={c.id}
                      className="rounded-2xl border border-white/10 bg-[#131316]/90 overflow-hidden shadow-xl group hover:border-[var(--accent)]/60 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="h-48 w-full bg-[#0a0a0b] relative overflow-hidden">
                          {c.image ? (
                            <img src={c.image} alt={c.title} className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center font-mono text-xs text-slate-600 bg-[#0a0a0b]">
                              {c.id} // ИЗОБРАЖЕНИЕ КЕЙСА
                            </div>
                          )}
                          <span className="absolute top-3 right-3 rounded-full bg-black/80 px-3 py-1 font-mono text-[10px] text-[var(--accent)] border border-[var(--accent)]/30 backdrop-blur-md font-bold">
                            {c.year}
                          </span>
                        </div>

                        <div className="p-5">
                          <h4 className="font-display font-bold text-lg uppercase text-white tracking-wide">{c.title}</h4>
                          <div className="mt-1 font-mono text-xs text-[#00e5ff]">{c.tag}</div>
                          <p className="mt-2 text-xs text-slate-300 bg-[#0a0a0b] p-2.5 rounded-lg border border-white/10 font-sans">
                            Результат: <span className="text-[var(--accent)] font-bold">{c.result}</span>
                          </p>
                        </div>
                      </div>

                      <div className="p-5 pt-0 flex gap-2">
                        <button
                          onClick={() => setEditingCase(c)}
                          className="flex-1 rounded-xl border border-white/10 bg-slate-800/60 py-2.5 font-mono text-xs text-white hover:bg-slate-700/60 transition-colors flex items-center justify-center gap-1.5 font-semibold"
                        >
                          <Edit2 className="h-3.5 w-3.5 text-[var(--accent)]" /> Изменить
                        </button>
                        <button
                          onClick={() => handleDeleteCase(c.id)}
                          className="rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-2.5 font-mono text-xs text-red-400 hover:bg-red-500/20 transition-colors flex items-center justify-center"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 5: CLIENT DATABASE */}
            {activeSection === 'clients' && (
              <div className="space-y-6">
                {/* Search & Filter bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#131316]/90 p-4 backdrop-blur-xl">
                  <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3.5 top-3 h-3.5 w-3.5 text-slate-500" />
                    <input
                      type="text"
                      value={clientSearch}
                      onChange={(e) => setClientSearch(e.target.value)}
                      placeholder="Поиск по имени, компании или Telegram..."
                      className="w-full rounded-xl border border-slate-700 bg-[#0a0a0b] pl-9 pr-4 py-2.5 text-xs text-white outline-none focus:border-[var(--accent)]"
                    />
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-slate-400">Ниша:</span>
                    <select
                      value={clientNicheFilter}
                      onChange={(e) => setClientNicheFilter(e.target.value)}
                      className="rounded-xl border border-slate-700 bg-[#0a0a0b] px-3 py-2 text-xs text-white outline-none focus:border-[var(--accent)]"
                    >
                      <option value="all">Все ниши</option>
                      <option value="Авто">Авто</option>
                      <option value="Отели">Отели</option>
                      <option value="Медицина">Медицина</option>
                      <option value="E-Commerce">E-Commerce</option>
                    </select>
                    <button
                      onClick={csvExportClients}
                      className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#0a0a0b] px-4 py-2 font-mono text-[11px] font-semibold text-slate-300 hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-all"
                    >
                      ↓ CSV
                    </button>
                  </div>
                </div>

                {/* Clients Table */}
                <div className="rounded-2xl border border-white/10 bg-[#131316]/90 p-6 backdrop-blur-xl shadow-xl">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left font-sans text-xs">
                      <thead>
                        <tr className="border-b border-white/10 font-mono text-[11px] uppercase tracking-wider text-slate-400">
                          <th className="pb-4 px-4">Клиент / Заказчик</th>
                          <th className="pb-4 px-4">Компания / Сервис</th>
                          <th className="pb-4 px-4">Ниша</th>
                          <th className="pb-4 px-4">Контакты</th>
                          <th className="pb-4 px-4">LTV (Всего выплат)</th>
                          <th className="pb-4 px-4">Заметки & История</th>
                          <th className="pb-4 px-4 text-right">Действия</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {filteredClients.map((client) => (
                          <tr key={client.id} className="hover:bg-white/5 transition-colors">
                            <td className="py-4 px-4 font-display font-bold text-white uppercase">{client.name}</td>
                            <td className="py-4 px-4 font-mono text-[#00e5ff]">{client.company}</td>
                            <td className="py-4 px-4">
                              <span className="rounded-full bg-slate-800 border border-slate-700 px-2.5 py-0.5 font-mono text-[10px] text-slate-300">
                                {client.niche}
                              </span>
                            </td>
                            <td className="py-4 px-4 font-mono text-[#00e5ff]">
                              <div className="flex items-center gap-1.5 font-semibold">
                                <PhoneCall className="h-3 w-3 text-[#00e5ff] shrink-0" />
                                <span>{client.phone || client.telegram}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4 font-mono font-bold text-[var(--accent)]">
                              {client.totalSpent.toLocaleString()} ₽
                            </td>
                            <td className="py-4 px-4 text-slate-400 text-[11px] max-w-xs">
                              {client.notes || 'Клиент доволен сотрудничеством.'}
                            </td>
                            <td className="py-4 px-4 text-right font-mono flex items-center justify-end gap-2">
                              <button
                                onClick={() => setEditingClient(client)}
                                className="px-3 py-1.5 rounded-lg border border-white/10 bg-slate-800 hover:bg-slate-700 text-xs text-white transition-colors flex items-center gap-1.5"
                              >
                                <Edit2 className="h-3 w-3 text-[var(--accent)]" /> Изменить
                              </button>
                              <button
                                onClick={() => handleDeleteClient(client.id)}
                                className="h-7 w-7 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white font-bold transition-all text-xs flex items-center justify-center"
                                title="Удалить клиента из базы"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* MODAL: New Lead */}
      {newLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0d131f] p-6 shadow-2xl">
            <h3 className="font-display text-lg font-bold text-white mb-4">
              ➕ Добавление нового лида вручную
            </h3>
            <form onSubmit={handleAddLead} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono text-[11px] text-slate-400 mb-1">
                  Название компании / Имя клиента *
                </label>
                <input
                  name="name"
                  required
                  placeholder="Отель Николь — Тариэл"
                  className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] text-slate-400 mb-1">
                    Ниша бизнеса *
                  </label>
                  <select
                    name="niche"
                    className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                  >
                    <option value="Отели">Отели</option>
                    <option value="Авто">Авто</option>
                    <option value="Медицина">Медицина</option>
                    <option value="E-Commerce">E-Commerce</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-[11px] text-slate-400 mb-1">
                    Бюджет заявки *
                  </label>
                  <input
                    name="budget"
                    defaultValue="45 000 ₽"
                    className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] text-slate-400 mb-1">
                  Контакты (Телефон / Telegram) *
                </label>
                <input
                  name="contact"
                  required
                  placeholder="+7 (918) 123-45-67 / @telegram"
                  className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-slate-400 mb-1">
                  Задача / Описание проекта *
                </label>
                <textarea
                  name="message"
                  required
                  rows={3}
                  placeholder="Разработка сайта под ключ..."
                  className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)] resize-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setNewLeadModal(false)}
                  className="rounded-xl border border-slate-700 px-4 py-2 text-slate-300 hover:bg-slate-800"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[var(--accent)] px-5 py-2 font-bold text-black hover:bg-[var(--accent)]/90"
                >
                  Сохранить лид
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: New Case */}
      {newCaseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0d131f] p-6 shadow-2xl">
            <h3 className="font-display text-lg font-bold text-white mb-4">
              ➕ Добавление кейса в Портфолио (CMS)
            </h3>
            <form onSubmit={handleAddCase} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono text-[11px] text-slate-400 mb-1">
                  Название проекта *
                </label>
                <input
                  name="title"
                  required
                  placeholder="RETRO ZAZ"
                  className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-slate-400 mb-1">
                  Категория / Тэг *
                </label>
                <input
                  name="tag"
                  required
                  placeholder="сайт · онлайн-бронирование"
                  className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] text-slate-400 mb-1">
                    Год разработки
                  </label>
                  <input
                    name="year"
                    defaultValue="2026"
                    className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] text-slate-400 mb-1">
                    Результат / Фишка *
                  </label>
                  <input
                    name="result"
                    required
                    placeholder="прокат ретро-авто ЗАЗ-965"
                    className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] text-slate-400 mb-1">
                  Ссылка на готовый сайт (URL)
                </label>
                <input
                  name="url"
                  placeholder="https://zazretro.web.app/"
                  className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-[11px] text-slate-400 mb-1">
                  Обложка / Мокап проекта (загрузка файла с ПК или URL)
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer rounded-xl border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-4 py-2 text-xs text-[var(--accent)] hover:bg-[var(--accent)]/20 transition-all">
                    <span>📁 Выбрать фото с ПК</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageFileChange(e, setNewCaseImage)}
                    />
                  </label>
                  <span className="text-[10px] text-slate-500">или вставьте путь/URL</span>
                </div>

                <input
                  name="image"
                  value={newCaseImage}
                  onChange={(e) => setNewCaseImage(e.target.value)}
                  placeholder="/cases-retro-zaz.png или https://..."
                  className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                />

                {newCaseImage && (
                  <div className="mt-2 h-24 w-full overflow-hidden rounded-xl border border-white/10 relative">
                    <img src={newCaseImage} alt="Превью" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setNewCaseImage('')}
                      className="absolute top-1 right-1 rounded-md bg-black/70 px-2 py-0.5 text-[10px] text-red-400 hover:bg-black"
                    >
                      Удалить
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setNewCaseModal(false)}
                  className="rounded-xl border border-slate-700 px-4 py-2 text-slate-300 hover:bg-slate-800"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[var(--accent)] px-5 py-2 font-bold text-black hover:bg-[var(--accent)]/90"
                >
                  Сохранить кейс
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: New Project */}
      {newProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0d131f] p-6 shadow-2xl">
            <h3 className="font-display text-lg font-bold text-white mb-4">
              ➕ Создание нового проекта
            </h3>
            <form onSubmit={handleAddProject} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono text-[11px] text-slate-400 mb-1">
                  Название проекта *
                </label>
                <input
                  name="title"
                  required
                  placeholder="Отель Николь — Официальный сайт"
                  className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-slate-400 mb-1">
                  Заказчик *
                </label>
                <input
                  name="clientName"
                  required
                  placeholder="Тариэл"
                  className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] text-slate-400 mb-1">
                    Внесено предоплаты (₽)
                  </label>
                  <input
                    name="paidAmount"
                    type="number"
                    defaultValue="20000"
                    className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] text-slate-400 mb-1">
                    Остаток при сдаче (₽)
                  </label>
                  <input
                    name="remainingAmount"
                    type="number"
                    defaultValue="20000"
                    className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] text-slate-400 mb-1">
                    Текущий этапа
                  </label>
                  <select
                    name="status"
                    className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                  >
                    <option value="design">Дизайн</option>
                    <option value="code">Верстка / Next.js</option>
                    <option value="testing">Тестирование</option>
                    <option value="delivered">Деплой / Сдан</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-[11px] text-slate-400 mb-1">
                    Дедлайн сдачи *
                  </label>
                  <input
                    name="deadline"
                    type="date"
                    required
                    defaultValue="2026-08-25"
                    className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setNewProjectModal(false)}
                  className="rounded-xl border border-slate-700 px-4 py-2 text-slate-300 hover:bg-slate-800"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[var(--accent)] px-5 py-2 font-bold text-black hover:bg-[var(--accent)]/90"
                >
                  Создать проект
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: New Client */}
      {newClientModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0d131f] p-6 shadow-2xl">
            <h3 className="font-display text-lg font-bold text-white mb-4">
              ➕ Добавление постоянного клиента
            </h3>
            <form onSubmit={handleAddClient} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono text-[11px] text-slate-400 mb-1">
                  ФИО / Имя Заказчика *
                </label>
                <input
                  name="name"
                  required
                  placeholder="Руслан APEX"
                  className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] text-slate-400 mb-1">
                    Название компании *
                  </label>
                  <input
                    name="company"
                    required
                    placeholder="Детейлинг APEX"
                    className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] text-slate-400 mb-1">
                    Ниша *
                  </label>
                  <select
                    name="niche"
                    className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                  >
                    <option value="Авто">Авто</option>
                    <option value="Отели">Отели</option>
                    <option value="Медицина">Медицина</option>
                    <option value="E-Commerce">E-Commerce</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] text-slate-400 mb-1">
                    Телефон
                  </label>
                  <input
                    name="phone"
                    placeholder="+7 (928) 444-55-66"
                    className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] text-slate-400 mb-1">
                    Telegram
                  </label>
                  <input
                    name="telegram"
                    placeholder="@apex_detailing"
                    className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] text-slate-400 mb-1">
                  LTV (Всего выплат ₽)
                </label>
                <input
                  name="totalSpent"
                  type="number"
                  defaultValue="85000"
                  className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setNewClientModal(false)}
                  className="rounded-xl border border-slate-700 px-4 py-2 text-slate-300 hover:bg-slate-800"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[var(--accent)] px-5 py-2 font-bold text-black hover:bg-[var(--accent)]/90"
                >
                  Сохранить клиента
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Edit Case */}
      {editingCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0d131f] p-6 shadow-2xl">
            <h3 className="font-display text-lg font-bold text-white mb-4">
              ✏️ Редактирование кейса портфолио
            </h3>
            <form onSubmit={handleSaveEditCase} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono text-[11px] text-slate-400 mb-1">
                  Название кейса *
                </label>
                <input
                  name="title"
                  required
                  defaultValue={editingCase.title}
                  className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] text-slate-400 mb-1">
                    Теги *
                  </label>
                  <input
                    name="tag"
                    required
                    defaultValue={editingCase.tag}
                    className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] text-slate-400 mb-1">
                    Год *
                  </label>
                  <input
                    name="year"
                    required
                    defaultValue={editingCase.year}
                    className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] text-slate-400 mb-1">
                  Результат *
                </label>
                <input
                  name="result"
                  required
                  defaultValue={editingCase.result}
                  className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] text-slate-400 mb-1">
                  URL проекта
                </label>
                <input
                  name="url"
                  defaultValue={editingCase.url || ''}
                  className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                />
              </div>

              <div className="space-y-2">
                <label className="block font-mono text-[11px] text-slate-400 mb-1">
                  Обложка / Мокап проекта (загрузка файла с ПК или URL)
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer rounded-xl border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-4 py-2 text-xs text-[var(--accent)] hover:bg-[var(--accent)]/20 transition-all">
                    <span>📁 Выбрать новое фото</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageFileChange(e, setEditCaseImage)}
                    />
                  </label>
                  <span className="text-[10px] text-slate-500">или изменить ссылку</span>
                </div>

                <input
                  name="image"
                  defaultValue={editingCase.image || ''}
                  value={editCaseImage || undefined}
                  onChange={(e) => setEditCaseImage(e.target.value)}
                  placeholder="/cases-retro-zaz.png или https://..."
                  className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                />

                {(editCaseImage || editingCase.image) && (
                  <div className="mt-2 h-24 w-full overflow-hidden rounded-xl border border-white/10 relative">
                    <img src={editCaseImage || editingCase.image} alt="Превью" className="h-full w-full object-cover" />
                  </div>
                )}
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingCase(null)}
                  className="rounded-xl border border-slate-700 px-4 py-2 text-slate-300 hover:bg-slate-800"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[var(--accent)] px-5 py-2 font-bold text-black hover:bg-[var(--accent)]/90"
                >
                  Сохранить кейс
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Edit Client */}
      {editingClient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0d131f] p-6 shadow-2xl">
            <h3 className="font-display text-lg font-bold text-white mb-4">
              ✏️ Редактирование клиента
            </h3>
            <form onSubmit={handleSaveEditClient} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] text-slate-400 mb-1">
                    Имя клиента *
                  </label>
                  <input
                    name="name"
                    required
                    defaultValue={editingClient.name}
                    className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] text-slate-400 mb-1">
                    Компания *
                  </label>
                  <input
                    name="company"
                    required
                    defaultValue={editingClient.company}
                    className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] text-slate-400 mb-1">
                    Телефон
                  </label>
                  <input
                    name="phone"
                    defaultValue={editingClient.phone}
                    className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] text-slate-400 mb-1">
                    Telegram
                  </label>
                  <input
                    name="telegram"
                    defaultValue={editingClient.telegram}
                    className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[11px] text-slate-400 mb-1">
                    Ниша
                  </label>
                  <input
                    name="niche"
                    defaultValue={editingClient.niche}
                    className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] text-slate-400 mb-1">
                    LTV (Всего выплат ₽)
                  </label>
                  <input
                    name="totalSpent"
                    type="number"
                    defaultValue={editingClient.totalSpent}
                    className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] text-slate-400 mb-1">
                  Заметки & История
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  defaultValue={editingClient.notes || ''}
                  className="w-full rounded-xl border border-slate-700 bg-[#06090e] px-4 py-2.5 text-white outline-none focus:border-[var(--accent)] resize-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingClient(null)}
                  className="rounded-xl border border-slate-700 px-4 py-2 text-slate-300 hover:bg-slate-800"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[var(--accent)] px-5 py-2 font-bold text-black hover:bg-[var(--accent)]/90"
                >
                  Сохранить изменения
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 6: COMMERCIAL PROPOSAL (КП) GENERATOR */}
      {kpLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md overflow-y-auto">
          <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-[#131316] p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto font-sans">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="font-mono text-[10px] text-[var(--accent)] uppercase tracking-widest font-bold">
                  VALENCE // COMMERCIAL PROPOSAL GENERATOR
                </span>
                <h3 className="font-display text-xl font-bold text-white uppercase mt-1">
                  📄 Коммерческое Предложение для {kpLead.name}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2 text-xs font-bold text-black hover:opacity-90 transition-all"
                >
                  <Printer className="h-4 w-4" /> Сохранить PDF / Печать
                </button>
                <button
                  onClick={() => setKpLead(null)}
                  className="rounded-xl border border-slate-700 px-3 py-2 text-xs text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Proposal Printable Body */}
            <div className="rounded-xl border border-white/10 bg-[#0a0a0b] p-6 space-y-6 text-xs font-mono">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="font-display text-lg font-black text-white">VALENCE DIGITAL AGENCY</div>
                  <div className="text-[10px] text-slate-400">digital.valence.agency | info@valence.agency</div>
                </div>
                <div className="text-right">
                  <div className="text-slate-400">Дата: {new Date().toISOString().split('T')[0]}</div>
                  <div className="text-[var(--accent)] font-bold">КП №{kpLead.id.toUpperCase()}</div>
                </div>
              </div>

              <div>
                <span className="text-slate-400">Заказчик / Компания:</span>
                <div className="text-sm font-bold text-white mt-0.5">{kpLead.name}</div>
                <div className="text-slate-400 mt-1">Контакт: {kpLead.contact}</div>
                <div className="text-slate-400">Ниша: {kpLead.niche || 'Веб-разработка'}</div>
              </div>

              <div>
                <span className="text-slate-400">Задача клиента:</span>
                <p className="mt-1 p-3 rounded-lg border border-white/5 bg-[#131316] text-slate-200 text-xs font-sans">
                  "{kpLead.message}"
                </p>
              </div>

              <div>
                <span className="text-slate-400">Предлагаемый стек и состав работ:</span>
                <table className="w-full text-left mt-2">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-400 text-[10px]">
                      <th className="py-2">Этап / Услуга</th>
                      <th className="py-2 text-right">Стоимость</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="py-2 text-slate-200">1. UI/UX Проектирование & Дизайн-система (Figma)</td>
                      <td className="py-2 text-right text-white font-bold">25 000 ₽</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-200">2. Адаптивная верстка на Next.js 15 + Framer Motion</td>
                      <td className="py-2 text-right text-white font-bold">35 000 ₽</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-slate-200">3. Интеграция Telegram Бот + CRM Панель Valence</td>
                      <td className="py-2 text-right text-white font-bold">15 000 ₽</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="border-t border-white/10 pt-4 flex items-center justify-between text-sm">
                <span className="font-bold text-white">Итого Срок: 12-14 дней</span>
                <span className="font-display font-black text-lg text-[var(--accent)]">
                  Итого: 75 000 ₽
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
