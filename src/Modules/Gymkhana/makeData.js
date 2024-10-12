export const fakeEventData = [
  {
    id: "1",
    eventName: "Annual Tech Conference",
    date: "2024-11-15",
    venue: "Convention Center, Main Hall",
    status: "Pending Approval",
    softCopyLink: "https://example.com/docs/annual-tech-conference",
  },
  {
    id: "2",
    eventName: "Community Clean-Up Day",
    date: "2024-10-25",
    venue: "City Park",
    status: "Approved",
    softCopyLink: "https://example.com/docs/community-clean-up",
  },
  {
    id: "3",
    eventName: "Art Exhibition Opening",
    date: "2024-12-05",
    venue: "Art Gallery",
    status: "Declined",
    softCopyLink: "https://example.com/docs/art-exhibition",
  },
  {
    id: "4",
    eventName: "Fundraising Gala",
    date: "2024-11-30",
    venue: "City Hall",
    status: "Pending Approval",
    softCopyLink: "https://example.com/docs/fundraising-gala",
  },
  {
    id: "5",
    eventName: "Tech Workshop for Kids",
    date: "2024-10-20",
    venue: "Local Library",
    status: "Approved",
    softCopyLink: "https://example.com/docs/tech-workshop",
  },
  {
    id: "6",
    eventName: "Summer Music Festival",
    date: "2024-08-15",
    venue: "City Square",
    status: "Approved",
    softCopyLink: "https://example.com/docs/music-festival",
  },
  {
    id: "7",
    eventName: "Health Awareness Seminar",
    date: "2024-09-10",
    venue: "Community Center",
    status: "Pending Approval",
    softCopyLink: "https://example.com/docs/health-seminar",
  },
  {
    id: "8",
    eventName: "Startup Pitch Competition",
    date: "2024-11-05",
    venue: "Business Incubator",
    status: "Approved",
    softCopyLink: "https://example.com/docs/startup-pitch",
  },
  {
    id: "9",
    eventName: "Cooking Class for Beginners",
    date: "2024-10-12",
    venue: "Culinary School",
    status: "Pending Approval",
    softCopyLink: "https://example.com/docs/cooking-class",
  },
  {
    id: "10",
    eventName: "Charity Run",
    date: "2024-11-25",
    venue: "City Park",
    status: "Approved",
    softCopyLink: "https://example.com/docs/charity-run",
  },
];
export const festData = [
  {
    name: "Cultural Fest",
    duration: "March 15 - March 17",
    domain: "Cultural",
    year: "2022",
  },
  {
    name: "Tech Fest",
    duration: "April 20 - April 22",
    domain: "Technical",
    year: "2023",
  },
  {
    name: "Sports Meet",
    duration: "February 10 - February 12",
    domain: "Sports",
    year: "2023",
  },
  {
    name: "Music Carnival",
    duration: "November 5 - November 7",
    domain: "Cultural",
    year: "2021",
  },
  // Add more rows as needed
];

export const festColumns = [
  { accessorKey: "name", header: "Fest Name" },
  { accessorKey: "duration", header: "Date Duration" },
  { accessorKey: "domain", header: "Domain" },
  { accessorKey: "year", header: "Year" },
];
export const achievementsData = [
  // AFC Achievements
  {
    team: [
      { name: "John Doe", roll: "A123" },
      { name: "Jane Smith", roll: "A124" },
    ],
    event_name: "National Hackathon",
    details: "Secured 1st place",
    description:
      "Won the National Hackathon by developing an innovative AI-driven solution for smart cities.",
  },
  {
    team: [
      { name: "Mike Brown", roll: "A125" },
      { name: "Sara Green", roll: "A126" },
    ],
    event_name: "AI for Healthcare Challenge",
    details: "Secured 2nd place",
    description:
      "Developed a machine learning model for predicting disease outbreaks.",
  },
  {
    team: [
      { name: "Alice Johnson", roll: "A127" },
      { name: "David Lee", roll: "A128" },
    ],
    event_name: "Coding Championship",
    details: "Finalists",
    description:
      "Reached the finals by solving algorithmic problems efficiently in a 24-hour competition.",
  },

  // TPC Achievements
  {
    team: [
      { name: "Robert Williams", roll: "B223" },
      { name: "Emily Clark", roll: "B224" },
    ],
    event_name: "Resume Competition",
    details: "Best Resume Award",
    description:
      "Won the Best Resume Award for outstanding CV structure and content.",
  },
  {
    team: [
      { name: "Lucas White", roll: "B225" },
      { name: "Sophia Black", roll: "B226" },
    ],
    event_name: "Mock Interview Challenge",
    details: "Best Interview Performance",
    description:
      "Showcased excellent interview skills and professionalism during the mock interview rounds.",
  },
  {
    team: [
      { name: "Mason Taylor", roll: "B227" },
      { name: "Chloe Brown", roll: "B228" },
    ],
    event_name: "Career Fair Project Pitch",
    details: "Best Pitch Award",
    description:
      "Won Best Pitch for presenting an innovative business idea during the career fair.",
  },

  // BMC Achievements
  {
    team: [
      { name: "Henry Davis", roll: "C323" },
      { name: "Lily Walker", roll: "C324" },
    ],
    event_name: "Finance Quiz",
    details: "Secured 1st place",
    description:
      "Won the finance quiz by answering all questions related to personal finance and investments.",
  },
  {
    team: [
      { name: "Jack Lewis", roll: "C325" },
      { name: "Ava Martinez", roll: "C326" },
    ],
    event_name: "Stock Market Simulation",
    details: "Top Traders Award",
    description:
      "Secured the highest virtual portfolio in the stock market simulation.",
  },
  {
    team: [
      { name: "Zoe Wilson", roll: "C327" },
      { name: "Noah Hall", roll: "C328" },
    ],
    event_name: "Investment Strategy Challenge",
    details: "Best Strategy Award",
    description:
      "Won Best Strategy Award for proposing a unique investment portfolio during the challenge.",
  },

  // Additional AFC Achievements
  {
    team: [
      { name: "Liam Moore", roll: "A129" },
      { name: "Emma Taylor", roll: "A130" },
    ],
    event_name: "Cybersecurity Competition",
    details: "Best Defense Award",
    description:
      "Recognized for the most secure defense setup during the cybersecurity challenge.",
  },
  {
    team: [
      { name: "Olivia Anderson", roll: "A131" },
      { name: "James Thomas", roll: "A132" },
    ],
    event_name: "Robotics Challenge",
    details: "Best Innovation Award",
    description:
      "Awarded for creating a highly innovative robotic arm during the robotics challenge.",
  },

  // Additional TPC Achievements
  {
    team: [
      { name: "Isabella Wright", roll: "B229" },
      { name: "Ethan King", roll: "B230" },
    ],
    event_name: "Career Guidance Workshop",
    details: "Most Engaging Presentation",
    description:
      "Won for delivering the most engaging and insightful presentation during the workshop.",
  },
  {
    team: [
      { name: "Amelia Scott", roll: "B231" },
      { name: "Alexander Young", roll: "B232" },
    ],
    event_name: "Soft Skills Workshop",
    details: "Best Communication Skills",
    description:
      "Recognized for demonstrating excellent communication skills during the workshop.",
  },

  // Additional BMC Achievements
  {
    team: [
      { name: "Sebastian Martinez", roll: "C329" },
      { name: "Mia Green", roll: "C330" },
    ],
    event_name: "Financial Planning Contest",
    details: "Best Plan Award",
    description:
      "Won the award for creating the most comprehensive financial plan during the contest.",
  },
  {
    team: [
      { name: "Benjamin Phillips", roll: "C331" },
      { name: "Harper Turner", roll: "C332" },
    ],
    event_name: "Entrepreneurship Challenge",
    details: "Best Business Idea",
    description:
      "Recognized for proposing the most viable business idea during the entrepreneurship challenge.",
  },
];
export const achievementsColumns = [
  { accessorKey: "team", header: "Team (Name and Roll Number)" },
  { accessorKey: "event_name", header: "Event Name" },
  { accessorKey: "details", header: "Details" },
  { accessorKey: "description", header: "Description" },
];

export const eventsColumns = [
  { accessorKey: "club", header: "Club" },
  { accessorKey: "event_name", header: "Event Name" },
  { accessorKey: "date", header: "Date" },
  { accessorKey: "start_time", header: "Start Time" },
  { accessorKey: "end_time", header: "End Time" },
  { accessorKey: "details", header: "Details" },
  { accessorKey: "venue", header: "Venue" },
];

export const eventsData = [
  // AFC Events
  {
    club: "AFC",
    event_name: "Hackathon",
    date: "2024-11-01",
    start_time: "10:00 AM",
    end_time: "06:00 PM",
    details: "24-hour coding competition.",
    venue: "Main Auditorium",
  },
  {
    club: "AFC",
    event_name: "Tech Talk",
    date: "2024-11-05",
    start_time: "02:00 PM",
    end_time: "04:00 PM",
    details: "Guest speaker from Google.",
    venue: "Room 101",
  },
  {
    club: "AFC",
    event_name: "Workshop on AI",
    date: "2024-11-12",
    start_time: "11:00 AM",
    end_time: "03:00 PM",
    details: "Introduction to AI tools.",
    venue: "Room 202",
  },
  {
    club: "AFC",
    event_name: "Coding Challenge",
    date: "2024-11-20",
    start_time: "09:00 AM",
    end_time: "05:00 PM",
    details: "Solve algorithmic problems.",
    venue: "Lab 3",
  },
  {
    club: "AFC",
    event_name: "Project Exhibition",
    date: "2024-11-25",
    start_time: "10:00 AM",
    end_time: "01:00 PM",
    details: "Showcase your tech projects.",
    venue: "Exhibition Hall",
  },

  // TPC Events
  {
    club: "TPC",
    event_name: "Resume Building Workshop",
    date: "2024-11-02",
    start_time: "11:00 AM",
    end_time: "01:00 PM",
    details: "Improve your resume for placements.",
    venue: "Room 105",
  },
  {
    club: "TPC",
    event_name: "Mock Interviews",
    date: "2024-11-10",
    start_time: "09:00 AM",
    end_time: "12:00 PM",
    details: "Prepare for interviews.",
    venue: "Placement Office",
  },
  {
    club: "TPC",
    event_name: "Career Fair",
    date: "2024-11-15",
    start_time: "10:00 AM",
    end_time: "04:00 PM",
    details: "Interact with top companies.",
    venue: "Main Hall",
  },
  {
    club: "TPC",
    event_name: "LinkedIn Profile Review",
    date: "2024-11-18",
    start_time: "03:00 PM",
    end_time: "05:00 PM",
    details: "Optimize your LinkedIn profile.",
    venue: "Room 102",
  },
  {
    club: "TPC",
    event_name: "Networking Event",
    date: "2024-11-28",
    start_time: "05:00 PM",
    end_time: "07:00 PM",
    details: "Meet professionals in your field.",
    venue: "Lounge",
  },

  // BMC Events
  {
    club: "BMC",
    event_name: "Budgeting 101",
    date: "2024-11-03",
    start_time: "02:00 PM",
    end_time: "04:00 PM",
    details: "Learn basic budgeting techniques.",
    venue: "Room 210",
  },
  {
    club: "BMC",
    event_name: "Finance Workshop",
    date: "2024-11-08",
    start_time: "01:00 PM",
    end_time: "03:00 PM",
    details: "Hands-on finance workshop.",
    venue: "Room 215",
  },
  {
    club: "BMC",
    event_name: "Investment Strategies",
    date: "2024-11-13",
    start_time: "11:00 AM",
    end_time: "01:00 PM",
    details: "Learn smart investment techniques.",
    venue: "Room 220",
  },
  {
    club: "BMC",
    event_name: "Entrepreneurship Talk",
    date: "2024-11-22",
    start_time: "04:00 PM",
    end_time: "06:00 PM",
    details: "How to start your own business.",
    venue: "Conference Hall",
  },
  {
    club: "BMC",
    event_name: "Financial Planning",
    date: "2024-11-30",
    start_time: "02:00 PM",
    end_time: "05:00 PM",
    details: "Plan your financial future.",
    venue: "Room 230",
  },

  // Additional AFC Events
  {
    club: "AFC",
    event_name: "Cybersecurity Conference",
    date: "2024-11-14",
    start_time: "09:00 AM",
    end_time: "03:00 PM",
    details: "Latest trends in cybersecurity.",
    venue: "Main Auditorium",
  },
  {
    club: "AFC",
    event_name: "Robotics Showcase",
    date: "2024-11-16",
    start_time: "12:00 PM",
    end_time: "03:00 PM",
    details: "Robotics demos by students.",
    venue: "Room 305",
  },
  {
    club: "AFC",
    event_name: "Blockchain Seminar",
    date: "2024-11-21",
    start_time: "02:00 PM",
    end_time: "05:00 PM",
    details: "Blockchain and cryptocurrencies.",
    venue: "Room 312",
  },
  {
    club: "AFC",
    event_name: "Networking in Tech",
    date: "2024-11-26",
    start_time: "04:00 PM",
    end_time: "06:00 PM",
    details: "How to build a network in tech.",
    venue: "Room 307",
  },
  {
    club: "AFC",
    event_name: "AI in Healthcare",
    date: "2024-12-01",
    start_time: "10:00 AM",
    end_time: "01:00 PM",
    details: "Applications of AI in healthcare.",
    venue: "Room 309",
  },

  // Additional TPC Events
  {
    club: "TPC",
    event_name: "Public Speaking Workshop",
    date: "2024-12-03",
    start_time: "11:00 AM",
    end_time: "01:00 PM",
    details: "Improve your public speaking skills.",
    venue: "Room 110",
  },
  {
    club: "TPC",
    event_name: "Soft Skills Seminar",
    date: "2024-12-06",
    start_time: "02:00 PM",
    end_time: "04:00 PM",
    details: "Develop essential soft skills.",
    venue: "Room 115",
  },
  {
    club: "TPC",
    event_name: "Job Search Strategies",
    date: "2024-12-09",
    start_time: "03:00 PM",
    end_time: "05:00 PM",
    details: "How to search for the right job.",
    venue: "Room 120",
  },
  {
    club: "TPC",
    event_name: "Negotiation Skills",
    date: "2024-12-12",
    start_time: "11:00 AM",
    end_time: "01:00 PM",
    details: "Master the art of negotiation.",
    venue: "Room 125",
  },
  {
    club: "TPC",
    event_name: "Workplace Etiquette",
    date: "2024-12-15",
    start_time: "09:00 AM",
    end_time: "11:00 AM",
    details: "Learn professional workplace etiquette.",
    venue: "Room 130",
  },

  // Additional BMC Events
  {
    club: "BMC",
    event_name: "Stock Market Basics",
    date: "2024-12-05",
    start_time: "01:00 PM",
    end_time: "03:00 PM",
    details: "Intro to stock market investing.",
    venue: "Room 250",
  },
  {
    club: "BMC",
    event_name: "Financial Independence",
    date: "2024-12-07",
    start_time: "11:00 AM",
    end_time: "02:00 PM",
    details: "Plan your path to financial independence.",
    venue: "Room 260",
  },
  {
    club: "BMC",
    event_name: "Entrepreneurship Workshop",
    date: "2024-12-10",
    start_time: "10:00 AM",
    end_time: "12:00 PM",
    details: "How to launch a startup.",
    venue: "Room 270",
  },
  {
    club: "BMC",
    event_name: "Investment Planning",
    date: "2024-12-13",
    start_time: "03:00 PM",
    end_time: "05:00 PM",
    details: "Plan for smart investments.",
    venue: "Room 280",
  },
  {
    club: "BMC",
    event_name: "Business Model Canvas",
    date: "2024-12-17",
    start_time: "02:00 PM",
    end_time: "04:00 PM",
    details: "Build a business model canvas.",
    venue: "Room 290",
  },
];
