# Resume Builder

> Build your professional resume in minutes with an interactive, mobile-first resume builder.

<img src="public/icon.png" alt="Resume Builder" width="75" />

## Features

### 📝 Comprehensive Resume Sections
- **Personal Information** - Contact details, job title, and links
- **Professional Summary** - Highlight your career overview
- **Work Experience** - Add multiple positions with descriptions
- **Education** - Academic background and qualifications
- **Skills** - List your technical and soft skills
- **Projects** - Showcase your portfolio and achievements
- **Custom Sections** - Add any additional sections you need (Awards, Volunteering, etc.)

### 🎨 Multiple Templates
Choose from 3 professionally designed templates:
- **Classic** - Traditional professional resume with serif fonts
- **Modern** - Two-column design with blue accent sidebar
- **Minimal** - Clean, spacious design with centered headers

### ✨ Smart Features
- **Live Preview** - See changes in real-time as you type
- **Section Reordering** - Customize the order of resume sections
- **Mobile-First Design** - Fully responsive with floating preview button on mobile
- **Auto-Save** - Your data is automatically saved to browser localStorage
- **PDF Export** - One-click export using browser print functionality
- **Dark Mode UI** - Easy on the eyes while editing

### 📱 Mobile Experience
- Optimized mobile interface with single-column layout
- Floating preview button for easy resume viewing
- Full-screen preview modal
- Touch-friendly controls

## Tech Stack

- **Framework:** [TanStack Start](https://tanstack.com/start)
- **Routing:** [TanStack Router](https://tanstack.com/router)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Styling:** Vanilla CSS with CSS variables
- **Build Tool:** Vite
- **Runtime:** Nitro

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd resume_builder

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The app will be available at `http://localhost:3000`

### Build for Production

```bash
pnpm build
```

### Preview Production Build

```bash
pnpm serve
```

## Project Structure

```
src/
├── components/
│   ├── Editor/          # Form components for editing resume data
│   ├── Preview/         # Resume template components
│   ├── ui/              # Reusable UI components (Button, Input, Card)
│   ├── TemplateSelector.tsx
│   └── SectionOrderEditor.tsx
├── hooks/
│   └── useResume.tsx    # Context provider for resume state management
├── routes/
│   ├── __root.tsx       # Root layout
│   └── index.tsx        # Main application page
├── types.ts             # TypeScript type definitions
└── styles.css           # Global styles and CSS variables
```

## Key Features Explained

### State Management
The app uses React Context (`ResumeProvider`) to manage global state. All resume data and template selection is stored in `localStorage` for persistence.

### Template System
Each template is a separate component that receives the same resume data but renders it with different styling and layout. Templates support:
- Custom section ordering
- Responsive design
- Print optimization

### Section Reordering
Users can reorder resume sections using up/down arrows. The order is saved and respected across all templates.

### Mobile Preview
On mobile devices (< 768px), the live preview is hidden to save space. A floating button opens a full-screen modal to view the resume.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

CC BY-NC 4.0 - This project is licensed under the Creative Commons Attribution-NonCommercial 4.0 International License. Use is permitted for non-commercial purposes only with attribution.

## Acknowledgments

Built with ❤️ using modern web technologies and best practices for performance and user experience.
