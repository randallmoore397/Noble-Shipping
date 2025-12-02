# CSS Alignment Checklist

Use this checklist to verify that NextJS app styling matches Flask app exactly.

## Header & Navigation
- [ ] Header top bar background color (#6f42c1)
- [ ] Header top bar padding (14px 0)
- [ ] Container padding (110px left/right)
- [ ] Logo width (250px)
- [ ] Menu item spacing (42px margin-left)
- [ ] Menu item font size (15px)
- [ ] Menu item font weight (600)
- [ ] Menu item color (#52465e)
- [ ] Active menu item color (var(--primary-color))
- [ ] Header search icon size and spacing
- [ ] Sticky header behavior and animation

## Footer
- [ ] Footer padding-top (190px)
- [ ] Footer padding-bottom (40px)
- [ ] Footer logo width (200px)
- [ ] Footer widget margin-bottom (50px)
- [ ] Footer text color and size
- [ ] Footer social icon styling
- [ ] App store badge width (140px)
- [ ] Copyright section styling

## Typography
- [ ] Body font size (15px)
- [ ] Paragraph line height (30px)
- [ ] h1 size (40px)
- [ ] h2 size (35px)
- [ ] h3 size (28px)
- [ ] h4 size (22px)
- [ ] h5 size (18px)
- [ ] h6 size (16px)
- [ ] Heading font weight (700)
- [ ] Heading color (#4e3668)
- [ ] Text color (#545454)

## Slider
- [ ] Slider heading size (71px)
- [ ] Blur overlay effect (blur(3.3px))
- [ ] Background overlay (rgba(0, 0, 0, 0.41))
- [ ] Content positioning and centering
- [ ] Animation effects (fadeInUpS)

## Buttons
- [ ] Button background color (var(--primary-color))
- [ ] Button padding (18px 30px)
- [ ] Button font size (14px)
- [ ] Button font weight (800)
- [ ] Button hover effect
- [ ] Button transition timing

## Forms
- [ ] Input field height and padding
- [ ] Input field border and focus states
- [ ] Select dropdown styling
- [ ] Textarea styling
- [ ] Placeholder color
- [ ] Form layout and spacing

## Category Section
- [ ] Category icon size
- [ ] Category item spacing
- [ ] Category hover effects
- [ ] Category background color

## Services Section
- [ ] Service card dimensions
- [ ] Service image sizes
- [ ] Service icon size and color
- [ ] Service content padding
- [ ] Service hover effects

## Testimonials
- [ ] Testimonial card styling
- [ ] Testimonial avatar size
- [ ] Testimonial rating stars
- [ ] Testimonial slider functionality

## Gallery
- [ ] Gallery grid layout
- [ ] Gallery image sizes
- [ ] Gallery overlay effect
- [ ] Gallery hover animation

## Stats/Facts Section
- [ ] Fact icon size
- [ ] Fact content styling
- [ ] Fact counter animation
- [ ] Fact section spacing

## Responsive Breakpoints
- [ ] Mobile menu display (< 768px)
- [ ] Container padding on mobile
- [ ] Font size scaling on mobile
- [ ] Logo size on mobile (180px)
- [ ] Slider heading on mobile (36px)
- [ ] Footer padding on mobile (80px top, 30px bottom)

## Admin Dashboard
- [ ] Admin header styling
- [ ] Admin sidebar styling
- [ ] Admin sidebar width
- [ ] Admin content area padding
- [ ] Admin table styling
- [ ] Admin form styling
- [ ] Admin card styling
- [ ] Admin button styling

## Colors
- [ ] Primary color (#ff4612)
- [ ] Secondary color (#152a47)
- [ ] Purple color (#6f42c1)
- [ ] Text color (#545454)
- [ ] Heading color (#4e3668)
- [ ] White (#fff)
- [ ] Black (#000)

## Animations
- [ ] fadeIn animation
- [ ] fadeInDown animation
- [ ] fadeInUp animation
- [ ] fadeInUpS animation
- [ ] Hover transitions
- [ ] Page load animations

## Miscellaneous
- [ ] Scrollbar styling
- [ ] Text selection color
- [ ] Focus states
- [ ] Box shadows
- [ ] Border radius values
- [ ] Z-index layering

## Testing Procedure

1. Open both Flask app and NextJS app side-by-side
2. Navigate to each page and compare visually
3. Use browser DevTools to inspect element dimensions
4. Check each item in this checklist
5. Document any discrepancies found
6. Fix discrepancies and re-test
7. Repeat until all items are checked

## Tools for Testing

- Browser DevTools (Inspect Element)
- Screenshot comparison tools
- Responsive design testing tools
- Color picker tools
- Ruler/measurement browser extensions
