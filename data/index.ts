export const profile =
  "Software engineer specializing in building scalable software applications. I focus on creating robust systems that solve real problems, with particular interest in emerging technologies. I enjoy collaborating with teams, whether brainstorming with senior engineers or mentoring junior developers, to ship high-quality software that delivers tangible results. I'm committed to continuous learning and bringing practical, efficient solutions to complex technical challenges.";

export const navItems = [
  { name: "About", link: "#about" },
  { name: "Experience", link: "#experience" },
  { name: "Work", link: "#work" },
  { name: "Skills", link: "#skills" },
  { name: "Education", link: "#education" },
];

export type ExperienceItem = {
  id: string;
  title: string;
  company: string;
  dates?: string;
  mode?: string;
  bullets: string[];
};

export const experience: ExperienceItem[] = [
  /*
  {
    id: "muveta",
    title: "Frontend Engineer",
    company: "Muveta",
    dates: "March 2026 – Present",
    bullets: [
      "Frontend Architecture & State: Engineered end-to-end Project Workspaces and Event Management modules using React, TypeScript, TanStack Router, and Zustand for complex active-context state management.",
      "Payments & Data Dashboards: Integrated Stripe Express for payment onboarding and built live ticket sales dashboards featuring server-side filtering, custom CSV exports, and dynamic data processing.",
      "Authentication & Caching: Built robust session management using Axios interceptors for seamless token refreshes and optimized TanStack Query caching to eliminate stale data and cache corruption.",
      "Access Control & Subscriptions: Architected role-based access control (RBAC) for project collaborators and developed comprehensive profile subscription and mail broadcast UIs with centralized API error parsing.",
      "UI/UX & Discoverability: Delivered mobile-first, responsive interfaces—resolving complex z-index and redirect loop issues—and implemented dynamic SEO Open Graph metadata via Vite to improve public page discoverability.",
      "Engineering Excellence: Maintained CI/CD reliability by resolving critical strict-mode TypeScript build errors and shipped 50+ user stories within an Agile framework.",
    ],
  },
  */
  {
    id: "xchangebox",
    title: "Fullstack Developer",
    company: "Xchangebox",
    dates: "November 2025 – Present",
    mode: "Hybrid",
    bullets: [
      "Frontend Development: Engineered interactive JavaScript UI components—including multi-step wizards, dynamic modals, and server-side DataTables with advanced filtering—for high-volume financial modules.",
      "Backend & API Integration: Built and integrated RESTful APIs using Python and Django REST Framework to drive complex operations like loan booking, KYC updates, and bulk account creation.",
      "Performance Optimization: Optimized database performance by replacing N+1 lookups with batch queries and implementing server-side pagination to eliminate browser memory bottlenecks.",
      "Reporting & Document Management: Built end-to-end financial reporting systems (Excel/PDF) for statements like P&L and Balance Sheets, and implemented secure, size-enforced file upload flows via Cloudinary.",
      "UX & Debugging: Proactively resolved complex frontend state and lifecycle bugs, and improved UX by translating raw third-party API errors into intuitive messages for banking staff.",
      "Agile Delivery: Collaborated in an Agile team to translate business requirements into robust, secure web interfaces for customer onboarding, transaction monitoring, and loan operations.",
    ],
  },
  {
    id: "nihub",
    title: "Software Engineer / Instructor",
    company: "NIHUB",
    dates: "May 2025 – May 2026",
    mode: "Hybrid",
    bullets: [
      "Developed and deployed full-stack web applications using Rust for secure, high-performance backends, integrated with React, Next.js, and Express frontends within a Dockerized Linux environment, ensuring seamless scalability and memory safety.",
      "Architected and built an internal event management system to streamline company operations, leveraging Rust's ownership model and async runtime (Tokio) for fault-tolerant, concurrent processing of event data—taking full ownership from ideation through production deployment.",
      "Implemented Rust-based microservices for core backend logic, including real-time notification handling and API gateways, resulting in optimized resource utilization and zero runtime panics under load.",
      "Mentored and instructed students in modern web development as part of their Industrial Training, learning about front-end technologies to build robust, production-ready applications.",
      "Managed the full software lifecycle, including Rust crate selection and optimization, containerization with Docker, and deployment on company-hosted Linux VMs, while fostering best practices in code reviews and CI/CD pipelines tailored to Rust workflows.",
    ],
  },
  {
    id: "dfinity",
    title: "ICP Blockchain Ambassador",
    company: "DFINITY Foundation",
    dates: "July 2024 – February 2026",
    mode: "Remote · Sahara Region",
    bullets: [
      "Organized and led 15+ community events, including technical workshops and hackathons, attracting over 500 participants and fostering grassroots adoption of ICP's Rust-based smart contract ecosystem in emerging markets.",
      "Delivered keynote presentations and hands-on onboarding sessions on ICP development, empowering novice and intermediate developers to deploy secure, scalable dApps using Rust, Motoko, and WebAssembly—resulting in a 40% increase in regional developer registrations.",
      "Collaborated with global ICP ambassadors and DFINITY teams to curate educational content, including tutorials on zero-knowledge proofs and canister models, distributed via YouTube and GitHub to accelerate user onboarding and reduce entry barriers for blockchain innovation.",
      "Drove user acquisition initiatives by integrating ICP tools into local tech meetups and university partnerships, onboarding 200+ new developers to the ecosystem and contributing to a 25% growth in active Sahara-based ICP projects.",
      "Mentored emerging Web3 builders through one-on-one code reviews and project sprints, emphasizing Rust's safety features for decentralized applications, while gathering feedback to refine ICP's community resources and documentation.",
    ],
  },
  {
    id: "ad",
    title: "Fullstack Developer",
    company: "A&D Technology Consulting",
    dates: "January 2025 – September 2025",
    bullets: [
      "Built entire frontends from the ground up for client-facing web applications using React and Next.js, delivering responsive, intuitive interfaces that enhanced user engagement for multiple portfolio companies in e-commerce and SaaS sectors.",
      "Collaborated closely with management and cross-functional client teams to align site functionality with evolving business requirements, iterating on features through agile sprints to support scalable growth for diverse industry clients.",
      "Managed end-to-end technical implementations, including domain procurement, cloud hosting setup, and integration of backend services—enabling seamless launches of custom web apps and prototypes for consulting clients in fintech and education.",
      "Engineered bespoke software solutions for external partners, such as mobile-responsive dashboards and API-driven tools, leveraging TypeScript for robust codebases that reduced deployment times by 35% and empowered clients to onboard users rapidly.",
      "Led consulting engagements to develop tailored applications, from MVP prototypes to production-ready systems, fostering long-term client relationships by translating complex requirements into high-impact, maintainable software that drove operational efficiency across startups and enterprises.",
    ],
  },
  {
    id: "fluxnudge",
    title: "Fullstack Developer",
    company: "Fluxnudge — ICP Hub Sahara",
    dates: "November 2024 – January 2025",
    bullets: [
      "Architected and implemented robust backend systems using Node.js with Bun runtime and TypeScript, resulting in a 40% improvement in API response times.",
      "Designed and optimized MongoDB database schemas and queries that can scale to support a lot of daily active users.",
      "Implemented comprehensive authentication and authorization systems using JWT, enhancing platform security.",
      "Developed RESTful APIs that seamlessly integrated with frontend React components, improving development workflow efficiency by 30%.",
      "Leveraged TypeScript's strong typing to reduce production bugs by 60% compared to the previous JavaScript implementation.",
      "Optimized Bun runtime configuration to achieve 25% faster server startup and request handling compared to standard Node.js.",
    ],
  },
  {
    id: "zummit",
    title: "Front-end Developer",
    company: "Zummit Africa",
    mode: "Internship",
    bullets: [
      "Assisted in the development of user-facing features, translating design mockups and wireframes into high-quality code.",
      "Gained hands-on experience with front-end technologies like HTML5 and React.js.",
      "Contributed to improving website responsiveness and user experience across various devices.",
      "Collaborated with the development team to troubleshoot and resolve front-end issues.",
    ],
  },
];

export type Project = {
  id: string;
  title: string;
  summary: string;
  stack: string[];
  figure: "tuner" | "mothtype";
  bullets: string[];
};

export const projects: Project[] = [
  {
    id: "guitar-tuner",
    title: "Guitar Tuner CLI",
    summary: "Rust, DSP, Audio Processing",
    stack: ["Rust", "cpal", "FFT", "DSP"],
    figure: "tuner",
    bullets: [
      "Developed a cross-platform command-line guitar tuner using Rust, implementing real-time audio processing and frequency detection algorithms.",
      "Engineered Fast Fourier Transform (FFT) analysis with parabolic interpolation for precise fundamental frequency detection (±50 cents accuracy).",
      "Implemented real-time DSP techniques including Hann windowing, DC offset removal, harmonic detection, and exponential moving average (EMA) filtering.",
      "Designed an interactive CLI interface with a color-coded visual feedback system using terminal manipulation.",
      "Utilized low-level audio APIs (cpal) for cross-platform audio input handling with configurable sample rates and buffer management.",
      "Applied signal processing optimizations including threshold-based peak detection and multi-candidate harmonic analysis for improved accuracy on low-frequency strings.",
    ],
  },
  {
    id: "mothtype",
    title: "Mothtype",
    summary: "Programming typing test",
    stack: ["Next.js", "JavaScript", "Convex", "Vercel", "Gemini"],
    figure: "mothtype",
    bullets: [
      "Developed a full-stack web application using Next.js with modern React practices.",
      "Implemented real-time backend functionality using Convex for database operations and API management.",
      "Integrated server-side rendering and optimized font loading with Next.js built-in features.",
      "Deployed and maintained the production environment on Vercel with continuous integration.",
      "Built a responsive user interface with modern JavaScript and React components.",
    ],
  },
];

export type SkillLevel = "Advanced" | "Intermediate" | "Competent";

export type Skill = {
  name: string;
  level: SkillLevel;
  focus: string;
};

export type SkillGroup = {
  id: string;
  label: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "languages",
    label: "Languages",
    skills: [
      { name: "TypeScript", level: "Advanced", focus: "Full-stack, Node.js with Bun" },
      { name: "JavaScript", level: "Advanced", focus: "Frontend, API integration" },
      {
        name: "Rust",
        level: "Advanced",
        focus: "Backend, blockchain, async with Tokio, DSP",
      },
      { name: "Python", level: "Intermediate", focus: "Scripting, data processing, automation" },
      { name: "Golang", level: "Competent", focus: "REST APIs, microservices, goroutines" },
      { name: "Solidity", level: "Intermediate", focus: "Smart contracts, Ethereum and ICP" },
      { name: "Zig", level: "Intermediate", focus: "Low-level systems, performance" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { name: "React", level: "Advanced", focus: "Components, hooks, state" },
      { name: "Next.js", level: "Advanced", focus: "SSR, static sites, API routes" },
      { name: "Tailwind CSS", level: "Advanced", focus: "Utility-first, responsive layout" },
    ],
  },
  {
    id: "backend",
    label: "Backend and data",
    skills: [
      { name: "Express.js", level: "Intermediate", focus: "REST APIs, middleware" },
      { name: "MongoDB", level: "Advanced", focus: "Schema design, query optimization" },
      { name: "PostgreSQL", level: "Intermediate", focus: "Relational queries, Rust backends" },
    ],
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    skills: [
      { name: "Docker", level: "Advanced", focus: "Multi-stage builds, Linux environments" },
      { name: "AWS", level: "Intermediate", focus: "Hosting, EC2, S3" },
      { name: "CI/CD", level: "Intermediate", focus: "GitHub Actions, automated testing" },
    ],
  },
];

export const education = {
  degree: "Civil Engineering",
  school: "Federal University of Technology, Minna",
  dates: "2019 – 2025",
  location: "Minna, Nigeria",
};

export const contact = {
  email: "elpraise20@gmail.com",
  phone: "+2348117292451",
  phoneDisplay: "+234 811 729 2451",
  location: "Abuja, Nigeria",
  links: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/el-praise-ayo-b17b80228/",
    },
    {
      label: "X",
      href: "https://twitter.com/Eldevode_",
    },
  ],
};

export const socialMedia = [
  {
    id: 2,
    img: "/twit.svg",
    link: "https://twitter.com/Eldevode_",
  },
  {
    id: 3,
    img: "/link.svg",
    link: "https://www.linkedin.com/in/el-praise-ayo-b17b80228/",
  },
];
