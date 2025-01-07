# Changelog

All notable changes to this project will be documented in this file.

## [0.3.1]

### Added

- **Quiz Improvements**
  - Download .png-file with results from the quiz.
  - Back button to assist with missclicks or regrets.
  - Full top-two stages combination descriptions (36 in total).

## [0.3.0] - Translation and Feature Enhancements

### Added
- **Full Translation Support**:
  - Completed translation of all app components into English and Swedish.
  - Integrated `languageStore` for dynamic and consistent language switching across the app.

- **Pages**:
  - Created a detailed **Insights** page with practical tips for integrating Spiral Dynamics principles into daily life.
  - Enhanced the **About** page with project and creator details, dynamically translated.
  - Updated the **Contact** page to include a dynamic link to the creator’s contact page, with language support.

- **Spiral Diagram**:
  - Fixed and improved the spiral diagram visualization.
  - Added a smooth, continuous spiral path connecting all stages.

- **Header and Footer**:
  - Added a consistent, responsive header for navigation across all pages.
  - Updated the footer to dynamically adapt to selected language and link structure.

### Fixed
- Spiral diagram hover functionality now works seamlessly for stage selection.
- Resolved path-related build issues for deployment compatibility.

## [0.2.0] - Enhancement Release

### Added
- **Quiz Improvements**:
  - Implemented question randomization for varied quiz experience
  - Added color-coded progress visualization
  - Created sharable results with URL parameters
- **Social Features**:
  - Added social media sharing buttons (Facebook, Twitter, LinkedIn)
  - Created social media preview image
  - Implemented meta tags for better social sharing
- **Deployment**:
  - Set up GitHub Pages deployment workflow
  - Configured static hosting compatibility

## [0.1.0] - Initial Release

### Added
- **Homepage**: Created a welcoming and engaging homepage featuring project information, interactive quiz access, and donation support.
- **Quiz Component**: Built an intuitive, multilingual quiz to help users discover their "center of gravity" on the Spiral Dynamics model.
  - Added dynamic questions with translations in English and Swedish.
  - Implemented local progress tracking and results aggregation.
- **Language Support**: Integrated English and Swedish translations with a language switcher.
- **Donation Feature**: Added a donation link to support the project.

### Technology
- Utilized SvelteKit for the frontend framework.
- Deployed a responsive design with Tailwind CSS.
- Enabled local data storage using IndexedDB.

---

This is the initial release showcasing the foundation of Spiralize's functionality.


