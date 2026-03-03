# Accessibility Testing Guide

## Overview

This document provides guidance for testing the Sentinel Premium Website with screen readers to ensure WCAG 2.1 AA compliance.

## Screen Reader Testing Checklist

### Recommended Screen Readers

- **NVDA** (Windows) - Free and open-source
- **JAWS** (Windows) - Industry standard
- **VoiceOver** (macOS/iOS) - Built-in Apple screen reader

### Testing Procedure

#### 1. Navigation Testing

**Test with Tab key navigation:**
- [ ] All interactive elements are reachable via Tab key
- [ ] Tab order follows logical reading order
- [ ] Focus indicators are clearly visible
- [ ] Skip-to-content link appears on first Tab press
- [ ] Modal dialogs trap focus appropriately

**Test with screen reader navigation:**
- [ ] Headings are properly announced (H1, H2, H3, etc.)
- [ ] Landmarks are properly identified (header, nav, main, footer, section)
- [ ] Lists are announced correctly
- [ ] Links are distinguishable from regular text

#### 2. Form Testing

**Lead Capture Form:**
- [ ] Form labels are announced for each input
- [ ] Required fields are indicated
- [ ] Error messages are announced when validation fails
- [ ] Success message is announced after submission
- [ ] Multi-step progress is announced

**Newsletter Form:**
- [ ] Email input label is announced
- [ ] Submit button purpose is clear
- [ ] Success/error messages are announced

#### 3. Interactive Components

**Accordion (FAQ Section):**
- [ ] Accordion buttons announce expanded/collapsed state
- [ ] Content is announced when expanded
- [ ] Keyboard navigation works (Enter/Space to toggle)

**Dialog/Modal (Apps Section):**
- [ ] Modal opening is announced
- [ ] Focus moves to modal content
- [ ] Close button is announced
- [ ] Escape key closes modal
- [ ] Focus returns to trigger element after closing

**Buttons:**
- [ ] All buttons announce their purpose
- [ ] Icon-only buttons have aria-labels
- [ ] Button states (disabled, pressed) are announced

#### 4. Content Testing

**Images:**
- [ ] Content images have descriptive alt text
- [ ] Decorative images are hidden from screen readers (aria-hidden or empty alt)
- [ ] Icons within buttons are properly labeled

**Links:**
- [ ] Link purpose is clear from link text alone
- [ ] External links are indicated
- [ ] Social media links have descriptive labels

**Headings:**
- [ ] Heading hierarchy is logical (no skipped levels)
- [ ] Page has one H1 element
- [ ] Section headings use H2-H6 appropriately

#### 5. Dynamic Content

**Animations:**
- [ ] Animations respect prefers-reduced-motion
- [ ] Animated content is still accessible
- [ ] Loading states are announced

**Live Regions:**
- [ ] Form validation messages use role="alert"
- [ ] Status updates are announced
- [ ] Loading indicators are announced

## Testing Commands

### NVDA (Windows)

- **Start/Stop:** Ctrl + Alt + N
- **Read next:** Down Arrow
- **Read previous:** Up Arrow
- **Next heading:** H
- **Next link:** K
- **Next button:** B
- **Next form field:** F
- **List elements:** Insert + F7

### VoiceOver (macOS)

- **Start/Stop:** Cmd + F5
- **Read next:** VO + Right Arrow (VO = Ctrl + Option)
- **Read previous:** VO + Left Arrow
- **Next heading:** VO + Cmd + H
- **Next link:** VO + Cmd + L
- **Next form control:** VO + Cmd + J
- **Rotor:** VO + U

### JAWS (Windows)

- **Start/Stop:** Ctrl + Alt + J
- **Read next:** Down Arrow
- **Read previous:** Up Arrow
- **Next heading:** H
- **Next link:** Tab
- **Next button:** B
- **Next form field:** F
- **List elements:** Insert + F3

## Accessibility Features Implemented

### Semantic HTML
- ✅ Proper use of `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- ✅ Logical heading hierarchy (H1-H6)
- ✅ Semantic form elements with proper labels

### ARIA Attributes
- ✅ `aria-label` on icon buttons and navigation
- ✅ `aria-expanded` on expandable elements (accordion, mobile menu)
- ✅ `aria-controls` on elements that control other elements
- ✅ `aria-hidden` on decorative icons
- ✅ `aria-describedby` for form error messages
- ✅ `aria-pressed` for toggle buttons
- ✅ `role="alert"` for important status messages

### Keyboard Navigation
- ✅ All interactive elements keyboard accessible
- ✅ Visible focus indicators on all focusable elements
- ✅ Skip-to-content link for keyboard users
- ✅ Modal focus trap
- ✅ Escape key closes modals
- ✅ Enter/Space activates buttons

### Color Contrast
- ✅ Neon green (#00FF88) on black (#0B0B0F) exceeds 4.5:1 ratio
- ✅ All text meets WCAG AA standards
- ✅ Interactive elements have sufficient contrast

### Form Accessibility
- ✅ All inputs have associated labels (htmlFor/id)
- ✅ Error messages linked with aria-describedby
- ✅ Required fields indicated
- ✅ Clear focus indicators on form fields

## Known Issues

None identified. All accessibility requirements have been implemented.

## Testing Recommendations

1. **Test on multiple screen readers** - Different screen readers may announce content differently
2. **Test on actual devices** - Mobile screen readers (iOS VoiceOver, Android TalkBack) behave differently
3. **Test with keyboard only** - Unplug mouse and navigate entire site with keyboard
4. **Test with high contrast mode** - Ensure content is visible in Windows High Contrast mode
5. **Test with zoom** - Verify layout works at 200% zoom level

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [NVDA Screen Reader](https://www.nvaccess.org/)
- [WebAIM Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

## Compliance Status

**WCAG 2.1 Level AA Compliance: ✅ Implemented**

All required accessibility features have been implemented according to WCAG 2.1 AA standards. Manual testing with screen readers is recommended to verify the implementation.
