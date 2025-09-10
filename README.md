# Imagine PPTP Prints - Website

A professional website for Imagine PPTP Prints, a printing company offering comprehensive printing services.

## Features

- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Elements**: Mobile navigation, form validation, and smooth scrolling
- **SEO Optimized**: Proper meta tags and semantic HTML structure

## Pages

- **Home** (`index.html`) - Landing page with hero section and service overview
- **Services** (`services.html`) - Detailed service descriptions
- **Contact** (`contact.html`) - Contact form and company information
- Additional pages can be added as needed

## File Structure

```
ImaginePPTPprints/
├── index.html          # Homepage
├── services.html       # Services page
├── contact.html        # Contact page
├── about.html          # About page
├── portfolio.html      # Portfolio page
├── paint_splat_anim.html # Paint splat animation test page
├── package.json        # npm configuration and scripts
├── .gitignore         # Git ignore rules
├── css/
│   └── main.css       # Main stylesheet
├── js/
│   └── main.js        # Main JavaScript file
├── images/            # Image assets
│   ├── favicon.svg    # Website favicon
│   ├── mainLogo.jpg   # Main logo
│   └── [various product images]
├── sort_images.py     # Python script for image sorting
├── sort_images.ps1    # PowerShell script for image sorting
└── README.md          # This file
```

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, and animations
- **JavaScript**: Interactive functionality and mobile navigation
- **Node.js/npm**: Development server and package management
- **http-server**: Lightweight static file server for development
- **Responsive Design**: Mobile-first approach

## Getting Started

### Development Server Setup

This project now includes an npm-based development server for easier testing and development.

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```
   This will start the server on `http://localhost:8080` and automatically open your browser.

3. **Alternative Commands**:
   - `npm start` - Start server without auto-opening browser
   - `npm run serve` - Basic server without cache control

### Manual Testing

Alternatively, you can still open `index.html` directly in your web browser, but the development server provides better functionality for testing features like the video background.

### Testing the Website

1. Navigate through the different pages using the navigation menu
2. Test the responsive design by resizing your browser window
3. Try the contact form (note: form submission is currently for display only)
4. Test the paint splat animation page with video background

## Customization

### Colors
The main color scheme is defined in the CSS variables:
- Primary Blue: `#2563eb`
- Dark Blue: `#1e40af`
- Dark Gray: `#1f2937`
- Light Gray: `#f9fafb`

### Content
- Update company information in the HTML files
- Modify services and features as needed
- Replace placeholder images with actual product photos
- Update contact information and business hours

### Styling
- Modify `css/main.css` to change colors, fonts, and layout
- Adjust responsive breakpoints in the media queries
- Customize animations and transitions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Future Enhancements

- Add more pages (About, Portfolio, Products)
- Implement a blog section
- Add online quote calculator
- Integrate with a CMS
- Add e-commerce functionality
- Implement real form submission
- Add image gallery for portfolio
- Include customer testimonials

## License

This project is created for Imagine PPTP Prints. All rights reserved.

## Contact

For questions about this website or printing services, contact:
- Email: info@imaginepptp.com
- Phone: (555) 123-4567
