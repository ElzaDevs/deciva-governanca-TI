export interface TechAvatar {
  id: string;
  name: string;
  category: 'Enviados pelo Usuário' | 'Retrô Y2K & Hacker' | 'Linux & Open Source' | 'Pixel Art';
  description: string;
  imageUrl?: string;
  emojiFallback: string;
  tags: string[];
}

export const TECH_AVATARS: TechAvatar[] = [
  // User Uploaded Reference 1: Pixel Office Coder (Woman with glasses working on CRT desktop)
  {
    id: 'user-pixel-office-dev',
    name: 'Dev na Madrugada (Pixel CRT)',
    category: 'Enviados pelo Usuário',
    description: 'Desenvolvedora compenetrada diante do monitor CRT na estação de trabalho dos anos 2000.',
    imageUrl: '/src/assets/images/avatar_pixel_office_worker_1790708538323.jpg',
    emojiFallback: '👩‍💻',
    tags: ['pixel-art', 'crt-monitor', 'dev-girl', 'workstation'],
  },
  // User Uploaded Reference 2: Green CRT Phosphor Anime Hacker (PC-98 monochrome)
  {
    id: 'user-green-crt-hacker',
    name: 'PC-98 Green Terminal Hacker',
    category: 'Enviados pelo Usuário',
    description: 'Estilo clássico anime anos 90/2000 em tela de fósforo verde monocromático investigando logs.',
    imageUrl: '/src/assets/images/avatar_retro_green_hacker_1790708549312.jpg',
    emojiFallback: '📟',
    tags: ['green-phosphor', 'pc-98', 'retro-hacker', 'monochrome'],
  },
  // User Uploaded Reference 3: Cyber Dev Lotus Meditation with CRTs
  {
    id: 'user-cyber-monk-crts',
    name: 'Monge Dev em Meditação Y2K',
    category: 'Enviados pelo Usuário',
    description: 'Hacker em posição de lótus cercada por dezenas de monitores CRT, teclados mecânicos e PDAs.',
    imageUrl: '/src/assets/images/avatar_cyber_monk_crts_1790708561149.jpg',
    emojiFallback: '🧘‍♀️',
    tags: ['cyber-monk', 'crt-screens', 'zen-dev', 'flash-photo-2000'],
  },
  // User Uploaded Reference 4: Patrick Bateman with Linux Tux Plush
  {
    id: 'user-bateman-linux-tux',
    name: 'Executivo & Tux do Linux',
    category: 'Enviados pelo Usuário',
    description: 'O terno executivo corporativo segurando com zelo o mascote sagrado Tux do Linux.',
    imageUrl: '/src/assets/images/avatar_bateman_linux_tux_1790708569757.jpg',
    emojiFallback: '🐧',
    tags: ['american-psycho', 'linux-tux', 'corporate', 'humor'],
  },
  // User Uploaded Reference 5: Pixel Laptop with Green Matrix Rain
  {
    id: 'user-matrix-laptop',
    name: 'Terminal Matrix no Laptop',
    category: 'Enviados pelo Usuário',
    description: 'Laptop vintage com prompt de comando >_ sob chuva de código binário verde Matrix.',
    imageUrl: '/src/assets/images/avatar_matrix_laptop_terminal_1790708581586.jpg',
    emojiFallback: '💻',
    tags: ['matrix', 'binary-rain', 'terminal', 'pixel-laptop'],
  },
  // User Uploaded Reference 6: Pink Anya Plushie / Sleepy Dev
  {
    id: 'user-pink-anya-plush',
    name: 'Pelúcia Dev Sonolento (Anya)',
    category: 'Enviados pelo Usuário',
    description: 'Pelúcia rosada com expressão de cansaço após 14 horas de debug em produção.',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&auto=format&fit=crop&q=80',
    emojiFallback: '😴',
    tags: ['plushie', 'sleepy-dev', 'meme', 'overtime'],
  },
  // User Uploaded Reference 7: Handcrafted Crocheted Linux Tux
  {
    id: 'user-crochet-tux-plush',
    name: 'Tux Linux em Crochê Artesanal',
    category: 'Enviados pelo Usuário',
    description: 'Mascote do kernel Linux tricotado à mão vigiando a compilação do código no monitor.',
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80',
    emojiFallback: '🐧',
    tags: ['linux', 'tux', 'crochet', 'artisan'],
  },
  // User Uploaded Reference 8: Java Salvation / O'Reilly Books Dev Meme
  {
    id: 'user-java-salvation-books',
    name: 'O Evangelho de Java & O\'Reilly (2007)',
    category: 'Enviados pelo Usuário',
    description: 'Oferecendo livros lendários de Java clássico com código JVM vintage no CRT ao fundo.',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&auto=format&fit=crop&q=80',
    emojiFallback: '☕',
    tags: ['java', 'oreilly-books', 'vintage-code', 'jvm'],
  },

  // Unique 2000s Tech References
  {
    id: 'y2k-floppy-35',
    name: 'Disquete 3.5" Cyberpunk Neon',
    category: 'Retrô Y2K & Hacker',
    description: 'Mídia magnética de 1.44MB com etiqueta neon de backup do banco de dados.',
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&auto=format&fit=crop&q=80',
    emojiFallback: '💾',
    tags: ['y2k', 'floppy-disk', 'vintage-storage'],
  },
  {
    id: 'sysadmin-win2k',
    name: 'SysAdmin Windows 2000 Server',
    category: 'Retrô Y2K & Hacker',
    description: 'Administrador de sistemas corporativo configurando Active Directory e DNS.',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&auto=format&fit=crop&q=80',
    emojiFallback: '🖥️',
    tags: ['sysadmin', 'win2000', 'servers', 'datacenter'],
  },
  {
    id: 'ascii-terminal-hacker',
    name: 'Operador de Terminal ASCII',
    category: 'Retrô Y2K & Hacker',
    description: 'Especialista em segurança analisando tráfego de pacotes no tcpdump.',
    imageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&auto=format&fit=crop&q=80',
    emojiFallback: '🕶️',
    tags: ['ascii', 'cli', 'network-admin', 'cyber'],
  },
  {
    id: 'webmaster-neocities',
    name: 'Webmaster Anos 2000',
    category: 'Retrô Y2K & Hacker',
    description: 'Criador de páginas web artesanais com HTML 4.01, CSS1 e banners de 88x31.',
    imageUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&auto=format&fit=crop&q=80',
    emojiFallback: '🌐',
    tags: ['webmaster', 'html-vintage', 'under-construction'],
  },
  {
    id: 'tux-kernel-hacker',
    name: 'Hacker do Kernel Linux',
    category: 'Linux & Open Source',
    description: 'Compilando módulos customizados e analisando interrupções de hardware.',
    imageUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=400&auto=format&fit=crop&q=80',
    emojiFallback: '🐧',
    tags: ['linux-kernel', 'open-source', 'c-programming'],
  },
  {
    id: 'pixel-datacenter',
    name: 'Datacenter Frio 2000s',
    category: 'Pixel Art',
    description: 'Racks de servidores lâmina sob iluminação azul e ar-condicionado de precisão.',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&auto=format&fit=crop&q=80',
    emojiFallback: '🏢',
    tags: ['servers', 'datacenter', 'infra', 'pixel'],
  },
];
