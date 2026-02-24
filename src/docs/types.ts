export interface ContentSection {
  heading?: string;
  body?: string[];
  code?: { language: string; content: string };
  list?: { items: string[]; icon?: 'check' | 'arrow' | 'bullet' };
  note?: { type: 'info' | 'warning' | 'pro'; content: string };
  table?: { headers: string[]; rows: string[][] };
}

export interface DocPage {
  slug: string;
  title: string;
  description: string;
  isPro?: boolean;
  sections: ContentSection[];
}

export interface DocNavItem {
  slug: string;
  title: string;
  isPro?: boolean;
}

export interface DocSection {
  id: string;
  title: string;
  items: DocNavItem[];
}
