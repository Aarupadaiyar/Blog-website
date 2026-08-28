/**
 * Single place to re-brand this template for a new client:
 * name, tagline, and the starting category list all live here.
 */
export const siteConfig = {
  name: "Your Blog Name",
  shortName: "Blog",
  tagline: "Write your one-line tagline here.",
  description:
    "A short description of what this blog covers — swap this out for your own voice and topics.",
  authorName: "Your Name",
  authorTitle: "Your title or role goes here",
  authorBio:
    "Write a short bio here — who you are, what you work on, and why you started writing. Two or three sentences is plenty.",
  authorPhotoUrl: "",
  url: "http://localhost:3000",
};

export const defaultCategories: { name: string; description: string }[] = [
  {
    name: "Books I Recommend",
    description: "Reading notes and recommendations worth your time.",
  },
  {
    name: "Artificial Intelligence",
    description: "Thoughts on AI, machine learning, and where it's headed.",
  },
  {
    name: "Resources for Upskilling",
    description: "Courses, tools, and paths for leveling up.",
  },
  {
    name: "Economics & Markets",
    description: "Notes on markets, policy, and how the world works.",
  },
  {
    name: "Social Opinions",
    description: "Perspectives on culture and society.",
  },
  {
    name: "Leadership & Business",
    description: "Lessons on building teams, companies, and decisions.",
  },
  {
    name: "Technology",
    description: "Where software, hardware, and the internet are going.",
  },
  {
    name: "Health & Longevity",
    description: "What's worth knowing about living well and living long.",
  },
  {
    name: "Science & Climate",
    description: "Research, energy, and the state of the planet.",
  },
  {
    name: "Personal Reflections",
    description: "Notes on habits, mindset, and lessons learned.",
  },
  {
    name: "Travel & Culture",
    description: "Places, people, and perspective gained on the road.",
  },
];
