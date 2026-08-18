import fs from 'fs';
import path from 'path';
import Database from 'better-sqlite3';

export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'kp_sent'
  | 'prepaid'
  | 'in_progress'
  | 'done';

export type Lead = {
  id: string;
  name: string;
  contact: string;
  message: string;
  budget?: string | null;
  niche?: string;
  notes?: string;
  status: LeadStatus;
  createdAt: string;
};

export type ProjectStatus = 'design' | 'code' | 'testing' | 'delivered';

export type Project = {
  id: string;
  title: string;
  clientName: string;
  developer?: string;
  progress: number;
  status: ProjectStatus;
  paidAmount: number;
  remainingAmount: number;
  deadline: string;
  createdAt: string;
};

export type CaseItem = {
  id: string;
  title: string;
  tag: string;
  year: string;
  result: string;
  url?: string;
  image?: string;
  createdAt: string;
};

export type ClientItem = {
  id: string;
  name: string;
  company: string;
  phone: string;
  telegram: string;
  niche: string;
  ordersCount: number;
  totalSpent: number;
  lastOrderDate: string;
  notes?: string;
};

type DbSchema = {
  leads: Lead[];
  projects: Project[];
  cases: CaseItem[];
  clients: ClientItem[];
};

const DB_DIR = path.join(process.cwd(), 'data');
const SQLITE_PATH = path.join(DB_DIR, 'sqlite.db');
const JSON_STORE_PATH = path.join(DB_DIR, 'store.json');

export const INITIAL_DATA: DbSchema = {
  leads: [
    {
      id: 'lead-1',
      name: 'Автоателье APEX — Руслан',
      contact: '+7 (928) 444-55-66 / @apex_detailing',
      message: 'Нужен премиальный сайт детейлинг-центра с калькулятором оклейки и рендером.',
      budget: '45 000 ₽',
      niche: 'Авто',
      notes: 'Новая заявка через форму сайта Valence.',
      status: 'new',
      createdAt: new Date(Date.now() - 1 * 3600000).toISOString(),
    },
    {
      id: 'lead-2',
      name: 'Отель Николь — Тариэл',
      contact: '+7 (918) 123-45-67 / @nikol_hotel',
      message: 'Разработка официального сайта гостевого комплекса с бронированием номеров.',
      budget: '60 000 ₽',
      niche: 'Отели',
      notes: 'Созвонились, обсудили структуру и дизайн-систему.',
      status: 'contacted',
      createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    },
    {
      id: 'lead-3',
      name: 'Стоматология Prime — Игорь',
      contact: 'info@prime-clinic.ru / +7 (861) 900-11-22',
      message: 'Онлайн запись пациентов и личный кабинет для сети клиник.',
      budget: '90 000 ₽',
      niche: 'Медицина',
      notes: 'Отправили коммерческое предложение, ждем подписания договора.',
      status: 'kp_sent',
      createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    },
    {
      id: 'lead-4',
      name: 'MestiDelivery — Каха',
      contact: '+995 599 11-22-33 / @mesti_admin',
      message: 'PWA сервис доставки еды по всей Грузии.',
      budget: '50 000 ₽',
      niche: 'E-Commerce',
      notes: 'Получена предоплата 50%, заходим в стадию Next.js кода.',
      status: 'prepaid',
      createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    },
    {
      id: 'lead-5',
      name: 'Ретро Драйв — ЗАЗ 965',
      contact: '@zaz_retro / +7 (999) 777-88-99',
      message: 'Сервис онлайн бронирования ретро автомобилей.',
      budget: '40 000 ₽',
      niche: 'Авто',
      notes: 'Сайт в процессе верстки и тестирования.',
      status: 'in_progress',
      createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    },
    {
      id: 'lead-6',
      name: 'Black Coffee Co.',
      contact: 'contact@blackcoffee.store',
      message: 'Сайт онлайн заказов и меню для сети кофеен.',
      budget: '35 000 ₽',
      niche: 'E-Commerce',
      notes: 'Проект сдан, финальная оплата поступила.',
      status: 'done',
      createdAt: new Date(Date.now() - 12 * 86400000).toISOString(),
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Детейлинг APEX — Промо Сайт',
      clientName: 'Руслан (APEX)',
      progress: 35,
      status: 'design',
      paidAmount: 22500,
      remainingAmount: 22500,
      deadline: '2026-08-25',
      createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    },
    {
      id: 'proj-2',
      title: 'Гостевой Комплекс Николь',
      clientName: 'Тариэл (Отель Николь)',
      progress: 65,
      status: 'code',
      paidAmount: 30000,
      remainingAmount: 30000,
      deadline: '2026-08-28',
      createdAt: new Date(Date.now() - 8 * 86400000).toISOString(),
    },
    {
      id: 'proj-3',
      title: 'MestiDelivery Georgia PWA',
      clientName: 'Mesti Group',
      progress: 88,
      status: 'testing',
      paidAmount: 25000,
      remainingAmount: 25000,
      deadline: '2026-08-20',
      createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
    },
    {
      id: 'proj-4',
      title: 'Prime Clinic — Система Записи',
      clientName: 'Игорь (Prime)',
      progress: 100,
      status: 'delivered',
      paidAmount: 90000,
      remainingAmount: 0,
      deadline: '2026-08-18',
      createdAt: new Date(Date.now() - 25 * 86400000).toISOString(),
    },
  ],
  cases: [
    {
      id: '01',
      title: 'RETRO ZAZ',
      tag: 'сайт · онлайн-бронирование',
      year: '2026',
      result: 'прокат ретро-авто ЗАЗ-965',
      url: 'https://zazretro.web.app/',
      image: '/cases-retro-zaz.png',
      createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    },
    {
      id: '02',
      title: 'MestiDelivery',
      tag: 'PWA · сервис доставки еды',
      year: '2026',
      result: 'быстрая доставка в Грузии',
      url: 'https://mestidelivery.com/',
      image: '/cases-mesti-delivery.png',
      createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
    },
    {
      id: 'case-villa-palma',
      title: 'Villa Palma Suite 4★',
      tag: 'бутик-отель · сочи / адлер',
      year: '2026',
      result: 'официальный сайт 4★',
      url: 'https://palmasochihotel.web.app/',
      createdAt: new Date().toISOString(),
    },
  ],
  clients: [
    {
      id: 'client-1',
      name: 'Руслан APEX',
      company: 'Детейлинг APEX',
      phone: '+7 (928) 444-55-66',
      telegram: '@apex_detailing',
      niche: 'Авто',
      ordersCount: 2,
      totalSpent: 85000,
      lastOrderDate: '2026-08-10',
      notes: 'Постоянный клиент. Планирует заказать интеграцию телеграм-бота.',
    },
    {
      id: 'client-2',
      name: 'Тариэл',
      company: 'Гостевой Комплекс Николь',
      phone: '+7 (918) 123-45-67',
      telegram: '@nikol_hotel',
      niche: 'Отели',
      ordersCount: 1,
      totalSpent: 60000,
      lastOrderDate: '2026-08-05',
      notes: 'Заказан модуль бронирования и интеграция с календарем.',
    },
    {
      id: 'client-3',
      name: 'Георгий Кахидзе',
      company: 'MestiDelivery Georgia',
      phone: '+995 599 12-34-56',
      telegram: '@george_mesti',
      niche: 'E-Commerce',
      ordersCount: 3,
      totalSpent: 220000,
      lastOrderDate: '2026-07-28',
      notes: 'Заказывали PWA сайт + приложение доставки.',
    },
    {
      id: 'client-4',
      name: 'Игорь Васильев',
      company: 'Стоматология Prime',
      phone: '+7 (861) 900-11-22',
      telegram: '@prime_clinic',
      niche: 'Медицина',
      ordersCount: 2,
      totalSpent: 180000,
      lastOrderDate: '2026-06-15',
      notes: 'Заказывал сайт и систему записи пациентов.',
    },
  ],
};

let dbInstance: InstanceType<typeof Database> | null = null;

function getSqliteDb() {
  if (dbInstance) return dbInstance;

  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }

  const db = new Database(SQLITE_PATH);
  db.pragma('journal_mode = WAL');

  // Create tables if they do not exist
  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      contact TEXT NOT NULL,
      message TEXT NOT NULL,
      budget TEXT,
      niche TEXT,
      notes TEXT,
      status TEXT NOT NULL,
      createdAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      clientName TEXT NOT NULL,
      developer TEXT,
      progress INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL,
      paidAmount INTEGER NOT NULL DEFAULT 0,
      remainingAmount INTEGER NOT NULL DEFAULT 0,
      deadline TEXT NOT NULL,
      createdAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS cases (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      tag TEXT NOT NULL,
      year TEXT NOT NULL,
      result TEXT NOT NULL,
      url TEXT,
      image TEXT,
      createdAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS clients (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      company TEXT NOT NULL,
      phone TEXT NOT NULL,
      telegram TEXT NOT NULL,
      niche TEXT NOT NULL,
      ordersCount INTEGER NOT NULL DEFAULT 1,
      totalSpent INTEGER NOT NULL DEFAULT 0,
      lastOrderDate TEXT NOT NULL,
      notes TEXT
    );
  `);

  // Migrate existing data from store.json or seed INITIAL_DATA if SQLite database is newly created
  const leadsCount = (db.prepare('SELECT count(*) as count FROM leads').get() as { count: number }).count;
  if (leadsCount === 0) {
    let sourceData = INITIAL_DATA;
    if (fs.existsSync(JSON_STORE_PATH)) {
      try {
        const raw = fs.readFileSync(JSON_STORE_PATH, 'utf-8');
        sourceData = JSON.parse(raw) as DbSchema;
      } catch (e) {
        console.warn('Failed to parse store.json for migration, falling back to INITIAL_DATA', e);
      }
    }

    const insertLead = db.prepare(`
      INSERT INTO leads (id, name, contact, message, budget, niche, notes, status, createdAt)
      VALUES (@id, @name, @contact, @message, @budget, @niche, @notes, @status, @createdAt)
    `);
    const insertProject = db.prepare(`
      INSERT INTO projects (id, title, clientName, developer, progress, status, paidAmount, remainingAmount, deadline, createdAt)
      VALUES (@id, @title, @clientName, @developer, @progress, @status, @paidAmount, @remainingAmount, @deadline, @createdAt)
    `);
    const insertCase = db.prepare(`
      INSERT INTO cases (id, title, tag, year, result, url, image, createdAt)
      VALUES (@id, @title, @tag, @year, @result, @url, @image, @createdAt)
    `);
    const insertClient = db.prepare(`
      INSERT INTO clients (id, name, company, phone, telegram, niche, ordersCount, totalSpent, lastOrderDate, notes)
      VALUES (@id, @name, @company, @phone, @telegram, @niche, @ordersCount, @totalSpent, @lastOrderDate, @notes)
    `);

    const transaction = db.transaction((data: DbSchema) => {
      for (const lead of data.leads || []) {
        insertLead.run({
          id: lead.id,
          name: lead.name,
          contact: lead.contact,
          message: lead.message,
          budget: lead.budget || null,
          niche: lead.niche || null,
          notes: lead.notes || null,
          status: lead.status,
          createdAt: lead.createdAt,
        });
      }
      for (const proj of data.projects || []) {
        insertProject.run({
          id: proj.id,
          title: proj.title,
          clientName: proj.clientName,
          developer: proj.developer || null,
          progress: proj.progress ?? 0,
          status: proj.status,
          paidAmount: proj.paidAmount ?? 0,
          remainingAmount: proj.remainingAmount ?? 0,
          deadline: proj.deadline,
          createdAt: proj.createdAt,
        });
      }
      for (const c of data.cases || []) {
        insertCase.run({
          id: c.id,
          title: c.title,
          tag: c.tag,
          year: c.year,
          result: c.result,
          url: c.url || null,
          image: c.image || null,
          createdAt: c.createdAt,
        });
      }
      for (const cl of data.clients || []) {
        insertClient.run({
          id: cl.id,
          name: cl.name,
          company: cl.company,
          phone: cl.phone,
          telegram: cl.telegram,
          niche: cl.niche,
          ordersCount: cl.ordersCount ?? 1,
          totalSpent: cl.totalSpent ?? 0,
          lastOrderDate: cl.lastOrderDate,
          notes: cl.notes || null,
        });
      }
    });

    transaction(sourceData);
    console.log('✅ SQLite database initialized and data migrated successfully!');
  }

  dbInstance = db;
  return db;
}

export function getDbData(): DbSchema {
  const db = getSqliteDb();
  const leads = db.prepare('SELECT * FROM leads ORDER BY createdAt DESC').all() as Lead[];
  const projects = db.prepare('SELECT * FROM projects ORDER BY createdAt DESC').all() as Project[];
  const cases = db.prepare('SELECT * FROM cases ORDER BY createdAt DESC').all() as CaseItem[];
  const clients = db.prepare('SELECT * FROM clients ORDER BY name ASC').all() as ClientItem[];

  return { leads, projects, cases, clients };
}

export function addLead(input: {
  name: string;
  contact: string;
  message: string;
  budget?: string | null;
  niche?: string;
  notes?: string;
}) {
  const db = getSqliteDb();
  const newLead: Lead = {
    id: `lead-${Date.now()}`,
    name: input.name,
    contact: input.contact,
    message: input.message,
    budget: input.budget || '45 000 ₽',
    niche: input.niche || 'Веб-разработка',
    notes: input.notes || 'Новый лид',
    status: 'new',
    createdAt: new Date().toISOString(),
  };

  db.prepare(`
    INSERT INTO leads (id, name, contact, message, budget, niche, notes, status, createdAt)
    VALUES (@id, @name, @contact, @message, @budget, @niche, @notes, @status, @createdAt)
  `).run(newLead);

  // Auto upsert client into 'clients' table
  try {
    const today = new Date().toISOString().split('T')[0];
    const contactStr = input.contact.trim();

    const existingClient = db.prepare(
      'SELECT * FROM clients WHERE name = ? OR phone = ? OR telegram = ?'
    ).get(input.name, contactStr, contactStr) as ClientItem | undefined;

    if (existingClient) {
      db.prepare(`
        UPDATE clients
        SET ordersCount = ordersCount + 1, lastOrderDate = ?, notes = ?
        WHERE id = ?
      `).run(today, `Последняя заявка: "${input.message.slice(0, 80)}..."`, existingClient.id);
    } else {
      db.prepare(`
        INSERT INTO clients (id, name, company, phone, telegram, niche, ordersCount, totalSpent, lastOrderDate, notes)
        VALUES (?, ?, ?, ?, ?, ?, 1, 0, ?, ?)
      `).run(
        `client-${Date.now()}`,
        input.name,
        input.name,
        contactStr,
        contactStr,
        input.niche || 'Веб-разработка',
        today,
        `Заявка с сайта: "${input.message.slice(0, 80)}..."`
      );
    }
  } catch (err) {
    console.error('Client auto-creation error:', err);
  }

  return newLead;
}

export function updateLead(id: string, patch: Partial<Lead>) {
  const db = getSqliteDb();
  const existing = db.prepare('SELECT * FROM leads WHERE id = ?').get(id) as Lead | undefined;
  if (!existing) return null;

  const updated: Lead = { ...existing, ...patch };
  db.prepare(`
    UPDATE leads
    SET name = @name, contact = @contact, message = @message, budget = @budget, niche = @niche, notes = @notes, status = @status
    WHERE id = @id
  `).run(updated);

  return updated;
}

export function deleteLead(id: string) {
  const db = getSqliteDb();
  db.prepare('DELETE FROM leads WHERE id = ?').run(id);
}

export function addProject(project: Omit<Project, 'id' | 'createdAt'>) {
  const db = getSqliteDb();
  const newProj: Project = {
    ...project,
    id: `proj-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };

  db.prepare(`
    INSERT INTO projects (id, title, clientName, developer, progress, status, paidAmount, remainingAmount, deadline, createdAt)
    VALUES (@id, @title, @clientName, @developer, @progress, @status, @paidAmount, @remainingAmount, @deadline, @createdAt)
  `).run({
    ...newProj,
    developer: newProj.developer || null,
  });

  return newProj;
}

export function updateProject(id: string, patch: Partial<Project>) {
  const db = getSqliteDb();
  const existing = db.prepare('SELECT * FROM projects WHERE id = ?').get(id) as Project | undefined;
  if (!existing) return null;

  const updated: Project = { ...existing, ...patch };
  db.prepare(`
    UPDATE projects
    SET title = @title, clientName = @clientName, developer = @developer, progress = @progress, status = @status, paidAmount = @paidAmount, remainingAmount = @remainingAmount, deadline = @deadline
    WHERE id = @id
  `).run({
    ...updated,
    developer: updated.developer || null,
  });

  return updated;
}

export function deleteProject(id: string) {
  const db = getSqliteDb();
  db.prepare('DELETE FROM projects WHERE id = ?').run(id);
}

export function addCaseItem(c: Omit<CaseItem, 'id' | 'createdAt'>) {
  const db = getSqliteDb();
  const count = (db.prepare('SELECT count(*) as count FROM cases').get() as { count: number }).count;
  const nextNum = (count + 1).toString().padStart(2, '0');
  const newCase: CaseItem = {
    ...c,
    id: nextNum,
    createdAt: new Date().toISOString(),
  };

  db.prepare(`
    INSERT INTO cases (id, title, tag, year, result, url, image, createdAt)
    VALUES (@id, @title, @tag, @year, @result, @url, @image, @createdAt)
  `).run({
    ...newCase,
    url: newCase.url || null,
    image: newCase.image || null,
  });

  return newCase;
}

export function updateCaseItem(id: string, patch: Partial<CaseItem>) {
  const db = getSqliteDb();
  const existing = db.prepare('SELECT * FROM cases WHERE id = ?').get(id) as CaseItem | undefined;
  if (!existing) return null;

  const updated: CaseItem = { ...existing, ...patch };
  db.prepare(`
    UPDATE cases
    SET title = @title, tag = @tag, year = @year, result = @result, url = @url, image = @image
    WHERE id = @id
  `).run({
    ...updated,
    url: updated.url || null,
    image: updated.image || null,
  });

  return updated;
}

export function deleteCaseItem(id: string) {
  const db = getSqliteDb();
  db.prepare('DELETE FROM cases WHERE id = ?').run(id);
}

export function addClientItem(client: Omit<ClientItem, 'id'>) {
  const db = getSqliteDb();
  const newClient: ClientItem = {
    ...client,
    id: `client-${Date.now()}`,
  };

  db.prepare(`
    INSERT INTO clients (id, name, company, phone, telegram, niche, ordersCount, totalSpent, lastOrderDate, notes)
    VALUES (@id, @name, @company, @phone, @telegram, @niche, @ordersCount, @totalSpent, @lastOrderDate, @notes)
  `).run({
    ...newClient,
    notes: newClient.notes || null,
  });

  return newClient;
}

export function updateClientItem(id: string, patch: Partial<ClientItem>) {
  const db = getSqliteDb();
  const existing = db.prepare('SELECT * FROM clients WHERE id = ?').get(id) as ClientItem | undefined;
  if (!existing) return null;

  const updated: ClientItem = { ...existing, ...patch };
  db.prepare(`
    UPDATE clients
    SET name = @name, company = @company, phone = @phone, telegram = @telegram, niche = @niche, ordersCount = @ordersCount, totalSpent = @totalSpent, lastOrderDate = @lastOrderDate, notes = @notes
    WHERE id = @id
  `).run({
    ...updated,
    notes: updated.notes || null,
  });

  return updated;
}

export function deleteClientItem(id: string) {
  const db = getSqliteDb();
  db.prepare('DELETE FROM clients WHERE id = ?').run(id);
}
