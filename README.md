# Spiralize

**Spiralize** is an interactive, educational, and engaging web application designed to help users explore and understand the Spiral Dynamics model. Through quizzes, insights, and resources, Spiralize empowers users to reflect on their values and worldview, facilitating personal and societal growth.

## Features

- **Interactive Assessment**
  - Take a dynamic quiz with randomized questions to discover your "center of gravity" in the spiral
  - Get personalized insights and tips for growth across all stages from Beige to Ultraviolet
  - Share your results on social media and download results image
  - Visual progress tracking with color-coded stages

- **Explore the Spiral**
  - Learn about the stages of the Spiral Dynamics model with engaging visuals and explanations
  - Understand how values shape individuals, communities, and societies
  - Read about the history of Spiral Dynamics
  - Access comprehensive video resources from leading Spiral Dynamics educators

- **Conscious Governance**
  - Explore governance models through a developmental lens
  - Access interactive tools for understanding governance evolution
  - Browse real-world examples of different governance structures
  - Find curated resources for implementing developmental governance approaches

- **Educational Resources**
  - Access curated collections of books, academic papers, and online courses
  - Watch video series exploring each stage of development
  - Study case examples and practical applications
  - Connect with communities of practice in the field

- **Multilingual Support**
  - Currently supports English and Swedish
  - Expandable to include additional languages

- **Donation Support**
  - Support the project through [PayPal Donations](https://www.paypal.com/donate/?hosted_button_id=FX7FQMDQBAR4N) (add the message "Spiralize")

## Deployment

The project is deployed on GitHub Pages. To deploy your own instance:

1. Fork the repository
2. Update `svelte.config.js` with your repository name
3. Enable GitHub Pages in your repository settings
4. Push to the main branch to trigger deployment

The site is available at `https://www.spiralize.org`

## Technology Stack

- **Frontend Framework**: [SvelteKit](https://kit.svelte.dev/) for a reactive and fast user experience
- **Styling**: Tailwind CSS for responsive and modern UI design
- **Data Storage**: IndexedDB for local progress tracking
- **Deployment**: GitHub Pages for hosting

## Getting Started

### Prerequisites

- **Node.js** (LTS version recommended)
- **npm** (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/BjornKennethHolmstrom/Spiralize.git
   cd spiralize
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev -- --open
   ```

4. Open the app in your browser at `http://localhost:5173`

### Build for Production

To build the app for production:
```bash
npm run build
```

The static site will be generated in the `build` directory.

## Contributing

Contributions are welcome! Here's how you can help:

- Suggest new questions for the quiz
- Help translate the app into other languages
- Report bugs or suggest improvements
- Submit a pull request with new features or fixes
- Recommend additional resources for the Resources section

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by the work of Clare W. Graves, Don Beck, and Chris Cowan
- Video resources courtesy of Leo Gura (Actualized.org) and Practical Integral
- Special thanks to contributors and supporters who help make Spiralize possible

## Support

If you find Spiralize helpful, please consider supporting the project:

- [Donate via PayPal](https://www.paypal.com/donate/?hosted_button_id=FX7FQMDQBAR4N)

Thank you for your support and for exploring Spiral Dynamics with Spiralize!
