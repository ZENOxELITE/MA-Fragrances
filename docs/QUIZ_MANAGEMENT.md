# Scent Finder Quiz Management Guide

## Overview
The Scent Finder Quiz helps customers discover their perfect fragrance. This guide explains how to customize quiz questions and results.

## Quiz Component Location
File: `components/scent-finder-quiz.tsx`

## Quiz Structure

The quiz consists of:
1. **Questions** - 5 questions to understand preferences
2. **Answer Options** - Multiple choice answers
3. **Recommendation Logic** - Maps answers to products
4. **Results Display** - Shows recommended products

---

## Managing Questions

### Current Questions

The quiz has 5 questions stored in the `questions` array:

\`\`\`typescript
const questions = [
  {
    id: 1,
    question: "What's your gender preference?",
    options: ["Men", "Women", "Unisex"]
  },
  // ... more questions
];
\`\`\`

### Adding a New Question

1. Open `components/scent-finder-quiz.tsx`
2. Find the `questions` array
3. Add your new question:

\`\`\`typescript
{
  id: 6, // Next ID
  question: "What time of day will you wear this fragrance?",
  options: ["Morning", "Afternoon", "Evening", "All Day"]
}
\`\`\`

### Editing Existing Questions

Change the question text or options:

\`\`\`typescript
{
  id: 1,
  question: "Who is this fragrance for?", // Modified question
  options: ["For Him", "For Her", "For Anyone"] // Modified options
}
\`\`\`

### Removing a Question

Simply delete the question object from the array:

\`\`\`typescript
const questions = [
  {
    id: 1,
    question: "What's your gender preference?",
    options: ["Men", "Women", "Unisex"]
  },
  {
    id: 3,
    question: "What intensity do you prefer?",
    options: ["Light & Fresh", "Moderate", "Bold & Intense"]
  }
];
\`\`\`

---

## Customizing Answer Options

### Current Answer Structure

Each question has multiple options:

\`\`\`typescript
options: ["Option 1", "Option 2", "Option 3"]
\`\`\`

### Adding More Options

\`\`\`typescript
{
  id: 2,
  question: "What fragrance family appeals to you?",
  options: [
    "Oriental (Spicy & Warm)",
    "Floral (Romantic & Elegant)",
    "Fresh (Clean & Citrusy)",
    "Woody (Earthy & Natural)",
    "Gourmand (Sweet & Edible)" // New option
  ]
}
\`\`\`

### Adding Icons to Options (Optional)

Enhance options with emojis or icons:

\`\`\`typescript
options: [
  "☀️ Daytime",
  "🌙 Evening",
  "🌅 Special Occasions"
]
\`\`\`

---

## Recommendation Logic

### How Recommendations Work

The quiz maps answers to product recommendations using this logic:

\`\`\`typescript
const getRecommendation = () => {
  let recommendedProduct = products[0]; // Default
  
  const category = answers[1]; // Gender preference
  const family = answers[2]; // Fragrance family
  
  const match = products.find(p => 
    p.category === category && p.family === family
  );
  
  return match || recommendedProduct;
};
\`\`\`

### Customizing Recommendation Logic

#### Simple Match by Category
\`\`\`typescript
const getRecommendation = () => {
  const category = answers[1];
  return products.find(p => p.category === category) || products[0];
};
\`\`\`

#### Match Multiple Criteria
\`\`\`typescript
const getRecommendation = () => {
  const category = answers[1];
  const family = answers[2];
  const intensity = answers[3];
  
  // Try exact match
  let match = products.find(p => 
    p.category === category && 
    p.family === family &&
    p.intensity === intensity
  );
  
  // Fallback to category + family
  if (!match) {
    match = products.find(p => 
      p.category === category && p.family === family
    );
  }
  
  return match || products[0];
};
\`\`\`

#### Weighted Scoring System
\`\`\`typescript
const getRecommendation = () => {
  const scores = products.map(product => {
    let score = 0;
    
    // Category match: +3 points
    if (product.category === answers[1]) score += 3;
    
    // Family match: +2 points
    if (product.family === answers[2]) score += 2;
    
    // Price range match: +1 point
    if (answers[4] === "Luxury" && product.price > 100) score += 1;
    if (answers[4] === "Affordable" && product.price < 100) score += 1;
    
    return { product, score };
  });
  
  // Sort by highest score
  scores.sort((a, b) => b.score - a.score);
  
  return scores[0].product;
};
\`\`\`

---

## Customizing Results Display

### Current Results Section

After completing the quiz, users see:
1. Recommended product image
2. Product name and price
3. Why this product matches
4. Alternative recommendations

### Editing Results Text

\`\`\`typescript
<h2 className="text-3xl font-serif font-bold mb-4">
  Your Perfect Match! {/* Customize heading */}
</h2>

<p className="text-muted-foreground mb-8">
  Based on your preferences... {/* Customize description */}
</p>
\`\`\`

### Customizing Match Rationale

\`\`\`typescript
<div className="bg-muted/50 p-6 rounded-lg mb-8">
  <h3 className="font-semibold mb-2">Why This Fragrance?</h3>
  <p className="text-sm text-muted-foreground">
    This {recommendedProduct.concentration} fragrance from our {recommendedProduct.family} collection
    matches your preference for {answers[1]} fragrances with a {answers[3]} intensity.
  </p>
</div>
\`\`\`

### Adding More Recommendations

Show top 3 matches instead of 1:

\`\`\`typescript
const getTopRecommendations = (count = 3) => {
  // Score all products
  const scored = products.map(product => ({
    product,
    score: calculateScore(product)
  }));
  
  // Sort and return top matches
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map(item => item.product);
};

// In render:
const topMatches = getTopRecommendations(3);
\`\`\`

---

## Styling & UI Customization

### Progress Bar

Current progress indicator:

\`\`\`typescript
<div className="w-full bg-muted rounded-full h-2 mb-8">
  <div 
    className="bg-primary h-2 rounded-full transition-all"
    style={{ width: `${(currentQuestion / questions.length) * 100}%` }}
  />
</div>
\`\`\`

**Different style:**
\`\`\`typescript
// Step indicators
<div className="flex justify-between mb-8">
  {questions.map((q, i) => (
    <div 
      key={q.id}
      className={`w-8 h-8 rounded-full flex items-center justify-center ${
        i < currentQuestion ? 'bg-primary text-white' : 'bg-muted'
      }`}
    >
      {i + 1}
    </div>
  ))}
</div>
\`\`\`

### Answer Button Styling

Current buttons are outlined:

\`\`\`typescript
<Button
  variant="outline"
  className="w-full text-left justify-start h-auto py-4 bg-transparent"
>
\`\`\`

**Filled buttons:**
\`\`\`typescript
<Button
  variant="default"
  className="w-full"
>
\`\`\`

**Card-style buttons:**
\`\`\`typescript
<button className="w-full p-6 text-left border-2 border-border rounded-lg hover:border-primary hover:bg-muted/50 transition-all">
  {option}
</button>
\`\`\`

### Quiz Layout

Current: Centered with max width

\`\`\`typescript
<div className="max-w-2xl mx-auto">
\`\`\`

**Wider layout:**
\`\`\`typescript
<div className="max-w-4xl mx-auto">
\`\`\`

**Full width:**
\`\`\`typescript
<div className="container mx-auto px-4">
\`\`\`

---

## Adding Quiz Features

### Save Results to Database

\`\`\`typescript
const handleComplete = async () => {
  const results = {
    answers,
    recommendation: recommendedProduct.id,
    timestamp: new Date().toISOString()
  };
  
  try {
    await fetch('/api/quiz-results', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(results)
    });
  } catch (error) {
    console.error('Failed to save results:', error);
  }
};
\`\`\`

### Email Results

\`\`\`typescript
<Button onClick={emailResults}>
  📧 Email My Results
</Button>

const emailResults = () => {
  const subject = "Your Fragrance Match";
  const body = `Your perfect match: ${recommendedProduct.name}`;
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
};
\`\`\`

### Restart Quiz

\`\`\`typescript
<Button 
  variant="outline"
  onClick={() => {
    setCurrentQuestion(1);
    setAnswers({});
    setShowResults(false);
  }}
>
  Retake Quiz
</Button>
\`\`\`

---

## Mobile Optimization

### Responsive Question Layout

\`\`\`typescript
<div className="space-y-3 md:space-y-4">
  {/* Questions stack on mobile, larger spacing on desktop */}
</div>
\`\`\`

### Mobile-Friendly Buttons

\`\`\`typescript
<Button className="text-sm md:text-base py-3 md:py-4">
  {/* Smaller text/padding on mobile */}
</Button>
\`\`\`

---

## Tips

1. **Keep It Short**: 3-5 questions is ideal
2. **Clear Options**: Make choices obvious and distinct
3. **Test Logic**: Verify all answer combinations give good results
4. **Mobile First**: Most users take quizzes on mobile
5. **Fun Tone**: Make questions engaging, not clinical

---

## Troubleshooting

### Quiz Not Showing Results
- Check that all questions are answered
- Verify the `showResults` state is updating
- Ensure products array has data

### Wrong Recommendations
- Review the recommendation logic
- Check that product properties match answer values
- Add console.log to debug scoring

### Layout Breaks on Mobile
- Test with browser dev tools mobile view
- Check responsive classes (md:, lg:)
- Verify button widths work on small screens

---

**Last Updated:** [Current Date]
**Component:** `components/scent-finder-quiz.tsx`
