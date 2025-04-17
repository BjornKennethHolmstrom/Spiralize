// scripts/generate-pdf.cjs
const { renderToFile, Document, Page, Text, View, StyleSheet } = require('@react-pdf/renderer');
const React = require('react');
const path = require('path');
const guide = require('./guide-structured.json');

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 11, fontFamily: 'Helvetica' },
  section: { marginBottom: 18 },
  heading: { fontSize: 16, marginBottom: 6, fontWeight: 'bold' },
  paragraph: { marginBottom: 4, lineHeight: 1.5 }
});

const SpiralGuidePDF = () =>
  React.createElement(
    Document,
    null,
    React.createElement(
      Page,
      { style: styles.page },
      guide.map((section, idx) =>
        React.createElement(
          View,
          { key: idx, style: styles.section },
          [
            React.createElement(Text, { style: styles.heading, key: 'h' }, section.heading),
            ...section.paragraphs.map((p, i) =>
              React.createElement(Text, { style: styles.paragraph, key: i }, p)
            )
          ]
        )
      )
    )
  );

(async () => {
  const outputPath = path.resolve('static/spiral-aware-guide.pdf');
  await renderToFile(SpiralGuidePDF(), outputPath);
  console.log('✅ Spiral-aware PDF generated at:', outputPath);
})();
