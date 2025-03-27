# Changelog

All notable changes to this project will be documented in this file.

## [0.3.4] - Resources Expansion and Video Content

### Added
- **Resources Section**:
  - Added comprehensive resources tab to the Governance page
  - Featured globalgovernanceframework.org as a primary resource
  - Added curated collections of books, academic resources, and community links
  - Integrated case studies of successful governance implementations
- **Video Resources**:
  - Added essential books, articles and papers
  - Added Leo Gura's (Actualized.org) comprehensive Spiral Dynamics video series
  - Added Practical Integral's video series covering all stages from Beige to Coral
  - Organized videos in a user-friendly, responsive grid layout
- **Enhanced Translations**:
  - Extended all resource content with full Swedish translations
  - Improved translation consistency across multilingual components

### Changed
- Created a tab navigation in the Explore page for better user flow
- Reorganized tab navigation in the Governance section for better user flow
- Improved mobile responsiveness of resource listings

## [0.3.3] - Extended Stage Support and Refinements

### Added
- **New Stages**:
  - Added Ultraviolet (X) stage to complete the developmental spectrum
  - Enhanced Coral stage descriptions to emphasize sovereign unity
  - Added comprehensive stage combinations for new stages (45 additional combinations)
- **Quiz Enhancements**:
  - Extended quiz scoring to include Ultraviolet stage
  - Updated stage color scheme to include Ultraviolet
- **Stage Insights**:
  - Added detailed descriptions for both Coral and Ultraviolet stages
  - Expanded stage interactions and combinations documentation

### Changed
- Refined stage descriptions to better reflect the unique qualities of each stage
- Updated stage navigation to include all stages through Ultraviolet
- Enhanced visualization color scheme to accommodate new stages

### Fixed
- Resolved prerendering issues for dynamic stage routes

## [0.3.2] - Visual and Content Enhancements

### Added
- **Logo**: Created and implemented a new spiral-based logo representing all nine stages
- **Origins Page**: Added comprehensive history and background of Spiral Dynamics
  - Timeline from Dr. Clare W. Graves through modern developments
  - Key principles and historical impact
  - Full bilingual support

### Changed
- Moved donation section from homepage to About page for better focus
- Reorganized navigation menu order for better user flow
- Improved contact form with custom thank you page
- Updated asset paths to ensure correct loading in production

### Fixed
- Corrected image and asset paths for GitHub Pages deployment
- Fixed responsive layout issues in various components

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
  - Updated the **Contact** page to include a dynamic link to the creator's contact page, with language support.

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
