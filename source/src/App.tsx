import { useMemo, useState } from 'react';
import {
  BookOpen,
  Shield,
  Terminal,
  Search,
  Menu,
  X,
  ChevronRight,
  CheckCircle2,
  Clock3,
  Trophy,
  Network,
  Bug,
  Lock,
  Layers,
  Play,
  Copy,
  Check,
  Command,
  Target,
  BookMarked,
  Zap,
} from 'lucide-react';

const courses = [
  {
    id: 'start',
    level: 'BEGINNER',
    title: 'Kali Linux foundations',
    desc: 'Understand Kali, its purpose, installation choices, desktop, files and package management.',
    time: '45 min',
    icon: BookOpen,
    lessons: [
      'What Kali Linux is (and is not)',
      'Kali editions and system requirements',
      'Virtual machines vs. bare metal',
      'Desktop environment tour',
      'Filesystem, users and permissions',
      'APT, updates and repositories',
    ],
  },
  {
    id: 'terminal',
    level: 'BEGINNER',
    title: 'Linux terminal mastery',
    desc: 'Build confidence with the shell, navigation, files, processes and pipelines.',
    time: '1 hr 20 min',
    icon: Terminal,
    lessons: [
      'Terminal anatomy and shell basics',
      'pwd, ls, cd and paths',
      'Create, copy, move and remove files',
      'cat, less, grep and find',
      'Pipes, redirects and wildcards',
      'Users, groups and sudo',
      'Processes and services',
    ],
  },
  {
    id: 'network',
    level: 'BEGINNER',
    title: 'Networking essentials',
    desc: 'Learn IP addressing, ports, DNS, routing and how to inspect your own network.',
    time: '1 hr 10 min',
    icon: Network,
    lessons: [
      'How networks communicate',
      'IPv4, subnet masks and CIDR',
      'MAC addresses, ARP and gateways',
      'TCP, UDP and common ports',
      'DNS, DHCP and HTTP(S)',
      'Inspecting interfaces and routes',
    ],
  },
  {
    id: 'recon',
    level: 'INTERMEDIATE',
    title: 'Reconnaissance & enumeration',
    desc: 'Map an explicitly authorized lab target and learn to document findings responsibly.',
    time: '1 hr 30 min',
    icon: Search,
    lessons: [
      'Rules of engagement and scope',
      'Passive vs active reconnaissance',
      'Nmap concepts and safe lab scans',
      'Service and version enumeration',
      'Web technology discovery',
      'Evidence and reporting',
    ],
  },
  {
    id: 'web',
    level: 'INTERMEDIATE',
    title: 'Web security fundamentals',
    desc: 'Understand HTTP, common web risks and defensive testing in deliberately vulnerable labs.',
    time: '2 hr',
    icon: Lock,
    lessons: [
      'HTTP requests, responses and cookies',
      'Authentication and session security',
      'OWASP Top 10 overview',
      'Input validation and injection concepts',
      'Access control and IDOR',
      'Secure remediation and retesting',
    ],
  },
  {
    id: 'tools',
    level: 'INTERMEDIATE',
    title: 'Kali tools workshop',
    desc: 'Know what popular tools do, when to use them and how to interpret results.',
    time: '2 hr 15 min',
    icon: Bug,
    lessons: [
      'Nmap: network discovery',
      'Wireshark: packet analysis',
      'Burp Suite: web proxy',
      'Metasploit: framework concepts',
      'John the Ripper: password auditing',
      'Gobuster and directory discovery',
      'Hash identification and safe auditing',
    ],
  },
  {
    id: 'defense',
    level: 'ADVANCED',
    title: 'Hardening & defense',
    desc: 'Turn offensive security knowledge into stronger systems and practical defenses.',
    time: '1 hr 45 min',
    icon: Shield,
    lessons: [
      'Least privilege and account hygiene',
      'SSH hardening',
      'Firewall basics with UFW',
      'System logs and audit trails',
      'Patch and vulnerability management',
      'Backups and incident response',
    ],
  },
  {
    id: 'career',
    level: 'ADVANCED',
    title: 'Ethical hacking workflow',
    desc: 'Plan an assessment, preserve evidence, communicate risk and build a portfolio.',
    time: '1 hr',
    icon: Target,
    lessons: [
      'Permission, scope and legal boundaries',
      'Assessment planning',
      'Finding validation and evidence',
      'Risk ratings and prioritization',
      'Writing a professional report',
      'Building a legal home lab portfolio',
    ],
  },
];

const commands = [
  ['pwd', 'Print the current working directory', 'Navigation'],
  ['ls -lah', 'List files, including hidden files, with details', 'Navigation'],
  ['cd /path', 'Change to a directory', 'Navigation'],
  ['mkdir lab', 'Create a directory named lab', 'Files'],
  ['touch notes.txt', 'Create an empty file', 'Files'],
  ['cp source.txt copy.txt', 'Copy a file', 'Files'],
  ['mv old.txt new.txt', 'Move or rename a file', 'Files'],
  ['cat notes.txt', 'Print a text file', 'Files'],
  ['less notes.txt', 'Read a file page by page', 'Files'],
  ['grep -n "error" app.log', 'Find matching lines in a log', 'Text'],
  [
    'find . -name "*.txt"',
    'Find text files under the current directory',
    'Text',
  ],
  ['whoami', 'Show the current username', 'System'],
  ['id', 'Show user and group IDs', 'System'],
  ['ip a', 'Show network interfaces and addresses', 'Network'],
  ['ip route', 'Show the routing table', 'Network'],
  ['ss -tulpen', 'Inspect listening sockets and processes', 'Network'],
  ['ping -c 4 127.0.0.1', 'Test the local network stack', 'Network'],
  ['dig example.com', 'Query DNS records', 'Network'],
  ['sudo apt update', 'Refresh package index information', 'Packages'],
  ['sudo apt upgrade', 'Upgrade installed packages', 'Packages'],
  ['apt search wireshark', 'Search available packages', 'Packages'],
  ['ps aux', 'List running processes', 'System'],
  ['systemctl status ssh', 'Inspect SSH service status', 'System'],
  ['journalctl -xe', 'Review recent system journal messages', 'System'],
  [
    'chmod 600 secret.txt',
    'Allow only the owner to read/write a file',
    'Permissions',
  ],
];
const questions = [
  {
    q: 'What is Kali Linux primarily designed for?',
    a: [
      'Gaming and entertainment',
      'Penetration testing and security auditing',
      'Replacing every server OS',
      'Anonymous browsing only',
    ],
    correct: 1,
    why: 'Kali is a Debian-based distribution built for penetration testing, security research, digital forensics and related professional workflows.',
  },
  {
    q: 'Which command prints your current directory?',
    a: ['whereami', 'pwd', 'ls -p', 'path'],
    correct: 1,
    why: 'pwd means “print working directory” and displays your current location in the filesystem.',
  },
  {
    q: 'What does sudo do?',
    a: [
      'Deletes system files',
      'Runs a command with elevated privileges when authorized',
      'Encrypts your home folder',
      'Connects to a VPN',
    ],
    correct: 1,
    why: 'sudo runs a command with another user’s privileges, commonly root. Use it only when needed and understand the command first.',
  },
  {
    q: 'Which tool is commonly used to inspect network packets?',
    a: ['Wireshark', 'LibreOffice', 'GIMP', 'Apt'],
    correct: 0,
    why: 'Wireshark captures and analyzes network traffic. Only capture traffic you own or are explicitly authorized to inspect.',
  },
  {
    q: 'What must you have before testing a system?',
    a: [
      'A fast laptop',
      'Written authorization and a defined scope',
      'A public IP address',
      'A Kali theme',
    ],
    correct: 1,
    why: 'Permission and scope are essential. Testing without authorization can be illegal and harmful.',
  },
];

function App() {
  const [page, setPage] = useState('Overview');
  const [activeCourse, setActiveCourse] = useState('start');
  const [lesson, setLesson] = useState(0);
  const [completed, setCompleted] = useState({});
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [quiz, setQuiz] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState('');
  const [mobile, setMobile] = useState(false);
  const [terminalInput, setTerminalInput] = useState('help');
  const [terminalOutput, setTerminalOutput] = useState(
    'Welcome to the Kali practice terminal. This is a safe simulator — it does not run commands on your device.\nType help to see available examples.'
  );
  const course = courses.find(c => c.id === activeCourse) || courses[0];
  const done = Object.keys(completed).filter(k => completed[k]).length;
  const total = courses.reduce((n, c) => n + c.lessons.length, 0);
  const filtered = useMemo(
    () =>
      commands.filter(
        c =>
          (category === 'All' || c[2] === category) &&
          (c[0] + ' ' + c[1]).toLowerCase().includes(query.toLowerCase())
      ),
    [query, category]
  );
  const go = p => {
    setPage(p);
    setMobile(false);
  };
  const openCourse = id => {
    setActiveCourse(id);
    setLesson(0);
    go('Learning path');
  };
  const toggleLesson = key =>
    setCompleted(old => ({ ...old, [key]: !old[key] }));
  const runDemo = () => {
    const v = terminalInput.trim();
    const examples = {
      help: 'Available demos: help, pwd, whoami, ls, ip a, clear\nThese are simulated outputs, not real system commands.',
      pwd: '/home/student/kali-lab',
      whoami: 'student',
      ls: 'Desktop  Documents  Downloads  lab-notes.txt',
      'ip a':
        'lo: 127.0.0.1/8 (loopback)\neth0: 192.168.56.101/24 (example lab interface)',
      clear: '',
    };
    setTerminalOutput(
      examples[v] ??
        'Command not in this safe demo. Try: help, pwd, whoami, ls, ip a.'
    );
  };
  const nav = [
    ['Overview', Layers],
    ['Learning paths', BookOpen],
    ['Command library', Command],
    ['Practice terminal', Terminal],
    ['Knowledge quiz', Trophy],
    ['Ethics & safety', Shield],
  ];
  return (
    <div className="shell">
      <aside className={'sidebar ' + (mobile ? 'show' : '')}>
        <div className="brand">
          <div className="brandmark">
            <Terminal size={21} />
          </div>
          <div>
            <b>
              ROOT<span>WISE</span>
            </b>
            <small>KALI LINUX ACADEMY</small>
          </div>
          <button className="close-nav" onClick={() => setMobile(false)}>
            <X />
          </button>
        </div>
        <div className="side-label">LEARN</div>
        {nav.map(([name, Icon]) => (
          <button
            key={name}
            onClick={() => go(name)}
            className={'navitem ' + (page === name ? 'selected' : '')}
          >
            <Icon size={17} />
            {name}
            {name === 'Learning paths' && <span className="navcount">8</span>}
          </button>
        ))}
        <div className="side-card">
          <div className="side-card-icon">
            <Zap size={16} />
          </div>
          <b>Keep learning</b>
          <p>Small, consistent practice builds real security skills.</p>
          <button onClick={() => go('Learning paths')}>
            Explore paths <ChevronRight size={14} />
          </button>
        </div>
        <div className="side-foot">
          <span className="online-dot" /> YOUR LOCAL LEARNING SPACE
        </div>
      </aside>
      {mobile && <div className="scrim" onClick={() => setMobile(false)} />}
      <main className="main">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobile(true)}>
            <Menu />
          </button>
          <div className="crumb">
            ACADEMY <span>/</span> <b>{page.toUpperCase()}</b>
          </div>
          <div className="top-right">
            <span className="safe-pill">
              <Shield size={13} /> ETHICAL LEARNING
            </span>
            <div className="avatar">S</div>
          </div>
        </header>
        <div className="content">
          {page === 'Overview' && (
            <>
              <section className="hero">
                <div className="hero-copy">
                  <div className="eyebrow">
                    <span /> YOUR PRACTICAL KALI LINUX GUIDE
                  </div>
                  <h1>
                    Learn security.
                    <br />
                    <em>Build your skills.</em>
                  </h1>
                  <p>
                    A structured, hands-on journey from Linux beginner to
                    confident, responsible security practitioner. Learn the
                    tools, understand the concepts, practice safely.
                  </p>
                  <div className="hero-actions">
                    <button
                      className="primary"
                      onClick={() => openCourse('start')}
                    >
                      Start learning <ChevronRight size={17} />
                    </button>
                    <button
                      className="secondary"
                      onClick={() => go('Learning paths')}
                    >
                      Explore curriculum
                    </button>
                  </div>
                  <div className="hero-note">
                    <Shield size={14} /> Practice only on systems you own or
                    have permission to test.
                  </div>
                </div>
                <div className="hero-art">
                  <div className="orb orb1" />
                  <div className="orb orb2" />
                  <div className="terminal-card">
                    <div className="term-head">
                      <span />
                      <span />
                      <span /> <small>student@kali: ~</small>
                    </div>
                    <div className="term-body">
                      <p>
                        <i>┌──(student㉿kali)-[~]</i>
                      </p>
                      <p>
                        └─$ <b>whoami</b>
                      </p>
                      <p className="term-green">student</p>
                      <p>
                        └─$ <b>echo "learn • practice • protect"</b>
                      </p>
                      <p className="term-green">learn • practice • protect</p>
                      <p>
                        └─$ <span className="cursor">_</span>
                      </p>
                    </div>
                  </div>
                  <div className="float-tag">
                    <Shield size={14} /> Learn ethically
                  </div>
                </div>
              </section>
              <div className="stats">
                <div>
                  <span>LEARNING PATHS</span>
                  <b>08</b>
                  <small>Beginner to advanced</small>
                </div>
                <div>
                  <span>COMMANDS</span>
                  <b>25+</b>
                  <small>Explained examples</small>
                </div>
                <div>
                  <span>YOUR PROGRESS</span>
                  <b>{Math.round((done / total) * 100)}%</b>
                  <small>
                    {done} of {total} lessons complete
                  </small>
                </div>
                <div>
                  <span>KNOWLEDGE CHECK</span>
                  <b>05</b>
                  <small>Quiz questions</small>
                </div>
              </div>
              <section className="section">
                <div className="section-head">
                  <div>
                    <div className="eyebrow muted">YOUR ROADMAP</div>
                    <h2>Choose your learning path</h2>
                    <p>
                      Follow the sequence or jump into a topic that interests
                      you.
                    </p>
                  </div>
                  <button
                    className="text-link"
                    onClick={() => go('Learning paths')}
                  >
                    View all paths <ChevronRight size={15} />
                  </button>
                </div>
                <div className="course-grid">
                  {courses.slice(0, 4).map((c, i) => (
                    <CourseCard
                      key={c.id}
                      c={c}
                      i={i}
                      done={
                        c.lessons.filter((_, j) => completed[c.id + '-' + j])
                          .length
                      }
                      open={() => openCourse(c.id)}
                    />
                  ))}
                </div>
              </section>
              <section className="bottom-banner">
                <div className="banner-icon">
                  <Trophy />
                </div>
                <div>
                  <b>Test what you've learned</b>
                  <p>
                    Take a quick knowledge check and find the topics to revisit.
                  </p>
                </div>
                <button
                  className="secondary"
                  onClick={() => {
                    setQuiz({});
                    setSubmitted(false);
                    go('Knowledge quiz');
                  }}
                >
                  Take the quiz <ChevronRight size={15} />
                </button>
              </section>
            </>
          )}
          {page === 'Learning paths' && (
            <>
              <PageTitle
                eyebrow="THE CURRICULUM"
                title="Your learning roadmap"
                desc="Eight focused paths take you from Linux fundamentals to professional security workflows."
              />
              <div className="roadmap">
                {courses.map((c, i) => (
                  <CourseCard
                    key={c.id}
                    c={c}
                    i={i}
                    done={
                      c.lessons.filter((_, j) => completed[c.id + '-' + j])
                        .length
                    }
                    open={() => openCourse(c.id)}
                  />
                ))}
              </div>
            </>
          )}
          {page === 'Learning path' && (
            <>
              <button
                className="back-link"
                onClick={() => go('Learning paths')}
              >
                ← All learning paths
              </button>
              <div className="lesson-layout">
                <section className="lesson-main">
                  <div className="eyebrow muted">
                    {course.level} COURSE · {course.time}
                  </div>
                  <h1 className="page-title">{course.title}</h1>
                  <p className="page-desc">{course.desc}</p>
                  <div className="lesson-progress">
                    <div>
                      <span>COURSE PROGRESS</span>
                      <b>
                        {
                          course.lessons.filter(
                            (_, j) => completed[course.id + '-' + j]
                          ).length
                        }{' '}
                        / {course.lessons.length} lessons
                      </b>
                    </div>
                    <div className="progress-track">
                      <i
                        style={{
                          width:
                            (course.lessons.filter(
                              (_, j) => completed[course.id + '-' + j]
                            ).length /
                              course.lessons.length) *
                              100 +
                            '%',
                        }}
                      />
                    </div>
                  </div>
                  <article className="lesson-paper">
                    <div className="lesson-number">
                      LESSON {String(lesson + 1).padStart(2, '0')}{' '}
                      <span>
                        {' '}
                        / {String(course.lessons.length).padStart(2, '0')}
                      </span>
                    </div>
                    <h2>{course.lessons[lesson]}</h2>
                    <LessonContent course={course} lesson={lesson} />
                    <div className="lesson-controls">
                      <button
                        className="secondary"
                        disabled={lesson === 0}
                        onClick={() => setLesson(v => v - 1)}
                      >
                        Previous
                      </button>
                      <button
                        className="primary"
                        onClick={() => {
                          toggleLesson(course.id + '-' + lesson);
                          if (lesson < course.lessons.length - 1)
                            setLesson(v => v + 1);
                        }}
                      >
                        {completed[course.id + '-' + lesson]
                          ? 'Completed ✓'
                          : 'Mark complete'}{' '}
                        {lesson < course.lessons.length - 1 && (
                          <ChevronRight size={16} />
                        )}
                      </button>
                    </div>
                  </article>
                </section>
                <aside className="lesson-list">
                  <b>COURSE CONTENT</b>
                  <small>{course.lessons.length} LESSONS</small>
                  {course.lessons.map((l, j) => (
                    <button
                      key={l}
                      className={
                        'lesson-row ' + (lesson === j ? 'current' : '')
                      }
                      onClick={() => setLesson(j)}
                    >
                      <span className="lesson-check">
                        {completed[course.id + '-' + j] ? (
                          <Check size={13} />
                        ) : (
                          String(j + 1).padStart(2, '0')
                        )}
                      </span>
                      <span>{l}</span>
                    </button>
                  ))}
                </aside>
              </div>
            </>
          )}
          {page === 'Command library' && (
            <>
              <PageTitle
                eyebrow="YOUR LINUX CHEAT SHEET"
                title="Command library"
                desc="Search practical Linux commands, understand what they do and copy examples for your own notes."
              />
              <div className="searchbar">
                <Search size={18} />
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Search commands or descriptions..."
                />
              </div>
              <div className="filters">
                {[
                  'All',
                  'Navigation',
                  'Files',
                  'Text',
                  'System',
                  'Network',
                  'Packages',
                  'Permissions',
                ].map(x => (
                  <button
                    className={category === x ? 'active' : ''}
                    onClick={() => setCategory(x)}
                    key={x}
                  >
                    {x}
                  </button>
                ))}
              </div>
              <div className="command-list">
                {filtered.map(([cmd, desc, cat]) => (
                  <div className="command-row" key={cmd}>
                    <div>
                      <code>{cmd}</code>
                      <p>{desc}</p>
                    </div>
                    <div className="command-meta">
                      <span>{cat}</span>
                      <button
                        title="Copy command"
                        onClick={() => {
                          navigator.clipboard?.writeText(cmd);
                          setCopied(cmd);
                          setTimeout(() => setCopied(''), 1400);
                        }}
                      >
                        {copied === cmd ? (
                          <Check size={16} />
                        ) : (
                          <Copy size={16} />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div className="empty">
                    No commands match that search. Try another keyword.
                  </div>
                )}
              </div>
              <p className="fineprint">
                Commands are examples for learning. Review commands before
                running them, especially when using sudo or changing files.
              </p>
            </>
          )}
          {page === 'Practice terminal' && (
            <>
              <PageTitle
                eyebrow="SAFE SANDBOX"
                title="Practice terminal"
                desc="Try a few basic commands in this simulated terminal. Nothing is executed on your computer or a remote system."
              />
              <div className="simulator">
                <div className="sim-head">
                  <div>
                    <span />
                    <span />
                    <span />
                  </div>
                  <b>student@kali: ~/practice</b>
                  <small>SIMULATED SHELL</small>
                </div>
                <div className="sim-output">
                  {terminalOutput.split('\n').map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
                <form
                  className="sim-input"
                  onSubmit={e => {
                    e.preventDefault();
                    runDemo();
                  }}
                >
                  <span>└─$</span>
                  <input
                    value={terminalInput}
                    onChange={e => setTerminalInput(e.target.value)}
                    aria-label="Demo command"
                  />
                  <button className="primary">
                    Run demo <Play size={14} />
                  </button>
                </form>
              </div>
              <div className="demo-hints">
                <b>Try one of these</b>
                {['help', 'pwd', 'whoami', 'ls', 'ip a', 'clear'].map(x => (
                  <button
                    key={x}
                    onClick={() => {
                      setTerminalInput(x);
                      const out = {
                        help: 'Available demos: help, pwd, whoami, ls, ip a, clear\nThese are simulated outputs, not real system commands.',
                        pwd: '/home/student/kali-lab',
                        whoami: 'student',
                        ls: 'Desktop  Documents  Downloads  lab-notes.txt',
                        'ip a':
                          'lo: 127.0.0.1/8 (loopback)\neth0: 192.168.56.101/24 (example lab interface)',
                        clear: '',
                      };
                      setTerminalOutput(out[x]);
                    }}
                  >
                    <code>{x}</code>
                  </button>
                ))}
              </div>
              <div className="notice">
                <Shield size={18} />
                <div>
                  <b>Learning mode only</b>
                  <p>
                    This terminal is a teaching simulator. For real practice,
                    use a disposable virtual machine and intentionally
                    vulnerable lab targets that you are authorized to test.
                  </p>
                </div>
              </div>
            </>
          )}
          {page === 'Knowledge quiz' && (
            <>
              <PageTitle
                eyebrow="CHECK YOUR UNDERSTANDING"
                title="Knowledge check"
                desc="Five questions covering Kali Linux, Linux basics, networking and responsible security practice."
              />
              <div className="quiz-wrap">
                <div className="quiz-top">
                  <span>FOUNDATION QUIZ</span>
                  <b>
                    {Object.keys(quiz).length} / {questions.length} answered
                  </b>
                </div>
                {questions.map((q, i) => (
                  <div className="question" key={i}>
                    <div className="q-label">QUESTION 0{i + 1}</div>
                    <h3>{q.q}</h3>
                    <div className="answers">
                      {q.a.map((a, j) => (
                        <button
                          disabled={submitted}
                          onClick={() => setQuiz(v => ({ ...v, [i]: j }))}
                          className={quiz[i] === j ? 'chosen' : ''}
                          key={a}
                        >
                          <span>{String.fromCharCode(65 + j)}</span>
                          {a}
                        </button>
                      ))}
                    </div>
                    {submitted && (
                      <div
                        className={
                          'explanation ' +
                          (quiz[i] === q.correct ? 'right' : 'wrong')
                        }
                      >
                        <b>
                          {quiz[i] === q.correct ? 'Correct!' : 'Not quite.'}
                        </b>{' '}
                        {q.why}
                      </div>
                    )}
                  </div>
                ))}
                {!submitted ? (
                  <button
                    className="primary submit-quiz"
                    disabled={Object.keys(quiz).length !== questions.length}
                    onClick={() => setSubmitted(true)}
                  >
                    Check my answers <ChevronRight size={16} />
                  </button>
                ) : (
                  <div className="result">
                    <Trophy size={25} />
                    <div>
                      <b>
                        You scored{' '}
                        {
                          questions.filter((q, i) => quiz[i] === q.correct)
                            .length
                        }{' '}
                        out of {questions.length}
                      </b>
                      <p>
                        {questions.every((q, i) => quiz[i] === q.correct)
                          ? 'Excellent work. Keep building on these foundations.'
                          : 'Review the explanations above, then give it another try.'}
                      </p>
                    </div>
                    <button
                      className="secondary"
                      onClick={() => {
                        setQuiz({});
                        setSubmitted(false);
                      }}
                    >
                      Try again
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
          {page === 'Ethics & safety' && (
            <>
              <PageTitle
                eyebrow="THE MOST IMPORTANT SKILL"
                title="Learn responsibly"
                desc="Technical ability must come with permission, care and accountability. These principles apply to every tool in Kali."
              />
              <div className="ethics-hero">
                <Shield size={34} />
                <div>
                  <h2>Permission before packets.</h2>
                  <p>
                    Only assess systems you own or where you have explicit,
                    written authorization. Good security work protects people
                    and systems.
                  </p>
                </div>
              </div>
              <div className="ethics-grid">
                {[
                  [
                    '01',
                    'Get explicit permission',
                    'Obtain written authorization from the system owner before testing.',
                  ],
                  [
                    '02',
                    'Define the scope',
                    'Agree on IPs, domains, accounts, test windows, allowed techniques and exclusions.',
                  ],
                  [
                    '03',
                    'Protect real people',
                    'Never access, copy, expose or retain personal data unnecessarily.',
                  ],
                  [
                    '04',
                    'Use a safe lab',
                    'Practice on your own virtual machines or intentionally vulnerable training environments.',
                  ],
                  [
                    '05',
                    'Stop when asked',
                    'Respect rate limits, stop conditions and unexpected service impact.',
                  ],
                  [
                    '06',
                    'Report responsibly',
                    'Document evidence securely, explain impact and provide practical remediation.',
                  ],
                ].map(([n, t, d]) => (
                  <div className="ethics-card" key={n}>
                    <span>{n}</span>
                    <div>
                      <b>{t}</b>
                      <p>{d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="notice">
                <Lock size={18} />
                <div>
                  <b>Safe practice environments</b>
                  <p>
                    Use purpose-built platforms such as OWASP Juice Shop, DVWA,
                    Metasploitable or a private isolated home lab. Read each
                    platform's rules and keep vulnerable targets off public
                    networks.
                  </p>
                </div>
              </div>
            </>
          )}
          <footer className="footer">
            <span>ROOTWISE ACADEMY</span>
            <span>Learn deeply. Test ethically. Defend confidently.</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
function CourseCard({ c, i, done, open }) {
  const Icon = c.icon;
  return (
    <button className="course-card" onClick={open}>
      <div className="course-top">
        <div className="course-icon">
          <Icon size={19} />
        </div>
        <span className={'level ' + c.level.toLowerCase()}>{c.level}</span>
      </div>
      <h3>{c.title}</h3>
      <p>{c.desc}</p>
      <div className="course-bottom">
        <span>
          <Clock3 size={13} />
          {c.time}
        </span>
        <span>
          {done}/{c.lessons.length} lessons
        </span>
      </div>
      <div className="progress-track">
        <i style={{ width: (done / c.lessons.length) * 100 + '%' }} />
      </div>
      <div className="course-open">
        Explore path <ChevronRight size={15} />
      </div>
    </button>
  );
}
function PageTitle({ eyebrow, title, desc }) {
  return (
    <div className="page-heading">
      <div className="eyebrow muted">{eyebrow}</div>
      <h1 className="page-title">{title}</h1>
      <p className="page-desc">{desc}</p>
    </div>
  );
}
function LessonContent({ course, lesson }) {
  const tips = [
    'Start with the mental model, then practice one small task at a time.',
    'Read command help and documentation before changing a system.',
    'Use a disposable virtual machine snapshot so you can safely reset experiments.',
  ];
  const isTerminal = course.id === 'terminal';
  const isNetwork = course.id === 'network';
  const isEthics = course.id === 'career' || course.id === 'recon';
  return (
    <div className="lesson-copy">
      <p>
        {course.desc} This lesson introduces{' '}
        <b>{course.lessons[lesson].toLowerCase()}</b> and shows how it fits into
        a responsible security workflow.
      </p>
      {isTerminal ? (
        <>
          <h3>Useful commands to know</h3>
          <pre>
            {
              'pwd        # show current directory\nls -lah    # list files and details\ncd ~/lab   # move into your lab folder\nwhoami     # show current user'
            }
          </pre>
          <p>
            Commands are interpreted by your shell. Spaces, paths, permissions
            and the current directory all matter. Start with read-only commands,
            then practice file operations in a temporary folder.
          </p>
        </>
      ) : isNetwork ? (
        <>
          <h3>Build the picture</h3>
          <pre>
            {
              'ip a       # inspect network interfaces\nip route   # view routes and default gateway\nss -tuln   # list listening TCP/UDP sockets\ndig example.com  # query DNS'
            }
          </pre>
          <p>
            Know which interface, address and network you are inspecting. Use
            your own lab or a network where you have permission.
          </p>
        </>
      ) : isEthics ? (
        <>
          <h3>Before any assessment</h3>
          <ul>
            <li>Written authorization from the owner</li>
            <li>Clear target list and test boundaries</li>
            <li>Approved techniques and time window</li>
            <li>Emergency contact and stop conditions</li>
            <li>Secure evidence handling and reporting</li>
          </ul>
        </>
      ) : (
        <>
          <h3>Key ideas</h3>
          <ul>
            <li>Understand the purpose of the tool before using it.</li>
            <li>
              Learn the underlying operating-system or networking concept.
            </li>
            <li>Record what you observe and what it means.</li>
            <li>Practice only in a permitted, isolated environment.</li>
          </ul>
        </>
      )}
      <div className="lesson-tip">
        <Zap size={16} />
        <span>
          <b>Study tip:</b> {tips[lesson % tips.length]}
        </span>
      </div>
    </div>
  );
}
export default App;
