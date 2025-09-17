# Copilot Instructions for AI Coding Agents

## Project Overview
This project is a CSS stylesheet for the WDD 231 Course Home Page, designed by Thomas Etiuzale. The codebase currently consists of a single file: `small.css`. The stylesheet is focused on responsive, modern, and visually engaging web design, with a strong emphasis on theming and accessibility.

## Key Patterns and Conventions
- **CSS Variables:**
  - The `:root` selector defines a set of custom properties (CSS variables) for consistent theming, including GitHub-inspired and Fortnite-inspired color palettes.
  - Example:
    ```css
    :root {
      --github-black: #0d1117;
      --fortnite-purple: #7b61ff;
      --completed-color: #3fb950;
      /* ... */
    }
    ```
- **Responsive Design:**
  - Uses media queries for breakpoints at 640px, 768px, and 1024px to adjust layouts for mobile, tablet, and desktop.
  - Grid and flexbox are used for layout, with `.course-cards` switching columns based on screen size.
- **Componentized Classes:**
  - Classes are named for semantic sections: `.header-title`, `.course-card`, `.filter-btn`, `.about-content`, etc.
  - Status and state are handled with modifier classes (e.g., `.completed`, `.not-completed`, `.status-completed`).
- **Color and Gradient Usage:**
  - Gradients and color variables are used for backgrounds and text effects, especially in headers and buttons.
- **Accessibility and Usability:**
  - Font choices and color contrasts are selected for readability.
  - Navigation and interactive elements have hover and active states.

## Developer Workflows
- **No build or test scripts** are present; this is a static CSS file intended to be linked directly in HTML.
- **No external dependencies** or frameworks are used.
- **No JavaScript integration** is present in this codebase.

## Project-Specific Guidance
- When adding new styles, use the existing variable system for colors and spacing to maintain consistency.
- For new responsive features, follow the established media query breakpoints and layout patterns.
- When introducing new components, use semantic class names and group related styles together.
- If expanding to multiple files, consider organizing by component or section, and document any new conventions here.

## Key File
- `small.css`: The main (and only) stylesheet. All theming, layout, and responsive logic is defined here.

## Example: Adding a New Themed Button
```css
.new-action-btn {
  background: linear-gradient(90deg, var(--fortnite-blue), var(--fortnite-green));
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 2rem;
  font-weight: 700;
  transition: background 0.3s;
}
.new-action-btn:hover {
  background: var(--fortnite-purple);
}
```

## Updating This Guide
If you add new files, workflows, or conventions, update this file to keep AI agents productive and aligned with project standards.
